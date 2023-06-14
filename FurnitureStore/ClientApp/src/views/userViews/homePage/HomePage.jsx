import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as getCategoriesListActions from "./reducer";
import * as sendEmailListActions from "./reducer";
import Background1 from "../../../accests/images/img1.jpg";
import Background2 from "../../../accests/images/img2.jpg";
import "../../../accests/css/userHomePageStyle.css";
import {
  Typography,
  Button,
  Form,
  Input,
  message,
  Col,
  Row,
  Select,
} from "antd";
import InputMask from "react-input-mask";
import Loader from "../../../components/loader/loader";
import CategoryCard from "../../../components/userComponents/categoryCard";

const { Title } = Typography;
const { TextArea } = Input;

class UserHomePage extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    category: "",
    note: "",
  };

  componentDidMount() {
    this.props.getCategories();
  }

  sendEmail=()=> {
    const model = {
      Name: this.state.name,
      Email: this.state.email,
      Phone: this.state.phone,
      Category: this.state.category,
      Note: this.state.note,
    };
    this.props.sendEmail(model);
    message.success("Повідомлення надіслано");
  }
  render() {
    const { data } = this.props;
    console.log(data);
    const cards =
      data &&
      data.map((element) => (
        <CategoryCard
          key={element.Id}
          categoryName={element.Name}
          categoryImagePath={element.ImagePath}
        />
      ));
    return (
      <div>
        <div>
          <div
            className="main"
            id="main"
            style={{ backgroundImage: `url(${Background1})` }}
          >
            <Title className="header-white-main">Все для вашого комфорту</Title>
            <Title className="header-white-main" level={4}>
              Меблі на замовлення
            </Title>
          </div>
          <div className="projects" id="projects">
            <div className="title-div">
              <Title className="header-white" level={2}>
                Наші проекти
              </Title>
            </div>
            <div className="container">
              <div className="cards-div">{cards}</div>
            </div>
          </div>
          <div id="services" className="services">
            <div className="title-div">
              <Title className="header-black" level={2}>
                Послуги
              </Title>
            </div>
            <div className="title-div">
              <Title className="header-black" level={4}>
                Наша компанія пропонує весь спектр послуг з виготовлення меблів
                на замовлення, щоб задовольнити всі ваші потреби і вподобання.
                Ось детальніше про наші послуги:
              </Title>
            </div>
            <div className="services-blocks">
              <div className="green-block">
                <Title className="header-white-bold" level={4}>
                  Замір та передпроектна консультація на об’єкті
                </Title>
                <Title className="header-white" level={5}>
                  Наші кваліфіковані фахівці здійснюють замір та передпроектну
                  консультацію на об'єкті для урахування особливостей простору
                  та ваших побажань.
                </Title>
              </div>
              <div className="yellow-block">
                <Title className="header-white-bold" level={4}>
                  Розробка дизайнпроекта та його креслення
                </Title>
                <Title className="header-white" level={5}>
                  Наша команда дизайнерів створює унікальний дизайнпроект, що
                  відповідає вашим вимогам та стилю, з урахуванням вашої участі
                  та індивідуальних пропозицій.
                </Title>
              </div>
              <div className="yellow-block">
                <Title className="header-white-bold" level={4}>
                  Ознайомлення клієнта з матеріалами та фурнітурою
                </Title>
                <Title className="header-white" level={5}>
                  Ми пропонуємо широкий вибір якісних матеріалів та фурнітури,
                  які задовольнять ваші естетичні та функціональні потреби у
                  виготовленні меблів.
                </Title>
              </div>
              <div className="green-block">
                <Title className="header-white-bold" level={4}>
                  Формування вартості виробу
                </Title>
                <Title className="header-white" level={5}>
                  Ми надаємо докладну інформацію про вартість виготовлення
                  меблів на основі вашого дизайнпроекту та вимог, з прозорим
                  розкриттям всіх складових витрат.
                </Title>
              </div>
              <div className="green-block">
                <Title className="header-white-bold" level={4}>
                  Виготовлення та монтаж меблів
                </Title>
                <Title className="header-white" level={5}>
                  Наші майстри виготовляють меблі з високою якістю та уважністю
                  до деталей, використовуючи передові технології та традиційні
                  ремісницькі методи.
                </Title>
              </div>
              <div className="yellow-block">
                <Title className="header-white-bold" level={4}>
                  Гарантійне обслуговування меблів
                </Title>
                <Title className="header-white" level={5}>
                  Ми надаємо гарантію на наші меблі на протязі 2 років і
                  забезпечуємо безкоштовне виправлення будь-яких проблем або
                  несправностей, щоб гарантувати ваше задоволення та тривале
                  використання меблів.
                </Title>
              </div>
            </div>
            <div id="pricing" className="pricing">
              <div className="title-div">
                <Title className="header-black" level={2}>
                  Ціноутворення
                </Title>
              </div>
              <div className="title-div">
                <Title className="header-black" level={4}>
                  Ціноутворення в нашій компанії здійснюється з урахуванням
                  численних факторів, що впливають на вартість меблів на
                  замовлення. Перш за все, для точного визначення ціни необхідно
                  провести детальну розробку дизайнпроекту, остаточне погодження
                  розмірів, матеріалів та фурнітури.
                </Title>
              </div>
              <div className="pricing-blocks">
                <div className="yellow-block">
                  <Title level={5} className="header-white">
                    Ми враховуємо побажання та вимоги клієнта, а також інші
                    фактори, такі як терміни виконання, особливості приміщення
                    та використання ексклюзивних матеріалів. Після узгодження
                    всіх цих аспектів точно визначається ціна нашої продукції.
                  </Title>
                </div>
                <div className="row-pricing-blocks">
                  <div className="green-block">
                    <Title level={5} className="header-white">
                      Зважаючи на складність та індивідуальність кожного
                      проекту, попередня ціна на початковому етапі є
                      орієнтовною. Для точної ціни проводиться детальний
                      розрахунок, враховуючи всі специфічні деталі та умови
                      виконання замовлення.
                    </Title>
                  </div>
                  <div className="green-block">
                    <Title level={5} className="header-white">
                      Наша мета - забезпечити прозоре ціноутворення та чітке
                      уявлення клієнта про вартість своїх меблів. Ми надаємо
                      детальну інформацію про кожен етап ціноутворення,
                      розкриваємо складові витрат і надаємо прозорий розрахунок,
                      щоб клієнт був впевнений у відповідності ціни до своїх
                      меблів.
                    </Title>
                  </div>
                </div>
                <div className="yellow-block">
                  <Title level={5} className="header-white">
                    Важливо зазначити, що остаточна ціна на меблі під замовлення
                    буде визначена після уточнення всіх деталей проекту та
                    погодження замовлення. Ми завжди готові надати додаткову
                    інформацію та консультацію з питань ціноутворення, щоб
                    допомогти нашим клієнтам прийняти відповідні рішення
                    стосовно своїх меблевих потреб.
                  </Title>
                </div>
              </div>
            </div>
            <div
              className="contacts"
              id="contacts"
              style={{ backgroundImage: `url(${Background2})` }}
            >
              <div className="title-div">
                <Title className="header-white-bold" level={2}>
                  Зворотній зв'язок
                </Title>
              </div>
              <div>
                <Form
                  name="contactForm"
                  className="contactForm"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={this.sendEmail}
                  labelCol={{
                    span: 20,
                  }}
                  wrapperCol={{
                    span: 25,
                  }}
                  initialValues={{
                    size: "large",
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <Title level={5} className="header-white">
                        Напишіть нам
                      </Title>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="name"
                        label={
                          <label style={{ color: "white" }}>Ваше ім'я</label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Поле не може бути пустим",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label={<label style={{ color: "white" }}>Email</label>}
                        rules={[
                          {
                            required: true,
                            message: "Поле не може бути пустим",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label={
                          <label style={{ color: "white" }}>
                            Ваш номер телефону
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Поле не може бути пустим",
                          },
                        ]}
                      >
                        <InputMask
                          mask="+38 (999) 999-9999"
                          value={this.state.phone}
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                          }}
                        >
                          {(inputProps) => <Input {...inputProps} />}
                        </InputMask>
                      </Form.Item>
                      <Form.Item
                        name="category"
                        label={
                          <label style={{ color: "white" }}>
                            Який проект вас цікавть?
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Поле не може бути пустим",
                          },
                        ]}
                      >
                        <Select
                          onChange={(value) => {
                            this.setState({ category: value });
                          }}
                        >
                          {data &&
                            data.map((category) => (
                              <Select.Option
                                key={category.Id}
                                value={category.Name}
                              >
                                {category.Name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="note"
                        label={
                          <label style={{ color: "white" }}>Примітка</label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Поле не може бути пустим",
                          },
                        ]}
                      >
                        <TextArea
                          rows={4}
                          onChange={(e) => {
                            this.setState({ note: e.target.value });
                          }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            background: "#F1C376",
                            borderColor: "#F1C376",
                          }}
                        >
                          Надіслати
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "homePage.list.data"),
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
    sendEmail: (model) => {
      dispatch(sendEmailListActions.sendEmail(model));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);
