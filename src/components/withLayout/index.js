import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

import SignModal from './SignModal';
import RegisterModal from './RegisterModal';
import SignFeature from './SignFeature';
import './style.less';

const { Header, Content, Sider } = Layout;

function withLayout(WrappedComponent) {
  class WithLayout extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      let key = 0;
      /**
       * @todo menu 到 url 双向映射 ✔️
       */
      this.MenuList.map(v => v[2]).forEach((v, idx) => {
        if (v === props.location.pathname) {
          key = idx;
        }
      });

      this.state = {
        slKeys: [String(key)],
        isSigned: false, // 应在 rx 中
        visible: false, // modal 显示
        signType: false, // 登陆类型
      };
    }

    get MenuList() {
      return [
        ['home', '主页', '/'],
        ['user', '个人信息', '/userinfo'],
        ['file-text', '订单列表', '/orderlist'],
      ];
    }

    onMenuItemClick = ({ key }) => {
      const {
        history: { push },
      } = this.props;
      push(this.MenuList[key][2]);

      this.setState({
        slKeys: [key],
      });
    };

    handleSigned = (isSigned = true) => {
      this.setState({
        isSigned,
      });
    };

    toggleSignModal = ({ visible = false, signType } = {}) => {
      this.setState({
        visible,
      });
      if (visible) {
        this.setState({
          signType,
        });
      }
    };

    render() {
      const { slKeys, visible, signType, isSigned } = this.state;

      return (
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div
              style={{
                height: 32,
                lineHeight: '32px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: 16,
                color: '#1e93ff',
                borderRadius: 99,
              }}
            >
              <p style={{ textAlign: 'center' }}>物 流 系 统</p>
            </div>
            <Menu theme='dark' mode='inline' selectedKeys={slKeys} onClick={this.onMenuItemClick}>
              {this.MenuList.map((v, i) => (
                <Menu.Item key={i}>
                  <Icon type={v[0]} />
                  <span className='nav-text' to={v[2]}>
                    {v[1]}
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header
              style={{
                background: '#fff',
                padding: '0 20px',
                display: 'flex',
              }}
            >
              <div style={{ flex: 1 }}>
                <span>{this.MenuList[slKeys][1]}</span>
              </div>
              <SignFeature toggleSignModal={this.toggleSignModal} isSigned={isSigned} />
            </Header>
            <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                <WrappedComponent {...this.props} />
              </div>
            </Content>
          </Layout>
          {signType ? (
            <SignModal
              visible={visible}
              toggleSignModal={this.toggleSignModal}
              handleSigned={this.handleSigned}
            />
          ) : (
            <RegisterModal
              visible={visible}
              toggleSignModal={this.toggleSignModal}
              handleSigned={this.handleSigned}
            />
          )}
        </Layout>
      );
    }
  }

  WithLayout.displayName = `WithLayout(${getDisplayName(WrappedComponent)})`;
  return WithLayout;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withLayout;
