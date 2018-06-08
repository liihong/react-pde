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

export const element = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_ELEMENT': // 设置选中表单元素
        return state.concat(action.value)
    case 'UPDATE_ELEMENT':
      let arr = state.slice()
        arr.map(item =>{
          if(item.key == action.key)
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
    default:
        return state
  }
}

export const selectElementKey = (state = 0, action = {}) => {
  switch (action.type) {
    case 'SELECT_ELEMENT': 
        return action.value
    default:
        return state
  }
}
