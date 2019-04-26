import React, { Component, Fragment } from 'react';
import withLayout from '#components/withLayout';
import { Button } from 'antd';

import CustomerModal from './CustomerModal';
import AddForm from './AddForm';
import EditForm from './EditForm';
import CustomerTable from './CustomerTable';
import { xListCustomer } from '#api';

const ftConfig = {
  ADD: 0,
  EDIT: 1,
};

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      data: {},
      loading: true,
      pageSize: 5,
      currentPage: 1,
      formType: ftConfig.ADD,
      editItemValue: {},
    };
  }

  changeVisible = visible => {
    this.setState({
      visible,
    });
  };

  addCustomer = () => {
    this.setState({
      formType: ftConfig.ADD,
      visible: true,
    });
  };

  editCustomer = editItemValue => {
    this.setState({
      formType: ftConfig.EDIT,
      visible: true,
      editItemValue,
    });
  };

  getCustomerList = params => {
    this.setState({
      loading: true,
    });
    xListCustomer({
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
    this.getCustomerList(page);
  };

  render() {
    const { visible, loading, data, pageSize, currentPage, formType, editItemValue } = this.state;
    const page = { pageSize, currentPage };
    return (
      <Fragment>
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <Button type='primary' onClick={this.addCustomer}>
            新建客户
          </Button>
        </div>
        <CustomerTable
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
        </CustomerModal>
      </Fragment>
    );
  }
}

export default withLayout(CustomerList);
