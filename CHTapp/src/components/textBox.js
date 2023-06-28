import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IC_HIDE, IC_SHOW} from '../assets/icons';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      placeholder: props.placeholder,
      secureTextEntry: props.secureTextEntry || false,
      intialSecure: props.secureTextEntry || false,
      isShow: false,
    };
  }

  handleTextChange = text => {
    this.setState({text});
  };

  render() {
    const {text, placeholder, secureTextEntry} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          // value={text}
          placeholder={placeholder}
          placeholderTextColor={CUSTOM_COLORS.gray}
          secureTextEntry={secureTextEntry}
          cursorColor={CUSTOM_COLORS.black}
          onChangeText={this.props.onChangeText}></TextInput>
        {this.state.intialSecure ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.setState({
                isShow: !this.state.isShow,
                secureTextEntry: !this.state.secureTextEntry,
              });
            }}>
            <Image
              style={styles.icon}
              source={this.state.isShow ? IC_HIDE : IC_SHOW}></Image>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: scale(304, 'w'),
    height: scale(47, 'h'),
    borderWidth: 1,
    borderColor: '#BEBAB3',
    padding: 10,
    borderRadius: scale(12, 'w'),
    padding: 0,
    paddingLeft: scale(15, 'w'),
    flexDirection: 'row',
  },
  textInput: {
    width: '85%',
    color: CUSTOM_COLORS.black,
    fontSize: scale(14, 'w'),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: scale(20, 'w'),
    height: scale(20, 'h'),
    marginLeft: scale(8, 'w'),
  },
});

export default TextBox;
