import axios from 'axios';

const xFetch = str => ({ params = {}, suc = f => f, err = f => f, fin } = {}) => {
  if (typeof str === 'string') {
    axios
      .get(str, { params })
      .then(res => res.data)
      .then(data => {
        if (data.code === 1) {
          suc(data);
        } else {
          err(data);
        }
      })
      .catch(e => err({ msg: `xFetch prompt: ${e}` }))
      .finally(fin);
    return;
  }

  axios
    .post(str[0], { ...params })
    .then(res => res.data)
    .then(data => {
      if (data.code === 1) {
        suc(data);
      } else {
        err(data);
      }
    })
    .catch(e => err({ msg: `xFetch prompt: ${e}` }))
    .finally(fin);
};

export default xFetch;
