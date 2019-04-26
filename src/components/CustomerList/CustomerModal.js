import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomerModal = ({ visible, title, handleCancel, children }) => {
  return (
    <Modal visible={visible} title={`${title}客户`} onCancel={handleCancel} footer={null}>
      {children}
    </Modal>
  );
};

CustomerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.any,
};
export default CustomerModal;
