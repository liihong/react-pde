//引入axios
import axios from 'axios';
import config from './config';
import {ERR_CODE} from './utility';

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = config.baseURL;
//设置默认请求头
const BASE_HEADER = process.env.NODE_ENV === 'development'
  ? {}
  : {
    'X-Requested-With': 'XMLHttpRequest',
  };
axios.defaults.headers = BASE_HEADER;

//请求拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  }
  else {
    promiseArr[config.url] = cancel;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  console.log('请求结束' + new Date().toLocaleTimeString());
  return response
}, err => {
  if (err && err.response) {
    err.message = ERR_CODE[err.response.status] || `${ERR_CODE[0]}${err.response.status}`;
  }
  else {
    err.message = ERR_CODE['fail'];
  }
  console.error(err.message);
  return Promise.resolve(err.response);
});


export default {

  //get请求
  get(url, param) {
    console.log('开始请求' + new Date().toLocaleTimeString());
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },

  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  }
}
