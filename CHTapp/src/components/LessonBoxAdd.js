import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
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
import CUSTOM_SIZES from '../constants/size';
import CUSTOM_FONTS from '../constants/fonts';
import LessonBox2 from './LessonBox2';

var lesson = [
  {
    id: '1',
    title: 'C++ for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '2',
    title: 'C# for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '3',
    title: 'Python for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '4',
    title: 'JavaScript for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '5',
    title: 'React Native for Beginners 2023',
    time: '30m20s',
  },
];

data = [
  {
    key: '1',
    value: 'PDF',
  },
  {
    key: '2',
    value: 'Test',
  },
];

export class LessonBoxAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {showFavor: false};
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.chapterTitle}>Chapter 1: </Text>
          <Text style={styles.chapterTitle2}>First C++ Program </Text>
        </View>
        {/* <View style={styles.container}>
          <TouchableOpacity
            style={styles.playIcon}
            onPress={this.props.onPress}>
            <Image source={IC_PLAYCIRCLE}></Image>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Environment Setup</Text>
              <Text style={styles.duration}>30m:32s</Text>
            </View>
            <View style={styles.docsContainer}>
              <Text style={styles.docs}>PDF</Text>
              <Text style={[styles.docs, {marginLeft: scale(30, 'w')}]}>
                Test
              </Text>
            </View>
          </View>
          <DropDown />
        </View> */}
        <FlatList
          style={{height: '100%'}}
          scrollEnabled={false}
          numColumns={1}
          data={lesson}
          renderItem={({item, index}) => {
            return (
              <LessonBox2
                // type={true}
                title={item.title}
                time={item.time}
              />
            );
          }}></FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(60, 'h'),
    width: scale(319, 'w'),
    borderWidth: 1,
    borderRadius: scale(15, 'w'),
    borderColor: 'rgba(60, 58, 54, .5)',
    alignItems: 'center',
    marginTop: scale(10, 'h'),
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
  },
  title: {
    color: CUSTOM_COLOR.black,
    fontSize: scale(16, 'w'),
  },
  docsContainer: {
    flexDirection: 'row',
    marginTop: scale(5, 'h'),
  },
  docs: {
    color: CUSTOM_COLOR.gray,
    fontSize: scale(13, 'w'),
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  duration: {
    color: CUSTOM_COLOR.gray,
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
  chapterTitle: {
    fontSize: CUSTOM_SIZES.large,
    color: CUSTOM_COLOR.usBlue,
    fontFamily: CUSTOM_FONTS.semibold,
    marginTop: scale(30, 'h'),
  },
  chapterTitle2: {
    fontSize: CUSTOM_SIZES.large,
    color: CUSTOM_COLOR.usBlue,
    fontFamily: CUSTOM_FONTS.regular,
    marginTop: scale(30, 'h'),
  },
});

export default LessonBoxAdd;
