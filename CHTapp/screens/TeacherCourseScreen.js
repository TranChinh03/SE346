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
  
  const TeacherCourseScreen = () => {
    // const [currentPage, setCurrentPage] = useState('In Progress');
    // const [inProgress, setInProgress] = useState([]);
    // const [completed, setCompleted] = useState([]);
    // const [favorite, setFavorite] = useState([]);
    const [name, setName] = useState('');

    const [courseList, setCourseList] = useState('');
  
    const navigation = useNavigation();

    async function joinedCourse(curEmail) {
        const courseRef = firebase.firestore().collection('courses');
        const courseSnapshot = await courseRef.get();
        const courseData = courseSnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));
    
        const authorRef = firebase.firestore().collection('users');
        const authorSnapshot = await authorRef.get();
        const authorData = authorSnapshot.docs.map(doc => doc.data());
      
        const joinedData = courseData
        .filter(item => item.author === curEmail)
        .map(firstItem => {
          const  secondItem = authorData.find(item => item.email === firstItem.author);
      
          return {...firstItem, ...secondItem};
        })
      
        return joinedData;
      }

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

      useEffect(() => {
        async function getData() {
          const newCourse = await joinedCourse(name.email)
          setCourseList(newCourse);
        }
    
        getData();
      }, [name.email]);
  
      useEffect(() => {
        // Listen for when the screen is focused again
        const unsubscribe = navigation.addListener('focus', () => {
          firebase
          // Re-fetch data from Firestore
            .firestore()
            .collection('courses')
            .get()
            .then((querySnapshot) => {
              const courses = querySnapshot.docs.map((doc) => doc.data());
              setCourseList(courses);
            });
        }, [courseList]);
    
        return unsubscribe;
      }, [navigation]);
    // async function joinedMyCourse(curEmail, status) {
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
    //     .filter(
    //       firstItem =>
    //         firstItem.student === curEmail && firstItem.status === status,
    //     )
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
  

  
    // useEffect(() => {
    //   async function getData() {
    //     const inProgress = await joinedMyCourse(name.email, 'In Progress');
    //     setInProgress(inProgress);
    //   }
  
    //   getData();
    // });
  
    // useEffect(() => {
    //   async function getData() {
    //     const completed = await joinedMyCourse(name.email, 'Completed');
    //     setCompleted(completed);
    //   }
  
    //   getData();
    // });
  
    // useEffect(() => {
    //   async function getData() {
    //     const favorite = await joinedMyCourse(name.email, 'Favorite');
    //     setFavorite(favorite);
    //   }
  
    //   getData();
    // });
  
    const renderCourses = data => {
      return (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={data}
          renderItem={({item, index}) => {
            return (
              <CourseItem
                key={item.key}
                language={item.programLanguage}
                title={item.title}
                author={item.name}
                rating={item.rate}
                view={item.numofAttendants}
                image={item.image}
                onPress={() =>
                  navigation.navigate('CourseStack', {
                    screen: 'CourseDetail',
                    params: {item: item},
                  })
                }
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{height: scale(20, 'h')}} />}
          showsVerticalScrollIndicator={false}></FlatList>
      );
    };
  
    // const renderMyCourses = () => {
    //   return currentPage === 'In Progress'
    //     ? renderCourses(inProgress)
    //     : currentPage === 'Completed'
    //     ? renderCourses(completed)
    //     : renderCourses(favorite);
    // };
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={IMG_COURSEBACKGROUND}
          resizeMode="cover">
          <View style={styles.container1}>
            <Text style={styles.text}>Hi, {name.name}!</Text>
            <Text style={styles.subText}>
              Set your target and keep trying until you reach it
            </Text>
          </View>
          <View style={styles.container2}>
            {/* <View style={styles.navigateButton}>
              <TouchableOpacity
                onPress={() => setCurrentPage('In Progress')}
                style={
                  currentPage === 'In Progress'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    currentPage === 'In Progress'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  In Progress
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCurrentPage('Completed')}
                style={
                  currentPage === 'Completed'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    currentPage === 'Completed'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCurrentPage('Favorite')}
                style={
                  currentPage === 'Favorite'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    currentPage === 'Favorite'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  Favorite
                </Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.courseContainer}>{renderCourses(courseList)}</View>
          </View>
          
          <View style={styles.space}>
            <View style={[styles.space]}></View>
         </View>

          {/* <View style={styles.container3}>
              <BottomTab/>
          </View> */}
          <TouchableOpacity
            style={styles.fixedButton}
            onPress={() =>
              navigation.navigate('AddOption'
              )
            }>
            <Text style={styles.start}>+</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  };
  
  export default TeacherCourseScreen;
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    image: {
      flex: 1,
    },
    container1: {
      flex: 1,
    },
  
    container2: {
      flex: 4,
      backgroundColor: CUSTOM_COLORS.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    container3: {
      flex: 0.5,
      backgroundColor: CUSTOM_COLORS.white,
    },
    text: {
      color: CUSTOM_COLORS.white,
      fontSize: scale(20, 'w'),
      fontWeight: '500',
      marginTop: scale(44, 'h'),
      marginLeft: scale(18, 'w'),
    },
    subText: {
      color: CUSTOM_COLORS.white,
      fontSize: scale(14, 'w'),
      marginLeft: scale(18, 'w'),
    },
    navigateButton: {
      marginHorizontal: scale(18, 'w'),
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    button1: {
      height: scale(36, 'h'),
      width: scale(100, 'w'),
      backgroundColor: CUSTOM_COLORS.white,
      borderRadius: scale(10, 'w'),
      marginTop: scale(-22, 'h'),
      justifyContent: 'center',
    },
    buttonText1: {
      color: CUSTOM_COLORS.PictionBlue,
      alignSelf: 'center',
      fontSize: scale(13, 'w'),
      fontWeight: '500',
    },
    selectedButton1: {
      height: scale(36, 'h'),
      width: scale(100, 'w'),
      backgroundColor: CUSTOM_COLORS.PictionBlue,
      borderRadius: scale(10, 'w'),
      marginTop: scale(-6, 'h'),
      justifyContent: 'center',
      elevation: 10,
      shadowColor: CUSTOM_COLORS.DarkGray,
    },
    selectedButtonText1: {
      color: CUSTOM_COLORS.white,
      alignSelf: 'center',
      fontSize: scale(13, 'w'),
      fontWeight: '500',
    },
    courseContainer: {
      marginTop: scale(20, 'h'),
      flex: 1,
      marginHorizontal: scale(20, 'w'),
    },
    fixedButton: {
      position: 'absolute',
      width: scale(70, 'w'),
      height: scale(70, 'w'),
      borderRadius: scale(70 / 2, 'w'),
      backgroundColor: CUSTOM_COLORS.PictionBlue,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      bottom: scale(100, 'h'),
      right: scale(35, 'w'),
      flexDirection: 'row',
      elevation: 7,
    },
    start: {
      fontSize: scale(40, 'w'),
      fontWeight: '300',
      color: CUSTOM_COLORS.white,
    },
    space: {
      height: scale(100, 'h'),
      // backgroundColor: 'pink',
    },
  });
  