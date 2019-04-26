import axios from 'axios';
import { message } from 'antd';

const processData = (prom, m, suc, err, fin) => {
  prom
    .then(res => res.data)
    .then(data => {
      /* eslint-disable */
      console.group('X-FETCH', data.code === 1 ? '✔️' : `❌ ${data.msg}`);
      console.log(data.data);
      console.groupEnd();
      /* eslint-enable */

      if (data.code === 1) {
        suc(data);
      } else {
        err(data);
      }
    })
    .catch(e => message.error({ msg: `${m} xFetch :( ${e}` }))
    .finally(fin);
};

const xFetch = str => ({
  params = {},
  suc = v => message.success(v.msg),
  err = e => message.error(e.msg),
  fin = f => f,
} = {}) => {
  if (typeof str === 'string') {
    processData(axios.get(str, { params }), 'GET', suc, err, fin);
    return;
  }
  processData(axios.post(str[0], { ...params }), 'POST', suc, err, fin);
};

export default xFetch;
