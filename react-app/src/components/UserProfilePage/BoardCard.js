import { useHistory } from 'react-router';
import React from 'react';
import './UserProfile.css';

const BoardCard = ({ board }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`/boards/${board.id}`)
    }

    return (
        <div onClick={onClick}>
            <div>
                <img src={board.pinImgs[0]} alt={board.title} style={{ width: '100px', height: '100px' }} />
                <img src={board.pinImgs[1]} alt={board.title} style={{ width: '100px', height: '100px' }} />
                <img src={board.pinImgs[2]} alt={board.title} style={{ width: '100px', height: '100px' }} />
            </div>
        </div>
    )
}

export default BoardCard;
