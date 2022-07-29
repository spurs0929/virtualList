import { TIME_PER_FPS } from "./config";

export function getData(init, count){
  const arr = [];

  for(let i = init; i <= count; i++){
    arr.push(i);
  }

  return arr;
}

// 優化虛擬列表
export function setAnimationFrame(callback){
  // 開始時間
  let beginTime = Date.now();

  requestAnimationFrame(function cb(){
    // 結束時間
    const endTime = Date.now();
    callback();

    if(endTime - beginTime >= TIME_PER_FPS){
      beginTime = endTime;
      requestAnimationFrame(callback);
    }
  })
}