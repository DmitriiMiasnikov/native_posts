import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from "../types"

const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case (LOAD_POSTS): {
            return { ...state, allPosts: action.payload, bookedPosts: action.payload.filter(el => el.booked), loading: false }
        }
        case (TOGGLE_BOOKED): {
            const allPosts = state.allPosts.map(el => {
                if (action.id === el.id) {
                    el.booked = !el.booked
                }
                return el
            })
            return { ...state, allPosts, bookedPosts: allPosts.filter(el => el.booked) }
        }
        case (REMOVE_POST): {
            const allPosts = state.allPosts.filter(el => el.id !== action.payload)
            const bookedPosts = state.bookedPosts.filter(el => el.id !== action.payload)
            return { ...state, allPosts, bookedPosts }
        }
        case (ADD_POST): {
            return { ...state, allPosts: [{ ...action.payload }, ...state.allPosts] }
        }
        default: return state
    }
}