import { Layout, Button, Radio, Tabs, message } from 'antd';
import React, { Component } from 'react';
import logo from '../../static/img/logo.svg';
import left1 from '../../static/img/left1.png';
import left2 from '../../static/img/left2.png';
import './home.less'
import Jdxx from '../jdxx/jdxx' // 中间节点信息页面
import FormElement from '../../components/right/FormElement/FormElement'
import ElementAttribute from '../../components/right/ElementAttribute/ElementAttribute'
import FormAttribute from '../../components/right/FormAttribute/FormAttribute'

import { connect } from 'react-redux'

const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

function mapStateToProps (state) {
    return {
        radioType: state.radioType,
        selectElementKey: state.selectElementKey,
        formData: state.formData
    }
}
function init(){
    var resize = document.getElementById("resize");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var box = document.getElementById("box");
    resize.onmousedown = function(e){
      var startX = e.clientX;
      resize.left = resize.offsetLeft;
      document.onmousemove = function(e){
        var endX = e.clientX;

        var moveLen = resize.left + (endX - startX);
        var maxT = box.clientWidth - resize.offsetWidth;
        if(moveLen<150) moveLen = 150;
        if(moveLen>maxT-150) moveLen = maxT-150;

        resize.style.left = moveLen;
        left.style.width = moveLen + "px";
        right.style.width = (box.clientWidth - moveLen - 5) + "px";
      }
      document.onmouseup = function(evt){
        document.onmousemove = null;
        document.onmouseup = null;
        resize.releaseCapture && resize.releaseCapture();
      }
      resize.setCapture && resize.setCapture();
      return false;
    }
  }

class  Home extends Component {
    state = {
        headerName: '费用报销流程',
        headerDesc: '本流程适用于集团公司各种费用报销',
        leftWidth: 490,
        activeKey: '2'
    };

    onChange = (e) => {
        if(this.props.selectElementKey === 0 && e.target.value === 'ELEMENT_ATTRIBUTE') {
            const error = () => {
                message.error('请先选择一个组件');
              };
            return
        }
        this.props.dispatch({ type: e.target.value });
    }
    selectTab = (e) => {
      this.setState({
        activeKey: e.toString()
      });
    }
    componentDidMount() {
        init()
    }
    render() {
        const [radioType, headerName, headerDesc, activeKey] =
          [this.props.radioType, this.state.headerName, this.state.headerDesc ,this.state.activeKey];
        return (
            <Layout>
                <Header className="header">
                <div className="logo" >
                    <img alt="logo" src={logo} />
                    <label>流程模型：{headerName}</label>
                    <Button type="primary"  style={{ marginLeft: 20 }}>选择模板</Button>
                    <span  className="headerDesc">{headerDesc}</span>
                    <span className="headerDetails">详情</span>
                </div>
                </Header>
                <Layout id="box">
                    <div id="left" className="leftSider">
                        <div className="menuButton">
                            <img alt="left1"  src={left1} />
                        </div>
                        <div className="lcContent">
                        <img alt="left2"  src={left2} />
                        </div>
                    </div>
                    <div id="resize" className="resize"></div>
                    <Layout id="right" className="mainContent">
                        <div  className="card-container">
                            <Tabs activeKey={activeKey} onChange={this.selectTab} type="card">
                                <TabPane tab="流程信息" key="1">
                                    <Content style={{ background: '#E8E9EE', padding: 24, margin: 0, minHeight: 280 }}>
                                    </Content>
                                </TabPane>
                                <TabPane tab="基础表单" key="2">
                                    <Jdxx></Jdxx>
                                </TabPane>
                                <TabPane tab="节点信息" key="3">
                                </TabPane>
                                <TabPane tab="数据字典" key="4">Content of Tab Pane 1</TabPane>
                                <TabPane tab="流程路由" key="5">Content of Tab Pane 2</TabPane>
                                <TabPane tab="权限" key="6">Content of Tab Pane 3</TabPane>
                                <TabPane tab="报表" key="7">Content of Tab Pane 2</TabPane>
                                <TabPane tab="流程数据" key="8">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </div>
                    </Layout>
                    <Sider  className="rightSider" width={395}>
                        <div className= "rightHeader">
                            <label className="rightTitle">设计表单</label><br/>
                            <Radio.Group className="tab" value={radioType} onChange={this.onChange} style={{ marginTop: 13 }}>
                                <Radio.Button value="FORM_ELEMENT">表单元素</Radio.Button>
                                <Radio.Button value="ELEMENT_ATTRIBUTE">元素属性</Radio.Button>
                                <Radio.Button value="FORM_ATTRIBUTE">表单属性</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ overflow: 'auto',height: 800 }}>
                            {this.props.radioType === 'FORM_ELEMENT'? <FormElement></FormElement> : null}
                            {this.props.radioType === 'ELEMENT_ATTRIBUTE'? <ElementAttribute></ElementAttribute> : null}
                            {this.props.radioType === 'FORM_ATTRIBUTE'? <FormAttribute></FormAttribute> : null}
                        </div>
                            
                    </Sider>
                </Layout>
            </Layout>
        );
    }
}
export default connect(mapStateToProps)(Home);