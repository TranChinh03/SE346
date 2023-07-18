import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import BackButton from '../src/components/backButton';
import scale from '../src/constants/responsive';
import CUSTOM_COLORS from '../src/constants/colors';
import {IMG_AVT, IMG_CPP} from '../src/assets/img';
import {
  IC_RightArrow,
  IC_Help,
  IC_Language,
  IC_Moon,
  IC_Notification,
  IC_LOGOUT,
  IC_RightArrowLine,
  IC_Course2,
  IC_AddCourse,
  IC_LOGOUT2,
} from '../src/assets/iconsvg';
// import SwitchButton from '../src/components/switch'
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
// import {IMG_LOGOUTBACKGROUND} from '../src/assets/imgsvg';
import {IC_SEARCH, IC_VIEW_MORE} from '../src/assets/icons';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';
import { IMG_LOGOUTBACKGROUND } from '../src/assets/img';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  
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
  }, [name]);

  const renderCourses = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.titlePartCourses}
          onPress={() =>
            navigation.navigate('CourseStack', {
              screen: 'Course',
              params: {item: 'MyCourses'},
            })
          }>
          <IC_Course2 />
          <Text style={styles.categoryName}>My Courses</Text>
          <View style={styles.loadAllPart}>
            <Text style={styles.loadAll}>View All </Text>
            <IC_RightArrowLine stroke={CUSTOM_COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.titlePartCourses}
          onPress={() =>
            navigation.navigate('CourseStack', {
              screen: 'AddOption',
            })
          }>
          <IC_AddCourse />
          <Text style={styles.categoryName}>Add Items</Text>
          <View style={styles.loadAllPart}>
            <Text style={styles.loadAll}>View All </Text>
            <IC_RightArrowLine stroke={CUSTOM_COLORS.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.titlePartCourses, {justifyContent: 'flex-start'}]}
          onPress={handleSignOut}>
          <IC_LOGOUT2 />
          <Text style={[styles.categoryName, {marginLeft: scale(30, 'w')}]}>
            Log out
          </Text>
        </TouchableOpacity>
      
      </View>
    );
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace('Loading');
      })
      .catch(error => alert(error.message));
  };


  return (
    <SafeAreaView style={styles.container}>
    {console.log('name1',name)}
      <View style={styles.backContainer}>{/* <BackButton type={1}/> */}</View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Setting</Text>
      </View>
      <View style={styles.accountContainer}>
        <View style={styles.accountLabel}>
          <Text style={styles.label}>Account</Text>
        </View>
        <View style={styles.accountContent}>
          <View style={{flex: 3}}>
            <View style={styles.avtFrame}>
              {/* {name.ava !== '' && name ? (
                <Image source={{uri: name.ava}} style={styles.avt} />
              ) : (
                <Image source={IMG_AVT} style={styles.avt} />
              )} */}
              {name ? (
                name.ava !== '' ? 
                <Image source={{uri: name.ava}} style={styles.avt} /> :
                <Image source={IMG_AVT} style={styles.avt} />
              ) : null}
            </View>
          </View>
          <View style={{flex: 5, padding: scale(20, 'w')}}>
            <Text style={styles.name}>{name.name}</Text>
          </View>
          <View style={{flex: 2, padding: scale(10, 'w')}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.arrowContainer}>
              <IC_RightArrow />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 3, padding: scale(20, 'w')}}>
      <View>
          {renderCourses()}
      </View>
      </View>
    

      <View style={{flex: 2.8, alignSelf: 'flex-end'}}>
        {/* <IMG_LOGOUTBACKGROUND /> */}
        <Image source={IMG_LOGOUTBACKGROUND}/>
      </View>
      {/* </View> */}
      {/* <View style={{height: scale(100, 'h')}} /> */}
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
  },
  backContainer: {
    flex: 0.75,
  },
  titleContainer: {
    flex: 0.75,
    paddingLeft: scale(38, 'w'),
  },
  title: {
    fontSize: CUSTOM_SIZES.xxLarge,
    fontFamily: CUSTOM_FONTS.bold,
    color: CUSTOM_COLORS.black,
  },
  accountContainer: {
    flex: 2,
    display: 'flex',
    borderBottomColor: CUSTOM_COLORS.lightGray,
    borderBottomWidth: scale(1, 'w'),
    borderRadius: scale(50, 'w'),
  },
  accountLabel: {
    justifyContent: 'center',
    paddingLeft: scale(38, 'w'),
    flex: 3,
  },
  accountContent: {
    flex: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avtFrame: {
    backgroundColor: CUSTOM_COLORS.white,
    alignSelf: 'flex-end',
    width: scale(50, 'w'),
    height: scale(50, 'w'),
    borderRadius: scale(25, 'w'),
    overflow: 'hidden',
  },
  avt: {
    width: scale(50, 'w'),
    height: scale(50, 'w'),
    borderRadius: scale(50 / 2, 'w'),
  },
  name: {
    fontSize: scale(14, 'w'),
    color: CUSTOM_COLORS.gray,
    fontWeight: 'bold',
  },
  subName: {
    fontSize: scale(14, 'w'),
    color: CUSTOM_COLORS.gray,
  },
  arrowContainer: {
    width: scale(45, 'w'),
    height: scale(45, 'w'),
    backgroundColor: CUSTOM_COLORS.usBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10, 'w'),
  },
  settingContainer: {
    flex: 5,
    display: 'flex',
  },
  settingLabel: {
    justifyContent: 'center',
    paddingLeft: scale(38, 'w'),
    flex: 1.5,
  },
  settingContent: {
    flex: 8.5,
    display: 'flex',
  },
  settingItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  icFrame: {
    width: scale(36, 'w'),
    height: scale(36, 'w'),
    borderRadius: scale(18, 'w'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
  },
  logOutContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: scale(20, 'w'),
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.gray,
  },
  itemText: {
    fontSize: scale(14, 'w'),
    color: CUSTOM_COLORS.gray,
  },
  logouttext: {
    fontSize: scale(20, 'w'),
    color: CUSTOM_COLORS.usBlue,
  },
  titlePartCourses: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: scale(25, 'h'),
    marginLeft: scale(25, 'h'),
    marginBottom: scale(5, 'h'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: CUSTOM_SIZES.large,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.gray,
  },
  loadAllPart: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: scale(12, 'w'),
    alignItems: 'center',
    color: CUSTOM_COLORS.black,
  },
  loadAll: {
    color: CUSTOM_COLORS.gray,
    marginRight: scale(10, 'h'),
  },
});
