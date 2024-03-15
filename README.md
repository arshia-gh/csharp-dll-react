# CSharp DLL as WebAssembly vs Pure JS performance benchmark

## How to run the demo locally
Clone the repository
```
git clone https://github.com/arshia-gh/csharp-dll-react.git
```

Build the sample DLL
```
dotnet publish ./dll
```

Install `wasm-tools` workload if it's already not installed
```
dotnet workload install wasm-tools
```

Build the wasm bindings
```
dotnet publish ./WasmBindings
```

Install `client` dependencies (require `pnpm`)
```
cd ./client && pnpm install
```

Run the client locally
```
pnpm dev
```
