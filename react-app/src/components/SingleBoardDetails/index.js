import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSingleBoardThunk } from "../../store/board";
import { getAllPinsThunk } from '../../store/pin';
import OpenModalButton from '../OpenModalButton'
// import DeleteSinglePin from '../Pins/DeleteSinglePin';
import EditSingleBoard from '../Boards/EditSingleBaord';
import PinCard from '../HomePage/PinCard';
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

    return (
        <div>
            <h1>{board.title}</h1>
            <div>
                <OpenModalButton buttonText='Edit' modalComponent={<EditSingleBoard pin={board} pinId={board.id}/>} />
                {/* <OpenModalButton buttonText='Delete' modalComponent={<DeleteSinglePin pinId={pin.id}/>} /> */}
            </div>
            {pins.length ? (
                <div>
                    {pins.map((pin) => (
                        <PinCard key={pin.id} pin={pin} />
                    ))}
                </div>
            ) : (
                <h3>There aren’t any Pins on this board yet</h3>
            )}
        </div>
    )

}

export default SingleBoardDetails;
