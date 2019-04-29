import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Select } from 'antd';

import { xAddCustomer } from '#api';
import { optimizeParam } from '#util';
import { provinces } from '#util';

const { Option } = Select;

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

    validateFields((err, values) => {
      const { handleCancel } = this.props;
      if (!err) {
        this.setState({
          loading: true,
        });
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
      {
        label: '省份',
        name: 'province',
      },
      {
        label: '详细地址',
        name: 'address',
      },
    ];

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form layout='horizontal' {...formItemLayout} onSubmit={this.submit}>
        {list.map(v => {
          if (v.name === 'province') {
            return (
              <Form.Item label={v.label} key={v.name}>
                {getFieldDecorator(v.name, {
                  rules: [{ required: true, message: `请输入${v.label}` }],
                })(
                  <Select>
                    {provinces.map(v => (
                      <Option value={v.name} key={v.name}>
                        {v.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            );
          }
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
