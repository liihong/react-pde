import {Breadcrumb,Row, Col, Button, Icon, Input, Form} from 'antd';
import React, {Component} from 'react';
import Sortable from 'sortablejs'
import logo from '../../static/img/hbjtLogo.svg';
import './jdxx.less';
import DragContent from '../../components/common/DragContent/DragContent';
import { connect } from 'react-redux'
import API from '../../api/api'

const ButtonGroup = Button.Group;
const FormItem = Form.Item
const { TextArea } = Input;


function mapStateToProps (state) {
  return {
      store: state.element,
      radioType: state.radioType,
      dragRow: state.dragRow,
      formData: state.formData,
      selectElementKey: state.selectElementKey
  }
}

class Jdxx extends Component {
  state = {
    formItem: []
  };
  dragRowClick(key){
      this.props.dispatch({ type: 'ELEMENT_ATTRIBUTE' });
      this.props.dispatch({ type: 'SELECT_ELEMENT',value: key + '-selectRow' });
  }
  // 预览按钮点击事件打开一个新页面
  previewClick(e) {
    window.open('http://localhost:3000/#/preview')
  }
  runSync() {
    const _this = this
    return new Promise((resolve,reject) => {
      let value = _this.props.dragRow
      _this.props.dispatch({ type: 'UPDATE_FORMATTR', attr: 'content', value})
      resolve()
    })
  }
  // 点击保存按钮执行
  saveClick(e) {
    const _this = this
    this.runSync().then(function(){
      console.log(_this.props.formData)
      API.saveForm(_this.props.formData).then(function(res){
        console.log(res)
      })
    })
    
  }
  // 在组件更新时执行
  componentDidUpdate() {
    let el = document.querySelectorAll('.dragCol');
    for(let i=0;i<el.length;i++) {
       new Sortable(el[i], {
        group: {
          name: 'items',
          pull: true,
          put: true
        },
        sort: false,
        handle: ".dropJdxx",
        ghostClass: "JdxxghostClass",
        onAdd: (event) => {
          if(event.from.getAttribute('id') === null){
            setTimeout(function () {
              el[i].removeChild(event.item)
            }, 30)
            let newAttr = {
              label: event.item.getAttribute('title'),  
              placeholder: '',  
              desc: '',  
              key: event.item.getAttribute('id') + Math.ceil(Math.random() * 10000000),  
              type: event.item.getAttribute('type'),
              required: '',
              location: '',
              style: {
                  fontFamily: '',	//字休
                  fontSize: 14,			//字号
                  opacity: 1,				//透明度
                  color: '',		//字体颜色
                  padding: '',		//外缩近
                  margin: ''		//内缩进
              }
            }
            let parentId = el[i].id.split('-')[0]
  
            const selectRow = this.props.dragRow.filter(item => {
              return item.key === parentId
            })
            let arr = selectRow[0].col.slice()
            arr.map(item =>{
              if(item.key === el[i].id.split('-')[1]) {
                item.attr = newAttr
              }
            })
  
            this.props.dispatch({ type: 'UPDATE_DRAGROW', attr: 'col', value: arr, key: parentId})
          } else{
            let fromId = event.from.getAttribute("id").split('-')
            let toId = event.to.getAttribute("id").split('-')
            let fromElement = null;
            let toElement = null;
            this.props.dragRow.map(item=>{
              if(item.key === fromId[0]) {
                item.col.map(element=>{
                  if(element.key === fromId[1]){
                    fromElement = element.attr
                  }
                })
              }
              if(item.key === toId[0]) {
                item.col.map(element=>{
                  if(element.key === toId[1]){
                    toElement = element.attr
                  }
                })
              }
            })
            this.props.dispatch({ type: 'UPDATE_COL', attr: 'col', value: fromElement, key: event.to.getAttribute("id")})
            this.props.dispatch({ type: 'UPDATE_COL', attr: 'col', value: toElement, key: event.from.getAttribute("id")})
            event.from.appendChild(event.to.firstChild)
          }
         
        },
        onStart: (event) => {
          // console.log(event.item.parentNode.getAttribute("id"))
        }
      })
    }
  }
  //  在第一次渲染后调用
  componentDidMount() {
    setTimeout(res=>{
      new Sortable( document.querySelector('#dropJdxx'), {
        group: {
          name: 'items',
          pull: false,
          put: false
        },
        sort: true,
        handle: ".dropJdxx",
        ghostClass: "JdxxghostClass",
        onUpdate: (event) =>{
          this.props.dispatch({ type: 'CHANGE_ROW', index1: event.oldIndex -1 , index2: event.newIndex -1})
        }
      })
     
    },30)
    
  };
  // 在渲染前调用,在客户端也在服务端。
  componentWillMount(){
    for(let i = 0;i< 8; i++) {
      let dragRow = {
        key:'dragRow' +  (new Date()).valueOf()+ Math.ceil(Math.random() * 10000),
        col: [{
          key: 'dragRow' +  (new Date()).valueOf()+ Math.ceil(Math.random() * 10000),
          attr: {}
        }],
        style: {
          height: 55,
          margin: 0,
          padding: 0
        }
      }
      this.props.dispatch({ type: 'SET_DRAGROW', value: dragRow})
    }
    
  }
  render() {
    const formData = this.props.formData
    const selectElementKey = this.props.selectElementKey
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      
      <div className="jdxx">
        <div className="toolBarJdxx">
          <Breadcrumb className="breadCrumb" separator="|">
            {/* <Breadcrumb.Item>
              <a href="">节点属性</a>
            </Breadcrumb.Item> */}
            <Breadcrumb.Item>
              <a href="" className="active">基础表单-电脑</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">基础表单-手机</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="toolBtnList">
            <ButtonGroup>
              <Button  type="primary"  style={{ marginLeft: 20 }} onClick={this.saveClick.bind(this)}>保存</Button>
              <Button  type="primary"  style={{ marginLeft: 20 }} onClick={this.previewClick}>预览</Button>
              <Button  type="primary"  style={{ marginLeft: 20 }}>参考创建</Button>
              <Button  type="primary"  style={{ marginLeft: 20 }}>另存为</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="mainJdxx" style={formData.style}>
          <div className="jdxx_header">
            <img alt="logo" src={logo}/>
            <span className="headerName">{formData.name}</span>
            <div className="lcbh">流程编号：<span>{formData.lcbh}</span></div>
            <div className="sqrq">申请日期：<span>{formData.sqrq}</span></div>
          </div>
         
          <Form action="" id="dropJdxx" className="dropJdxx">
          <Row className="dragRow">
              <Col>
                <FormItem id="qzyjItem"  {...formItemLayout} label="申请人" >
                谭红林 （产品总监、大数据中心、13606623456）
                </FormItem>
              </Col>
            </Row>
            {
              this.props.dragRow.map((item, index) => {
                let list = []
                for(let i= 0 ;i<item.col.length; i++) {
                    list.push(
                      <Col span={24/item.col.length} id={item.key + '-' + item.col[i].key} className="dragCol"   key={'dragRow_'+ i + item.key} onClick={this.dragRowClick.bind(this, item.key)}>
                         <DragContent elementId={item.key + '-' + item.col[i].key}  elementData={item.col[i].attr}></DragContent>
                      </Col>
                    )
                }
                return <Row key={item.key} className={selectElementKey === item.key + '-selectRow' ? 'dragRowSelect' : 'dragRow'} onClick={this.dragRowClick.bind(this, item.key)}>
                    {/* <Icon className="deleteIcon" type="close-circle" /> */}
                    {list}
               </Row>;
              })
            }
            <Row className="spyj">
              <Col>
                <FormItem   {...formItemLayout}  id="qzyjItem" label="签字意见" >
                  <TextArea  id="qzyj" rows={4} />
                </FormItem>
              </Col>
            </Row>
          </Form>
         
        </div>
      </div>
    );
  }
}

export default  connect(mapStateToProps)(Jdxx);