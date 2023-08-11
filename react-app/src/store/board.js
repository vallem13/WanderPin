// Action
const GET_ALL_BOARDS = "pinsboards/GET_ALL_BOARDS";
const GET_SINGLE_BOARD = "pinsboards/GET_SINGLE_BOARD";


// Action Creator
const getAllBoards = (boards) => ({
    type: GET_ALL_BOARDS,
    boards
});

const getSingleBoard = (boardId) => ({
    type: GET_SINGLE_BOARD,
    boardId
});



// Thunk
export const getAllBoardsThunk = () => async (dispatch) => {
    const response = await fetch('/api/boards');

    if (response.ok) {
        const boards = await response.json();
        dispatch(getAllBoards(boards));
        return response;
    } else {
        const errors = await response.json();
        return errors
    }
}

export const getSingleBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/pins_boards${boardId}`)

    if (response.ok) {
        const board = await response.json()
        dispatch(getSingleBoard(board))
        return response
    } else {
        const errors = await response.json();
        return errors
    }
}


// Initial State
const initialState = {
    allBoards: {},
    singleBoard: {},
};



// Reducer
export default function reducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_BOARDS:
            newState = { ...state, allBoards: {}, singleBoard: {} };
            action.boards.forEach((board) => {
                newState.allBoards[board.id] = board;
            });
        return newState

        case GET_SINGLE_BOARD:
            newState = { ...state, allBoards: {}, singleBoard: {} };
            newState.singleBoard = action.boardId
        return newState

        default:
            return state;
    }

}
