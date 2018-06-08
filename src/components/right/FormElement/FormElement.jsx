import React, {Component} from 'react';
import './FormElement.less';
import {Collapse, Tree,Icon} from 'antd';
import Sortable from 'sortablejs';

import FormItme1 from '../../../static/json/formItem1.json';

const Panel = Collapse.Panel;

const loop = data => data.map((item) => {
  return <div className="dragDiv" key={item.key} ><Icon type="caret-right"/>
          <label  id={item.key} type={item.type} title={item.title}>{item.title}</label></div>;
});

function callback(key) {
  console.log(key);
}

class FormElement extends Component {
  state = {
    gData: FormItme1,
  };

  //  在第一次渲染后调用
  componentDidMount() {
      let el = document.getElementById(this.state.gData[0].id).getElementsByTagName("div");
      for(let i = 0;i < el.length ;i++) {
        Sortable.create(el[i], {
          group: {
            name: 'items',
            pull: 'clone',
            put: false
          },
          chosenClass: 'ghostClass',
          handle: ".selector",
          forceFallback: true,
          sort: false,
          delay: 0
        });
      }
  };

  render() {
    const gData = this.state.gData
    return (
      <div className="form-element">
        <Collapse defaultActiveKey={['0', '1']} onChange={callback}>
          {
              gData.map((item, index) => {
                return <Panel header={item.name} key={index}> <div id={item.id} className="selector">{loop(item.children)}</div></Panel>;
              })
            }
        </Collapse>
      </div>
    );
  }
}

export default FormElement;