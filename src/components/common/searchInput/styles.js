import {StyleSheet} from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
    searchInputView: {
        marginTop: 50,
        borderWidth: 0.4,
        borderColor: colors.borderColor,
        marginHorizontal: 16,
        height: 44,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        color: colors.primaryText
    }
})