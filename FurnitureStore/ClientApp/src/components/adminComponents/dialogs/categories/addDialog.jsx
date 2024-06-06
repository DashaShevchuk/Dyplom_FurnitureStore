import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Col, Button } from "antd";
import "../../../../accests/css/editDialogStyle.css";

const AddDialog = ({ isOpen, onClose, onFinish }) => {
  const [newCategoryName, setNewCategoryName] = useState(" ");

  useEffect(() => {
    setNewCategoryName(newCategoryName);
  }, [newCategoryName]);

  const handleInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    onFinish(newCategoryName);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose();
      }}
      centered
      footer={null}
      title={"Додати категорію"}
      width={500}
    >
       <Form labelCol={{ span: 8 }} onFinish={handleSubmit}>
        <Col span={18} style={{ margin: "auto" }}>
          <Form.Item label="Назва категорії" style={{ textAlign: "center"}}>
            <Input
              value={newCategoryName}
              onChange={handleInputChange}
              name="Name"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#293b38", borderColor: "#293b38" }}
            >
              Зберегти
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};

export default AddDialog;
