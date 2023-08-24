import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePinThunk } from '../../store/pin';
import { createSingleCommentThunk } from "../../store/comment";
import "./Comments.css"

const CreateComment = ({ pin_id, user_id }) => {
    const dispatch = useDispatch()
    const pin = useSelector(state => state.pins.singlePin)
    const user = useSelector(state => state.session.user)
    const [content, setContent] = useState('')
    const [frontendErrors, setFrontendErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState(false);

    useEffect(() => {

        const frontendErrors = {};

        if (content.length > 500) errors.content = "Max 500 charachters allowed"

        setFrontendErrors(frontendErrors);

    }, [content])

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {

            e.preventDefault();

            setSubmitted(true)

            if (Object.keys(frontendErrors).length > 0) {
                return;
            }

            const formData = new FormData();

            formData.append("content", content);
            formData.append("pin_id", pin.id);
            formData.append("user_id", user.id);

            const data = await dispatch(createSingleCommentThunk(formData, pin.id));
            await dispatch(getSinglePinThunk(pin.id));

            if (data) setContent('');
        }
    }


    return (
        <form encType="multipart/form-data">
            <textarea
                className='comment-input'
                placeholder="Add a comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={handleSubmit}
            />
            {frontendErrors.content && submitted && (
                <p className='error-message'>{frontendErrors.content}</p>
            )}
        </form>
    )
}

export default CreateComment
