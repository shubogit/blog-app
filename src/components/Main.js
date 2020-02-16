import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import Blog from "./Blog";

import { getUser } from "../api/storage";
import { getAllBlogs, createBlog } from "../api/blog";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      text: "",
      blogs: []
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handlePost = async e => {
    e.preventDefault();
    const body = {};
    body["text"] = this.state.text;
    body["userId"] = this.state.user.id;
    const response = await createBlog(body);
    if (response.status === 201) {
      const { blogs } = this.state;
      blogs.push(response.data);
      this.setState({ blogs }, () => console.log(this.state));
      this.setState({ text: "" });
    } else {
      window.alert("Something went wrong.");
    }
  };
  fetchBlogs = async () => {
    const blogs = await getAllBlogs(30, 0);
    this.setState({ blogs }, () => console.log(this.state.blogs));
  };
  componentDidMount() {
    const user = getUser().user;
    this.fetchBlogs();
    this.setState({ user });
  }
  render() {
    const { text, blogs } = this.state;
    return (
      <div className="container">
        <Row>
          <Col sm="12" md="8" lg="8">
            <div style={{ padding: "10px 5px" }}>
              <Card
                style={{
                  height: "calc(100vh - 150px)",
                  overflow: "auto",
                  marginBottom: "10px"
                }}
              >
                <CardBody>
                  {blogs.length > 0
                    ? blogs.map((blog, index) => (
                        <Blog key={index} blog={blog} />
                      ))
                    : null}
                </CardBody>
              </Card>
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Pagination>
                  <PaginationItem>
                    <PaginationLink>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>4</PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div> */}
            </div>
          </Col>
          <Col sm="12" md="4" lg="4">
            <div style={{ padding: "10px 5px" }}>
              <Card body>
                <CardTitle>
                  <b>Write something</b>
                </CardTitle>
                <Form onSubmit={this.handlePost}>
                  <Row>
                    <Col sm="12">
                      <Input
                        type="textarea"
                        name="text"
                        id="text"
                        placeholder="A few words..."
                        value={text}
                        onChange={this.handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <div style={{ display: "flex" }}>
                    <Button type="submit">Post</Button>
                  </div>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
