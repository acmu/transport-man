import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message } from 'antd';

import { xAddCustomer } from '#api';
import { optimizeParam } from '#util';

class AddForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    handleCancel: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  submit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    this.setState({
      loading: true,
    });

    validateFields((err, values) => {
      const { handleCancel } = this.props;
      if (!err) {
        xAddCustomer({
          params: optimizeParam(values),
          suc: data => {
            this.setState({
              loading: false,
            });
            message.success(data.msg);
            handleCancel();
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const list = [
      {
        label: '姓名',
        name: 'name',
      },
      {
        label: '电话',
        name: 'phone',
      },
    ];

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form layout='horizontal' {...formItemLayout} onSubmit={this.submit}>
        {list.map(v => {
          return (
            <Form.Item label={v.label} key={v.name}>
              {getFieldDecorator(v.name, {
                rules: [{ required: true, message: `请输入${v.label}` }],
              })(<Input autoComplete='off' />)}
            </Form.Item>
          );
        })}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' htmlType='submit' loading={this.state.loading}>
            提交
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
