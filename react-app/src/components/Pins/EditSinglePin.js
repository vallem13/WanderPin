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
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const [frontendErrors, setFrontendErrors] = useState({})


    useEffect(() => {

        const frontendErrors = {}

        if (!name) {
            frontendErrors.name = "A title is required to post your pin";
        }
        if (name.length > 50) {
            frontendErrors.name = "A title can not be longer than 50 characters";
        }
        if (!description) {
            frontendErrors.description = "A description is required to post your pin";
        }
        if (description.length > 250) {
            frontendErrors.description = "A description can not be longer than 250 characters";
        }
        if (alt_text.length > 50) {
            frontendErrors.alt_text = "Alt-text can not be longer than 250 characters";
        }
        if (website.length > 250) {
            frontendErrors.website = "A website can not be longer than 250 characters";
        }

        setFrontendErrors(frontendErrors)

    }, [name, description, alt_text, website])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

		if (Object.keys(frontendErrors).length > 0) {
            return;
        }

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
                        {frontendErrors.name && submitted && (
                            <p className='error-message'>{frontendErrors.name}</p>
                        )}
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
                        {frontendErrors.description && submitted && (
                            <p className='error-message'>{frontendErrors.description}</p>
                        )}
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
                        {frontendErrors.alt_text && submitted && (
                            <p className='error-message'>{frontendErrors.alt_text}</p>
                        )}
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
                        {frontendErrors.website && submitted && (
                                <p className='error-message'>{frontendErrors.website}</p>
                            )}
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
