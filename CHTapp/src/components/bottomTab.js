import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import CUSTOM_COLORS from '../constants/colors';
import {IC_FACEBOOK, IC_FILLEDHEART} from '../assets/icons';
import {
  IC_Book,
  IC_Course,
  IC_Home,
  IC_Profile,
  IC_Schedule,
} from '../assets/iconsvg';
import CUSTOM_SIZES from '../constants/size';

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //actived: 'Foods',
      nav_selected: 'Home',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            this.setState({nav_selected: 'Home'});
          }}>
          <IC_Home
            style={styles.iconStyle}
            fill={
              this.state.nav_selected === 'Home'
                ? CUSTOM_COLORS.primary
                : CUSTOM_COLORS.lightGray
            }
            fill2={
              this.state.nav_selected === 'Home'
                ? CUSTOM_COLORS.primary
                : 'transparent'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            this.setState({nav_selected: 'Course'});
          }}>
          <IC_Book
            style={styles.iconStyle}
            fill={
              this.state.nav_selected === 'Course'
                ? CUSTOM_COLORS.primary
                : CUSTOM_COLORS.lightGray
            }
            fill2={
              this.state.nav_selected === 'Course'
                ? CUSTOM_COLORS.primary
                : 'transparent'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            this.setState({nav_selected: 'Todo'});
          }}>
          <IC_Schedule
            style={styles.iconStyle}
            fill={
              this.state.nav_selected === 'Todo'
                ? CUSTOM_COLORS.primary
                : CUSTOM_COLORS.lightGray
            }
            fill2={
              this.state.nav_selected === 'Todo'
                ? CUSTOM_COLORS.primary
                : 'transparent'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            this.setState({nav_selected: 'Setting'});
          }}>
          <IC_Profile
            style={styles.iconStyle}
            fill={
              this.state.nav_selected === 'Setting'
                ? CUSTOM_COLORS.primary
                : CUSTOM_COLORS.lightGray
            }
            fill2={
              this.state.nav_selected === 'Setting'
                ? CUSTOM_COLORS.primary
                : 'transparent'
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: CUSTOM_COLORS.DarkGray,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 15,
    //backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    //flex: 3,
    width: 100,
    height: 100,
    alignSelf: 'center',
    //borderRadius: CUSTOM_SIZES.medium,
  },
});
