import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { xRegister } from '#api';
import { optimizeParam } from '#util';

class RegisterModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleSignModal: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  state = {
    confirmLoading: false,
  };

  fetch = () => {
    const {
      form: { validateFields },
      toggleSignModal,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        xRegister({
          params: optimizeParam(values),
          suc: data => {
            message.success(data.msg);
            toggleSignModal();
          },
          err: data => {
            message.error(data.msg);
          },
          fin: () => {
            this.setState({ confirmLoading: false });
          },
        });
      }
    });
  };

  render() {
    const {
      visible,
      toggleSignModal,
      form: { getFieldDecorator },
    } = this.props;

    const { confirmLoading } = this.state;

    const list = [
      {
        label: '姓名',
        name: 'userName',
      },
      {
        label: '账号',
        name: 'account',
      },
      {
        label: '密码',
        name: 'password',
      },
      {
        label: '重复密码',
        name: 'password2',
      },
    ];

    return (
      <Modal
        visible={visible}
        title={'用户注册'}
        okText='提交'
        onCancel={toggleSignModal}
        onOk={this.fetch}
        confirmLoading={confirmLoading}
      >
        <Form layout='vertical'>
          {list.map(v => {
            const Com = v.name.indexOf('password') === -1 ? <Input /> : <Input.Password />;
            return (
              <Form.Item label={v.label} key={v.name}>
                {getFieldDecorator(v.name, {
                  rules: [{ required: true, message: `请输入${v.label}` }],
                })(Com)}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(RegisterModal);
