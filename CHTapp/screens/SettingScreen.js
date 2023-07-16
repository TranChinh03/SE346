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
import {IMG_LOGOUTBACKGROUND} from '../src/assets/imgsvg';
import {IC_SEARCH, IC_VIEW_MORE} from '../src/assets/icons';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';

const SettingScreen = () => {
  const [myCourse, setMyCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const renderCourses = () => {
    const navigation = useNavigation();
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
              //params: {item: 'MyCourses'},
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
        {/* <FlatList
          style={styles.coursesList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CourseItem
              key={item.key}
              language={item.programLanguage}
              title={item.title}
              author={item.name}
              rating={item.rate}
              view={item.numofAttendants}
              style={{marginRight: scale(20, 'w')}}
              image={item.image}
              onPress={() =>
                navigation.navigate('CourseStack', {
                  screen: 'CourseDetail',
                  params: {item: item},
                })
              }
            />
          )}
        /> */}
      </View>
    );
  };

  // async function joinedMyCourse(curEmail) {
  //   const courseRef = firebase.firestore().collection('courses');
  //   const courseSnapshot = await courseRef.get();
  //   const courseData = courseSnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   const authorRef = firebase.firestore().collection('users');
  //   const authorSnapshot = await authorRef.get();
  //   const authorData = authorSnapshot.docs.map(doc => doc.data());

  //   const studyRef = firebase.firestore().collection('study');
  //   const studySnapshot = await studyRef.get();
  //   const studyData = studySnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   const joinedData = studyData
  //     .filter(firstItem => firstItem.student === curEmail)
  //     .map(firstItem => {
  //       const secondItem = courseData.find(
  //         item =>
  //           item.author === firstItem.courseAuthor &&
  //           item.title === firstItem.courseTitle,
  //       );

  //       const thirdItem = authorData.find(
  //         item => item.email === secondItem.author,
  //       );

  //       return {...firstItem, ...secondItem, ...thirdItem};
  //     });

  //   return joinedData;
  // }

  // async function joinedMyCourse2(curEmail) {
  //   const courseRef = firebase.firestore().collection('courses');
  //   const courseSnapshot = await courseRef.get();
  //   const courseData = courseSnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   const authorRef = firebase.firestore().collection('users');
  //   const authorSnapshot = await authorRef.get();
  //   const authorData = authorSnapshot.docs.map(doc => doc.data());

  //   const joinedData = courseData
  //     .filter(item => item.author === curEmail)
  //     .map(firstItem => {
  //       const secondItem = authorData.find(
  //         item => item.email === firstItem.author,
  //       );

  //       return {...firstItem, ...secondItem};
  //     });

  //   return joinedData;
  // }

  // async function joinedCourse() {
  //   //const navigation = useNavigation();
  //   const courseRef = firebase.firestore().collection('courses');
  //   const courseSnapshot = await courseRef.get();
  //   const courseData = courseSnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   const authorRef = firebase.firestore().collection('users');
  //   const authorSnapshot = await authorRef.get();
  //   const authorData = authorSnapshot.docs.map(doc => doc.data());

  //   const joinedData = courseData.map(firstItem => {
  //     const secondItem = authorData.find(
  //       item => item.email === firstItem.author,
  //     );

  //     return {...firstItem, ...secondItem};
  //   });

  //   return joinedData;
  // }

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

  async function joinedMyCourses() {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => doc.data());

    const joinedData = courseData
      .filter(filter => filter.author === name.email)
      .map(firstItem => {
        const secondItem = authorData.find(
          item => item.email === firstItem.author,
        );
        return {...firstItem, ...secondItem};
      });

    return joinedData;
  }

  useEffect(() => {
    async function getData() {
      const myCourses = await joinedMyCourses();
      setData(myCourses);
    }

    getData();
  }, [data]);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  // const [profile, setProfile] = useState('');

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then(snapshot => {
  //       if (snapshot.exists) {
  //         setProfile(snapshot.data());
  //       } else {
  //         console.log('User does not exist');
  //       }
  //     });
  //   }, [name.email]);

  //   useEffect(() => {
  //       async function getData() {
  //         if (name.job === 'Student') {
  //           const myCourse = (await joinedMyCourse(name.email)).slice(0, 5);
  //           setMyCourse(myCourse);
  //         } else {
  //           const myCourse = (await joinedMyCourse2(name.email)).slice(0, 5);
  //           setMyCourse(myCourse);
  //         }
  //       }

  //       getData();
  //     }, [myCourse]);

  //     useEffect(() => {
  //       async function getData() {
  //         const newCourse = (await joinedCourse())
  //           .sort((a, b) => b.openDate - a.openDate)
  //           .slice(0, 5);
  //         setNewCourse(newCourse);
  //       }

  //       getData();
  //     }, [newCourse]);

  return (
    <SafeAreaView style={styles.container}>
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
              {name.ava === '' ? (
                <Image source={IMG_AVT} style={styles.avt} />
              ) : (
                <Image source={{uri: name.ava}} style={styles.avt} />
              )}
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
      {/* <View style={styles.settingContainer} >
                <View style={styles.settingLabel}>
                    <Text style={styles.label}>Setting</Text>
                </View>

                <View style={[styles.settingContent, {display: 'flex'}]}>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.FrenchViolet}]}>
                                <IC_Language/>
                            </View>
                        </View>
                        <View style={{flex: 6}}>
                            <View style={{    
                                width: '100%',
                                height: scale(36, 'w'),
                                display: 'flex', 
                                justifyContent: 'center', 
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: scale(10, 'w'),
                                paddingRight: scale(10, 'w')}}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.itemText}>Language</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <Text style={{fontSize: scale(14, 'w')}}>English</Text>
                                    </View>
                            </View>
                        </View>
                        <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                            <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                <IC_RightArrow type={1}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.PictionBlue}]}>
                                <IC_Notification/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Notification</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                    <IC_RightArrow type={1}/>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <View style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.stateBlue}]}>
                                <IC_Moon/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Dark Mode</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                </View>
                            </View>
                    </View>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.Aquamarine}]}>
                                <IC_Help/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Notification</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                    <IC_RightArrow type={1}/>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View> */}
      <View style={{flex: 3, padding: scale(20, 'w')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderCourses()}
        </ScrollView>
      </View>
      {/* <View style={styles.logOutContainer}> */}
      {/* <TouchableOpacity
          onPress={handleSignOut}
          style={{
            flex: 6,
            padding: scale(10, 'w'),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.logouttext}>Log Out </Text>
          <IC_LOGOUT></IC_LOGOUT>
        </TouchableOpacity> */}

      <View style={{flex: 2.8, alignSelf: 'flex-end'}}>
        <IMG_LOGOUTBACKGROUND />
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
