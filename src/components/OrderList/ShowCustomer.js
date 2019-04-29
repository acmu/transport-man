import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { xOneCustomer } from '#api';

export default class ShowCustomer extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
  };

  state = {
    data: {},
  };

  componentDidMount() {
    const { personId } = this.props;
    xOneCustomer({
      params: {
        customerId: personId,
      },
      suc: data => {
        this.setState({ data: data.data });
      },
    });
  }

  render() {
    const { data } = this.state;
    const showItem = [
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
      {
        label: '邮箱',
        name: 'email',
      },
    ];
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
    return (
      <Form {...formItemLayout}>
        {showItem.map(v => {
          return (
            <Form.Item label={v.label} key={v.name} style={{ textAlign: 'left', margin: 0 }}>
              <span>{data[v.name] || '无'}</span>
            </Form.Item>
          );
        })}
      </Form>
    );
  }
}
