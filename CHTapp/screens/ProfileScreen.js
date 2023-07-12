import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IMG_PROFILEBACKGROUND, IMG_AVT} from '../src/assets/img';
import {IC_EDIT_PRO5, IC_SETTING} from '../src/assets/icons';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CourseAttendedBox from '../src/components/courseAttendedBox';
import CourseCompletedBox from '../src/components/courseCompletedBox';
import TextDisplayBox from '../src/components/textDisplayBox';
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import { IC_LOGOUT } from '../src/assets/iconsvg';
import { IMG_LOGOUTBACKGROUND } from '../src/assets/imgsvg';
import CUSTOM_FONTS from '../src/constants/fonts';
import BackButton from '../src/components/backButton';
import { connectFirestoreEmulator } from 'firebase/firestore';


const ProfileScreen = () => {
  const navigation = useNavigation();


  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        navigation.replace("Loading")
      })
      .catch(error => alert(error.message))
  }

  const [profile, setProfile] = useState('');


  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setProfile(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgContainer}>
        <ImageBackground
          style={styles.background}
          source={IMG_PROFILEBACKGROUND}
        />
        <View style={{position: 'absolute'}}>
          <BackButton 
          type = {2} 
          onPress = {() => navigation.goBack()}/>
        </View>

        {/* <TouchableOpacity style={styles.whiteCircle}>
          <Image source={IC_SETTING} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.avtContainer}>
          <View style={styles.avtFrame}>
          {profile.ava === '' ? 
            <Image
              source={IMG_AVT}
              style={styles.avt}/>
          : 
          <Image
              source={{uri: profile.ava}}
              style={styles.avt}/>
          }

          </View>
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.nameFrame}>
            <Text style={styles.name}>{profile.name}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Image style={styles.icEdit} source={IC_EDIT_PRO5} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.subNameContainer}>
                    <Text style={styles.subName}>Hyu</Text>
                </View> */}
        </View>

        {/* <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <CourseAttendedBox courses={profile.attendedCourses} />
            </View>
            <View style={styles.contentRow}>
              <CourseCompletedBox courses={profile.completedCourses} />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <TextDisplayBox label="Last name" text={profile.lastname} />
            </View>
            <View style={styles.contentRow}>
              <TextDisplayBox label="First name" text={profile.firstname} />
            </View>
          </View>
        </ScrollView> */}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {profile.job === 'Student' ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.contentRow}>
                <CourseAttendedBox courses={profile.attendedCourses} />
              </View>
              <View style={styles.contentRow}>
                <CourseCompletedBox courses={profile.completedCourses} />
              </View>
            </View>
          ) : null}

          {/* <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <TextDisplayBox label="Last name" text={profile.lastname} />
            </View>
            <View style={styles.contentRow}>
              <TextDisplayBox label="First name" text={profile.firstname} />
            </View>
          </View> */}

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <TextDisplayBox
                label="Date of birth"
                text={profile.birthday}
              />
            </View>
            {/* <View style={styles.contentRow}>
              <TextDisplayBox label="Job" text={profile.job} />
            </View> */}
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextDisplayBox label="Email" text={profile.email} />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextDisplayBox label="Phone" text={profile.phone} />
          </View>

          <View style={styles.logOutContainer}>
                <TouchableOpacity onPress={handleSignOut} style={{
                  flex: 6,
                  padding: scale(10, 'w'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                    <Text style={styles.logouttext}>Log Out  </Text>
                    <IC_LOGOUT></IC_LOGOUT>
                </TouchableOpacity>

                <View style={{flex: 4}}>
                    <IMG_LOGOUTBACKGROUND/>
                </View>
            </View>
            <View style={{height: scale(100, 'h')}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
  },
  bgContainer: {
    flex: 0.25,
  },
  background: {
    height: '120%',
  },
  contentContainer: {
    flex: 0.75,
    backgroundColor: CUSTOM_COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: 'flex',
  },
  avtContainer: {
    flex: 0.2,
  },
  avtFrame: {
    backgroundColor: CUSTOM_COLORS.white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(163, 'w'),
    height: scale(163, 'w'),
    borderRadius: scale(163 / 2, 'w'),
    top: -scale(163 / 2, 'w'),
    overflow: 'hidden',
  },
  avt: {
    width: scale(163 - 5, 'w'),
    height: scale(163 - 5, 'w'),
    borderRadius: scale((163 - 5) / 2, 'w'),
  },
  nameContainer: {
    flex: 0.2,
    display: 'flex',
    justifyContent: 'center',
  },
  nameFrame: {
    flex: 0.65,
    background: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: scale(5, 'h'),
    fontSize: scale(30, 'w'),
    color: CUSTOM_COLORS.gray,
    fontFamily: CUSTOM_FONTS.medium,
    alignSelf: 'center',
  },
  icEdit: {
    marginLeft: scale(5, 'w'),
  },
  subNameContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subName: {
    fontSize: scale(20, 'h'),
    color: CUSTOM_COLORS.black,
    fontWeight: 'light',
    alignSelf: 'center',
  },
  content: {
    //backgroundColor: 'pink',
    flex: 9.25,
    padding: scale(20, 'w'),
  },
  contentRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCircle: {
    height: scale(48, 'w'),
    width: scale(48, 'w'),
    borderRadius: scale(24, 'w'),
    backgroundColor: CUSTOM_COLORS.white,
    position: 'absolute',
    left: scale(10, 'w'),
    top: scale(10, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  logouttext: {
    fontSize: scale(20, 'w'),
    color: CUSTOM_COLORS.usBlue,
  }
});
