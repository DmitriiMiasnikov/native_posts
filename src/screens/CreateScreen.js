import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { THEME } from '../theme';
import {useDispatch} from 'react-redux';
import {addPost} from './../store/actions/postActions'
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('');
    const img = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'
    const dispatch = useDispatch()
    const createPostHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img,
            booked: false
        }
        dispatch(addPost(post))
        setText('')
        navigation.navigate('Main')
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
            <Text style={styles.title}>
                Создай новый пост
            </Text>
            <TextInput style={styles.textArea} placeholder={'Введите текст'} 
                value={text} onChangeText={setText} multiline/>
            <PhotoPicker />
            <Button title={'Создать пост'} color={THEME.MAIN_COLOR} onPress={createPostHandler}/>
        </View>
            </TouchableWithoutFeedback>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10
    },
    textArea: {
        padding: 10,
        marginBottom: 10
    }
})