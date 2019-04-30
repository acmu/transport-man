import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Select } from 'antd';
import { connect } from 'react-redux';

import { xUpdateOrder } from '#api';
import { optimizeParam } from '#util';
import { StatusConfig } from './config';

const { Option } = Select;

class EditForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    editItemValue: PropTypes.object.isRequired,
    handleCancel: PropTypes.func.isRequired,
    customerNames: PropTypes.array.isRequired,
    userNames: PropTypes.array.isRequired,
    userInfo: PropTypes.object.isRequired,
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
      const { handleCancel, editItemValue } = this.props;
      if (!err) {
        xUpdateOrder({
          params: {
            orderId: editItemValue.orderId,
            ...optimizeParam(values),
          },
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

  renderAdmin = () => {
    const {
      form: { getFieldDecorator },
      editItemValue,
      customerNames,
      userNames,
    } = this.props;

    const list = [
      {
        label: '商品种类',
        name: 'productCategory',
        required: true,
      },
      {
        label: '所在位置',
        name: 'location',
        required: true,
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
                rules: [{ required: v.required, message: `请输入${v.label}` }],
                initialValue: editItemValue[v.name],
              })(<Input autoComplete='off' />)}
            </Form.Item>
          );
        })}

        <Form.Item label='配送员'>
          {getFieldDecorator('deliveryUserId', {
            rules: [{ required: true, message: `请选择配送员` }],
            initialValue: editItemValue.deliveryUserId,
          })(
            <Select>
              {userNames.map(v => (
                <Option value={`${v.userId}@${v.userName}`} key={v.userId}>
                  {v.userName || v.account}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label='客户'>
          {getFieldDecorator('customerId', {
            rules: [{ required: true, message: `请选择客户` }],
            initialValue: editItemValue.customerId,
          })(
            <Select>
              {customerNames.map(v => (
                <Option value={`${v.customerId}@${v.name}`} key={v.customerId}>
                  {v.name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' htmlType='submit' loading={this.state.loading}>
            提交
          </Button>
        </div>
      </Form>
    );
  };

  renderNormal = () => {
    const {
      form: { getFieldDecorator },
      editItemValue,
      customerNames,
      userNames,
    } = this.props;

    const list = [
      {
        label: '所在位置',
        name: 'location',
        required: true,
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
                rules: [{ required: v.required, message: `请输入${v.label}` }],
                initialValue: editItemValue[v.name],
              })(<Input autoComplete='off' />)}
            </Form.Item>
          );
        })}

        <Form.Item label='订单状态'>
          {getFieldDecorator('status', {
            rules: [{ required: true, message: `请选择订单状态` }],
            initialValue: editItemValue.status,
          })(
            <Select>
              {StatusConfig.map(v => (
                <Option value={v.idx} key={v.idx}>
                  {v.text}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' htmlType='submit' loading={this.state.loading}>
            提交
          </Button>
        </div>
      </Form>
    );
  };

  render() {
    const {
      userInfo: { isAdmin },
    } = this.props;
    return isAdmin ? this.renderAdmin() : this.renderNormal();
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps)(Form.create()(EditForm));
