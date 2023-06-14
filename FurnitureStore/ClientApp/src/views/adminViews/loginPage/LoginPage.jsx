import React, { Component } from "react";
import { connect } from "react-redux";
import * as loginActions from "./reducer";
import get from "lodash.get";
import PropTypes from "prop-types";
import { Typography, Button, Form, Input, message } from "antd";
import Background from "../../../accests/images/img3.jpg";
import "../../../accests/css/loginPageStyle.css";
import Loader from "../../../components/loader/loader";

const { Title } = Typography;

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    errorsServer: "",
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    const { failed } = this.props;

    if (failed && !prevProps.failed) {
      this.setState({ isLoading: false });
      message.error("Неправильний логін або пароль", 3);
    }
  }

  onSubmitForm = () => {
    const { email, password } = this.state;
    console.log("onSubmitForm", this.state);

    this.setState({ isLoading: true });
    const model = {
      email: email,
      password: password,
    };

    this.props.login(model, this.props.history);
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div>
         <Loader isLoading={isLoading} />
        <div
          className="main"
          style={{ backgroundImage: "url(" + Background + ")" }}
        >
            <Form
              name="loginForm"
              layout="vertical"
              autoComplete="off"
              onFinish={this.onSubmitForm}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 25,
              }}
              initialValues={{
                size: "large",
              }}
            >
              <Title level={3} className="header">
                Введіть логін і пароль
              </Title>
              <Form.Item
                name="login"
                label={<label style={{ color: "white" }}>Логін</label>}
                rules={[
                  {
                    required: true,
                    message: "Введіть логін!",
                  },
                  {
                    whitespace: true,
                    message: "Поле не може бути пустим",
                  },
                ]}
                hasFeedback
              >
                <Input
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={<label style={{ color: "white" }}>Пароль</label>}
                rules={[
                  {
                    required: true,
                    message: "Введіть пароль!",
                  },
                  {
                    whitespace: true,
                    message: "Поле не може бути пустим",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-100">
                  Увійти
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes =
{
  login: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    loading: get(state, 'login.post.loading'),
    failed: get(state, 'login.post.failed'),
    success: get(state, 'login.post.success'),
    errors: get(state, 'login.post.errors')
  }
}

const mapDispatchToProps = {
  login: (model, history) => {
    return loginActions.login(model, history);
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
