namespace FastSort;

public static class BubbleSort
{

    public static int[] Sort(int[] arr)
    {

        bool flag = true;
        int temp;
        int numLength = arr.Length;

        //sorting an array
        for (int i = 1; (i <= (numLength - 1)) && flag; i++)
        {
            flag = false;
            for (int j = 0; j < (numLength - 1); j++)
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
}
