import React, { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import ReplyBox from "./components/ReplyBox";
import DeleteModal from "./components/DeleteModal";
import data from "./data/data.json";
import "./App.css";

function findCommentById(comments: any, id: number) {
  for (let comment of comments) {
    if (comment.id === id) {
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const foundReply: any = findCommentById(comment.replies, id);
      if (foundReply) {
        return foundReply;
      }
    }
  }
}

function App() {
  const [jsonData, setJsonData] = useState<any>({});
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteCommentSelect, setDeleteCommentSelect] = useState(-1);

  useEffect(() => {
    setJsonData(data);
  }, [data]);

  function changeScore(id: number, type: string) {
    let tempData = { ...jsonData };
    let foundReply = findCommentById(tempData.comments, id);

    if (type === "upvote") {
      foundReply.score += 1;
    } else {
      foundReply.score -= 1;
    }
    setJsonData(tempData);
  }

  function addReply(id: number, newComment: any) {
    let tempData = { ...jsonData };
    let parentComment = findCommentById(tempData.comments, id);
    console.log(parentComment);
    parentComment.replies.push(newComment);
    setJsonData(tempData);
  }

  function addComment(newComment: any) {
    let tempData = { ...jsonData };
    tempData.comments.push(newComment);
    setJsonData(tempData);
  }

  function openModal(commentId: number) {
    setDeleteCommentSelect(commentId);
    setToggleModal(true);
  }

  function closeModal() {
    setToggleModal(false);
  }

  function deleteComment() {
    let tempData = { ...jsonData };
    let updatedComments = tempData.comments.map((comment: any) => {
      if (comment.id === deleteCommentSelect) {
        return undefined;
      } else {
        let updatedReplies = comment.replies.filter(
          (reply: any) => reply.id !== deleteCommentSelect
        );
        if (updatedReplies.length !== comment.replies.length) {
          return { ...comment, replies: updatedReplies };
        } else {
          return comment;
        }
      }
    });
    tempData = {
      ...tempData,
      comments: updatedComments.filter((ele: any) => ele !== undefined),
    };
    setJsonData(tempData);
    setDeleteCommentSelect(-1);
    setToggleModal(false);
  }

  function editExistingComment(id: number, value: string) {
    console.log(id, value);
    let tempData = { ...jsonData };
    let foundReply = findCommentById(tempData.comments, id);
    foundReply.content = value;
    setJsonData(tempData);
  }

  return (
    <div className="main-container">
      <div className="all-comment-container">
        {toggleModal && (
          <DeleteModal closeModal={closeModal} deleteComment={deleteComment} />
        )}
        {Object.keys(jsonData).length > 0 &&
          jsonData.comments.map((comment: any) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currUser={jsonData.currentUser}
              changeScore={changeScore}
              addReply={addReply}
              openModal={openModal}
              editExistingComment={editExistingComment}
            />
          ))}
        <ReplyBox currUser={jsonData.currentUser} addComment={addComment} />
      </div>
    </div>
  );
}

export default App;
