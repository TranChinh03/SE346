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
  Alert,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {IMG_PROFILEBACKGROUND, IMG_AVT, IMG_CPP} from '../src/assets/img';
import {IC_EDIT_PRO5, IC_SETTING} from '../src/assets/icons';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CourseAttendedBox from '../src/components/courseAttendedBox';
import CourseCompletedBox from '../src/components/courseCompletedBox';
import TextDisplayBox from '../src/components/textDisplayBox';
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import TextInputDisplayBox from '../src/components/textInputDisplayBox';
import {
  IC_Calendar,
  IC_Camera,
  IC_Camera2,
  IC_Tick,
} from '../src/assets/iconsvg';
import BackButton from '../src/components/backButton';
import uuid from 'react-native-uuid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import CUSTOM_SIZES from '../src/constants/size';
import DatePicker from 'react-native-date-picker';
import CUSTOM_FONTS from '../src/constants/fonts';

const ProfileEditScreen = () => {
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  // const [lastName, setLastName] = useState('');
  // const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState(null);

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
          setBirthday(profile.birthday);
          setEmail(profile.email);
          setPhone(profile.phone);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  const backButtonAlert = () =>
    Alert.alert('Warning', 'Changes that you made may not be save', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Leave & Discard', onPress: () => navigation.goBack()},
    ]);

  const updateProfile = async () => {
    const updateData = {};

    const imageUrl = await handleUpload();

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

    if (imageUrl !== undefined) {
      updateData.ava = imageUrl;
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

  const handleButtonPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        console.log('imageUri', imageUri);
      }
    });
  };

  const handleUpload = async () => {
    if (imageUri) {
      try {
        const reference = storage().ref(`images/${Date.now()}.jpg`);
        const task = reference.putFile(imageUri);
        task.on('state_changed', snapshot => {
          console.log(
            `${
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }% completed`,
          );
        });

        await task;
        const url = await reference.getDownloadURL();
        console.log('Image uploaded to Firebase storage:', url);
        return url;

        // const pathToFile = `${utils.FilePath.imageUri}`

        // reference.put(imageUri).then((snapshot) => {
        //   console.log('test',snapshot.ref.getDownloadURL())
        //   return snapshot.ref.getDownloadURL();
        // });
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgContainer}>
        <ImageBackground
          source={IMG_PROFILEBACKGROUND}
          style={styles.background}
        />
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            top: scale(20, 'h'),
            width: '100%',
          }}>
          <BackButton onPress={backButtonAlert} />
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
          {/* <TouchableOpacity
            style={styles.avtFrame}
            onPress={() => handleButtonPress()}>
            <Image style={styles.avt} source={IMG_AVT} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.avtFrame}
            onPress={() => handleButtonPress()}>
            {imageUri ? (
              <Image style={styles.avt} source={{uri: imageUri}} />
            ) : profile.ava === '' ? (
              <Image style={styles.avt} source={IMG_AVT} />
            ) : (
              <Image style={styles.avt} source={{uri: profile.ava}} />
            )}
          </TouchableOpacity>
          <View style={styles.frameCamera}>
            <IC_Camera2 style={styles.camera} />
          </View>
        </View>
        {/* <View style={styles.nameContainer}>
          <View style={styles.nameFrame}>
            <TextInput
              onChangeText={myName => setName(myName)}
              style={styles.name}
              cursorColor={CUSTOM_COLORS.black}>
              {profile.name}
              Text={'Xuan Thao'}
            </TextInput>
          </View>
          {/* <View style={styles.subNameContainer}>
                      <Text style={styles.subName}>Hyu</Text>
                  </View> */}
        {/* </View> */}
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

          <Text style={styles.txtLabel}>Date of birth</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.conDate}
              onPress={() => setOpen(true)}>
              <Text style={styles.txtDate}>{profile.birthday}</Text>
              <IC_Calendar
                stroke={CUSTOM_COLORS.primary}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={new Date()}
              onConfirm={date => {
                setOpen(false);
                setBirthday(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
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
  txtLabel: {
    color: CUSTOM_COLORS.Grape,
    fontSize: scale(12, 'w'),
    marginBottom: scale(5, 'w'),
    marginLeft: scale(20, 'w'),
    marginTop: scale(20, 'w'),
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
    alignSelf: 'center',
    //marginHorizontal: scale(50, 'w'),
    marginTop: scale(15, 'h'),
    paddingLeft: scale(10, 'w'),
    height: scale(60, 'h'),
    width: scale(300, 'h'),
  },
  name: {
    fontSize: CUSTOM_SIZES.xLarge,
    color: CUSTOM_COLORS.gray,
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
  frameCamera: {
    height: scale(40, 'h'),
    width: scale(40, 'h'),
    borderRadius: scale(40 / 2, 'h'),
    backgroundColor: 'white',
    borderColor: CUSTOM_COLORS.primary,
    borderWidth: scale(0.5, 'w'),
    alignSelf: 'center',
    position: 'absolute',
    top: scale(45, 'h'),
    right: scale(120, 'h'),
    justifyContent: 'center',
  },
  camera: {
    alignSelf: 'center',
  },
  conDate: {
    borderColor: CUSTOM_COLORS.primary,
    borderWidth: scale(1, 'w'),
    height: scale(50, 'w'),
    width: scale(200, 'w'),
    borderRadius: scale(15, 'w'),
    marginLeft: scale(10, 'w'),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  txtDate: {
    color: CUSTOM_COLORS.primary,
    alignSelf: 'center',
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
  },
});
