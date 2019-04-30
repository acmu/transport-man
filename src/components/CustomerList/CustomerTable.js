import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';

import { xDeleteCustomer } from '#api';

class CustomerTable extends Component {
  static propTypes = {
    getCustomerList: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    editCustomer: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  fetchList = () => {
    const { page } = this.props;
    this.props.getCustomerList(page);
  };

  componentDidMount() {
    this.fetchList();
  }

  get columns() {
    const { userInfo } = this.props;
    const list = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <span style={{ color: '#3498db' }}>{text}</span>,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
    ];
    if (userInfo.isAdmin) {
      list.push({
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
      });
    }
    return list;
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
        rowKey='customerId'
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

const mapStateToProps = ({ userInfo }) => {
  return {
    userInfo,
  };
};

export default connect(mapStateToProps)(CustomerTable);
