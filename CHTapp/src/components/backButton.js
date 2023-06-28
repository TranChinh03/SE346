import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IC_LeftArrow} from '../assets/iconsvg';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default class BackButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <IC_LeftArrow style={styles.iconBack} type={this.props.type} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    //position: 'absolute',
    left: 0,
    marginTop: scale(20, 'h'),
  },
  iconBack: {
    marginLeft: scale(20, 'w'),
  },
});
