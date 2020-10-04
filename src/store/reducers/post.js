import { LOAD_POSTS } from "../types"

const initialState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case (LOAD_POSTS): {
            return { ...state, allPosts: action.payload, bookedPosts: action.payload.filter(el => el.booked) }
        }
        default: return state
    }
}