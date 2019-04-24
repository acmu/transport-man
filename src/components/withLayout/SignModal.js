import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { xSignIn } from '#api';
import { optimizeParam } from '#util';

class SignModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleSignModal: PropTypes.func.isRequired,
    handleSigned: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  state = {
    confirmLoading: false,
  };

  fetch = () => {
    const {
      form: { validateFields },
      toggleSignModal,
      handleSigned,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        xSignIn({
          params: optimizeParam(values),
          suc: data => {
            message.success(data.msg);
            toggleSignModal();
            handleSigned();
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
        label: '账号',
        name: 'account',
      },
      {
        label: '密码',
        name: 'password',
      },
    ];

    return (
      <Modal
        visible={visible}
        title={'用户登陆'}
        okText='提交'
        onCancel={toggleSignModal}
        onOk={this.fetch}
        confirmLoading={confirmLoading}
      >
        <Form layout='vertical'>
          {list.map(v => {
            const Com = v.name === 'account' ? <Input /> : <Input.Password />;
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

export default Form.create()(SignModal);
