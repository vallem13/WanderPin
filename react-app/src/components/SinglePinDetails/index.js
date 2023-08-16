import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSinglePinThunk } from "../../store/pin";
import OpenModalButton from '../OpenModalButton'
import EditButton from './EditButton'
import AddPinBoard from '../AddRemovePinBoard/AddPinBoard';
import "./SinglePinDetails.css";


const SinglePinDetails = () => {

    const dispatch = useDispatch();
    const { pinId } = useParams();
    const user = useSelector(state => state.session.user)
    const pin = useSelector(state => state.pins.singlePin);

    useEffect(() => {
        dispatch(getSinglePinThunk(pinId))
    }, [dispatch, pinId])

    if (!pin.id) return null

    const checkOwner = user && user.id === pin.user_id

    return (
        <div className='edit-delete-button-parent-container'>
            <div className="edit-delete-button-container">
                <div>
                    <img className='pin-image' src={pin.images} alt={pin.name}></img>
                </div>
                <div className='pin-details'>
                    <div className='edit-save-container'>
                        <div className='edit-website-container'>
                            {user && checkOwner && (
                                <div>
                                    <EditButton />
                                </div>
                            )}
                            <div>{pin.website ? <div class="save-to-board-button">
                                <a href={pin.website} target="_blank" className="icon-link">
                                    <i className="fa-solid fa-arrow-up-right-from-square" size='xg' style={{ color: "#ff4057" }}></i>
                                </a>
                            </div> : ''}</div>
                        </div>
                        <div className="save-to-board-button">
                            <OpenModalButton buttonText='Save to Board' modalComponent={<AddPinBoard pin_id={pin.id} />} />
                        </div>
                    </div>
                    <div className='pin-info-container'>
                        <h1>{pin.name}</h1>
                        <p>{pin.description}</p>
                        <div className='pin-owner-container'>
                            <img src={pin.user.profile_img} alt={pin.user.firstName} style={{ width: '40px', height: '40px' }} />
                            <h3 className='pin-user-firstname'>{pin.user.firstName}</h3>
                        </div>
                        <div className='comment-container'>
                            <h3>Comments</h3>
                            <p>No comments yet! Add one to start the conversation.</p>
                        </div>
                        <div className='like-button'>
                            <h3>What do you think?</h3>
                            <div> 0
                            <i class="fa-sharp fa-solid fa-heart" style={{color: "#ff4057",}}></i>
                            </div>
                        </div>
                        <div className='user-pic-comment'>
                            <img src={user.profile_img} alt={user.firstName} style={{ width: '40px', height: '40px' }} ></img>
                            <input
                                type="text"
                                placeholder='Feature coming soon...'
                                className='comment-input'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SinglePinDetails;
