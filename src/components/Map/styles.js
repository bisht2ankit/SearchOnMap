import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    map: {
        width: width,
        height: height
    },
    container: {
        flex: 1
    },
    recentSearchesView: {
        position: 'absolute'
    },
    locationIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 1
    },
    markerIcon: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
})