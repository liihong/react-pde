import React, {Component} from 'react';
import './ElementAttribute.less'
import {Col, Collapse, Button, Form, Switch, Input, Slider, InputNumber, Radio} from 'antd';
import { connect } from 'react-redux'
import SketchPicker from 'react-color'
import reactCSS from 'reactcss'
import Sortable from 'sortablejs'

const Panel = Collapse.Panel;
const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function mapStateToProps(state) {
  let selctor = state.selectElementKey.split('-')
  let selectElement = 0;
  state.dragRow.map(item=> {
      if(item.key === selctor[1]) {
        item.col.map(element =>{
          if(element.key === selctor[2])
          {
            selectElement = element
          }  
        })
      }
  })
  const selectRow = state.dragRow.filter(item => {
    return item.key === selctor[0]
  })
  return {
    element: state.element,
    dragRow: state.dragRow,
    selectElementKey: state.selectElementKey,
    selectElement: selectElement.attr,
    selectRow: selectRow[0]
  }
}

class ElementAttribute extends Component {
  state = {
    displayColorPicker: false,
    rowCol: 1,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };
  componentDidMount(){
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
  onRowColChange = (e) => {
    let value = e.target.value, attr = 'col',key = this.props.selectElementKey.split('-')[0]
    this.setState({
      rowCol: value
    })
    let arr = this.props.selectRow.col.slice()
    let nlength = this.props.selectRow.col.length
    if (value === nlength) return
    if(value > nlength) {
      for(let i = nlength;i < value;i++) {
        arr.push({
          key: 'dragRow' +  (new Date()).valueOf()+ Math.ceil(Math.random() * 10000),
          attr: null
        })
      }
    } else {
         arr.splice(value, nlength - value)
    }
   
    this.props.dispatch({ type: 'UPDATE_DRAGROW', attr, value: arr, key})
  
   
  }
  handleChange = (color) => {
    this.setState({ color: color.rgb })
    let key = this.props.selectElementKey,
       value = color.hex, attr = 'style-color'
    this.props.dispatch({ type: 'UPDATE_CELL_ATTR', attr, value, key})
  };

  /**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (attr,  event) => {
    let key = this.props.selectElementKey,
       value = event
    
    if(attr.indexOf('style') == '-1' && attr !=='required'){
      value = event.target.value
    }

    this.props.dispatch({ type: 'UPDATE_CELL_ATTR', attr, value, key})
   
  }
  render() {

    const selectElement = this.props.selectElement
    const selectElementKey = this.props.selectElementKey
    const labelCol = this.state.labelCol
    const wrapperCol = this.state.wrapperCol
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <div className="element-attribute">
        <Form>
          <Collapse defaultActiveKey={['1','2','3']}>
            <Panel header="通用属性" key="1">
              {selectElementKey.indexOf('selectRow') === -1 ? 
                <div id="elAttrForm" className="elAttrForm">
                  <FormItem colon={false}  label="标签文本"  labelCol={labelCol} wrapperCol={wrapperCol}><Input onChange={this.handleInput.bind(this, 'label')}  value ={selectElement.label}/></FormItem>
                  <FormItem colon={false}  label="提示文字"  labelCol={labelCol} wrapperCol={wrapperCol}><Input  onChange={this.handleInput.bind(this, 'placeholder')}  value ={selectElement.placeholder}/></FormItem>
                  <FormItem colon={false} label="描述性文本"   labelCol={labelCol} wrapperCol={wrapperCol}><Input onChange={this.handleInput.bind(this, 'placeholder')} value ={selectElementKey}/></FormItem>
                  <FormItem colon={false}  label="是否必填"  labelCol={labelCol} wrapperCol={wrapperCol}> <Switch onChange={this.handleInput.bind(this, 'required')}/></FormItem>
                </div>   : 
                <div id="elAttrForm" className="elAttrForm">
                  <FormItem colon={false}  label="列布局"  labelCol={labelCol} wrapperCol={wrapperCol}>
                      <RadioGroup onChange={this.onRowColChange} value={this.state.rowCol}>
                        <Radio value={1}>1列</Radio>
                        <Radio value={2}>2列</Radio>
                        <Radio value={3}>3列</Radio>
                        <Radio value={4}>4列</Radio>
                      </RadioGroup>
                  </FormItem>
                </div>
              }
            </Panel>
            <Panel header="特殊属性" key="2">
              <div id="gsysItem" className="selector">
                 {selectElementKey.indexOf('selectRow') !== -1 ? 
                      <div>
                        <Button  type="dashed"  style={{ marginLeft: 20 }}>删除</Button>
                      </div> : null}
              </div>
            </Panel>
            <Panel header="样式属性" key="3">
              {selectElementKey.indexOf('selectRow') === -1 ? 
              <div id="styleAttrForm" className="elAttrForm" style={{height: 400}}>
                  <FormItem colon={false}  label="字体"  labelCol={labelCol} wrapperCol={wrapperCol}>
                      <Input onChange={this.handleInput.bind(this, 'label')} /></FormItem>
                  <FormItem colon={false}  label="字号"  labelCol={labelCol} wrapperCol={wrapperCol}>
                     <InputNumber min={12} max={10000} defaultValue={14} value={selectElement.style.fontSize}  onChange={this.handleInput.bind(this, 'style-fontSize')} />
                  </FormItem>
                  <FormItem colon={false} label="透明度"  labelCol={labelCol} wrapperCol={wrapperCol}>
                   <Col span={12}>
                      <Slider min={0} max={1} defaultValue={selectElement.style.opacity} step={0.01}  onChange={this.handleInput.bind(this, 'style-opacity')} />
                    </Col>
                    <Col span={12}>
                      <InputNumber  min={0}  max={1}  defaultValue={selectElement.style.opacity} step={0.01} onChange={this.handleInput.bind(this, 'style-opacity')}  />
                    </Col>
                  </FormItem>
                  <FormItem colon={false} label="字体颜色"  labelCol={labelCol} wrapperCol={wrapperCol}>
                    <div style={ styles.swatch } onClick={ this.handleClick }>
                        <div style={ styles.color } />
                      </div>
                      { this.state.displayColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                      </div> : null }
                  </FormItem>
                  <FormItem colon={false}  label="内缩进"  labelCol={labelCol} wrapperCol={wrapperCol}><Input /></FormItem>
                  <FormItem colon={false}  label="外缩进"  labelCol={labelCol} wrapperCol={wrapperCol}><Input /></FormItem>
                </div>
                : 
                <div id="styleAttrForm" className="elAttrForm" style={{height: 400}}>
                  <FormItem colon={false}  label="高度"  labelCol={labelCol} wrapperCol={wrapperCol}><Input /></FormItem>
                  <FormItem colon={false}  label="内缩进"  labelCol={labelCol} wrapperCol={wrapperCol}><Input /></FormItem>
                  <FormItem colon={false}  label="外缩进"  labelCol={labelCol} wrapperCol={wrapperCol}><Input /></FormItem>
                </div>
                }
            </Panel>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ElementAttribute);