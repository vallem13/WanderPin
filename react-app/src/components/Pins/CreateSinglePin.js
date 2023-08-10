import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { createSinglePinThunk } from "../../store/pin"
import { getSinglePinThunk } from "../../store/pin";
import './Pins.css'

const CreateSinglePin = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [alt_text, setAlt_text] = useState('')
    const [website, setWebsite] = useState('')
    const [images, setImages] = useState(null)
    const [errors, setErrors] = useState([])
    const [frontendErrors, setFrontendErrors] = useState({})
    const [showInput, setShowInput] = useState(false);


    useEffect(() => {

        const frontendErrors = {}

        if (!images) {
            frontendErrors.images = "An image is required to create a pin"
        }
        if (!name) {
            frontendErrors.images = "A title is required to post your pin"
        }
        if (!description) {
            frontendErrors.images = "A description is required to post your pin"
        }

        setFrontendErrors(frontendErrors)

    }, [images, name, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("alt_text", alt_text);
        formData.append("website", website);
        formData.append("images", images);
        formData.append("user_id", user.id);

        

        if (!images) {
        	console.log("No image selected");
        	return;
        }

        const data = await dispatch(createSinglePinThunk(formData));

        if (data) {
            setErrors(data);
        } else {
            await history.push('/home')
            await closeModal();
        }

    };

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* <ul>
                    {errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
                </ul> */}
                <label>
                    Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImages(e.target.files[0])}
                    />
                </label>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Add your title"
                        required
                    />
                </div>
                <div>
                    <img src={user.profile_img} alt={user.first_name} style={{ width: '40px', height: '40px' }}></img>
                    <h3>{user.first_name}</h3>
                </div>
                <div>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell everyone what your Pin is abaout"
                        required
                    />
                </div>
                <div>
                    {showInput ? (
                        <input
                            type="text"
                            value={alt_text}
                            onChange={(e) => setAlt_text(e.target.value)}
                            placeholder="Explain what people can see in this pin" />
                    ) : (
                        <button onClick={toggleInput}>Add alt text</button>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Add a destination link "
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSinglePin
