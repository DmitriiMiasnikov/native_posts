import React, { useEffect } from 'react';
import { PostList } from '../components/PostList';
import {useDispatch, useSelector} from 'react-redux';
import { loadPosts } from '../store/actions/postActions';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }
    const dispatch = useDispatch()
    const bookedPosts = useSelector(state => state.post.bookedPosts)
    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])
    return (
        <PostList data={bookedPosts} onOpen={openPostHandler}/>
    )
}