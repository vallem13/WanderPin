import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { editSingleBoardThunk, getSingleBoardThunk } from "../../store/board";
import './Boards.css'

const EditSingleBoard = () => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const board = useSelector(state => state.boards.singleBoard)
    const [title, setTitle] = useState(board.title)
    const [description, setDescription] = useState(board.description)
    const [errors, setErrors] = useState([])
    const [frontendErrors, setFrontendErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)


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

        const formData = new FormData()

        formData.append("title", title);
        formData.append("description", description);

        try {
            const editedBoard = await dispatch(editSingleBoardThunk(board.id, formData));
            if (editedBoard && editedBoard.errors) {
                setErrors(editedBoard.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
        await dispatch(getSingleBoardThunk(board.id))
        await closeModal();
    };

    const cancelEdit = () => {
        closeModal()
    };

    return (
        <div className="create-edit-board-container">
            <h1>Edit your Board</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
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
                        <button type="submit">Save</button>
                        <button type="submit" onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default EditSingleBoard
