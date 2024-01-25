import React, { Component } from "react";
import * as addProjectListActions from "./reducer";
import * as getCategoriesListActions from "./reducer";
import get from "lodash.get";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Input,
  Typography,
  Upload,
  message,
  Row,
  Col,
  Select,
} from "antd";
import "../../../accests/css/adminPagesStyle.css";
const { Title } = Typography;
const { TextArea } = Input;

class AddProject extends Component {
  formRef = React.createRef();
  
  state = {
    name: "",
    facade: "",
    tabletop: "",
    materials: "",
    furniture: "",
    features: "",
    categoryId: 0,
    categories: [],
    files: [],
  };

  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ categories: this.props.data });
    }
  }

  onImageChange = (info) => {
    const files = info.fileList.map((file) => {
      const newFile = file.originFileObj;
      newFile.uid = file.uid;
      return newFile;
    });
    this.setState({ files });
  };

  onFinish = () => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("categoryId", this.state.categoryId);
    formData.append("facade", this.state.facade);
    formData.append("tabletop", this.state.tabletop);
    formData.append("materials", this.state.materials);
    formData.append("furniture", this.state.furniture);
    formData.append("features", this.state.features);

    for (let i = 0; i < this.state.files.length; i++) {
      formData.append("images", this.state.files[i]);
    }

    this.props.addProject(formData);
    message.success("Проект додано успішно");
    this.formRef.current.resetFields();
    this.setState({ files: [] });
  };

  render() {
    console.log("Categories ", this.props.data );
    return (
      <div className="add-project-main">
        <Form autoComplete="off" onFinish={this.onFinish} ref={this.formRef} labelCol={{ span: 5 }}>
          <Row>
            <Col span={24} className="d-flex justify-content-center ml-4">
              <Title level={3}>Додавання проекту</Title>
            </Col>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Назва"
                rules={[
                  {
                    required: true,
                    message: "Введіть назву!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="category"
                label="Категорія"
                rules={[
                  {
                    required: true,
                    message: "Оберіть категорію!",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    this.setState({ categoryId: value });
                  }}
                >
                  {this.state.categories.map((category) => (
                    <Select.Option key={category.Id} value={category.Id}>
                      {category.Name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="facade"
                label="Фасад"
                rules={[
                  {
                    required: true,
                    message: "Введіть фасад!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  onChange={(e) => {
                    this.setState({ facade: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="tabletop"
                label="Стільниця"
                rules={[
                  {
                    required: true,
                    message: "Введіть стільниця!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  onChange={(e) => {
                    this.setState({ tabletop: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="materials"
                label="Матеріали"
                rules={[
                  {
                    required: true,
                    message: "Введіть матеріали!",
                  },
                ]}
                hasFeedback
              >
                <TextArea
                  rows={4}
                  onChange={(e) => {
                    this.setState({ materials: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="furniture"
                label="Фурнітура"
                rules={[
                  {
                    required: true,
                    message: "Введіть фурнітуру!",
                  },
                ]}
                hasFeedback
              >
                <TextArea
                  rows={4}
                  onChange={(e) => {
                    this.setState({ furniture: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="features"
                label="Додатково"
                rules={[
                  {
                    required: true,
                    message: "Введіть додатково!",
                  },
                ]}
                hasFeedback
              >
                <TextArea
                  rows={4}
                  onChange={(e) => {
                    this.setState({ features: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="images"
                label="Зображення"
                rules={[
                  {
                    required: true,
                    message: "Виберіть зображення!",
                  },
                ]}
              >
                <Upload.Dragger
                  multiple
                  accept=".png, .jpeg, .jpg"
                  listType="picture-card"
                  onChange={this.onImageChange}
                  beforeUpload={() => false}
                  className="upload-list-inline"
                >
                  <p className="ant-upload-text">Перетягніть фото сюди</p>
                  <Button>Натисніть щоб завантажити</Button>
                </Upload.Dragger>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "addProject.list.data"),
    loading: get(state, "addProject.list.loading"),
    failed: get(state, "addProject.list.failed"),
    success: get(state, "addProject.list.success"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(getCategoriesListActions.getCategories());
    },
    addProject: (model) => {
      dispatch(addProjectListActions.addProject(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
