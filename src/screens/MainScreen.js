import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export const MainScreen = ({ navigation }) => {
    const goToPost = () => {
        navigation.navigate('Post')
    }

    return (
        <View style={styles.center}>
            <Text>
                main screen
            </Text>
            <Button title={'go to post'} onPress={goToPost} />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})