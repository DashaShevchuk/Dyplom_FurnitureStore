import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Col, Button } from "antd";
import "../../../../accests/css/editDialogStyle.css";

const EditDialog = ({ isOpen, onClose, category, onFinish }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category&&category);

  useEffect(() => {
    setUpdatedCategory(category&&category);
  }, [category&&category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onFinish(updatedCategory);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      centered
      footer={null}
      title={"Редагувати категорію"}
      width={500}
    >
      <Form labelCol={{ span: 8 }} onFinish={handleSubmit}>
        <Col span={18} style={{ margin: "auto" }}>
          <Form.Item label="Назва категорії" style={{ textAlign: "center" }}>
            <Input
              value={updatedCategory&&updatedCategory.Name}
              onChange={handleInputChange}
              name="Name"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
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

export default EditDialog;
