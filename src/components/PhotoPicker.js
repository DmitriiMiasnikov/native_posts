import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

async function askPermision() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Ошибка', 'извините, доступ не получен')
                return false
            }
            return true
        }
}

export const PhotoPicker = ({ }) => {
    const [image, setImage] = useState(null);


    const takePhoto = async () => {
        const hasPermision = await askPermision()
        if (!hasPermision) {
            return
        }
        const img = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9]
        })
        console.log(img)
    }
    return (
        <View>
            <Button title='Сделать фото' onPress={takePhoto} />
            {image ? <Image style={styles.image} cource={{ uri: image }} /> : null}
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
})