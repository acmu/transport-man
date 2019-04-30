import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Tooltip, Tag } from 'antd';
import { connect } from 'react-redux';

import { xDeleteOrder } from '#api';
import CustomerModal from '../myComponent/CustomerModal';
import ShowCustomer from './ShowCustomer';
import ShowUser from './ShowUser';
import { StatusConfig } from './config';

const formatTime = s => {
  const arr = s.split('/');
  return arr[0] + '年' + arr[1] + '月' + arr[2].split(' ')[0] + '日 ' + arr[2].split(' ')[1];
};

const ftConfig = {
  USER: 0,
  CUSTOMER: 1,
};

class CustomerTable extends Component {
  static propTypes = {
    getOrderList: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    editOrder: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  state = {
    visible: false,
    formType: ftConfig.USER,
    personId: '',
  };

  changeVisible = visible => {
    this.setState({
      visible,
    });
  };

  fetchList = () => {
    const { page } = this.props;
    this.props.getOrderList(page);
  };

  componentDidMount() {
    this.fetchList();
  }

  showPersonInfo = (formType, personId) => {
    this.setState({
      visible: true,
      formType,
      personId,
    });
  };

  get columns() {
    const { userInfo } = this.props;
    const list = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
        render: text => <span style={{ color: 'rgb(248, 115, 27)' }}>{text.slice(0, 6)}</span>,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          return <Tag color={StatusConfig[text].color}>{StatusConfig[text].text}</Tag>;
        },
      },
      {
        title: '配送员',
        dataIndex: 'deliveryUserId',
        key: 'deliveryUserId',
        render: text => {
          const arr = text.split('@');
          return (
            <Tooltip title='点击查看详细信息'>
              <a href='javascript:;' onClick={() => this.showPersonInfo(ftConfig.USER, arr[0])}>
                {arr[1]}
              </a>
            </Tooltip>
          );
        },
      },
      {
        title: '客户姓名',
        dataIndex: 'customerId',
        key: 'customerId',
        render: text => {
          const arr = text.split('@');
          return (
            <Tooltip title='点击查看详细信息'>
              <a href='javascript:;' onClick={() => this.showPersonInfo(ftConfig.CUSTOMER, arr[0])}>
                {arr[1]}
              </a>
            </Tooltip>
          );
        },
      },
      {
        title: '所在位置',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => {
          const tmp = formatTime(new Date(text).toLocaleString());
          return (
            <Tooltip title={tmp}>
              <span>{tmp.slice(5, -3)}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: text => {
          const tmp = formatTime(new Date(text).toLocaleString());
          return (
            <Tooltip title={tmp}>
              <span>{tmp.slice(5, -3)}</span>
            </Tooltip>
          );
        },
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
              <Popconfirm title='你确定要删除吗？' onConfirm={() => this.rowDelete(record.orderId)}>
                <Button icon='delete' type='danger' style={{ marginLeft: 6 }} size='small'>
                  删除
                </Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ];

    if (!userInfo.isAdmin) {
      list.pop();
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
            </Fragment>
          );
        },
      });
    }

    return list;
  }

  rowEdit = record => {
    const { editOrder } = this.props;
    editOrder(record);
  };

  rowDelete = orderId => {
    xDeleteOrder({
      params: { orderId },
    });
    this.fetchList();
  };

  render() {
    const { loading, data, page, onPageChange } = this.props;
    const { visible, formType, personId } = this.state;
    return (
      <Fragment>
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
        <CustomerModal
          visible={visible}
          handleCancel={() => this.changeVisible(false)}
          title={formType === ftConfig.USER ? '配送员信息' : '客户信息'}
        >
          {visible &&
            (formType === ftConfig.USER ? (
              <ShowUser personId={personId} />
            ) : (
              <ShowCustomer personId={personId} />
            ))}
        </CustomerModal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps)(CustomerTable);
