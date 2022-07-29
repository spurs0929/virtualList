// 列表元素高度
export const ITEM_HEIGHT = 101;
// 每屏最多元素數目
export const MAX_ITEM_COUNT = Math.ceil(document.querySelector('#_scroll-wrapper').offsetHeight / ITEM_HEIGHT) + 1;

export const TIME_PER_FPS = 1000 / 30;