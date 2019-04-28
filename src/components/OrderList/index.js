import React, { Component, Fragment } from 'react';
import withLayout from '#components/withLayout';
import { Button } from 'antd';

import CustomerModal from '../myComponent/CustomerModal';
import { xUserName, xCustomerName, xListOrder } from '#api';
import AddForm from './AddForm';
import OrderTable from './OrderTable';

const ftConfig = {
  ADD: 0,
  EDIT: 1,
};

class OrderList extends Component {
  state = {
    visible: false,
    userNames: [],
    customerNames: [],
    data: {},
    loading: true,
    pageSize: 5,
    currentPage: 1,
    formType: ftConfig.ADD,
    editItemValue: {},
  };

  changeVisible = visible => {
    this.setState({
      visible,
    });
  };

  addOrder = () => {
    this.changeVisible(true);
    xUserName({
      suc: ({ data }) => {
        this.setState({
          userNames: data,
        });
      },
    });
    xCustomerName({
      suc: ({ data }) => {
        this.setState({
          customerNames: data,
        });
      },
    });
  };

  getOrderList = params => {
    this.setState({
      loading: true,
    });
    xListOrder({
      params,
      suc: data => {
        this.setState({
          data: data.data,
          loading: false,
        });
      },
    });
  };

  onPageChange = (currentPage, pageSize) => {
    const page = {
      currentPage,
      pageSize,
    };
    this.setState(page);
    this.getOrderList(page);
  };

  render() {
    const { visible, customerNames, userNames, loading, data, pageSize, currentPage } = this.state;
    const page = { pageSize, currentPage };
    return (
      <Fragment>
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <Button type='primary' onClick={this.addOrder}>
            新建订单
          </Button>
        </div>
        <OrderTable
          getOrderList={this.getOrderList}
          onPageChange={this.onPageChange}
          loading={loading}
          data={data}
          page={page}
          // editOrder={this.editOrder}
        />
        <CustomerModal
          visible={visible}
          handleCancel={() => this.changeVisible(false)}
          title={'新建订单'}
        >
          {visible && (
            <AddForm
              handleCancel={() => this.changeVisible(false)}
              customerNames={customerNames}
              userNames={userNames}
            />
          )}
        </CustomerModal>
        {/* <CustomerTable
          getCustomerList={this.getCustomerList}
          onPageChange={this.onPageChange}
          loading={loading}
          data={data}
          page={page}
          editCustomer={this.editCustomer}
        />
        <CustomerModal
          visible={visible}
          handleCancel={() => this.changeVisible(false)}
          title={formType === ftConfig.ADD ? '新建' : '编辑'}
        >
          {visible &&
            (formType === ftConfig.ADD ? (
              <AddForm
                handleCancel={() => {
                  this.changeVisible(false);
                  this.getCustomerList(page);
                }}
              />
            ) : (
              <EditForm
                editItemValue={editItemValue}
                handleCancel={() => {
                  this.changeVisible(false);
                  this.getCustomerList(page);
                }}
              />
            ))}
        </CustomerModal> */}
      </Fragment>
    );
  }
}

export default withLayout(OrderList);
