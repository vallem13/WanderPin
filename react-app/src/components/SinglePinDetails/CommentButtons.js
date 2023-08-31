import React, { useState, useEffect } from 'react';
import OpenModalButton from "../OpenModalButton";
import DeleteComment from '../Comments/DeleteComment';
import EditComment from '../Comments/EditComment';
import './CommentButtons.css'

function CommentActionsDropdown({ pin, comment }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div className='comment-actions'>
      <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
            <i class="fa-solid fa-ellipsis" style={{color: "#ff4057",}}></i>
        </button>
        <ul className="dropdown-menu">
          <div className='delete-edit-comment-buttons'>
            <OpenModalButton
              className="custom-button delete-button"
              buttonText="Delete"
              modalComponent={<DeleteComment pinId={pin.id} commentId={comment.id} />}
            />
            <OpenModalButton
              className="custom-button edit-button"
              buttonText="Edit"
              modalComponent={<EditComment pinId={pin.id} comment={comment} />}
            />
            </div>
        </ul>
      </div>
    </div>
  );
}

export default CommentActionsDropdown;
