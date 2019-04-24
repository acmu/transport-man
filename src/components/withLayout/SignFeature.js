import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
export default function SignFeature({ isSigned, toggleSignModal }) {
  if (isSigned) {
    return <div>已登录</div>;
  }
  return (
    <div className='header-btns'>
      <Button
        onClick={() =>
          toggleSignModal({
            visible: true,
            signType: false,
          })
        }
      >
        注册
      </Button>
      <Button
        type='primary'
        onClick={() =>
          toggleSignModal({
            visible: true,
            signType: true,
          })
        }
      >
        登陆
      </Button>
    </div>
  );
}

SignFeature.propTypes = {
  isSigned: PropTypes.bool.isRequired,
  toggleSignModal: PropTypes.func.isRequired,
};
