import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {Post} from './Post'

export const PostList = ({ data, onOpen }) => {
    if (!data.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.noItems}>
                Постов нет
            </Text>
        </View>
    }
    return (
        <View style={styles.wrapper}>
            <FlatList data={data} keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={onOpen} />} />
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
    },
    noItems: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 10
    }
})