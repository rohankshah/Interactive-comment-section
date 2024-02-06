import React from "react";
import "./DeleteModal.css";

interface DeleteModalProps {
  closeModal: any;
  deleteComment: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  closeModal,
  deleteComment,
}) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="title">Delete Comment</div>
        <div>
          Are you sure you can want to remove this comment? This will remove the
          comment and can't be undone
        </div>
        <div className="button-container">
          <button
            className="button grayishBlueColor noselect pointer"
            onClick={() => closeModal()}
          >
            NO, CANCEL
          </button>
          <button
            className="button softRedColor noselect pointer"
            onClick={() => deleteComment()}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
