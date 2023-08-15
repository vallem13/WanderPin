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
        <div>
            <div>
                <img src={pin.images} alt={pin.name} style={{ width: '300px', height: '400px' }}></img>
            </div>
            {user && checkOwner && (
                <div>
                    <EditButton />
                </div>
            )}
            <div>
                <OpenModalButton className="save-button" buttonText='Save to Board' modalComponent={<AddPinBoard pin_id={pin.id}/>} />
            </div>
            <div>
                <h2>{pin.name}</h2>
                <div>
                    <img src={pin.user.profile_img} alt={pin.user.firstName} style={{ width: '40px', height: '40px' }} />
                    <p>{pin.user.firstName}</p>
                </div>
                <div>
                    <h3>Comments</h3>
                    <p>No comments yet! Add one to start the conversation.</p>
                </div>
                <div>
                    <h3>What do you think?</h3>
                    <button>🙂 ❤️ 💡</button>
                </div>
                <div>
                    <img src={user.profile_img} alt={user.firstName} style={{ width: '40px', height: '40px' }} ></img>
                    <input
                        type="text"
                        placeholder='Feature coming soon...'
                    />
                </div>
            </div>
        </div>
    )

}

export default SinglePinDetails;
