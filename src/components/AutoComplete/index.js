import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { genericText } from '../../constants/strings';
import PropTypes from "prop-types";

export const AutoCompleteResults = (props) => {

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} style={styles.listContainer}
                onPress={() => props.onPressItem(item)}>
                <Text>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            {
                props.isRecentSearch
                    ?
                    <Text style={styles.primaryText}>{genericText.RECENT_SEARCHES}</Text>
                    : <View />
            }
            <FlatList
                data={props.data}
                renderItem={({ item, index }) => (renderItem(item, index))}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

AutoCompleteResults.defaultProps = {
    isRecentSearch: false
}

AutoCompleteResults.propTypes = {
    isRecentSearch: PropTypes.bool
}