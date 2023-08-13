import { useHistory } from 'react-router';
import React from 'react';
import './PinCard.css'

const PinCard = ({ pin }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/pins/${pin.id}`)
    }

    const handleSave = () => {
        
    }

    return (
        <div onClick={onClick}>
            <div className="pin-container">
                <div className="pin">
                    <img className='pin-image' src={pin.images} alt={pin.name} style={{ width: '100px', height: '200px' }} />
                        <div className="pin-hover">
                            <button className="save-button" onClick={handleSave}>Save</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PinCard;
