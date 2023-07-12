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
import {useFocusEffect} from '@react-navigation/native';
import {IMG_AUTHBACKGROUND, IMG_COURSEBACKGROUND} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../configs/FirebaseConfig';

const CourseScreen = ({route}) => {
  const {item} = route.params;
  const [currentPage, setCurrentPage] = useState(item);
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [name, setName] = useState('');
  const [curAccount, setCurAccount] = useState('')

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
          console.log('name', name)
        } else {
          console.log('User does not exist');
        }
      });
  }, [name.email, favorite]);

  async function joinedAllCourses() {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => doc.data());

    const joinedData = courseData.map(firstItem => {
      const secondItem = authorData.find(
        item => item.email === firstItem.author,
      );

      return {...firstItem, ...secondItem};
    });

    return joinedData;
  }

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

  async function joinedMyFavorite() {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const userRef = firebase.firestore().collection('users');
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        setCurAccount(snapshot.data());
      } else {
        console.log('User does not exist');
      }
    });
    console.log('curAccount', curAccount.email)
    const filterUser = userData.filter(filter => filter.email === curAccount.email);
    if (filterUser.length > 0) {
      const favoriteCourse = filterUser[0].favoriteCourses
        .filter(filter => filter.isFavor === true)
        .map(firstItem => {
          const secondItem = courseData.find(
            item =>
              item.title === firstItem.courseTitle &&
              item.author === firstItem.courseAuthor
          );
          const thirdItem = authorData.find(item => item.email === secondItem.author);
          return { ...firstItem, ...secondItem, ...thirdItem };
        });
    } else {
      console.log("Don't have filerUser")
    }


    // const joinedData = userData
    //   .filter(filter => filter.email === curEmail)
    //   .map(firstItem => {
    //     let secondItem;
    //     let thirdItem;
    //     if (firstItem.favoriteCourses){
    //       firstItem.favoriteCourses.find(subItem => {
    //         if (subItem.isFavor === true) {
    //           secondItem = courseData.find(
    //             item =>
    //               item.title === subItem.courseTitle &&
    //               item.author === subItem.courseAuthor,
    //           );
    //           thirdItem = authorData.find(
    //             item => item.email === secondItem.author
    //           )
    //         }
    //       }); 
    //       return {...firstItem, ...secondItem, ...thirdItem}; 
    //     }
    //     else {
    //       return;
    //     }
    //   });
    // console.log('joinedData', joinedData)
    // console.log('joinedMyFavorite', joinedData[0].favoriteCourses)
    return favoriteCourse;
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Fetch new data and update state here
  //     const fetchData = async () => {
  //       const response = await fetch('https://se346-cht.firebaseapp.com');
  //       const data = await response.json();
  //       setData(data);
  //     };
  //     fetchData();
  //   }, [])
  // );


  useEffect(() => {
    async function getData() {
      const allCourses = await joinedAllCourses();
      setAllCourses(allCourses);
    }

    getData();
  }, [allCourses]);

  useEffect(() => {
    async function getData() {
      const myCourses = await joinedMyCourses();
      setMyCourses(myCourses);
    }

    getData();
  }, [myCourses]);

  useEffect(() => {
    async function getData() {
      const favorite = await joinedMyFavorite();
      setFavorite(favorite);
    }

    getData();
  }, [favorite]);

  const renderCourses = data => {
    return (
      <FlatList
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}      
        renderItem={({item, index}) => {
          return (
            <CourseItem
              language={item.programLanguage}
              title={item.title}
              author={item.name}
              rating={item.rate}
              view={item.numofAttendants}
              image={item.image}
              onPress={() =>
                navigation.navigate('CourseStack', {
                  screen: 'CourseDetail',
                  params: {preItem: item},
                })
              }
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{height: scale(20, 'h')}} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} ></FlatList>
    );
  };



  const renderMyCourses = () => {
    return currentPage === 'AllCourses'
      ? renderCourses(allCourses)
      : currentPage === 'MyCourses'
      ? renderCourses(myCourses)
      : favorite && favorite[0] !== undefined
      ? renderCourses(favorite)
      : null;
  };
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
          <View style={styles.navigateButton}>
            <TouchableOpacity
              onPress={() => setCurrentPage('AllCourses')}
              style={
                currentPage === 'AllCourses'
                  ? styles.selectedButton1
                  : styles.button1
              }>
              <Text
                style={
                  currentPage === 'AllCourses'
                    ? styles.selectedButtonText1
                    : styles.buttonText1
                }>
                All Courses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentPage('MyCourses')}
              style={
                currentPage === 'MyCourses'
                  ? styles.selectedButton1
                  : styles.button1
              }>
              <Text
                style={
                  currentPage === 'MyCourses'
                    ? styles.selectedButtonText1
                    : styles.buttonText1
                }>
                My Courses
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
                My Favorite
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courseContainer}>{renderMyCourses()}</View>
        </View>
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => navigation.navigate('AddOption')}>
          <Text style={styles.start}>+</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CourseScreen;

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
});
