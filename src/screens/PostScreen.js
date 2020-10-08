import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, ScrollView, Alert } from 'react-native';
import { THEME } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toggleBooked } from '../store/actions/postActions';
import { CommonActions } from '@react-navigation/native';

export const PostScreen = ({ route, navigation }) => {
    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                { text: "Удалить", style: 'destructive', onPress: () => {
                    navigation.dispatch(CommonActions.goBack());
                    dispatch(removePost(postId))
                } }
            ],
            { cancelable: false }
        );
    }
    const postId = route.params?.postId
    const post = useSelector(state => state.post.allPosts.find(el => el.id === postId))

    const dispatch = useDispatch();
    const booked = useSelector(state => state.post.bookedPosts.some(el => el.id === postId))

    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked])

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, postId])

    useLayoutEffect(() => {
        navigation.setOptions({ toggleHandler })
    }, [toggleHandler])
    if (!post) {
        return <View></View>
    }
    return (
        <ScrollView style={styles.center}>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>
                    {post.text}
                </Text>
            </View>
            <Button title={'Удалить'} color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    image: {
        width: screen.width,
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontSize: 24
    }
})