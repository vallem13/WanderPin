import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { addPinBoardThunk, getAllBoardsThunk } from "../../store/board";
import OpenModalButton from "../OpenModalButton";
import CreateSingleBoard from "../Boards/CreateSingleBoard";
import './AddRemovePinBoard.css'

const AddPinBoard = ({ pin_id, onSelectBoard }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const boardsObj = useSelector(state => state.boards.allBoards)
    const user = useSelector(state => state.session.user)
    const boards = Object.values(boardsObj)
    const user_boards = boards.filter(boards => boards.user_id === user.id)
    const [board_id, setBoardId] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [frontendErrors, setFrontendErrors] = useState({})
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])


    useEffect(() => {

        const frontendErrors = {}

        if (!board_id) {
            frontendErrors.board_id = "Please select a Board or create a new Board "
        }

        setFrontendErrors(frontendErrors)

    }, [board_id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        const formData = new FormData()

        if (Object.keys(frontendErrors).length > 0) {
            return;
        }

        formData.append("pin_id", pin_id);
        formData.append("board_id", board_id);

        try {
            const addPin = await dispatch(addPinBoardThunk(formData));
            if ((addPin && addPin.errors)) {
                setErrors(addPin.errors);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }

        await history.push(`/boards/${board_id}`)
        await closeModal();

    };



    const selectBoard = (board) => {
        setBoardId(board.id)
    };


    return (
        <div className="add-pin-container">
            <h2>Choose a Board to add the Pin</h2>
            <div className="board-selection-container">
                <div className="board-scroll-container">
                    <div className="board-display-container">
                        {user_boards.map((board) => (
                            <div
                                id="add-board-img-name"
                                className={`board-names ${board.id === board_id ? "active" : ""}`}
                                onClick={() => selectBoard(board)}
                                key={board.id}
                            >
                                <img id="add-board-img" src={board.pinImgs[0] ? board.pinImgs[0] : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt={board.title} style={{ width: '100px', height: '100px' }} />
                                <span>{board.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="add-pin-buttons-container">
                    <div className="add-create-board-button">
                        <OpenModalButton
                            className="custom-button"
                            buttonText="Create Board"
                            modalComponent={<CreateSingleBoard />}
                        />
                    </div>
                    {frontendErrors.board_id && submitted && (
                        <p className='error-message'>{frontendErrors.board_id}</p>
                    )}
                    <div className="add-pin-button">
                        <button onClick={handleSubmit}>Add Pin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPinBoard
