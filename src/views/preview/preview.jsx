import {Row, Col, Button, Form} from 'antd';
import React, {Component} from 'react';
import logo from '../../static/img/hbjtLogo.svg';
import './preview.less';
import DragContent from '../../components/common/DragContent/DragContent';

const ButtonGroup = Button.Group;

class Preview extends Component {
  
  state = {
    formItem: []
  };

  // 在组件更新时执行
  componentDidUpdate() {
  }
  //  在第一次渲染后调用
  componentDidMount() {
  };

  render() {
    const stroe = JSON.parse(localStorage.getItem('store')) 
    const formData = stroe.formData
    const dragRow = stroe.dragRow
    return (
      <div className="preview">
        <div className="previewContent" style={formData.style}>
          <div className="previewHeader">
            <img alt="logo" src={logo}/>
              <span className="headerName">{formData.name}</span>
              <div className="lcbh">流程编号：<span>{formData.lcbh}</span></div>
              <div className="sqrq">申请日期：<span>{formData.sqrq}</span></div>
          </div>
          <Form action="" id="previewForm" className="previewForm">
            {
              dragRow.map((item, index) => {
                let list = []
                for(let i= 0 ;i<item.col.length; i++) {
                    list.push(
                      <Col span={24/item.col.length} id={item.key + '-' + item.col[i].key}   key={i + item.key} className="previvewCol">
                         <DragContent elementId={item.key + '-' + item.col[i].key}  elementData={item.col[i].attr}></DragContent>
                      </Col>
                    )
                }
                return <Row key={item.key}>
                    {list}
               </Row>;
              })
            }
          </Form>
        </div>
      </div>
    );
  }
}

export default (Preview);