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
                <img src={board.pinImgs[0] ? board.pinImgs[0] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={board.title} style={{ width: '100px', height: '100px' }} />
                <img src={board.pinImgs[1] ? board.pinImgs[1] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={board.title} style={{ width: '50px', height: '50px' }} />
                <img src={board.pinImgs[2] ? board.pinImgs[2] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={board.title} style={{ width: '50px', height: '50px' }} />
            </div>
        </div>
    )
}

export default BoardCard;
