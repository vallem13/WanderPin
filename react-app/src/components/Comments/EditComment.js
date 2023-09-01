import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSinglePinThunk } from '../../store/pin';
import { editSingleCommentThunk } from "../../store/comment";
import "./Comments.css"

const EditComment = ({ comment, pinId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [content, setContent] = useState(comment.content)
    const [frontendErrors, setFrontendErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState(false);

    useEffect(() => {

        const frontendErrors = {};

        if (content.length > 500) errors.content = "Max 500 charachters allowed"

        setFrontendErrors(frontendErrors);

    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (Object.keys(frontendErrors).length > 0) {
            return;
        }

        const formData = new FormData();

        formData.append("content", content);

        try {
            const editedComment = await dispatch(editSingleCommentThunk(comment.id, formData));
            if (editedComment && editedComment.errors) {
                setErrors(editedComment.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
        await dispatch(getSinglePinThunk(pinId))
        await closeModal();
    }

    const cancelEdit = () => {
        closeModal()
    };

    return (
        <div className="edit-single-pin-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <textarea
                className='comment-input'
                placeholder="Add a comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {frontendErrors.content && submitted && (
                <p className='error-message'>{frontendErrors.content}</p>
            )}
            <div className="create-edit-board-buttons">
                <button type="submit">Save</button>
                <button type="submit" onClick={cancelEdit}>Cancel</button>
            </div>
        </form>
        </div>
    )
}

export default EditComment
