import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "../../accests/css/projectDialogStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const { TextArea } = Input;
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightCircleOutlined
      className={className}
      style={{
        ...style,
        zIndex:100,
        color: "#293b38",
        background:"white",
        fontSize: "30px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftCircleOutlined
      className={className}
      style={{
        ...style,
        zIndex:100,
        color: "#293b38",
        background:"white",
        fontSize: "30px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}
const ProjectDialog = ({ isOpen, onClose, project }) => {
  const settings = {
    dots: false,
    className: "center",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  if (project.ProjectImages && project.ProjectImages.length) {
    settings.slidesToShow = Math.min(1, project.ProjectImages.length);
  }

  return (
    // <Modal
    //   open={isOpen}
    //   centered
    //   onCancel={onClose}
    //   footer={null}
    //   title={project && project.Name}
    //   width={1000}
    //   className="dialog"
    // >
    //   <Form labelCol={{ span: 4 }}>
    //     <Row>
    //       <Col span={12}>
    //         <div className="slider-div">
    //       <Slider {...settings}>
    //       {project && project.ProjectImages.map((image, index) => (
    //               <div key={index}>
    //                 <img
    //                   src={image}
    //                 />
    //               </div>
    //             ))}
    //             </Slider>
    //             </div>
    //       </Col>
    //       <Col span={12}>
    //         <Form.Item label="Назва">
    //           <Input value={project && project.Name} />
    //         </Form.Item>
    //         <Form.Item label="Категорія">
    //           <Input value={project && project.CategoryName} />
    //         </Form.Item>
    //         <Form.Item label="Фасад">
    //           <Input value={project && project.Facade} />
    //         </Form.Item>
    //         <Form.Item label="Стільниця">
    //           <Input value={project && project.Tabletop} />
    //         </Form.Item>
    //         <Form.Item label="Матеріали">
    //           <TextArea value={project && project.Materials} />
    //         </Form.Item>
    //         <Form.Item label="Фурнітура">
    //           <TextArea value={project && project.Furniture} />
    //         </Form.Item>
    //         <Form.Item label="Ціна">
    //           <Input value={project && project.Price} prefix="$" suffix="USD" />
    //         </Form.Item>
    //           <Form.Item label="Додатково">
    //             <TextArea value={project && project.Features} />
    //           </Form.Item>
    //       </Col>
    //     </Row>
    //   </Form>
    // </Modal>
    <Modal
      open={isOpen}
      centered
      onCancel={onClose}
      footer={null}
      title={project && project.Name}
      width={1000}
      className="dialog"
    >
      <Form labelCol={{ span: 8 }} className="project-form">
        <Form.Item className="modal-slider-div">
          <Slider {...settings}>
            {project &&
              project.ProjectImages.map((image, index) => (
                <div key={index} className="modal-slider-image-div">
                  <img className="modal-slider-image" src={image} />
                </div>
              ))}
          </Slider>
        </Form.Item>
        <Row className="characteristics">
          <Col>
            <Form.Item label="Назва">
              <Input value={project && project.Name} />
            </Form.Item>
            <Form.Item label="Фасад">
              <Input value={project && project.Facade} />
            </Form.Item>
            <Form.Item label="Фурнітура">
              <TextArea value={project && project.Furniture} />
            </Form.Item>
            <Form.Item label="Ціна">
              <Input value={project && project.Price} suffix="USD" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Категорія">
              <Input value={project && project.CategoryName} />
            </Form.Item>
            <Form.Item label="Стільниця">
              <Input value={project && project.Tabletop} />
            </Form.Item>
            <Form.Item label="Матеріали">
              <TextArea value={project && project.Materials} />
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

export default ProjectDialog;

{
  /* <Image //main image
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
            </Image.PreviewGroup> */
}

// const [mainImage, setMainImage] = useState(
//   project && project.ProjectImages[0]
// );

// useEffect(() => {
//   if (isOpen && project) {
//     setMainImage(project.ProjectImages[0]);
//   }
// }, [isOpen, project]);
