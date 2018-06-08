/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * radioType:根据radio选择不同，显示不同的面板
 * FORM_ELEMENT：表单元素
 * ELEMENT_ATTRIBUTE：元素属性
 * FORM_ATTRIBUTE：表单属性
 */
export const radioType = (state = 'FORM_ELEMENT', action = {}) => {
  switch (action.type) {
    case 'FORM_ELEMENT':
        return 'FORM_ELEMENT';
    case 'ELEMENT_ATTRIBUTE':
        return 'ELEMENT_ATTRIBUTE';
    case 'FORM_ATTRIBUTE':
        return 'FORM_ATTRIBUTE';
    default:
        return state
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
// let store = createStore(radioType);

// 可以手动订阅更新，也可以事件绑定到视图层。
// store.subscribe(() =>
//   console.log(store.getState())
// );
