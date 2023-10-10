import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSinglePinThunk } from "../../store/pin";
import OpenModalButton from '../OpenModalButton'
import EditButton from './EditButton'
import AddPinBoard from '../AddRemovePinBoard/AddPinBoard';
import CreateComment from '../Comments/CreateComment';
import CommentActionsDropdown from './CommentButtons';
import "./SinglePinDetails.css";


const SinglePinDetails = () => {

    const dispatch = useDispatch();
    const { pinId } = useParams();
    const user = useSelector(state => state.session.user)
    const pin = useSelector(state => state.pins.singlePin);
    const comments = pin.comments || [];

    useEffect(() => {
        dispatch(getSinglePinThunk(pinId))
    }, [dispatch, pinId])

    if (!pin.id) return null

    const checkPinOwner = user && user.id === pin.user_id

    function calculateWeeksAgo(fromDate, toDate) {
        const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
        const diffInMilliseconds = toDate - fromDate;
        const diffInWeeks = Math.floor(diffInMilliseconds / millisecondsPerWeek);
        return diffInWeeks;
    }

    return (
        <div className='edit-delete-button-parent-container'>
            <div className="edit-delete-button-container">
                <div>
                    <img className='pin-image' src={pin.images} alt={pin.name}></img>
                </div>
                <div className='pin-details'>
                    <div className='edit-save-container'>
                        <div className='edit-website-container'>
                            {user && checkPinOwner && (
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
                        <h3 className='comment-title'>Comments</h3>
                        <div className='comment-container'>
                            {comments.length > 0 ? (
                                <div>
                            {comments.map((comment) => (
                                <div className='comment' key={comment.id}>
                                        <img className='user-avatar' src={user.profile_img} alt={user.first_name} style={{ width: '40px', height: '40px' }}></img>
                                    <div className='single-comment-container'>
                                        <div className='avatar-image'>
                                            <p className='user-name'>{user.first_name}<p className='comment-text'>{comment.content}</p></p>

                                        </div>
                                        <div className='comment-content'>
                                            <div className='buttons-date'>
                                                {user.id === comment.user_id ? (
                                                    <div className='comment-actions'>
                                                        <div>{calculateWeeksAgo(new Date(comment.created_at), new Date())} w</div>
                                                        <CommentActionsDropdown pin={pin} comment={comment} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                            ) : (
                                <div>
                                    <h3>No comments for this Pin</h3>
                                </div>
                            )}
                        </div>

                        <div className='like-button'>
                            {/* <h3>What do you think?</h3>
                            <div> 0
                                <i class="fa-sharp fa-solid fa-heart" style={{ color: "#ff4057", }}></i>
                            </div> */}
                        </div>
                        <div className='user-pic-comment'>
                            <img src={user.profile_img} alt={user.firstName} style={{ width: '40px', height: '40px' }} ></img>
                            <CreateComment pin_id={pin.id} user_id={user.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SinglePinDetails;
