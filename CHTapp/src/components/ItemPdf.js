import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';
import BtnDelete from './BtnDelete';

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
          <Text style={styles.txtPdf} numberOfLines={1}>
            {this.props.title}
          </Text>
          <TouchableOpacity
            style={styles.btnBorder}
            onPress={this.props.onPress}>
            <Text style={styles.txtDelete}>-</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conPdf: {
    marginHorizontal: scale(15, 'w'),
    height: scale(45, 'h'),
    width: scale(160, 'h'),
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
    width: scale(100, 'w'),
  },
  btnBorder: {
    height: scale(30, 'h'),
    width: scale(30, 'h'),
    borderRadius: scale(30 / 2, 'h'),
    borderWidth: scale(1, 'w'),
    borderColor: CUSTOM_COLORS.sunsetOrange,
    backgroundColor: CUSTOM_COLORS.sunsetOrange,
    //padding: 0,
    justifyContent: 'center',
  },
  txtDelete: {
    fontSize: scale(20, 'w'),
    //fontWeight: 100,
    color: CUSTOM_COLORS.white,
    alignSelf: 'center',
  },
});
