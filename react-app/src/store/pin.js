// Action
const GET_ALL_PINS = "pins/GET_ALL_PINS";
const GET_SINGLE_PIN ="pins/GET_SINGLE_PIN";



// Action Creator
const getAllPins = (pins) => ({
    type: GET_ALL_PINS,
    pins
});

const getSinglePin = (pin) => ({
    type: GET_SINGLE_PIN,
    pin
})



// Thunk
export const getAllPinsThunk = () => async (dispatch) => {
    const response = await fetch('/api/pins');
    if (response.ok) {
        const pins = await response.json();
        dispatch(getAllPins(pins));
        return response;
    } else {
        const errors = await response.json();
        return errors
    }
}

export const getSinglePinThunk = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}`)
    if (response.ok) {
        const pin = await response.json()
        dispatch(getSinglePin(pin))
        return response
    } else {
        const errors = await response.json();
        return errors
    }
}



// Initial State
const initialState = {
    allPins: {},
    singlePin: {},
  };


// Reducer
export default function reducer(state = initialState, action) {
    
    let newState;

    switch (action.type) {

    case GET_ALL_PINS:
            newState = { ...state, allPins: {}, singlePin: {} };
            action.pins.forEach((pin) => {
                newState.allPins[pin.id] = pin;
            });
            return newState

    case GET_SINGLE_PIN:
            newState = { ...state, allPins: {}, singlePin: {} };
            newState.singlePin = action.pin
            return newState

    default:
        return state;
    }
}
