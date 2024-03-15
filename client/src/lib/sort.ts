export const bubbleSort = (arr: Int32Array) => {
    console.log('JS Sort was called!!');
    let flag = true;
    let temp;
    const numLength = arr.length;

    for (let i = 1; (i <= (numLength - 1)) && flag; i++)
    {
        flag = false;
        for (let j = 0; j < (numLength - 1); j++)
        {
            if (arr[j + 1] > arr[j])
            {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
            }
        }
    }

    return arr;
}