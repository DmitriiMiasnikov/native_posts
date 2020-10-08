import * as FileSystem from 'expo-file-system';
import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from './../types';
import { http } from './../../http'

export const loadPosts = () => {
    return async dispatch => {
        try {
            const data = await http.get('https://native-posts.firebaseio.com/posts.json')
            const posts = data ? Object.keys(data).map(el => ({ ...data[el], id: el })) : []
            dispatch({ type: LOAD_POSTS, payload: posts })
        } catch (e) {
            console.log('err', e)
        }
    }
}
export const toggleBooked = (post) => async dispatch => {
    let booked = !post.booked;
    await http.patch(`https://native-posts.firebaseio.com/posts/${id}.json`, { booked })
    dispatch({ type: TOGGLE_BOOKED, payload: id })
}
export const removePost = (id) => async dispatch => {
    await http.delete(`https://native-posts.firebaseio.com/posts/${id}.json`, { id })
    dispatch({ type: REMOVE_POST, payload: id })
}
export const addPost = (post) => async dispatch => {
    let img;
    if (post.img) {
        const fileName = post.img.split('/').pop()
        img = FileSystem.documentDirectory + fileName
    } else img = 'https://ichip.ru/images/cache/2019/8/15/fit_930_519_false_crop_960_576_0_0_q90_2382_1af3dc5863.jpeg'
    const payload = { ...post, img }
    const data = await http.post(`https://native-posts.firebaseio.com/posts.json`, payload)
    payload.id = data.name
    dispatch({ type: ADD_POST, payload })
}