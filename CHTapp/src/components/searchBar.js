import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLOR from '../constants/colors';
import {IC_SEARCH, IC_FILLEDHEART, IC_HEART} from '../assets/icons';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {showFavor: false};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          placeholderTextColor={CUSTOM_COLOR.DarkGray}></TextInput>

        <TouchableOpacity style={styles.searchButton}>
          <Image source={IC_SEARCH}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => {
            this.setState({showFavor: !this.state.showFavor});
          }}>
          <Image
            source={this.state.showFavor ? IC_FILLEDHEART : IC_HEART}></Image>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(34, 'h'),
    width: scale(337, 'w'),
    alignItems: 'center',
  },

  input: {
    height: scale(34, 'h'),
    width: scale(287, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.FrenchViolet,
    borderRadius: scale(17, 'w'),
    alignItems: 'center',
    paddingLeft: scale(12, 'w'),
  },

  searchButton: {
    position: 'absolute',
    right: scale(60, 'w'),
    height: scale(34, 'h'),
    width: scale(40, 'w'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartButton: {
    position: 'absolute',
    right: 0,
    height: scale(34, 'h'),
    width: scale(40, 'w'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
