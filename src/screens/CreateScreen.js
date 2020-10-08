import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { addPost } from './../store/actions/postActions'
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const imgRef = useRef();
    const dispatch = useDispatch()
    const createPostHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        setText('')
        navigation.navigate('Main')
    }
    const photoPickHandler = (uri) => {
        imgRef.current = uri
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Создай новый пост
            </Text>
                    <TextInput style={styles.textArea} placeholder={'Введите текст'}
                        value={text} onChangeText={setText} multiline />
                    <PhotoPicker onPick={photoPickHandler} />
                    <View style={styles.button}>
                        <Button title={'Создать пост'} color={THEME.MAIN_COLOR}
                            onPress={createPostHandler} disabled={!text} />
                    </View>

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
    },
    button: {
        marginTop: 10
    }
})