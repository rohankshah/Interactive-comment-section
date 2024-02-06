import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import "./CommentCard.css";

interface CommentCardProps {
  comment: any;
  currUser: any;
  changeScore: any;
  addReply: any;
  openModal: any;
  editExistingComment: any;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  currUser,
  changeScore,
  addReply,
  openModal,
  editExistingComment,
}) => {
  const [toggleReply, setToggleReply] = useState(false);
  const [commentBox, setCommentBox] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [editCommentState, setEditCommentState] = useState("");

  function handleSubmit() {
    let newComment = {
      id: Math.floor(Math.random() * 10000000),
      content: commentBox,
      createdAt: "10 seconds ago",
      score: 0,
      user: currUser,
      replies: [],
    };
    addReply(comment.id, newComment);
    setToggleReply(false);
  }

  function upvote(id: number) {
    changeScore(id, "upvote");
  }

  function downvote(id: number) {
    changeScore(id, "downvote");
  }

  function editComment() {
    setEditToggle(true);
    setEditCommentState(comment.content);
  }

  function updateComment() {
    editExistingComment(comment.id, editCommentState);
    setEditToggle(false);
  }

  return (
    <div>
      <div className="comment-container" key={comment.id}>
        {/* Upvotes */}
        <div className="comment-score grayishBlue score">
          <img
            className="pointer noselect"
            src="./images/icon-plus.svg"
            alt="iconPlus"
            onClick={() => upvote(comment.id)}
          />
          <div className="moderateBlue">{comment.score}</div>
          <img
            className="pointer noselect"
            src="./images/icon-minus.svg"
            alt="iconMinus"
            onClick={() => downvote(comment.id)}
          />
        </div>

        {/* Comment Body */}
        <div className="flex width100">
          {/* Name and reply */}
          <div className="comment-top">
            <div className="comment-top-left">
              <img
                src={comment.user.image.png}
                alt={comment.user.username}
                className="comment-img"
              />
              <span className="darkBlue comment-username">
                {comment.user.username}
              </span>
              <div
                className={
                  comment.user.username === currUser.username
                    ? "you-badge"
                    : "you-badge hidden"
                }
              >
                you
              </div>
              <span className="created-at grayishBlue">
                {comment.createdAt}
              </span>
            </div>
            {comment.user.username === currUser.username ? (
              <div className="editDelete-button">
                <DeleteButton openModal={openModal} commentId={comment.id} />
                <EditButton editComment={editComment} />
              </div>
            ) : (
              <div
                className="reply-container pointer noselect"
                onClick={() => setToggleReply(!toggleReply)}
              >
                <img src="./images/icon-reply.svg" alt="iconReply" />{" "}
                <span className="moderateBlue">Reply</span>
              </div>
            )}
          </div>

          {/* Comment content */}
          {editToggle ? (
            <div className="edit-container">
              <textarea
                rows={4}
                placeholder="Add a comment..."
                className="reply-textbox width100"
                onChange={(e) => setEditCommentState(e.target.value)}
                value={editCommentState}
              />
              <button
                onClick={() => updateComment()}
                className="reply-button fitWidth"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="grayishBlue">{comment.content}</div>
          )}
        </div>
      </div>

      {/* Reply box */}
      {toggleReply && (
        <div className="comment-container">
          <img
            src={currUser.image.png}
            alt={currUser.username}
            className="reply-img"
          />
          <textarea
            rows={4}
            placeholder="Add a comment..."
            className="reply-textbox"
            onChange={(e) => setCommentBox(e.target.value)}
          />
          <button onClick={() => handleSubmit()} className="reply-button">
            Send
          </button>
        </div>
      )}

      {/* Render nested comments */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="nested-comments-container">
          <div className="nested-comments-line"></div>
          <div className="nested-comments">
            {comment.replies.map((reply: any) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                currUser={currUser}
                changeScore={changeScore}
                addReply={addReply}
                openModal={openModal}
                editExistingComment={editExistingComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
