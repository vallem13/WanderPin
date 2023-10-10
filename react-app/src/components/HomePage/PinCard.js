import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import React from 'react';
import OpenModalButton from '../OpenModalButton'
import AddPinBoard from '../AddRemovePinBoard/AddPinBoard';
import './PinCard.css'

const PinCard = ({ pin }) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }

    return (
        <div onClick={onClick}>
            <div className="pin-container">
                <div className="pin">
                    <div>
                        <img className='pin-image' src={pin.images} alt={pin.name} />
                    </div>
                    <div className="pin-hover">
        <div className="top-left">
            <OpenModalButton className="save-button" buttonText='Save' modalComponent={<AddPinBoard pin_id={pin.id} />} />
        </div>
        <div className="bottom-left">
            {pin.website && (
                <a href={pin.website} target="_blank" className="icon-link">
                    <i className="fa-solid fa-arrow-up-right-from-square" size='xg' style={{ color: "#ff4057" }}></i>
                </a>
            )}
        </div>
    </div>

                </div>
            </div>
        </div>
    )
}


export default PinCard;

// ---> control H and W on parent div
// #spot_details_preview_image {
//   object-fit: cover;
//   border-radius: 1em;
// }
