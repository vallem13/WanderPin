import { useHistory } from 'react-router';
import React from 'react';
import OpenModalButton from '../OpenModalButton'
import AddPinBoard from '../AddPinBoard/index';
import './PinCard.css'

const PinCard = ({ pin }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }

    return (
        <div onClick={onClick}>
            <div className="pin-container">
                <div className="pin">
                    <img className='pin-image' src={pin.images} alt={pin.name} style={{ width: '100px', height: '200px' }} />
                        <div className="pin-hover">
                            <OpenModalButton className="save-button" buttonText='Save' modalComponent={<AddPinBoard pin_id={pin.id}/>} />
                        </div>
                </div>
            </div>
        </div>
    )
}


export default PinCard;
