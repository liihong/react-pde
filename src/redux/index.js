import {createStore, combineReducers, applyMiddleware} from 'redux';
import {radioType} from './home/index';
import {element, selectElementKey} from './element/index';
import {formData} from './formData/index'
import {dragRow} from './dragRow/index'
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({
    element: element,  
    dragRow: dragRow,
    selectElementKey: selectElementKey,
    radioType: radioType,
    formData: formData
      }),
      applyMiddleware(thunk)
);
// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>{
  if(localStorage.getItem('store')){
    localStorage.removeItem('store')
    
    localStorage.setItem('store', JSON.stringify(store.getState()))
  }else{
    localStorage.setItem('store',  JSON.stringify(store.getState()))
  }
}
);
export default store;