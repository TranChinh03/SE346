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
import CUSTOM_SIZES from '../constants/size';
import {IC_Search} from '../assets/iconsvg';

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
          placeholderTextColor={CUSTOM_COLOR.DarkGray}
          onChangeText={this.props.onChangeText}></TextInput>

        <View style={styles.searchButton}>
          <IC_Search />
        </View>

        {/* <TouchableOpacity
          style={styles.heartButton}
          onPress={() => {
            this.setState({showFavor: !this.state.showFavor});
          }}>
          <Image
            source={this.state.showFavor ? IC_FILLEDHEART : IC_HEART}></Image>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(40, 'h'),
    width: scale(330, 'w'),
    //width: scale(337, 'w'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    // /backgroundColor: 'red',
  },

  input: {
    height: scale(40, 'h'),
    width: scale(280, 'w'),
    //width: scale(287, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.FrenchViolet,
    borderRadius: scale(17, 'w'),
    alignItems: 'center',
    paddingHorizontal: scale(20, 'w'),
    fontSize: CUSTOM_SIZES.small,
  },

  searchButton: {
    //position: 'absolute',
    //right: scale(60, 'w'),
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
