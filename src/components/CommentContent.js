import React from "react";
import moment from "moment";

const CommmentContent = props => {
  const { comment, currentUser } = props;
  const handleReply = commentId => {
    props.onReplyClick(commentId);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        margin: "5px 0px",
        width: "100%",
        overflow: "auto"
      }}
    >
      <div style={{}}>{comment.content}</div>
      <div style={{ fontSize: 12, marginLeft: "10px" }}>
        {currentUser.id === comment.userId._id
          ? "You"
          : comment.userId.firstname + " " + comment.userId.lastname}{" "}
        | {moment(comment.created).fromNow()}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: "blue",
          cursor: "pointer",
          marginLeft: "auto"
        }}
        onClick={() => handleReply(comment._id)}
      >
        Reply
      </div>
    </div>
  );
};

export default CommmentContent;
