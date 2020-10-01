import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, ScrollView, Alert } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';

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
                { text: "Удалить", style: 'destructive', onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }
    const postId = route.params?.postId
    const post = DATA.find(el => el.id === postId)
    // useEffect(() => {
    //     navigation.setParams({ booked: post.booked })
    // }, [])
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