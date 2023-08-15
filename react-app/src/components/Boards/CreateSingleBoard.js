import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { createSingleBoardThunk, getAllBoardsThunk } from "../../store/board"
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


    useEffect(() => {

        const frontendErrors = {}

        if (!title) {
            frontendErrors.title = "A title is required to post your pin"
        }
        if (!description) {
            frontendErrors.description = "A description is required to post your pin"
        }

        setFrontendErrors(frontendErrors)

    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("user_id", user.id);

        await dispatch(createSingleBoardThunk(formData));
        await dispatch(getAllBoardsThunk());
        await closeModal()
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add your title"
                        required
                    />
                </label>
                <div>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell everyone what your Board is abaout"
                        required
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSingleBoard
