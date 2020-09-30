import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

export const Post = ({ post }) => {
    return <View style={styles.post}>
        <ImageBackground style={styles.img} source={{ uri: post.img }}>
            <View style={styles.textWrap}>
                <Text style={styles.title}>
                    {new Date(post.date).toLocaleDateString()}
                </Text>
            </View>
        </ImageBackground>
    </View>
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: 200
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        color: 'white'
    }
})