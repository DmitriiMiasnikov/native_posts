import React from 'react';
import { PostList } from '../components/PostList';
import { DATA } from '../data';

export const MainScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }
    return (
        <PostList data={DATA} onOpen={openPostHandler}/>
    )
}