import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default class ItemPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.conPdf}>
          <View style={styles.conDecor}></View>
          <Text style={styles.txtPdf}>{this.props.title}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conPdf: {
    marginHorizontal: scale(15, 'w'),
    height: scale(45, 'h'),
    width: scale(150, 'h'),
    borderRadius: scale(5, 'h'),
    borderWidth: scale(1, 'h'),
    borderColor: CUSTOM_COLORS.usBlue,
    flexDirection: 'row',
  },
  conDecor: {
    backgroundColor: CUSTOM_COLORS.usBlue,
    width: '15%',
  },
  txtPdf: {
    color: CUSTOM_COLORS.usBlue,
    alignSelf: 'center',
    marginLeft: scale(10, 'w'),
    textDecorationLine: 'underline',
  },
});
