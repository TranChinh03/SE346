import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IMG_AUTHBACKGROUND, IMG_COURSEBACKGROUND} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../configs/FirebaseConfig';
import StudentCourseScreen from './StudentCourseScreen';
import TeacherCourseScreen from './TeacherCourseScreen';

const CourseScreen = () => {
  const [name, setName] = useState('');

  const navigation = useNavigation();



  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

 
  return (
    <SafeAreaView style={styles.container}>
      {
        name.job === 'Teacher' ? (
          <TeacherCourseScreen/> 
        ) : (<StudentCourseScreen/>)
      }
    </SafeAreaView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
