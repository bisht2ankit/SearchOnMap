import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { fetchCurrentLocation } from '../../utils.js';
import { LATITUDE_DELTA, LONGITUDE_DELTA, DISTANCE_RADIUS } from '../../constants';
import { SearchInput } from '../common/searchInput';
import { getAutoCompleteResults, geocodeApi, clearAutoCompleteResults, saveRecentSearches } from '../../redux/actions';
import { connect } from 'react-redux';
import { AutoCompleteResults } from '../AutoComplete';
import navigation from '../../assets/navigation.png';
import marker from '../../assets/marker.png';

const MapComponent = (props) => {

    const [region, setRegion] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    const [mapLoaded, setMapLoaded] = useState(false);
    const [isFocusedSearch, setIsFocusedSearch] = useState(false);

    useEffect(() => {
        /**
         * useEffect hook works here as a componentDidMount method
         */
        useCurrenetLocation();
    }, [])

    const useCurrenetLocation = async () => {
        const currentLoc = await fetchCurrentLocation();
        if (currentLoc) {
            const region = {
                latitude: currentLoc.latitude,
                longitude: currentLoc.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            setRegion(region);
            setMapLoaded(true)
        } else {
            setMapLoaded(true)
        }
    }

    const renderMap = () => {
        return (
            <MapView
                region={region}
                style={styles.map}
                showsUserLocation
                loadingEnabled
            >   
                {renderSearchInput()}
                {renderMarker()}
            </MapView>
        )
    }

    const renderMarker = () => {
        return (
            <Image source={marker} style={styles.markerIcon} />
        )
    }

    const renderLocationButton = () => {
        return (
            <TouchableOpacity onPress={() => useCurrenetLocation()}>
                <Image source={navigation} style={styles.locationIcon} />
            </TouchableOpacity>
        )
    }

    const renderSearchInput = () => {
        return (
            <SearchInput
                onChangeText={onChangeSearchInput}
                handleSearchOnFocus={handleSearchOnFocus}
            />
        )
    }
   
    const handleSearchOnFocus = (isFocused) => {
        setIsFocusedSearch(isFocused);
    }

    const renderAutoCompleteResults = () => {
        return (
            <AutoCompleteResults
                data={props.places}
                onPressItem={onPressAutoCompleteItem}
            />
        )
    }

    const onPressAutoCompleteItem = async (item) => {
        const queryParams = { address: item.description }
        const res = await geocodeApi(queryParams);
        if (res) {
            const geometry = res.geometry.location;
            const region = {
                latitude: geometry.lat,
                longitude: geometry.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            setRegion(region);

            /**
             * setting search input isFocused to false to hide the autocomplete results in main logic.
             */
            setIsFocusedSearch(false);

            props.saveRecentSearches(item);
            props.clearAutoCompleteResults();
        }
    }

    const onChangeSearchInput = async (input) => {
        if (region && region.latitude) {
            const queryParams = {
                input: input,
                radius: DISTANCE_RADIUS,
                location: `${region.latitude},${region.longitude}`
            }
            props.getAutoCompleteResults(queryParams);
        }
    }

    const renderRecentSearches = () => {
        return (
            <AutoCompleteResults
                data={props.recentSearches}
                onPressItem={onPressAutoCompleteItem}
                isRecentSearch={true}
            />
        )
    }

    return (
        <View style={styles.container}>
            
            {
                mapLoaded ? renderMap() : <View />
            }
            {isFocusedSearch && props.recentSearches && props.recentSearches.length > 0 ? renderRecentSearches() : <View />}
            {props.places && props.places.length > 0 ? renderAutoCompleteResults() : <View />}
            {renderLocationButton()}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.places,
        recentSearches: state.recentSearches
    }
}

export default connect(mapStateToProps, {
    getAutoCompleteResults,
    clearAutoCompleteResults,
    saveRecentSearches
})(MapComponent);