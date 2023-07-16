import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_FONTS from '../constants/fonts';
import CUSTOM_COLORS from '../constants/colors';
import {IMG_COURSEBACKGROUND, IMG_CPPBACKGROUND} from '../assets/img';
import {IMG_CPP} from '../assets/img';
import {IC_Star} from '../assets/iconsvg';

export default class ItemSearchCourse extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conContent}>
          <View style={styles.conSub}>
            <View>
              <Text style={styles.txtCourseName}>{this.props.courseName}</Text>
              <Text style={styles.txtDetail}>{this.props.lectureName}</Text>
            </View>
            <View style={{marginBottom: 0, flexDirection: 'row'}}>
              <IC_Star />
              <Text style={styles.txtRate}>{this.props.rate}</Text>
              <View style={styles.divider}></View>
              <Text style={styles.txtDetail2}>{this.props.language}</Text>
            </View>
          </View>
          {this.props.image === '' ? (
            <Image
              source={IMG_CPP}
              resizeMode="contain"
              style={styles.imgCourse}
            />
          ) : (
            <Image
              source={{uri: this.props.image}}
              resizeMode="contain"
              style={styles.imgCourse}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scale(100, 'h'),
    width: '80%',
    //backgroundColor: 'red',
    alignSelf: 'center',
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: CUSTOM_COLORS.lightGray,
    marginVertical: scale(1, 'h'),
  },
  conContent: {
    height: '80%',
    flexDirection: 'row',
    //backgroundColor: 'pink',
    justifyContent: 'space-around',
  },
  imgCourse: {
    height: '100%',
    width: '40%',
    borderRadius: scale(10, 'w'),
  },
  txtCourseName: {
    fontFamily: CUSTOM_FONTS.bold,
    flexWrap: 'wrap',
    color: CUSTOM_COLORS.gray,
    //backgroundColor: 'pink',
  },
  conSub: {
    height: '100%',
    width: '50%',
    //backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  txtDetail: {
    fontFamily: CUSTOM_FONTS.regular,
    flexWrap: 'wrap',
    marginTop: scale(5, 'h'),
    color: CUSTOM_COLORS.gray,
  },
  txtDetail2: {
    fontFamily: CUSTOM_FONTS.regular,
    flexWrap: 'wrap',
    //marginTop: scale(5, 'h'),
    color: CUSTOM_COLORS.gray,
  },
  txtRate: {
    color: CUSTOM_COLORS.yellow,
    fontFamily: CUSTOM_FONTS.bold,
    marginLeft: scale(5, 'w'),
  },
  divider: {
    borderWidth: 1,
    marginHorizontal: scale(10, 'w'),
    borderColor: CUSTOM_COLORS.lightGray,
  },
});
