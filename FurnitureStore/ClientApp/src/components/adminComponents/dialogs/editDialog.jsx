import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Image,
  Select,
  Button,
  Upload,
} from "antd";
import { serverUrl } from "../../../config";
import axios from 'axios';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  EyeOutlined 
} from "@ant-design/icons";
import "../../../accests/css/editDialogStyle.css";
const { TextArea } = Input;

const EditDialog = ({
  isOpen,
  onClose,
  project,
  categories,
  onFinish
}) => {

  const [mainImage, setMainImage] = useState(project && project.ProjectImages[0]);
  const [changedImages, setChangedImages] = useState([]);
  const [updatedProject, setUpdatedProject] = useState(project);
  const [defaultFileList, setDefaultFileList] = useState([]);

  const cleanup = () => {
    setDefaultFileList([]);
  };
  
  useEffect(() => {
    if (isOpen && project) {
      setMainImage(project.ProjectImages[0]);
      setUpdatedProject(project);
    }
    else {
    cleanup();
  }
  }, [isOpen, project]);

  const handleImageChange = (info) => {
    const { fileList } = info;
    setChangedImages(fileList);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updatedProject[name] = value;
    setUpdatedProject(updatedProject);
  };

  const handleSelectChange = (value) => {
    updatedProject["CategoryId"] = value;
    setUpdatedProject(updatedProject);
  };

  const handleSubmit = () => {
    onFinish(updatedProject, changedImages);
  };

  function getImageNameFromURL(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  useEffect(() => {
    const fetchDefaultFileList = async () => {
      if (project && project.ProjectImages) {
        const fileList = await Promise.all(project.ProjectImages.map(async (image, index) => {
          const response = await axios.get(image, { responseType: 'blob' });
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const imageName = getImageNameFromURL(image); // Replace this with your own function to extract the image name
          return {
            status: 'done',
            uid: index.toString(), // Convert index to a string to use as a unique key
            thumbUrl: image,
            originFileObj: new File([blob], imageName, { type: 'image/jpeg' }),
          };
        }));
        setDefaultFileList(fileList);
      }
    };

    fetchDefaultFileList();
  }, [project]);

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose();
        cleanup();
      }}
      footer={null}
      title={project && project.Name}
      width={1000}
    >
      <Form labelCol={{ span: 5 }} onFinish={handleSubmit} autoComplete="off">
        <Row>
          <Col span={12}>
            <Image
              width={430}
              src={mainImage}
              preview={false}
              className="mb-3"
            />
            {defaultFileList.length > 0 && (
              <Upload 
                multiple
                accept=".png, .jpeg, .jpg"
                listType="picture-card"
                defaultFileList={defaultFileList}
                onChange={handleImageChange}
                onPreview={(file) => {
                  setMainImage(file.thumbUrl);
                }}
                beforeUpload={() => {
                  return false;
                }}
                className="upload-component"
              >
                <PlusOutlined />
              </Upload>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="Назва">
              <Input
                defaultValue={project && project.Name}
                onChange={handleInputChange}
                name="Name"
              />
            </Form.Item>
            <Form.Item label="Категорія">
              <Select
                name="CategoryId"
                onChange={handleSelectChange}
                defaultValue={{
                  value: project && project.CategoryId,
                  label: project && project.CategoryName,
                }}
              >
                {categories&&categories.map((category, index) => (
                  <Select.Option key={index} value={category.Id}>
                    {category.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Фасад">
              <Input
                defaultValue={project && project.Facade}
                onChange={handleInputChange}
                name="Facade"
              />
            </Form.Item>
            <Form.Item label="Стільниця">
              <Input
                defaultValue={project && project.Tabletop}
                onChange={handleInputChange}
                name="Tabletop"
              />
            </Form.Item>
            <Form.Item label="Матеріали">
              <TextArea
                rows={6}
                defaultValue={project && project.Materials}
                onChange={handleInputChange}
                name="Materials"
              />
            </Form.Item>
            <Form.Item label="Фурнітура">
              <TextArea
                rows={6}
                defaultValue={project && project.Furniture}
                onChange={handleInputChange}
                name="Furniture"
              />
            </Form.Item>
            <Form.Item label="Додатково">
              <TextArea
                rows={6}
                defaultValue={project && project.Features}
                onChange={handleInputChange}
                name="Features"
              />
            </Form.Item>
          </Col>
          <Col span={24} className="d-flex justify-content-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#293b38", borderColor: "#293b38" }}
              >
                Зберегти
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditDialog;
