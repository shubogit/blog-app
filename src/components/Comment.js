import React, { Component } from "react";
import {
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import moment from "moment";
import { getAllCommentsByBlogId, addCommentToBlog } from "../api/comment";
import { getUser } from "../api/storage";

import CommentContent from "./CommentContent";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      comments: [],
      content: ""
    };
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSend = async e => {
    e.preventDefault();
    const blogId = this.props.blog._id;
    const body = {};
    body["type"] = "comment";
    body["content"] = this.state.content;
    body["userId"] = this.state.currentUser.id;
    const response = await addCommentToBlog(body, blogId);
    if (response.status === 201) {
      const { comments } = this.state;
      comments.push(response.data);
      this.setState({ comments });
    } else {
      window.alert("Something went wrong");
    }
  };
  handleReply = commentId => {
    console.log(commentId);
  };
  fetchComments = async id => {
    const response = await getAllCommentsByBlogId(id);
    this.setState({ comments: [...response.comments] }, () =>
      console.log(this.state.comments)
    );
  };
  fetchUser = async () => {
    const data = await getUser();
    this.setState({ currentUser: { ...data.user } });
  };
  componentDidMount() {
    // console.log(this.props);
    this.fetchUser();
    this.fetchComments(this.props.blog._id);
  }
  render() {
    const { comments, content, currentUser } = this.state;

    return (
      <div style={{ margin: "10px 0px" }}>
        {comments.length > 0
          ? comments.map((comment, index) => (
              <CommentContent
                key={index}
                comment={comment}
                currentUser={currentUser}
                onReplyClick={commentId => this.handleReply(commentId)}
              />
            ))
          : "No Comments"}
        <InputGroup>
          <Input
            type="text"
            id={this.props.blog._id}
            name="content"
            value={content}
            onChange={this.handleChange}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={this.handleSend}>
              Send
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Comment;
