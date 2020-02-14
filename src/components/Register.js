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
import { withRouter } from "react-router-dom";
import { registerUser } from "../api/auth";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  }
  goToLogin = () => this.props.history.push("/");
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // api call
    const { firstname, lastname, email, password } = this.state;
    const body = { firstname, lastname, email, password };
    const result = await registerUser(body);
    result
      ? this.props.history.push("/")
      : window.alert("Registration falied, Try Again Later!");
  };
  render() {
    const { firstname, lastname, email, password } = this.state;
    return (
      <div className="auth-outer">
        <div className="auth-inner">
          <Card body>
            <CardTitle>
              <b>Register</b>
            </CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm="12">
                  <Input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
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
              <Button type="submit">Register</Button>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  Already Registered ?
                  <NavLink
                    onClick={this.goToLogin}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Login
                  </NavLink>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Register;
