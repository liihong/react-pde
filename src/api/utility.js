//http
export const HTTP = 'http://';

//https
export const HTTPS = 'https://';

// 开发接口
export const URI_DEV = '172.16.2.61:8282/bpm-web';

// 生产地址
export const URI_PRO = '172.16.2.61:8080/bpm-web';

// 表单元数据创建保存接口
export const URI_SAVE_FORM = '/form/meta/save';

// 查询所有省份
export const URI_PROVINCE = '/comp/address/province';

// 查询城市
export const URI_CITY = '/comp/address/city';

// 查询县区
export const URI_AREA = '/comp/address/area';

// 成功状态
export const SUCCESS = 200;

// 错误状态
export const ERR_CODE = {
  0: '连接错误',
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  'fail': '连接到服务器失败'
};