import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLOR from '../constants/colors';
import {
  IC_SEARCH,
  IC_FILLEDHEART,
  IC_HEART,
  IC_INFORMATION,
  IC_PLAYCIRCLE,
  IC_DROPDOWN,
} from '../assets/icons';
import {SelectList} from 'react-native-dropdown-select-list';
import DropDown from './dropDown';
import BtnDelete from './BtnDelete';

export class LessonBox2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeColor: this.props.type,
      title: '',
      time: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.container1} onPress={this.props.onPress}>
        <TouchableOpacity style={styles.playIcon} onPress={this.props.onPress}>
          <Image source={IC_PLAYCIRCLE}></Image>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.duration}>{this.props.time}</Text>
          </View>
          <View style={styles.docsContainer}>
            <Text style={styles.docs}>PDF</Text>
            <Text style={[styles.docs, {marginLeft: scale(30, 'w')}]}>
              Test
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <BtnDelete onPress = {this.props.onDeletedPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  container1: {
    flexDirection: 'row',
    height: scale(90, 'h'),
    width: scale(280, 'w'),
    borderWidth: 1,
    borderRadius: scale(15, 'w'),
    borderColor: 'rgba(83, 144, 217, .5)',
    alignItems: 'center',
    marginTop: scale(15, 'h'),
  },
  playIcon: {
    marginLeft: scale(10, 'w'),
  },
  textContainer: {
    width: scale(230, 'w'),
    height: '100%',
    marginLeft: scale(10, 'w'),
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    //justifyContent: 'space-around',
  },
  title: {
    width: scale(170, 'w'),
    color: CUSTOM_COLOR.usBlue,
    fontSize: scale(16, 'w'),
  },
  docsContainer: {
    flexDirection: 'row',
    marginTop: scale(5, 'h'),
  },
  docs: {
    color: CUSTOM_COLOR.usBlue,
    fontSize: scale(13, 'w'),
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  duration: {
    color: CUSTOM_COLOR.usBlue,
    fontSize: scale(10, 'w'),
    opacity: 0.8,
    textDecorationLine: 'underline',
    marginLeft: scale(10, 'w'),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default LessonBox2;
