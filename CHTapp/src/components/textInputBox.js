import { Text, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    }
  }

  handleTextChange = (text) => {
    this.setState( {text} );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.textContainer}>
            <TextInput
              style = {styles.text}
              cursorColor={CUSTOM_COLORS.black}
              onChangeText={this.handleTextChange}
              value = {this.state.text}
              >          
            </TextInput>
        </View>
      </View>
    )
  }
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

export default TextInputBox