import {StyleSheet, Dimensions} from 'react-native';
import { colors } from '../../constants/colors';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainContainer: {
        maxHeight: 200,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 6,
        position: 'absolute',
        top: 94
    },
    listContainer: {
        marginHorizontal: 10,
        borderBottomWidth: 0.4,
        borderColor: colors.borderColor,
        paddingVertical: 10,
        width: width - 32,
        paddingRight: 10
    },
    primaryText: {
        color: colors.secondaryText,
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10
    }
})