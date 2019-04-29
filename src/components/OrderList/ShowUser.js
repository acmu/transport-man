import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { xOneUser } from '#api';

export default class ShowUser extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
  };

  state = {
    data: {},
  };

  componentDidMount() {
    const { personId } = this.props;
    xOneUser({
      params: {
        userId: personId,
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
        label: '账号',
        name: 'account',
      },
      {
        label: '姓名',
        name: 'userName',
      },
      {
        label: '邮箱',
        name: 'email',
      },
      {
        label: '电话',
        name: 'phone',
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
