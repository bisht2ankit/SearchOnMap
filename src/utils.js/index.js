import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { buttonTitle } from '../constants/strings';

export const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
            if(info && info.coords){
                resolve(info.coords);
            } else {
                reject();
            }
        });
    })
}

export const handleApiResponseErrorCase = (error) => {
    let alertMessage = '';
    if (error.response) {
        if (error.response.status === 401) {
            alertMessage = 'Unauthorised Login';
        } else if (error.response.status === 500) {
            alertMessage = 'Technical issue';
        } else {
            alertMessage = error.response && error.response.data &&  error.response.data.message ? error.response.data.message : "";
        }
    } else if (error.request) {
        console.error("No response from server", error.request);
    } else {
        console.error('Unknown error', error.message);
    }
    Alert.alert(
        "",
        alertMessage,
        [{ text: buttonTitle.OK }],
        { cancelable: true }
    );
}