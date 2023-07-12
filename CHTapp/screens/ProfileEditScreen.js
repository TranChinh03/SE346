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
import TextInputDisplayBox from '../src/components/textInputDisplayBox';
import {IC_Tick} from '../src/assets/iconsvg';
import BackButton from '../src/components/backButton';

const ProfileEditScreen = () => {
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  // const usersRef = firebase.firestore().

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setProfile(snapshot.data());
          setName(profile.name);
          // setFirstName(profile.firstname);
          // setLastName(profile.lastname);
          setBirthday(profile.birthday);
          // setJob(profile.job);
          setEmail(profile.email);
          setPhone(profile.phone);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  const updateProfile = () => {
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }
    // if (lastName !== undefined) {
    //   updateData.lastname = lastName;
    // }
    // if (firstName !== undefined) {
    //   updateData.firstname = firstName;
    // }
    if (birthday !== undefined) {
      updateData.birthday = birthday;
    }
    // if (job !== undefined) {
    //   updateData.job = job;
    // }
    if (email !== undefined) {
      updateData.email = email;
      // updateData1.student = email;
    }
    if (phone !== undefined) {
      updateData.phone = phone;
    }

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update(updateData);

    if (profile.job === 'Student') {
      firebase
        .firestore()
        .collection('study')
        .where('student', '==', profile.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            const documentId = querrySnapshot.docs[0].id;
            firebase
              .firestore()
              .collection('study')
              .doc(documentId)
              .update({student: email});
          }
        });
    } else {
      firebase
        .firestore()
        .collection('courses')
        .where('author', '==', profile.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            const documentId = querrySnapshot.docs[0].id;
            firebase
              .firestore()
              .collection('courses')
              .doc(documentId)
              .update({author: email});
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgContainer}>
        <TouchableOpacity style={styles.background}> 
          <ImageBackground
            source={IMG_PROFILEBACKGROUND}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            top: scale(20, 'h'),
            width: '100%',
          }}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.screenTitleContainer}>
            <Text style={styles.screenTitle}>Edit Profile</Text>
          </View>
          <TouchableOpacity
            style={styles.whiteCircle}
            onPress={() => {
              updateProfile();
              navigation.navigate('SettingStack', {screen: 'Profile'});
            }}>
            <IC_Tick></IC_Tick>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.avtContainer}>
          <View style={styles.avtFrame}>
            <Image style={styles.avt} source={IMG_AVT} />
          </View>
        </View>

        <View style={styles.nameContainer}>
          <View style={styles.nameFrame}>
            <TextInput
              onChangeText={myName => setName(myName)}
              style={styles.name}
              cursorColor={CUSTOM_COLORS.black}>
              {profile.name}
            </TextInput>
          </View>
          {/* <View style={styles.subNameContainer}>
                      <Text style={styles.subName}>Hyu</Text>
                  </View> */}
        </View>
        {/* 
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={styles.contentRow}>
                          <CourseAttendedBox courses = {profile.attendedCourses}/>
                      </View>
                      <View style={styles.contentRow}>
                          <CourseCompletedBox courses = {profile.completedCourses}/>
                      </View>
                  </View>
                  
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View style={styles.contentRow}>
                          <TextInputDisplayBox label = 'Last name' text = {profile.lastname}/>
                      </View>
                      <View style={styles.contentRow}>
                          <TextInputDisplayBox label = 'First name' text = {profile.firstname}/>
                      </View>
                  </View>
                  </ScrollView> */}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* {profile.job === 'Student' ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.contentRow}>
                <CourseAttendedBox courses={profile.attendedCourses} />
              </View>
              <View style={styles.contentRow}>
                <CourseCompletedBox courses={profile.completedCourses} />
              </View>
            </View>
          ) : null} */}

          {/* <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <TextInputDisplayBox
                label="Last name"
                text={profile.lastname}
                onChangeText={myLastName => setLastName(myLastName)}
              />
            </View>
            <View style={styles.contentRow}>
              <TextInputDisplayBox
                label="First name"
                text={profile.firstname}
                onChangeText={myFirstName => setFirstName(myFirstName)}
              />
            </View>
          </View> */}

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.contentRow}>
              <TextInputDisplayBox
                label="Date of birth"
                text={profile.birthday}
              />
            </View>
            {/* <View style={styles.contentRow}>
              <TextDisplayBox label="Job" text={profile.job} />
            </View> */}
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInputDisplayBox
              label="Email"
              text={profile.email}
              onChangeText={myEmail => setEmail(myEmail)}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInputDisplayBox
              label="Phone"
              text={profile.phone}
              onChangeText={myPhone => setPhone(myPhone)}
            />
          </View>
          <View style={{height: scale(100, 'h')}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
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
  },
  nameFrame: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: CUSTOM_COLORS.FrenchViolet,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(50, 'w'),
    marginTop: scale(15, 'h'),
    paddingLeft: scale(10, 'w'),
  },
  name: {
    fontSize: scale(30, 'w'),
    color: CUSTOM_COLORS.black,
    alignSelf: 'center',
  },
  icEdit: {
    marginLeft: scale(5, 'w'),
  },
  subNameContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subName: {
    fontSize: scale(20, 'w'),
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
    height: scale(42, 'w'),
    width: scale(42, 'w'),
    borderRadius: scale(42 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.white,
    position: 'absolute',
    right: scale(20, 'w'),
    //top: scale(20, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitleContainer: {
    backgroundColor: CUSTOM_COLORS.white,
    alignSelf: 'center',
    position: 'absolute',
    //top: scale(32.5, 'w'),
    height: scale(25, 'w'),
    width: scale(130, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(50, 'w'),
  },
  screenTitle: {
    fontSize: scale(13, 'w'),
    color: CUSTOM_COLORS.stateBlue,
    fontWeight: 'bold',
  },
});
