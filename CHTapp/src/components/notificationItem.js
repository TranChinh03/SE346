import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export class NotificationItem extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(50, 'h'),
    marginTop: scale(20, 'h'),
  },
  textContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: CUSTOM_COLORS.FrenchViolet,
    width: '85%',
  },
  text: {
    fontSize: scale(14, 'w'),
    color: 'black',
    textAlign: 'center',
  },
});

export default NotificationItem;
