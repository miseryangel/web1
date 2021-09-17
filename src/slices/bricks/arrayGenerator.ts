// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min:number, max:number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
export const randomArray = (len:number) =>{
    const arr = [];
    for (let i = 0; i < len; i++){
        arr[i] = randomIntFromInterval(1,100);
    }
    return arr;
}