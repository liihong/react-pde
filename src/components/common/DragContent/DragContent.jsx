import React, {Component} from 'react';
import {Input, DatePicker, Form} from 'antd';
import './DragContent.less'
import { connect } from 'react-redux'
import AddressSelect from '../AddressSelect/AddressSelect'

const FormItem = Form.Item

function mapStateToProps(state) {
    return {
      selectElementKey : state.selectElementKey,
      dragRow: state.dragRow
    }
}
/**
 * 拖拽区域组件，可做容器，本身也可以拖动
 */
class DragContent extends Component {
  state = {
  };

  //  在第一次渲染后调用
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
  };

  // 拖动组件的点击事件
  dragClick = (key, e) => {
    if(key === undefined) return
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.dispatch({ type: 'ELEMENT_ATTRIBUTE' });
    this.props.dispatch({ type: 'SELECT_ELEMENT',value: key+ '-' + this.props.elementId});
  };

  render() {
    let elementData = this.props.elementData
    let selectElementKey = this.props.selectElementKey
    
    let selctor = selectElementKey//.split('-')
    if(selctor !== 0) {
      selctor = selectElementKey.split('-')
      let selectElement = 0;
      this.props.dragRow.map(item=> {
          if(item.key === selctor[1]) {
            item.col.map(element =>{
              if(element.key === selctor[2])
              {
                selectElement = element
              }  
            })
          }
      })
    }
    

    if(elementData === null) {
      return <div className="dragContent"></div>
    }
    const formItemLayout = {
      required: elementData.required,
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 20},
      },
    };
    return (
        <div id={elementData.key} onClick={this.dragClick.bind(this,elementData.key)} className={selectElementKey === elementData.key ? 'dragActive' : 'dragContent'}>
          <FormItem id={elementData.key}
            {...formItemLayout}
            {...elementData}>
            {elementData.type === 'input' ? <Input  style={{ maxWidth: 415 }} placeholder={elementData.placeholder}/> : null}
            {elementData.type === 'label' ? <span>谭红林 （产品总监、大数据中心、13606623456）</span> : null}
            {elementData.type === 'radio' ? <Input placeholder={elementData.placeholder}/> : null}
            {elementData.type === 'date' ?   <DatePicker style={{width:175}} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" /> : null}
            {elementData.type === 'address' ? <AddressSelect></AddressSelect> : null}
          </FormItem>
        </div>
    );
  }
}

export default connect(mapStateToProps)(DragContent);