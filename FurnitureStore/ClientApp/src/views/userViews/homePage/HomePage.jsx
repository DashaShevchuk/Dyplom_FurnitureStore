import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getCategoriesListActions from "./reducer";
import * as getProjectsListActions from "./reducer";
import "../../../accests/css/userHomePageStyle.css";
import girl2 from "../../../accests/images/girl2.svg";
import girl3 from "../../../accests/images/girl3.svg";
import largeLogo from "../../../accests/images/big logo.svg";
import { Typography, Button, List, Select } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../../../components/userComponents/projectCard";
import Slider from "react-slick";
import InstagramIcon from "../../../accests/images/instagram-icon.png";
import TelegramIcon from "../../../accests/images/telegram-icon.png";
import PhoneIcon from "../../../accests/images/phone-icon.png";

const Option = Select.Option;
const { Title } = Typography;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightCircleOutlined
      className={className}
      style={{
        ...style,
        fontSize: "30px",
        color: "#F1C376",
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
        color: "#F1C376",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}
class UserHomePage extends Component {
  state = {
    selectedCategory: " ",
  };
  
  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    const { categories } = this.props;
    
    if (categories !== prevProps.categories) {
      const newSelectedCategory = categories && categories.length > 0 ? categories[0] : null;
      
      if (newSelectedCategory !== this.state.selectedCategory) {
        this.setState({
          selectedCategory: newSelectedCategory,
        }, () => {
          this.props.getProjects(this.state.selectedCategory);
        });
      }
    }

    if (this.state.selectedCategory !== prevState.selectedCategory) {
      this.props.getProjects(this.state.selectedCategory);
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
    this.setState({ selectedCategory: value });
    this.props.getProjects(value);
  };

  handlePhoneClick = () => {
    const phoneNumber = "+380687639361";
    window.location.href = `tel:${phoneNumber}`;
  };

  render() {
    const { categories, projects } = this.props;
    const { selectedCategory } = this.state;
    var settings = {
      dots: false,
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
            slidesToShow: Math.min(2, projects && projects.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: Math.min(2, projects && projects.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: Math.min(2, projects && projects.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1196,
          settings: {
            slidesToShow: Math.min(2, projects && projects.length),
            slidesToScroll: 1,
          },
        },
      ],
    };
    settings.slidesToShow = Math.min(3, projects && projects.length);
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
          <Title className="text-white">Все для вашого комфорту</Title>
          <Title className="title-white">Меблі під замовлення</Title>
          <div>
            <Button
              type="primary"
              className="to-projects-btn"
              onClick={this.toProjects}
            >
              До проектів
            </Button>
          </div>
        </div>
        <div id="aboutUs">
          <div className="about-us-text">
            <Title className="title-black">Хто ми</Title>
            <Title className="text-black">
              Організаця яка зробить ваші меблі з досвідом понад 15 років Понад
              100 розроблених проектів ДОПИСАТЬ НОРМАЛЬНОГО ТЕКСТА
            </Title>
          </div>
          <div className="image-container">
            <img className="big-logo" src={largeLogo} />
          </div>
        </div>

        <div id="projects">
          <Title className="title-white">Розробленні проекти</Title>
          <Select
            value={selectedCategory}
            variant="borderless"
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
                  className="categoriesSelect"
                  style={{
                    background:
                      category === selectedCategory ? "white" : "white",
                  }}
                >
                  {category}
                </Option>
              ))}
          </Select>
          <div className="slider-div">
            <Slider {...settings}>{cards}</Slider>
          </div>
        </div>
        <div id="services">
          <div className="image-container">
            <img className="girl" src={girl2} />
          </div>
          <div className="list-container">
            <Title className="title-black">Послуги</Title>
            <List
              itemLayout="horizontal"
              dataSource={servicesList}
              split={false}
              className="list"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<div className="list-index-yellow"></div>}
                    title={
                      <Title level={3} className="text-black">
                        {item.title}
                      </Title>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div id="pricing">
          <div className="list-container">
            <Title className="title-black">Від чого залежить ціна?</Title>
            <List
              itemLayout="horizontal"
              dataSource={pricingList}
              split={false}
              className="list"
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<div className="list-index-green"></div>}
                    title={
                      <Title level={3} className="text-black">
                        {item.title}
                      </Title>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="image-container">
            <img className="girl" src={girl3} />
          </div>
        </div>
        <div id="contacts">
          <Title className="title-white">Як з нами зв'язатися</Title>
          <a
            href="https://www.instagram.com/furniture_mspace/"
            className="link"
          >
            <Title className="link-text">
              <div>
                <img src={InstagramIcon} />
              </div>{" "}
              @furniture_mspace
            </Title>
          </a>
          <a href="#" onClick={this.handlePhoneClick} className="link">
            <Title className="link-text">
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
            className="link"
          >
            <Title className="link-text">
              <div>
                <img src={TelegramIcon} />
              </div>{" "}
              +380 68 763 93 61
            </Title>
          </a>
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
