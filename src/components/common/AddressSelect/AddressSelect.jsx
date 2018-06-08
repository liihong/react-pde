import React, {Component} from 'react';
import './AddressSelect.less';
import { Select } from 'antd';
import API from '../../../api/api'
const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class AddressSelect extends Component {
    state = {
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        
      }
      componentWillMount(){
        API.getProvince().then(res =>{
          // this.provinceData = res.result
          console.log(res.result)
          this.setState({
            cities: res.result
          })
        })
      }
      handleProvinceChange = (value) => {
        this.setState({
          cities: cityData[value],
          secondCity: cityData[value][0],
        });
      }
      onSecondCityChange = (value) => {
        this.setState({
          secondCity: value,
        });
      }
      render() {
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
        return (
          <div>
            <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
              {provinceOptions}
            </Select>
            <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
              {cityOptions}
            </Select>
          </div>
        );
      }
}

export default AddressSelect;