import React from "react";
import "./DeleteButton.css";

interface DeleteButtonProps {
  openModal: any;
  commentId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  openModal,
  commentId,
}) => {
  return (
    <div
      className="deleteBtn pointer noselect"
      onClick={() => openModal(commentId)}
    >
      <img src="./images/icon-delete.svg" alt="deleteIcon" />
      <span>Delete</span>
    </div>
  );
};

export default DeleteButton;
