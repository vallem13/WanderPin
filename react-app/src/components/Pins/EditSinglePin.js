import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { editSinglePinThunk, getSinglePinThunk } from "../../store/pin";
import './Pins.css'

const EditSinglePin = () => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const pin = useSelector(state => state.pins.singlePin)
    const [name, setName] = useState(pin.name)
    const [description, setDescription] = useState(pin.description)
    const [alt_text, setAlt_text] = useState(pin.alt_text)
    const [website, setWebsite] = useState(pin.website)
    const [errors, setErrors] = useState([])
    const [frontendErrors, setFrontendErrors] = useState({})


    useEffect(() => {

        const frontendErrors = {}

        if (!name) {
            frontendErrors.name = "A title is required to post your pin"
        }
        if (!description) {
            frontendErrors.description = "A description is required to post your pin"
        }

        setFrontendErrors(frontendErrors)

    }, [name, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("name", name);
        formData.append("description", description);
        formData.append("alt_text", alt_text);
        formData.append("website", website);

        try {
            const editedPin = await dispatch(editSinglePinThunk(pin.id, formData));
            if (editedPin && editedPin.errors) {
                setErrors(editedPin.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
        await dispatch(getSinglePinThunk(pin.id))
        await closeModal();
    };

    const cancelEdit = () => {
        closeModal()
    };

    return (
        <div className="edit-pin-container">
            <h1>Edit your Pin</h1>
            <div className="edit-pin-img-form">
                <div className="edit-pin-img">
                    <img src={pin.images} alt={pin.name}></img>
                </div>
                <div className="edit-pin-form">
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <div className="edit-pin-input">
                            <label>
                                <h3>Title</h3>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Add your title"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <h3>Description</h3>
                                <textarea
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <h3>Alt Text</h3>
                                <input
                                    type="text"
                                    value={alt_text}
                                    onChange={(e) => setAlt_text(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <h3>Website</h3>
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="edit-pin-buttons">
                            <div>
                                <button type="submit">Save</button>
                            </div>
                            <div>
                                <button type="submit" onClick={cancelEdit}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSinglePin
