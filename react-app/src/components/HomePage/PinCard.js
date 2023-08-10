import { useHistory } from 'react-router';
import React from 'react';
import './PinCard.css'

const PinCard = ({ pin }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }

    return (
        <div onClick={onClick}>
            <div class="pin-container">
                <div class="pin">
                    <img className='pin-image' src={pin.images} alt={pin.name} style={{ width: '100px', height: '200px' }} />
                        <div class="pin-hover">
                            <button class="save-button">Save</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PinCard;
