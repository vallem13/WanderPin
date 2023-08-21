import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createSinglePinThunk, getAllPinsThunk } from "../../store/pin";
import "./Pins.css";

const CreateSinglePin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [alt_text, setAlt_text] = useState("");
    const [website, setWebsite] = useState("");
    const [images, setImages] = useState(null);
    const [errors, setErrors] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const [showInput, setShowInput] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("Drag and drop or");
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const frontendErrors = {};

        if (!images) {
            frontendErrors.images = "An image is required to create a pin";
        }
        if (!name) {
            frontendErrors.name = "A title is required to post your pin";
        }
        if (!description) {
            frontendErrors.description = "A description is required to post your pin";
        }

        setFrontendErrors(frontendErrors);
    }, [images, name, description]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        setImages(file);
        setUploadStatus("Image selected and ready to upload");
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setImages(file);
        setUploadStatus("Image selected and ready to upload");
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

		const allErrors = Object.keys(frontendErrors).length > 0
		if (!allErrors) {

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
                await dispatch(getAllPinsThunk());
                await history.push("/user");
                await closeModal();
            }
        }

    };

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    return (
        <div className="create-pin-container">
            <h1>Create your Pin</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="create-pin-img-form">
                    <div className="create-pin-img-container">
                        <div
                            id="drop-area"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className={dragging ? "dragging" : ""}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            ) : (
                                uploadStatus
                            )}
                        </div>
                        <div className="choose-file">

                            {!imagePreview && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            )}
                        </div>
                        {frontendErrors.images && submitted && (
                            <p className='error-message'>{frontendErrors.images}</p>
                        )}
                    </div>
                    <div className="create-pin-form-details">
                        <div className="create-pin-user-img-container">
                            <img
                                src={user.profile_img}
                                alt={user.first_name}
                                style={{ width: "50px", height: "50px" }}
                            ></img>
                            <h3>{user.first_name}</h3>
                        </div>
                        <div className="create-pin-form">
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Add your title"
                                    required
                                />
                            </div>
                            {frontendErrors.name && submitted && (
                                <p className='error-message'>{frontendErrors.name}</p>
                            )}
                            <div>
                                <textarea
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell everyone what your Pin is about"
                                    required
                                />
                            </div>
                            {frontendErrors.description && submitted && (
                                <p className='error-message'>{frontendErrors.description}</p>
                            )}
                            <div className="alt-text-button">
                                {showInput ? (
                                    <input
                                        type="text"
                                        value={alt_text}
                                        onChange={(e) => setAlt_text(e.target.value)}
                                        placeholder="Explain what people can see in this pin"
                                    />
                                ) : (
                                    <button onClick={toggleInput}>Add alt text</button>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Add a destination link"
                                />
                            </div>
                        </div>
                        <div className="create-pin-save-button">
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateSinglePin;
