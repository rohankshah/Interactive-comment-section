import React, { useState } from "react";
import "./CommentCard.css";

interface ReplyBoxProps {
  currUser: any;
  addComment: any;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ currUser, addComment }) => {
  const [commentBox, setCommentBox] = useState("");

  function handleSubmit() {
    let newComment = {
      id: Math.floor(Math.random() * 10000000),
      content: commentBox,
      createdAt: "10 seconds ago",
      score: 0,
      user: currUser,
      replies: [],
    };
    addComment(newComment);
    setCommentBox("");
  }

  return (
    <div className="comment-container">
      <img
        src={currUser && currUser.image.png}
        alt={currUser && currUser.username}
        className="reply-img"
      />
      <textarea
        rows={4}
        placeholder="Add a comment..."
        className="reply-textbox"
        value={commentBox}
        onChange={(e) => setCommentBox(e.target.value)}
      />
      <button className="reply-button" onClick={() => handleSubmit()}>
        Send
      </button>
    </div>
  );
};

export default ReplyBox;
