import React from "react";
import "./EditButton.css";

interface EditButtonProps {
  editComment: any;
}

const EditButton: React.FC<EditButtonProps> = ({ editComment }) => {
  return (
    <div className="editBtn pointer noselect" onClick={() => editComment()}>
      <img src="./images/icon-edit.svg" alt="deleteIcon" />
      <span>Edit</span>
    </div>
  );
};

export default EditButton;
