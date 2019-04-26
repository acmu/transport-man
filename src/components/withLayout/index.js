import React, { Component } from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignModal from './SignModal';
import RegisterModal from './RegisterModal';
import SignFeature from './SignFeature';
import { xSignOut, xCheckSign } from '#api';
import { userAction } from '#flux/user';
import ShouldSign from '#components/ShouldSign';

import './style.less';

const { Header, Content, Sider } = Layout;

function withLayout(WrappedComponent) {
  class WithLayout extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      changeUserInfo: PropTypes.func.isRequired,
      userInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      let key = 0;
      // menu 到 url 双向映射 ✔️
      this.MenuList.map(v => v[2]).forEach((v, idx) => {
        if (v === props.location.pathname) {
          key = idx;
        }
      });

      this.state = {
        slKeys: [String(key)],
        visible: false, // modal 显示
        signType: false, // 登陆类型
        loading: true,
      };
    }

    userSignIn = data => {
      const { changeUserInfo } = this.props;
      changeUserInfo({ ...data.data, isSigned: true });
    };

    componentDidMount() {
      xCheckSign({
        suc: data => {
          this.userSignIn(data);
        },
        err: () => {
          this.changeSign(false);
        },
        fin: () => {
          this.setState({
            loading: false,
          });
        },
      });
    }

    get MenuList() {
      return [
        ['home', '主页', '/'],
        ['user', '个人信息', '/userinfo'],
        ['file-text', '订单列表', '/orderlist'],
        ['team', '客户列表', '/customerlist'],
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

    changeSign = (isSigned = true) => {
      const { changeUserInfo } = this.props;
      changeUserInfo({ isSigned });
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

    handleSignOut = () => {
      xSignOut({
        suc: () => this.changeSign(false),
      });
    };

    btnTt = () => {};

    render() {
      const { slKeys, visible, signType, loading } = this.state;
      const { userInfo } = this.props;
      const { isSigned } = userInfo;

      return (
        <Spin spinning={loading} tip='加载中 ...' style={{ height: '100%', width: '100%' }}>
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
            <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
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
                <SignFeature
                  toggleSignModal={this.toggleSignModal}
                  isSigned={isSigned}
                  uName={userInfo.userName || userInfo.account}
                  handleSignOut={this.handleSignOut}
                />
              </Header>
              <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                  {isSigned ? <WrappedComponent {...this.props} /> : <ShouldSign />}
                </div>
              </Content>
            </Layout>
            {signType ? (
              isSigned ? null : (
                <SignModal
                  visible={visible}
                  toggleSignModal={this.toggleSignModal}
                  changeSign={this.changeSign}
                  userSignIn={this.userSignIn}
                />
              )
            ) : isSigned ? null : (
              <RegisterModal visible={visible} toggleSignModal={this.toggleSignModal} />
            )}
          </Layout>
        </Spin>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      userInfo: state.userInfo,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      changeUserInfo: userData => dispatch(userAction(userData)),
    };
  };

  WithLayout.displayName = `WithLayout(${getDisplayName(WrappedComponent)})`;
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithLayout);
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withLayout;
