import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';
import {IC_BIN} from '../assets/icons';
import {IC_Line} from '../assets/iconsvg';

export default class BtnDelete extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.btnBorder} onPress={this.props.onPress}>
            <Text style={styles.txtDelete}>-</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scale(90, 'h'),
    justifyContent: 'center',
    // /backgroundColor: 'pink',
    marginVertical: scale(7, 'h'),
    marginLeft: scale(10, 'w')
  },
  btnBorder: {
    height: scale(35, 'h'),
    width: scale(35, 'h'),
    borderRadius: scale(35 / 2, 'h'),
    borderWidth: scale(1, 'w'),
    borderColor: CUSTOM_COLORS.sunsetOrange,
    padding: 0,
    justifyContent: 'center',
  },
  txtDelete: {
    fontSize: scale(20, 'w'),
    //fontWeight: 100,
    color: CUSTOM_COLORS.sunsetOrange,
    alignSelf: 'center',
  },
});
