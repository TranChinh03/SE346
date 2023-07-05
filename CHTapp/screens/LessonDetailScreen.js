import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  IMG_AUTHBACKGROUND,
  IMG_COURSEBACKGROUND,
  IMG_CPP,
  IMG_CPPBACKGROUND,
  IMG_VIDEO,
} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';

import {
  IC_DOWNLOAD,
  IC_FAVORITE,
  IC_FILLEDFAVORITE,
  IC_GLOBAL,
  IC_INFORMATION,
  IC_NEXT,
} from '../src/assets/icons';
import LessonBox from '../src/components/lessonBox';
import {IMG_LECTURERAVA} from '../src/assets/img';
import Evaluation from '../src/components/evaluation';
import BackButton from '../src/components/backButton';
import {IC_Edit, IC_LeftArrow} from '../src/assets/iconsvg';
import {IC_EYE, IC_VIEW} from '../src/assets/icons';
import CusRatingBar from '../src/components/CusRatingBar';

const LessonDetailScreen = ({route}) => {
  const navigation = useNavigation()
  const {item, item1} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container1}>
          <ImageBackground
            style={styles.image}
            source={IMG_VIDEO}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.lessonTitle}>{item.lessonTitle}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{item1.name}</Text>
            {/* <Text style={[styles.infoText, {marginLeft: scale(20, 'w')}]}>
              Times: 30 mins
            </Text> */}
            {/* <View style={styles.numOfView}>
              <Text style={styles.infoText}>320</Text>
              <Image style={{marginLeft: scale(5, 'w')}} source={IC_VIEW} />
            </View> */}
          </View>
          {/* <Text style={styles.description}>
            This is the first lesson in the course C++ for beginners. The goal
            of this lesson is to help you get familiar with CodeLearn and
            setting up the C++ programming environment.
          </Text> */}
          <View style={styles.downloadContainer}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Material:</Text>
            </View>
            <TouchableOpacity style={styles.downloadBox}>
              <Text style={styles.downloadText}>Download</Text>
              <Image source={IC_DOWNLOAD} />
            </TouchableOpacity>
          </View>
          <View style={styles.downloadContainer}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Test:</Text>
            </View>
            <TouchableOpacity style={styles.downloadBox}>
              <Text style={styles.downloadText}>Download</Text>
              <Image source={IC_DOWNLOAD} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>

          {/* <View style={styles.evaluataionBar}>
            <CusRatingBar />
            <TouchableOpacity
              style={styles.iconFavor}
              onPress={() => {
                this.setState({addFavor: !this.state.addFavor});
              }}>
              <Image
                source={
                  this.state.addFavor === true
                    ? IC_FILLEDFAVORITE
                    : IC_FAVORITE
                }></Image>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fixedBtnEdit}
        onPress={() =>
          navigation.navigate('AddChapterScreen', {
            txtHeader: 'Edit Chapter',
          })
        }>
        <IC_Edit />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LessonDetailScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: CUSTOM_COLORS.white,
  },

  container1: {
    height: scale(175, 'h'),
    width: '100%',
  },
  container2: {
    hright: '100%',
    marginHorizontal: scale(15, 'w'),
  },

  image: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: scale(36, 'w'),
    color: CUSTOM_COLORS.black,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: scale(13, 'w'),
    fontWeight: '400',
    color: CUSTOM_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numOfView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: scale(13, 'w'),
    color: CUSTOM_COLORS.black,
    fontWeight: '400',
    marginTop: scale(10, 'h'),
  },
  downloadContainer: {
    flexDirection: 'row',
    marginTop: scale(15, 'h'),
    alignItems: 'center',
  },
  downloadBox: {
    flexDirection: 'row',
    width: scale(115, 'w'),
    height: scale(25, 'h'),
    borderWidth: 1,
    borderColor: 'rgba(60,58,54, 0.5)',
    borderRadius: scale(7, 'w'),
    paddingHorizontal: scale(12, 'w'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadText: {
    fontSize: scale(13, 'w'),
    textDecorationLine: 'underline',
  },
  infoTextContainer: {
    width: scale(65, 'w'),
  },
  nextButton: {
    width: scale(235, 'w'),
    height: scale(44, 'h'),
    borderRadius: scale(16, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLORS.PictionBlue,
    marginTop: scale(45, 'h'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: scale(16, 'w'),
    fontWeight: '500',
    alignSelf: 'center',
    color: CUSTOM_COLORS.PictionBlue,
  },
  evaluataionBar: {
    marginTop: scale(20, 'h'),
    marginHorizontal: scale(20, 'w'),
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40, 'h'),
  },
  iconFavor: {
    position: 'absolute',
    right: 0,
  },
  fixedBtnEdit: {
    position: 'absolute',
    width: scale(50, 'w'),
    height: scale(50, 'w'),
    borderRadius: scale(50 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.skyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    bottom: scale(160, 'h'),
    right: scale(35, 'w'),
    flexDirection: 'row',
    elevation: 7,
  },
});
