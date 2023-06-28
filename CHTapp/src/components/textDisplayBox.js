import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default TextDisplayBox = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.textContainer}>
          <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: scale(10, 'w'),
        width: '100%'
    },
    label: {
        color: CUSTOM_COLORS.Grape,
        fontSize: scale(12, 'w'),
        marginBottom: 5,
        marginLeft: 10,
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: CUSTOM_COLORS.FrenchViolet,
        width: '100%',
    },
    text: {
        fontSize: scale(14, 'w'),
        color: '#74786D',
    },
})
