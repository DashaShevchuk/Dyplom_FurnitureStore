import React from "react";
import { Modal } from "antd";
const DeleteDialog = ({ isOpen, onClose, project, onOk }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={onOk}
      centered
      title="Ви впевненні, що хочете видалити проект?"
    >
      <p>Ви хочете видалити проект {project && project.Name}?</p>
    </Modal>
  );
};

export default DeleteDialog;