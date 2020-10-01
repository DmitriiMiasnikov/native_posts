import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from './../../src/components/Post';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }
    return (
        <View style={styles.wrapper}>
            <FlatList data={DATA.filter(el => el.booked)} keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 15
    }
})