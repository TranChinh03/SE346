import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IC_Tick2} from '../assets/iconsvg';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default class BtnTick extends Component {
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={this.props.onPress}>
          <IC_Tick2 />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fixedButton: {
    position: 'absolute',
    width: scale(70, 'w'),
    height: scale(70, 'w'),
    borderRadius: scale(70 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    bottom: scale(100, 'h'),
    right: scale(35, 'w'),
    flexDirection: 'row',
    elevation: 7,
  },
  start: {
    fontSize: scale(40, 'w'),
    fontWeight: '300',
    color: CUSTOM_COLORS.white,
  },
});
