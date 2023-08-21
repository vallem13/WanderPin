import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { useLocation } from 'react-router-dom';
import { createSingleBoardThunk, getAllBoardsThunk, getSingleBoardThunk } from "../../store/board"
import './Boards.css'

const CreateSingleBoard = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [frontendErrors, setFrontendErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const location = useLocation();
    const currentPath = location.pathname;


    useEffect(() => {

        const frontendErrors = {}

        if (!title) {
            frontendErrors.title = "A title is required to post your board"
        }
        if (title.length > 50) {
            frontendErrors.title = "A title can not be longer than 50 characters";
        }
        if (!description) {
            frontendErrors.description = "A description is required to post your board"
        }
        if (description.length > 250) {
            frontendErrors.description = "A description can not be longer than 250 characters";
        }

        setFrontendErrors(frontendErrors)

    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

		if (Object.keys(frontendErrors).length > 0) {
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("user_id", user.id);

        await dispatch(createSingleBoardThunk(formData));
        if (currentPath.startsWith('/pins/')) await closeModal()
        else {
            await dispatch(getAllBoardsThunk());
            await closeModal()
            await history.push('/user')
        }
    };

    return (
        <div className="create-edit-board-container">
            <h1>Create your Board</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="create-edit-board-details">
                    <label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add your title"
                            required
                        />
                    </label>
                    {frontendErrors.title && submitted && (
                            <p className='error-message'>{frontendErrors.title}</p>
                        )}
                    <div>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell everyone what your Board is abaout"
                            required
                        />
                    </div>
                    {frontendErrors.description && submitted && (
                            <p className='error-message'>{frontendErrors.description}</p>
                        )}
                    <div className="create-edit-board-buttons">
                        <button type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateSingleBoard
