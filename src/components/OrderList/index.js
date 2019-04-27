import React, { Component, Fragment } from 'react';
import withLayout from '#components/withLayout';
import { Button } from 'antd';

import CustomerModal from '../myComponent/CustomerModal';
import { xUserName, xCustomerName } from '#api';

class OrderList extends Component {
  state = {
    visible: false,
    userNames: [],
    customerNames: [],
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

  render() {
    /**
     * @todo 新建订单： 已经拿到 用户名 客户名
     */
    const { visible, customerNames, userNames } = this.state;
    return (
      <Fragment>
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <Button type='primary' onClick={this.addOrder}>
            新建订单
          </Button>
        </div>
        <CustomerModal
          visible={visible}
          handleCancel={() => this.changeVisible(false)}
          title={'新建订单'}
        >
          {visible && (
            <p>
              sdf
              {console.log(customerNames, userNames)}
            </p>
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
