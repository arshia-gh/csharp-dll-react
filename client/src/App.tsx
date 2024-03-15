import { useEffect, useState } from "react";
import { getRandomIntInclusive, benchmark, cn } from "./lib/utils";
import { Bindings } from "wasm-bindings";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { bubbleSort } from "./lib/sort";
import { Progress } from "./components/ui/progress";

const numberToColor = (n: number) => {
  if (n < 1000) {
    return `text-black bg-zinc-500`;
  } else if (n < 2000) {
    return `text-black bg-stone-500`;
  } else if (n < 3000) {
    return `text-black bg-teal-500`;
  } else if (n < 4000) {
    return `text-black bg-emerald-500`;
  } else if (n < 5000) {
    return `text-black bg-green-500`;
  } else if (n < 6000) {
    return `text-black bg-lime-500`;
  } else if (n < 7000) {
    return `text-black bg-yellow-500`;
  } else if (n < 8000) {
    return `text-black bg-amber-500`;
  } else if (n < 9000) {
    return `text-white bg-orange-500`;
  } else {
    return `text-white bg-red-500`;
  }
};

const generateRandomIntArray = (length: number) =>
  Int32Array.from({ length }, () => getRandomIntInclusive(0, 10_000));

const numbers = [
  { name: "100 items", array: generateRandomIntArray(100) },
  { name: "1000 items", array: generateRandomIntArray(1000) },
  { name: "10,000 items", array: generateRandomIntArray(10_000) },
  { name: "30,000 items", array: generateRandomIntArray(30_000) },
  { name: "50,000 items", array: generateRandomIntArray(50_000) },
  { name: "100,000 items", array: generateRandomIntArray(100_000) },
] as const;

const copyTypedArray = (buffer: Int32Array) => {
  const copy = new Int32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    copy[i] = buffer[i];
  }
  return copy;
};

function App() {
  const [label, setLabel] = useState<string>(numbers[3].name);
  const [jsData, setJsData] = useState(numbers[3].array);
  const [csharpData, setCSharpData] = useState(numbers[3].array);
  const [sorted, setSorted] = useState<false | number>(false);
  const [env, setEnv] = useState<string>("js");
  const [datasetView] = useState({ start: 0, end: 1000 });
  const [barValue, setBarValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setBarValue((prev) => (prev + 1) % 100);
    }, 100);
  }, [setBarValue]);

  const resetDataset = (localLabel: string) => {
    const dataset = numbers.find(({ name }) => name === localLabel)!;
    console.log(`Dataset with ${dataset.name} was loaded`);
    setJsData(dataset.array);
    setCSharpData(dataset.array);
    setSorted(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl">Benchmark: C# WebAssembly vs JavaScript</h1>
      <p>
        This comparison doesn't reflect the actual speed of C# in browser,
        WebAssembly is usually slower than JS when there's alot of data being
        transferred (Marshal and Un-Marshalling).
      </p>
      <p>
        However C# in browser provides more predictable execution cost compared
        to JS
      </p>
      <hr className="my-2" />
      <div className="flex gap-2 items-center my-4">
        <Button
          onClick={() => {
            if (sorted !== false) {
              resetDataset(label);
              return;
            }
            const arr = copyTypedArray(env === "js" ? jsData : csharpData);
            const { returned, time } = benchmark(() =>
              env === "js" ? bubbleSort(arr) : Bindings.bubbleSort(arr)
            );
            setSorted(time);
            env === "js" ? setJsData(returned) : setCSharpData(returned);
          }}
        >
          {sorted === false ? `Sort ${label}` : "UnSort"}
        </Button>

        <Select
          value={env}
          onValueChange={(value) => {
            setEnv(value);
            resetDataset(label);
          }}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select where to run the code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="csharp">C# (WebAssembly)</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={label}
          onValueChange={(value) => {
            setLabel(value);
            resetDataset(value);
          }}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select where to run the code" />
          </SelectTrigger>
          <SelectContent>
            {numbers.map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {sorted !== false && (
        <p>UI was frozen for: {sorted}ms (this is not perfectly accurate)</p>
      )}

      <hr className="my-2" />

      <h2>This bar animation represents smoothness of the UI</h2>
      <Progress value={barValue} />
      <hr className="my-2" />

      <h2 className="text-3xl mb-2">First 100 items (out of {label})</h2>

      <div className="grid grid-cols-12 gap-2">
        {Array.from(env === "js" ? jsData : csharpData)
          .slice(datasetView.start, datasetView.end)
          .map((v, i) => (
            <span
              key={i}
              className={cn(
                "border text-primary-foreground p-2 rounded-lg",
                numberToColor(v)
              )}
            >
              {v}
            </span>
          ))}
      </div>
    </div>
  );
}

export default App;
