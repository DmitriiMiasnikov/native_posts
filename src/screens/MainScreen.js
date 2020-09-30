import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from './../../src/components/Post'

export const MainScreen = ({ navigation }) => {
    const goToPost = () => {
        navigation.navigate('Post')
    }

    return (
        <View style={styles.wrapper}>
            <FlatList data={DATA} keyExtractor={post => post.id.toString()} renderItem={({ item }) => <Post post={item} />} />
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