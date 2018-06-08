import React, {Component} from 'react';
import './FormAttribute.less'
import {Col, Collapse, Form, Switch, Input, Slider, InputNumber, Radio} from 'antd';
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
import SketchPicker from 'react-color'

const Panel = Collapse.Panel;
const FormItem = Form.Item

function mapStateToProps(state) {
  return {
    formData: state.formData,
  }
}

class FormAttribute extends Component {
  state = {
    displayColorPicker: false,
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }
  };

  //  在第一次渲染后调用
  componentDidMount() {
  };
  handleChange = (color) => {
    this.setState({ color: color.rgb })
    let key = this.props.selectElementKey,
       value = color.hex, attr = 'style-color'
    // this.props.dispatch({ type: 'SET_FORMDATA', attr, value, key})
  };
/**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (attr,  event) => {
    let value = event

    if(attr.indexOf('style') == '-1' && attr !=='required'){
      value = event.target.value
    }
    this.props.dispatch({ type: 'UPDATE_FORMATTR', attr, value})
   
  }
  render() {
    const labelCol = this.state.labelCol
    const wrapperCol = this.state.wrapperCol
    const formData = this.props.formData
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
      <div className="form-attribute">
        <Form>
          <Collapse defaultActiveKey={['1','2','3']}>
            <Panel header="通用属性" key="1">
              <div id="elAttrForm" className="elAttrForm">
                <FormItem colon={false}  label="表单名称"  labelCol={labelCol} wrapperCol={wrapperCol}><Input onChange={this.handleInput.bind(this, 'name')}  value ={formData.name}/></FormItem>
                <FormItem colon={false}  label="表单描述"  labelCol={labelCol} wrapperCol={wrapperCol}><Input  onChange={this.handleInput.bind(this, 'placeholder')}  value ={formData.placeholder}/></FormItem>
                <FormItem colon={false} label="表单属性"   labelCol={labelCol} wrapperCol={wrapperCol}><Input onChange={this.handleInput.bind(this, 'placeholder')} value ={11}/></FormItem>
                <FormItem colon={false}  label="是否发布"  labelCol={labelCol} wrapperCol={wrapperCol}> <Switch onChange={this.handleInput.bind(this, 'required')}/></FormItem>
              </div>
            </Panel>
            <Panel header="样式属性" key="3">
              <div id="styleAttrForm" className="elAttrForm" style={{height: 400}}>
                  <FormItem colon={false}  label="字体"  labelCol={labelCol} wrapperCol={wrapperCol}>
                      <Input onChange={this.handleInput.bind(this, 'label')}  value ={formData.label}/></FormItem>
                  <FormItem colon={false}  label="字号"  labelCol={labelCol} wrapperCol={wrapperCol}>
                     <InputNumber min={12} max={10000} defaultValue={14} value={formData.style.fontSize}  onChange={this.handleInput.bind(this, 'style-fontSize')} />
                  </FormItem>
                  <FormItem colon={false} label="透明度"  labelCol={labelCol} wrapperCol={wrapperCol}>
                   <Col span={12}>
                      <Slider min={0} max={1} defaultValue={formData.style.opacity} step={0.01}  onChange={this.handleInput.bind(this, 'style-opacity')} />
                    </Col>
                    <Col span={12}>
                      <InputNumber  min={0}  max={1}  defaultValue={formData.style.opacity} step={0.01} onChange={this.handleInput.bind(this, 'style-opacity')}  />
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
            </Panel>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FormAttribute);