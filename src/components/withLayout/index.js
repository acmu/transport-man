import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Sider } = Layout;

function withLayout(WrappedComponent) {
  class WithLayout extends Component {
    state = {
      slKeys: ['1'],
    };

    onMenuItemClick = target => {
      console.log(target);
    };

    render() {
      const { slKeys } = this.state;
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
                background: 'rgba(255, 255, 255, 0.2)',
                margin: 16,
              }}
            >
              物流系统
            </div>
            <Menu theme='dark' mode='inline' selectedKeys={slKeys} onClick={this.onMenuItemClick}>
              <Menu.Item key='1'>
                <Icon type='user' />
                <span className='nav-text'>nav 1</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='video-camera' />
                <span className='nav-text'>nav 2</span>
              </Menu.Item>
              <Menu.Item key='3'>
                <Icon type='upload' />
                <span className='nav-text'>nav 3</span>
              </Menu.Item>
              <Menu.Item key='4'>
                <Icon type='bar-chart' />
                <span className='nav-text'>nav 4</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
              <WrappedComponent {...this.props} />
            </Content>
          </Layout>
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
