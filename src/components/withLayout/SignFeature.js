import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Dropdown, Icon, Button } from 'antd';
export default function SignFeature({ isSigned, toggleSignModal, handleSignOut, uName }) {
  const menu = (
    <Menu>
      <Menu.Item onClick={handleSignOut}>
        <Icon type='logout' />
        <span>退出登陆</span>
      </Menu.Item>
    </Menu>
  );

  if (isSigned) {
    return (
      <Dropdown overlay={menu} placement='bottomRight'>
        <a className='ant-dropdown-link' href='#' style={{ margin: '0 8px' }}>
          <Avatar size='small' icon='user' style={{ marginRight: 8 }} />
          <span>{uName}</span>
        </a>
      </Dropdown>
    );
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
  handleSignOut: PropTypes.func.isRequired,
  uName: PropTypes.string,
};
