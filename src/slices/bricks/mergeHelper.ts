
export const mergeStack = (low:number,high:number,stack:number[][]) =>{
    if (low >= high) return;
    const mid = low + Math.floor((high-low)/2);
    stack.push([low,high]);
    mergeStack(low,mid,stack);
    mergeStack(mid+1,high,stack);
}
export const stackGenerator = (len:number):number[][] =>{
    const stack:number[][] = [];
    mergeStack(0,len-1,stack);
    return stack;
}

export const subSort = (arr:number[],low:number,high:number):number[] =>{
    const toSort = arr.slice(low,high+1), res:number[] = [];
    toSort.sort();
    return res.concat(arr.slice(0,low-1),toSort,arr.slice(high+1,arr.length));
}