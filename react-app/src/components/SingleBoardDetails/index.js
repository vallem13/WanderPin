import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSingleBoardThunk } from "../../store/board";
import { getAllPinsThunk } from '../../store/pin';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import OpenModalButton from '../OpenModalButton'
import DeleteSingleBoard from '../Boards/DeleteSingleBoard';
import EditSingleBoard from '../Boards/EditSingleBaord';
import PinCard from '../HomePage/PinCard';
import RemovePinBoard from '../AddRemovePinBoard/RemovePinBoard';
import "./SingleBoardDetails.css";


const SingleBoardDetails = () => {

    const dispatch = useDispatch();
    const { boardId } = useParams();
    const user = useSelector(state => state.session.user)
    const board = useSelector(state => state.boards.singleBoard);
    const pinsObj = useSelector(state => state.pins.allPins)
    const pinsArr = Object.values(pinsObj)

    useEffect(() => {
        dispatch(getSingleBoardThunk(boardId))
        dispatch(getAllPinsThunk())
    }, [dispatch, boardId])

    const pins = board.pinImgs ? pinsArr.filter(pin => board.pinImgs.some(image => pin.images.includes(image))) : []

    if (!board.id) return null

    const checkOwner = user && user.id === board.user_id

    return (
        <div>
            <div className='single-board-details-container'>
            <h1>{board.title}</h1>
            <h3 className='single-board-description'>{board.description}</h3>
            <div className='edit-delete-single-board'>
            {user && checkOwner && (
                <div>
                    <OpenModalButton buttonText='Edit' modalComponent={<EditSingleBoard board={board} boardId={board.id} />} />
                    <OpenModalButton buttonText='Delete' modalComponent={<DeleteSingleBoard board={board} boardId={board.id} />} />
                </div>
            )}
            </div>
            </div>
            <div >
            {pins.length ? (
                <div>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 3, 1026: 5 }}
                    >
                        <Masonry>
                            {pins.map((pin) => (
                                <div className="pin-card-container">
                                    <PinCard key={pin.id} pin={pin} />
                                    {user && checkOwner && (
                                        <OpenModalButton buttonText='Remove' modalComponent={<RemovePinBoard pinId={pin.id} />} />
                                    )}
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            ) : (
                <h3>There aren’t any Pins on this board yet</h3>
            )}
            </div>
        </div>
    )

}

export default SingleBoardDetails;
