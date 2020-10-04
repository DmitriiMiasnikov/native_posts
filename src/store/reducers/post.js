import { LOAD_POSTS, TOGGLE_BOOKED } from "../types"

const initialState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case (LOAD_POSTS): {
            return { ...state, allPosts: action.payload, bookedPosts: action.payload.filter(el => el.booked) }
        }
        case (TOGGLE_BOOKED): {
            allPosts = state.allPosts.map(el => {
                if (action.id === el.id) {
                    el.booked = !el.booked
                }
                return el
            })
            return {...state, allPosts, bookedPosts: allPosts.filter(el => el.booked)}
        }
        default: return state
    }
}