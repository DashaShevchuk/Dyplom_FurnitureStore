import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getCategoriesListActions from "./reducer";
import * as getProjectsListActions from "./reducer";
import * as sendEmailListActions from "./reducer";

import "../../../accests/css/userHomePageStyle.css";
import girl1 from "../../../accests/images/girl1.svg";
import girl2 from "../../../accests/images/girl2.svg";
import girl3 from "../../../accests/images/girl3.svg";
import girl4 from "../../../accests/images/girl4.svg";
import largeLogo from "../../../accests/images/big logo.svg";
import {
  Typography,
  Button,
  Form,
  Card,
  Popover,
  List,
  Space,
  Input,
  message,
  ConfigProvider,
  Col,
  Row,
  Select,
  Divider,
} from "antd";
import Icon from "@ant-design/icons";
import {
  InstagramOutlined,
  PhoneOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../../../components/userComponents/projectCard";
import Slider from "react-slick";
import InstagramIcon from "../../../accests/images/instagram-icon.png";
import TelegramIcon from "../../../accests/images/telegram-icon.png";
import PhoneIcon from "../../../accests/images/phone-icon.png";

const Option = Select.Option;
const { Title } = Typography;
const { TextArea } = Input;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightCircleOutlined
      className={className}
      style={{
        ...style,
        fontSize: "30px",
        color: "#293b38",
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
        fontSize: "30px",
        color: "#293b38",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}
class UserHomePage extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      const defaultCategory = this.props.categories[0];
      this.setState({ defaultCategory }, () => {
        this.props.getProjects(defaultCategory);
      });
    }
  }
  toProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        transitionDelay: "250ms",
      });
    }
  };
  handleCategoryChange = (value) => {
    this.props.getProjects(value);
  };
  handlePhoneClick = () => {
    const phoneNumber = "+380687639361";
    window.location.href = `tel:${phoneNumber}`;
  };

  render() {
    const { categories, projects } = this.props;

    var settings = {
      dots: false,
      infinite: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 575.98,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 600,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 700,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 800,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 890,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 900,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 1000,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 1100,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
           },
        },
        {
          breakpoint: 1196,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1,
           },
        }
      ],
    };
    const cards =
      projects &&
      projects.map((element, index) => (
        <ProjectCard project={element} key={index} />
      ));
    const servicesList = [
      {
        title: "Проконсультуємо",
      },
      {
        title: "Зробимо заміри",
      },
      {
        title: "Створимо дизайн проект",
      },
      {
        title: "Виготовимо та встановимо меблі",
      },
    ];
    const pricingList = [
      {
        title: "Від обраних матеріалів та фурнітури",
      },
      {
        title: "Від термінів виконання роботи",
      },
      {
        title: "Наявності матеріалів в країні",
      },
      {
        title: "...",
      },
    ];
    return (
      <div>
        <div id="main">
          <div className="image-container">
            <img className="girl1" src={girl1} />
          </div>
          <div className="main-text">
            <Title className="main-titles big-title">
              Все для вашого комфорту
            </Title>
            <Title level={3} className="main-titles">
              Меблі під замовлення
            </Title>
            <div>
              <Button
                type="primary"
                className="to-projects-btn m-3"
                onClick={this.toProjects}
              >
                До проектів
              </Button>
            </div>
          </div>
        </div>
        <div id="pricing">
          <div className="about-us-text">
            <div className="d-flex justify-content-center">
            <Title className="main-titles">Хто ми</Title>
            </div>
            <div className="d-flex justify-content-center">
            <Title level={3} className="about-us">
              Організаця яка зробить ваші меблі з досвідом понад 15 років Понад
              100 розроблених проектів ДОПИСАТЬ НОРМАЛЬНОГО ТЕКСТА
            </Title>
            </div>
          </div>
          <div className="image-container2">
            <img className="large-logo-image" src={largeLogo} />
          </div>
        </div>
        <div id="services">
          <div className="image-container">
            <img className="girl1" src={girl2} />
          </div>
          <div className="services-list">
            <Title className="main-titles">Послуги</Title>
            <List
              itemLayout="horizontal"
              dataSource={servicesList}
              split={false}
              className="mt-3"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<div className="list-index-yellow"></div>}
                    title={
                      <Title level={3} className="main-titles list-item d-flex align-items-center">
                        {item.title}
                      </Title>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div id="projects">
          <div className="title-div">
            <Title className="main-titles">Розробленні проекти</Title>
            <Select
              defaultValue="Кухня"
              bordered={false}
              size="large"
              className="categoriesSelect"
              onChange={this.handleCategoryChange}
             
              style={{
                width: 200,
              }}
            >
              {categories &&
                categories.map((category, index) => (
                  <Option
                    key={index}
                    value={category}
                    
                    style={{
                      background: category === "Кухня" ? "white" : "white",
                    }}
                  >
                    {category}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="slider-div">
            <Slider {...settings}>{cards}</Slider>
          </div>
        </div>
        <div id="pricing">
          <div className="prising-list">
            <Title className="main-titles">Від чого залежить ціна?</Title>
            <List
              itemLayout="horizontal"
              dataSource={pricingList}
              split={false}
              className="mt-3"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<div className="list-index-green"></div>}
                    title={
                      <Title level={3} className="main-titles list-item">
                        {item.title}
                      </Title>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="image-container2">
            <img className="girl3" src={girl3} />
          </div>
        </div>
        <div id="contacts">
          <div className="image-container">
            <img className="girl1" src={girl4} />
          </div>
          <div className="links-text">
            <Title className="main-titles">Як з нами зв'язатися</Title>
            <a
              href="https://www.instagram.com/furniture_mspace/"
              style={{ textDecoration: "none" }}
            >
              <Title level={3} class="link">
                <div className="col-2">
                  <img src={InstagramIcon} />
                </div>{" "}
                @furniture_mspace
              </Title>
            </a>
            <a
              href="#"
              onClick={this.handlePhoneClick}
              style={{ textDecoration: "none" }}
            >
              <Title level={3} class="link">
                <div>
                  <img src={PhoneIcon} />
                </div>{" "}
                +380 68 763 93 61
              </Title>
            </a>
            <a
              href="https://t.me/+380687639361"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Title level={3} class="link">
                <div>
                  <img src={TelegramIcon} />
                </div>{" "}
                +380 68 763 93 61
              </Title>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: get(state, "homePage.list.categories"),
    projects: get(state, "homePage.list.projects"),
    loading: get(state, "homePage.list.loading"),
    failed: get(state, "homePage.list.failed"),
    success: get(state, "homePage.list.success"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(getCategoriesListActions.getCategories());
    },
    getProjects: (filter) => {
      dispatch(getProjectsListActions.getProjects(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);
