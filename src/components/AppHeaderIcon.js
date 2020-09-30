import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { THEME } from '../theme';

export const AppHeaderIcon = (props) => {
    return <HeaderButton {...props} iconSize={24} color={Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR}
        IconComponent={Ionicons} />
}