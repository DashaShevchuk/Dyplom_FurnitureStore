import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Image } from "antd";
const { TextArea } = Input;

const ShowMoreDialog = ({ isOpen, onClose, project }) => {
  const [mainImage, setMainImage] = useState(
    project && project.ProjectImages[0]
  );

  useEffect(() => {
    if (isOpen && project) {
      setMainImage(project.ProjectImages[0]);
    }
  }, [isOpen, project]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={project && project.Name}
      width={1000}
      className="dialog"
    >
      <Form labelCol={{ span: 4 }}>
        <Row>
          <Col span={12}>
            <Image //main image
              width={400}
              src={mainImage}
              preview={false}
              className="m-1"
            />
            <Image.PreviewGroup>
              {project &&
                project.ProjectImages.map((image,index) => (
                  <Image
                    key={index}
                    width={100}
                    src={`${image}`}
                    preview={false}
                    onClick={() => setMainImage(image)}
                    className="mt-1 mb-1 mr-1"
                  />
                ))}
            </Image.PreviewGroup>
          </Col>
          <Col span={12}>
            <Form.Item label="Назва">
              <Input value={project && project.Name} />
            </Form.Item>
            <Form.Item label="Категорія">
              <Input value={project && project.CategoryName} />
            </Form.Item>
            <Form.Item label="Фасад">
              <Input value={project && project.Facade} />
            </Form.Item>
            <Form.Item label="Стільниця">
              <Input value={project && project.Tabletop} />
            </Form.Item>
            <Form.Item label="Матеріали">
              <TextArea value={project && project.Materials} />
            </Form.Item>
            <Form.Item label="Фурнітура">
              <TextArea value={project && project.Furniture} />
            </Form.Item>
              <Form.Item label="Додатково">
                <TextArea value={project && project.Features} />
              </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ShowMoreDialog;
