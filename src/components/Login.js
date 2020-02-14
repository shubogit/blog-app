import React, { Component } from "react";
import {
  Form,
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  Input,
  NavLink
} from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import auth from "../api/auth";
import { getUser } from "../api/storage";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    };
  }

  goToRegister = () => {
    this.props.history.push("/register");
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // api call
    const { email, password } = this.state;
    const body = { email, password };
    const result = await auth.authenticate(body);
    result ? this.props.history.push("/blog") : window.alert("Login Failed");
  };
  componentDidMount() {
    const currentUser = getUser();
    if (currentUser) {
      this.setState({ isLoggedIn: true });
    }
  }
  render() {
    const { email, password, isLoggedIn } = this.state;
    return !isLoggedIn ? (
      <div className="auth-outer">
        <div className="auth-inner">
          <Card body>
            <CardTitle>
              <b>Login</b>
            </CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm="12">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@abc.com"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Button type="submit">Login</Button>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  New User ?
                  <NavLink
                    onClick={this.goToRegister}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Register
                  </NavLink>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    ) : (
      <Redirect to="/blog" />
    );
  }
}

export default withRouter(Login);
