import { ITEM_HEIGHT, MAX_ITEM_COUNT } from "./config";
import { update, updatePaddingSet } from "./render";
import { getData } from "./utils";

// 資料代理
const $state = {};

const data = {
  dataSource: [],
  currentData: [],
  startIndex: 0,
  endIndex: 0,
  paddingSet: {
    paddingTop: 0,
    paddingBottom: 0
  }
}

export function reactive(list){
  Object.defineProperties($state, {
    dataSource: {
      get(){
        return data.dataSource;
      },
      set(newValue){
        data.dataSource = newValue;
        setCurrentData();
      }
    },
    currentData: {
      get(){
        return data.currentData;
      },
      set(newValue){
        data.currentData = newValue;
        // 更新視圖
        update($state.currentData, list);
      }
    },
    startIndex: {
      get(){
        return data.startIndex;
      },
      set(newValue){
        if($state.startIndex !== newValue){
          data.startIndex = newValue;
          data.$startIndex = newValue;
          setCurrentData();
          $state.endIndex >= $state.dataSource.length - 1
          &&
          setDataSource($state.dataSource.length + 1, $state.dataSource.length * 2);
          setPaddingSet();           
        }
      }
    },
    endIndex: {
      get(){
        return setEndIndex();
      }
    },
    paddingSet: {
      get(){
        return data.paddingSet;
      },
      set(newValue){
        data.paddingSet = newValue;
        updatePaddingSet($state.paddingSet, list);
      }
    }
  });
  
  return $state
}

function setEndIndex(){
  const endIndex = $state.startIndex + MAX_ITEM_COUNT;

  return $state.dataSource[endIndex] ? endIndex 
                                     : $state.dataSource.length - 1; 
}

export function setDataSource(init, count){
  $state.dataSource = [
    ...$state.dataSource,
    ...getData(init, count)
  ]
}

export function setCurrentData(){
  const startIndex = resetStartIndex();
  $state.currentData = $state.dataSource.slice($state.startIndex, $state.endIndex);
}

export function setPaddingSet(){
  const startIndex = resetStartIndex();
  $state.paddingSet = {
    paddingTop: $state.startIndex * ITEM_HEIGHT,
    paddingBottom: ($state.dataSource.length - $state.endIndex) * ITEM_HEIGHT
  }
}

export function resetStartIndex(){
  return $state.startIndex <= MAX_ITEM_COUNT ? 0 : $state.startIndex - MAX_ITEM_COUNT; 
}