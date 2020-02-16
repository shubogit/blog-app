import React, { Component } from "react";
import { Card, CardText, CardTitle, Collapse } from "reactstrap";
import moment from "moment";

import Comment from "./Comment";
/**
 * PROPS REQUIRED
 * blog: Object, {}
 */
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { blog } = this.props;
    const { isOpen } = this.state;
    return (
      <Card
        style={{
          padding: 10,
          marginBottom: 10,
          textAlign: "left",
          boxShadow: "5px 3px 8px #ccc"
        }}
      >
        <CardTitle style={{ fontSize: 12 }}>
          {blog.userId.firstname + " " + blog.userId.lastname} |{" "}
          {moment(blog.createdAt).fromNow()}
        </CardTitle>
        <CardText style={{ fontSize: 20, fontFamily: "" }}>
          {blog.text}
        </CardText>
        <div
          style={{
            fontSize: 14,
            color: "blue",
            cursor: "pointer"
          }}
          onClick={this.toggle}
        >
          {blog.commentCount > 1
            ? `${blog.commentCount} Comments`
            : blog.commentCount > 0
            ? `${blog.commentCount} Comment`
            : "Be the first to comment"}
        </div>
        <Collapse isOpen={isOpen}>
          <Comment blog={blog} />
        </Collapse>
      </Card>
    );
  }
}

export default Blog;
