import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import React from 'react';
import OpenModalButton from '../OpenModalButton'
import AddPinBoard from '../AddRemovePinBoard/AddPinBoard';
import EditSinglePin from '../Pins/EditSinglePin';
import './PinCard.css'

const PinCard = ({ pin }) => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }

    const checkOwner = user && user.id === pin.user_id

    return (
        <div onClick={onClick}>
            <div className="pin-container">
                <div className="pin">
                    <img className='pin-image' src={pin.images} alt={pin.name} style={{ width: '100px', height: '200px' }} />
                        <div className="pin-hover">
                            <OpenModalButton className="save-button" buttonText='Save' modalComponent={<AddPinBoard pin_id={pin.id}/>} />
                            {user && checkOwner && (
                                <OpenModalButton className="save-button" buttonText='Edit' modalComponent={<EditSinglePin pin={pin} pinId={pin.id}/>} />
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}


export default PinCard;
