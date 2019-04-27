import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import withLayout from '#components/withLayout';
import { xUpdateUser } from '#api';

class UserInfo extends Component {
  handleSubmit = e => {
    const { userInfo } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        xUpdateUser({
          params: {
            account: userInfo.account,
            ...values,
          },
        });
      }
    });
  };

  render() {
    const { userInfo } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='账号' style={{ textAlign: 'left' }}>
          <span>{userInfo.account}</span>
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('userName', { initialValue: userInfo.userName })(<Input />)}
        </Form.Item>
        <Form.Item label='邮箱'>
          {getFieldDecorator('email', { initialValue: userInfo.email })(<Input />)}
        </Form.Item>
        <Form.Item label='电话'>
          {getFieldDecorator('phone', { initialValue: userInfo.phone })(<Input />)}
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          提交
        </Button>
      </Form>
    );
  }
}

UserInfo.propTypes = {
  form: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default withLayout(Form.create()(UserInfo));
