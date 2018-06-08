import {
  HTTP,
  HTTPS,
  URI_DEV,
  URI_PRO
} from "./utility";

/**
 * 全局配置文件
 */
let baseURL;

let staticUrl = 'http://localhost:3000';

if (process.env.NODE_ENV === 'development') {
  baseURL = HTTP + URI_DEV;
}
else {
  baseURL = HTTP + URI_PRO;
}

export default {staticUrl, baseURL};