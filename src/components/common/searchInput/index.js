import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { genericText } from '../../../constants/strings';
import { colors } from '../../../constants/colors';

export const SearchInput = (props) => {
    return (
            <TextInput
                placeholderTextColor={colors.secondaryText}
                placeholder={props.placeholder}
                style={styles.searchInputView}
                onChangeText={(input) => props.onChangeText(input)}
                onFocus={() => props.handleSearchOnFocus(true)}
                onSubmitEditing={() => props.handleSearchOnFocus(false)}
            />
    )
}

SearchInput.defaultProps = {
    placeholder: genericText.SEARCH
}

SearchInput.propTypes = {
    placeholder: PropTypes.string.isRequired
}