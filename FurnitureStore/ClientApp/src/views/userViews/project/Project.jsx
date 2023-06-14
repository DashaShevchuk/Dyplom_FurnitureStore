import React, { Component } from "react";
import * as getListActions from "./reducer";
import get from "lodash.get";
import { connect } from "react-redux";
import "../../../accests/css/projectStyle.css";
import { Form, Input, Row, Col, Image, Typography } from "antd";
const { TextArea } = Input;
const { Title } = Typography;

class Project extends Component {
  state = {
    isLoading: false,
    visible: true,
    mainImage: null,
  };

  componentDidMount() {
    const { match, data } = this.props;
    const { projectId, categoryName } = match.params;
    if (data && data.ProjectImages && data.ProjectImages.length > 0) {
      this.setState({ mainImage: data.ProjectImages[0] });
    }
    const model = {
      ProjectId: projectId,
      CategoryName: categoryName,
    };
    this.props.getProject(model);
  }

  setMainImage = (image) => {
    this.setState({ mainImage: image });
  };

  render() {
    const { mainImage } = this.state;
    const { data } = this.props;
    const mainImagePath =
      mainImage || (data && data.ProjectImages && data.ProjectImages[0]);
    console.log(data);
    return (
      <div className="project-main">
        <Form labelCol={{ xs: 8, sm: 6, md: 6, lg: 4 }}>
          <div className="project-row">
            <Col lg={12} md={11} sm={3}>
              <div className="image-container">
                <Image
                  src={mainImagePath}
                  preview={false}
                  className="m-1 mainImage"
                />
                <Image.PreviewGroup>
                  {data &&
                    data.ProjectImages.map((image, index) => (
                      <Image
                        key={index}
                        src={`${image}`}
                        preview={false}
                        onClick={() => this.setMainImage(image)}
                        className="mt-1 mb-1 mr-1 litle-image"
                      />
                    ))}
                </Image.PreviewGroup>
              </div>
            </Col>
            <Col lg={12} md={11} sm={3}>
              <Form.Item label="Назва">
                <Input value={data && data.Name} bordered={false} />
              </Form.Item>
              <Form.Item label="Категорія">
                <Input value={data && data.CategoryName} bordered={false} />
              </Form.Item>
              <Form.Item label="Фасад">
                <Input value={data && data.Facade} bordered={false} />
              </Form.Item>
              <Form.Item label="Стільниця">
                <Input value={data && data.Tabletop} bordered={false} />
              </Form.Item>
              <Form.Item label="Матеріали">
                <TextArea value={data && data.Materials} bordered={false} />
              </Form.Item>
              <Form.Item label="Фурнітура">
                <TextArea value={data && data.Furniture} bordered={false} />
              </Form.Item>
              <Form.Item label="Додатково">
                <TextArea value={data && data.Features} bordered={false} />
              </Form.Item>
            </Col>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "project.list.data"),
    loading: get(state, "project.list.loading"),
    failed: get(state, "project.list.failed"),
    success: get(state, "project.list.success"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProject: (filter) => {
      dispatch(getListActions.getProject(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);

{
  /* <Form labelCol={{ span: 4 }}>
        <Row>
          <Col span={12}>
            <Image
              width={500}
              src={mainImagePath}
              preview={false}
              className="m-1 mainImage"
            />
            <Image.PreviewGroup>
              {data &&
                data.ProjectImages.map((image,index) => (
                  <Image
                    key={index}
                    width={100}
                    src={`${image}`}
                    preview={false}
                    onClick={() => this.setMainImage(image)}
                    className="mt-1 mb-1 mr-1 litle-image"
                  />
                ))}
            </Image.PreviewGroup>
          </Col>
          <Col span={12}>
            <Form.Item  label="Назва">
              <Input value={data && data.Name}  bordered={false} />
            </Form.Item>
            <Form.Item label="Категорія">
              <Input value={data && data.CategoryName}  bordered={false}/>
            </Form.Item>
            <Form.Item label="Фасад">
              <Input value={data && data.Facade}  bordered={false}/>
            </Form.Item>
            <Form.Item label="Стільниця">
              <Input value={data && data.Tabletop}  bordered={false}/>
            </Form.Item>
            <Form.Item label="Матеріали">
              <TextArea value={data && data.Materials}  bordered={false}/>
            </Form.Item>
            <Form.Item label="Фурнітура">
              <TextArea value={data && data.Furniture}  bordered={false}/>
            </Form.Item>
              <Form.Item label="Додатково">
                <TextArea value={data && data.Features}  bordered={false}/>
              </Form.Item>
          </Col>
        </Row>
      </Form> */
}
