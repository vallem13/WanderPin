// Action
const GET_ALL_FOLLOWS = "follows/GET_ALL_FOLLOWS";
const FOLLOW_USER = "follows/FOLLOW_USER";
const UNFOLLOW_USER = "follows/UNFOLLOW_USER";


// Action Creator
const getAllFollows = (follows) => ({
    type: GET_ALL_FOLLOWS,
    follows
});

const followUser = (follow) => ({
    type: FOLLOW_USER,
    follow
});

const unfollowUser = (followId) => ({
    type: UNFOLLOW_USER,
    followId,
});


// Thunk
export const getAllFollowsThunk = () => async (dispatch) => {
    const response = await fetch('/api/follows');

    if (response.ok) {
        const follows = await response.json();
        dispatch(getAllFollows(follows));
        return response;
    } else {
        const errors = await response.json();
        return errors
    }
}

export const followUserThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/follows/follow', {
        method: 'POST',
        body: formData
    })

    if(response.ok) {
        const follow = await response.json()
        dispatch(followUser(follow))
        return response
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const unfollowUserThunk = (followId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${followId}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        const follow = await response.json()
        dispatch(unfollowUser(followId))
        return response
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// Initial State
const initialState = {
    allFollows: {},
};



// Reducer
export default function reducer(state = initialState, action) {

    let newState;

    switch (action.type) {

    case GET_ALL_FOLLOWS:
        newState = { ...state, allFollows: {} };
        action.follows.forEach((follow) => {
            newState.allFollows[follow.id] = follow;
        });
    return newState

    case FOLLOW_USER:
        newState = { ...state, allFollows: { ...state.allFollows} }
    return newState

    case UNFOLLOW_USER:
        newState = { ...state, allFollows: { ...state.allFollows} }
        delete newState.allFollows[action.followId]
    return newState

    default:
        return state;
    }
}
