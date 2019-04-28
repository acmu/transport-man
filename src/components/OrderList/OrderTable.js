import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';

import { xDeleteCustomer } from '#api';

export default class CustomerTable extends Component {
  static propTypes = {
    getOrderList: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    // editCustomer: PropTypes.func.isRequired,
  };

  fetchList = () => {
    const { page } = this.props;
    this.props.getOrderList(page);
  };

  componentDidMount() {
    this.fetchList();
  }

  /**
   * @todo 多表查询  https://juejin.im/post/5a49e5ccf265da430d585cfd
   *
   * http://ghmagical.com/article/page/id/1NSGRZGU93cy
   */

  get columns() {
    return [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
        render: text => <span style={{ color: '#3498db' }}>{text}</span>,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '配送员',
        dataIndex: 'deliveryUserId',
        key: 'deliveryUserId',
      },
      {
        title: '客户姓名',
        dataIndex: 'customerId',
        key: 'customerId',
      },
      {
        title: '所在位置',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '商品种类',
        dataIndex: 'productCategory',
        key: 'productCategory',
      },
      {
        title: '操作',
        dataIndex: 'name',
        key: 'operate',
        render: (_, record) => {
          return (
            <Fragment>
              <Button icon='edit' type='dashed' onClick={() => this.rowEdit(record)} size='small'>
                编辑
              </Button>
              <Popconfirm
                title='你确定要删除吗？'
                onConfirm={() => this.rowDelete(record.customerId)}
              >
                <Button icon='delete' type='danger' style={{ marginLeft: 6 }} size='small'>
                  删除
                </Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ];
  }

  rowEdit = record => {
    const { editCustomer } = this.props;
    editCustomer(record);
  };

  rowDelete = customerId => {
    xDeleteCustomer({
      params: { customerId },
    });
    this.fetchList();
  };

  render() {
    const { loading, data, page, onPageChange } = this.props;
    return (
      <Table
        loading={loading}
        columns={this.columns}
        dataSource={data.arr}
        rowKey='orderId'
        pagination={{
          total: data.total,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          defaultCurrent: 1,
          pageSizeOptions: ['5', '10', '20'],
          defaultPageSize: page.pageSize,
          current: page.currentPage,
          onChange: onPageChange,
          onShowSizeChange: onPageChange,
        }}
      />
    );
  }
}
