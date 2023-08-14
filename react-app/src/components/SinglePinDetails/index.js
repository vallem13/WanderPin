import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSinglePinThunk } from "../../store/pin";
import OpenModalButton from '../OpenModalButton'
import DeleteSinglePin from '../Pins/DeleteSinglePin';
import EditSinglePin from '../Pins/EditSinglePin';
import AddPinBoard from '../AddPinBoard';
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

    return (
        <div>
            <div>
                <img src={pin.images} alt={pin.name}></img>
            </div>
            <div>
                <OpenModalButton buttonText='Delete Pin' modalComponent={<DeleteSinglePin pinId={pin.id}/>} />
                <OpenModalButton buttonText='Edit Pin' modalComponent={<EditSinglePin pin={pin} pinId={pin.id}/>} />
            </div>
            <div>
                <OpenModalButton className="save-button" buttonText='Save' modalComponent={<AddPinBoard pin_id={pin.id}/>} />
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
