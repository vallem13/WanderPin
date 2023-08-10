import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSinglePinThunk } from "../../store/pin";
import "./SinglePinDetails.css";


const SinglePinDetails = () => {

    const dispatch = useDispatch();
    const { pinId } = useParams();
    const user = useSelector(state => state.session.user)
    const pin = useSelector(state => state.pins.singlePin);

    console.log('------->', pin.user)

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
                <select>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <button>Save</button>
            </div>
            <div>
                <h2>{pin.name}</h2>
                <div>
                    <img src={pin.user.profile_img} alt={pin.user.firstName} style={{ width: '40px', height: '40px' }} />
                    <p>{pin.user.firstName}</p>
                    <button>Follow</button>
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
