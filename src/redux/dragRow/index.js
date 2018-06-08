
/**
 * 保存当前点击的表单元素信息
 *  "label": "string",			//控件文本提示
        "placeholder": "string",	//控件内灰字提示
        "desc": "string",			//控件右侧或下侧输入提示性文字
        "key": "string",			//控件字段对应的JSON报文key名称
        "type": "text",				//控件类型	text, select, date, table, radio, dict, address
        "required": true,			//是否必埴
        "location": "string",		//控件在表单中的网格布局定位 x,y形式
        "fields": [					//当type=table时,表单字段可内嵌,用于表单明细约束
          //结构同父级
        ],
        "style": {	//控件样式
          "fontFamily": "string",	//字休
          "fontSize": 0,			//字号
          "opacity": 0,				//透明度
          "color": "string",		//字体颜色
          "padding": "string",		//外缩近
          "margin": "string"		//内缩进
        },
        "extra": {}		//控件扩展属性
 */
let defaultState = []

export const dragRow = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_DRAGROW': // 设置选中表单元素
        return state.concat(action.value)
    case 'UPDATE_DRAGROW':
      let arr = state.slice()
        arr.map(item =>{
          if(item.key === action.key)
          {
            if(action.attr.indexOf('style') === -1){
              item[action.attr]  = action.value
            } else {
              let style = Object.assign({}, item.style); 
              style[action.attr.split('-')[1]] = action.value
              item.style = style
            }
          }
        })
        return arr;
  case 'CHANGE_ROW':
        let aArr = state.slice()
        aArr[action.index1] = aArr.splice(action.index2, 1, aArr[action.index1])[0];
        return aArr
   case 'UPDATE_COL':
        let nArr = state.slice()
          nArr.map(item =>{
            if(item.key === action.key.split('-')[0])
            {
              item.col.map(element=>{
                if(element.key === action.key.split('-')[1]){
                  element.attr = action.value
                }
              })
            }
          })
          return nArr;
    case 'UPDATE_CELL_ATTR':
        let newArr = state.slice()
        let keyArr = action.key.split('-')
        newArr.map(item =>{
          if(item.key === keyArr[1])
          {
            item.col.map(element =>{
              if(element.key === keyArr[2]){
                if(action.attr.indexOf('style') === -1){
                  element.attr[action.attr]  = action.value
                } else {
                  let style = Object.assign({}, element.attr.style); 
                  style[action.attr.split('-')[1]] = action.value
                  element.attr.style = style
                }
              }
            })
          }
        })
        return newArr
    default:
        return state
  }
}
