import { Text, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default TextInputDisplayBox = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.textContainer}>
          <TextInput onChangeText={props.onChangeText} style={styles.text} cursorColor={'#74786D'}>{props.text}</TextInput>
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
        paddingLeft: 10,
        borderColor: CUSTOM_COLORS.FrenchViolet,
        width: '100%',
        
    },
    text: {
        fontSize: scale(14, 'w'),
        color: '#74786D',

    },
})
