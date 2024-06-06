import React from "react";
import { Modal } from "antd";
const DeleteDialog = ({ isOpen, onClose, category, onOk }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={onOk}
      centered
      title="Ви впевненні, що хочете видалити категорію?"
    >
      <p>Ви хочете видалити категоію {category && category.Name}?</p>
    </Modal>
  );
};

export default DeleteDialog;