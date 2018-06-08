import Ajax from './ajax';
import {
  SUCCESS,
  URI_SAVE_FORM,
  URI_PROVINCE
} from './utility';

class API {
  /**
   *  用途：保存表单数据
   *  返回status为200表示成功
   *  @method post
   *  @return {promise}
   */
  async saveForm(params = {}) {
    try {
      let result = await Ajax.post(URI_SAVE_FORM, params);
      if (result && result.status === SUCCESS) {
        return result.data;
      }
      else {
        let err = {
          tip: '保存表单数据失败',
          response: result,
          data: params,
          url: '/form/meta/save',
        }
        throw err;
      }
    }
    catch (err) {
      throw err;
    }
  }

  /**
   *  用途：获取地区省份数据
   *  返回status为200表示成功
   *  @method post
   *  @return {promise}
   */
  async getProvince(params = {}) {
    try {
      let result = await Ajax.get(URI_PROVINCE, params);

      if (result && result.status === SUCCESS) {
        return result.data;
      }
      else {
        let err = {
          tip: '保存表单数据失败',
          response: result,
          data: params,
          url: '/form/meta/save',
        }
        throw err;
      }
    }
    catch (err) {
      throw err;
    }
  }
}

export default new API();