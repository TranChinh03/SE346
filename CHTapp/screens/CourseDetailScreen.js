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
  Alert,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  IMG_AUTHBACKGROUND,
  IMG_COURSEBACKGROUND,
  IMG_CPP,
  IMG_CPPBACKGROUND,
  IMG_CSHARP,
  IMG_RUBY,
  IMG_JAVASCRIPT,
  IMG_PYTHON,
} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import StarRating from 'react-native-star-rating-widget';
import {
  IC_GLOBAL,
  IC_HEART,
  IC_INFORMATION,
  IC_NEXT,
} from '../src/assets/icons';
import LessonBox from '../src/components/lessonBox';
import {IMG_LECTURERAVA} from '../src/assets/img';
import Evaluation from '../src/components/evaluation';
import BackButton from '../src/components/backButton';
import {IC_Edit, IC_Heart, IC_LeftArrow} from '../src/assets/iconsvg';
import {firebase} from '../configs/FirebaseConfig';
import formatDuration from '../src/constants/formatDuration';
import {useNavigation} from '@react-navigation/native';
import percentage from '../src/constants/percentage';

const CourseDetailScreen = ({route}) => {
  const {item} = route.params;

  const navigation = useNavigation();

  const [total, setTotal] = useState(0);

  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const [myTitle, setMyTitle] = useState([]);

  const [evaluation, setEvaluation] = useState([]);

  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);

  const [name, setName] = useState('');

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
  }, [name.email]);

  useEffect(() => {
    ChapterList().then(data => setChapters(data));
    LessonList().then(data => setLessons(data));
    EvaluationList().then(data => setEvaluation(data));
    getStarPercentage('5').then(data => setFiveStar(data));
    getStarPercentage('4').then(data => setFourStar(data));
    getStarPercentage('3').then(data => setThreeStar(data));
    getStarPercentage('2').then(data => setTwoStar(data));
    getStarPercentage('1').then(data => setOneStar(data));
    // GetEvaluation().then((data) => setEvaluation(data))
  }, [item.title]);

  // useEffect(() => {
  //   // Listen for when the screen is focused again
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     firebase
  //     .firestore()
  //     .collection('courses')
  //     .where('courseTitle', '==', item.title)
  //     .where('courseAuthor', '==', item.email)
  //     .get().then((querrySnapshot) => {
  //       if(!querrySnapshot.empty)
  //       {
  //         const title = querrySnapshot.docs[0].title;
  //         setMyTitle(title);

  //       }
  //     })
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const renderLessonItem = ({item: lesson}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('LessonDetail')}>
        <LessonBox
          title={lesson.lessonTitle}
          duration={formatDuration(lesson.duration)}
        />
      </TouchableOpacity>
    );
  };

  const renderEvaluationItem = ({item: evaluation}) => {
    return (
      <Evaluation
        name={evaluation.name}
        rating={evaluation.rate}
        date={evaluation.date.toDate().toLocaleDateString('en-GB')}
        comment={evaluation.comment}
      />
    );
  };

  const renderChapterItem = ({item: chapter}) => {
    return (
      <View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.normalText2, {fontWeight: '500'}]}>
            Chapter {chapter.number}:{' '}
          </Text>
          <Text style={styles.normalText2}>{chapter.title}</Text>
        </View>
        <FlatList
          data={lessons}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderLessonItem}
        />
      </View>
    );
  };

  const AverageRate = (rate5, rate4, rate3, rate2, rate1) => {
    const averageRate =
      (5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + rate1) / 100;
    const formatAverage = averageRate.toFixed(1);
    return formatAverage;
  };

  async function ChapterList() {
    const chapeterRef = firebase.firestore().collection('chapters');
    const chapterSnapshot = await chapeterRef.get();
    const chapterData = chapterSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const chapterList = chapterData.filter(
      chapter =>
        chapter.courseTitle === item.title &&
        chapter.courseAuthor === item.author,
    );
    return chapterList;
  }

  async function LessonList() {
    const chapeterRef = firebase.firestore().collection('chapters');
    const chapterSnapshot = await chapeterRef.get();
    const chapterData = chapterSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData
      .filter(
        filter =>
          filter.courseAuthor === item.author &&
          filter.courseTitle === item.title,
      )
      .map(firstItem => {
        const secondItem = chapterData.find(
          item =>
            item.courseAuthor === firstItem.courseAuthor &&
            item.courseTitle === firstItem.courseTitle &&
            item.number === firstItem.numofChapter,
        );

        return {...firstItem, ...secondItem};
      });

    return joinedData;
  }

  async function EvaluationList() {
    const evaluationRef = firebase.firestore().collection('evaluate');
    const evaluationSnapshot = await evaluationRef.get();
    const evaluationData = evaluationSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const userRef = firebase.firestore().collection('users');
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = evaluationData
      .filter(
        filter =>
          filter.courseAuthor === item.author &&
          filter.courseTitle === item.title,
      )
      .map(firstItem => {
        const secondItem = userData.find(
          item => item.email === firstItem.student,
        );

        return {...firstItem, ...secondItem};
      });

    return joinedData;
  }

  const date = item.lastUpdate.toDate();
  const formattedDate = date.toLocaleDateString('en-GB');

  // async function GetEvaluation () {
  //     const evaluationsRef = firebase.firestore().collection('evaluate');
  //     const evaluationSnapshot = await evaluationsRef.get();
  //     const evaluationData = evaluationSnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));

  //     return evaluationData;
  // }

  const getStarPercentage = async rate => {
    const evaluationsRef = firebase.firestore().collection('evaluate');
    const allEvaluationsSnapshot = await evaluationsRef
      .where('courseTitle', '==', item.title)
      .where('courseAuthor', '==', item.author)
      .get();
    const allEvaluationsCount = allEvaluationsSnapshot.size;

    if (allEvaluationsCount === 0) return 0;
    const starEvaluationsSnapshot = await evaluationsRef
      .where('rate', '==', rate)
      .where('courseTitle', '==', item.title)
      .where('courseAuthor', '==', item.author)
      .get();
    const starEvaluationsCount = starEvaluationsSnapshot.size;

    const starPercentage = (starEvaluationsCount / allEvaluationsCount) * 100;

    // const formatStarPercentage = `${starPercentage}%`

    return starPercentage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container1}>
          {item.image === '' ? (
            <Image
              source={IMG_CPPBACKGROUND}
              resizeMode="contain"
              style={styles.image}
            />
          ) : (
            <Image
              source={{uri: item.image}}
              resizeMode="contain"
              style={styles.image}
            />
          )}
          <View style={styles.conOperator}>
            <BackButton onPress={() => navigation.goBack()} type={1} />
            <TouchableOpacity onPress={() => setFavorite(!favorite)}>
              <IC_Heart
                fillH={favorite ? CUSTOM_COLORS.sunsetOrange : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container2}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.description}</Text>
          <View style={styles.horizontalContainer}>
            <Text style={styles.ratingNum}>{item.rate}</Text>
            <View style={styles.rating}>
              <StarRating
                onChange={() => {}}
                maxStars={5}
                starSize={15}
                rating={item.rate}
                starStyle={styles.star}
              />
            </View>
            <Text style={styles.viewerNum}>
              {Number(item.numofAttendants)} học viên
            </Text>
          </View>
          <View style={styles.horizontalContainer}>
            <Text style={styles.normalText}>Create by </Text>
            <Text style={[styles.normalText, styles.authorName]}>
              {item.name}
            </Text>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <Image source={IC_INFORMATION} />
            </View>
            <Text style={[styles.normalText, {marginLeft: scale(7, 'w')}]}>
              Latest update {formattedDate}
            </Text>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <Image source={IC_GLOBAL} />
            </View>
            <Text style={[styles.normalText, {marginLeft: scale(7, 'w')}]}>
              {item.language}
            </Text>
          </View>
          <Text style={styles.categoryText}>Lessons</Text>
          {/* <View style={styles.lessonContainer}>
                      <View style={styles.horizontalContainer}>
                          <Text style={[styles.normalText2, {fontWeight: '500'}]}>Chapter 1: </Text>
                          <Text style={styles.normalText2}>First C++ Program</Text>
                      </View>
                      <View>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                      </View>
                      <View style={styles.horizontalContainer}>
                          <Text style={[styles.normalText2, {fontWeight: '500'}]}>Chapter 2: </Text>
                          <Text style={styles.normalText2}>Variables and Data Types</Text>
                      </View>
                      <View>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                          <LessonBox onPress={()=> this.props.navigation.navigate('LessonDetail')}/>
                      </View>
                      <TouchableOpacity style={styles.buttonContainer}>
                          <Text style={styles.textButton}>See more</Text>
                      </TouchableOpacity>
                  </View> */}

          <FlatList
            data={chapters}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderChapterItem}
          />
          <Text style={[styles.categoryText, {marginTop: scale(50, 'h')}]}>
            Lecturer
          </Text>
          <View style={[styles.horizontalContainer, {height: scale(80, 'h')}]}>
            <Image style={styles.avaImage} source={IMG_LECTURERAVA} />
            <View style={styles.infoLecturer}>
              <Text style={[styles.normalText, {fontWeight: '500'}]}>
                {item.name}
              </Text>
              <Text style={styles.infoText}>{item.phone}</Text>
              <Text style={styles.infoText}>{item.author}</Text>
            </View>
            <View style={styles.infoCourse}>
              <Text style={styles.numCourse}>{item.numofCourse}</Text>
              <Text style={[styles.infoText, {textAlign: 'center'}]}>
                Courses
              </Text>
            </View>
          </View>
          <Text style={[styles.categoryText, {marginTop: scale(20, 'h')}]}>
            Rate this course
          </Text>
          <Text style={styles.infoText}>
            Tell others how do you like this course
          </Text>
          <StarRating
            onChange={() => navigation.navigate('RatingScreen')}
            maxStars={5}
            starSize={scale(40, 'w')}
            rating={0}
            starStyle={[
              styles.star,
              {marginHorizontal: scale(7, 'w'), marginTop: scale(10, 'w')},
            ]}
          />
          <Text style={[styles.categoryText, {marginTop: scale(20, 'h')}]}>
            Reviews
          </Text>
          <Text
            style={[
              styles.categoryText,
              {marginTop: scale(-5, 'h'), color: CUSTOM_COLORS.yellow},
            ]}>
            {AverageRate(fiveStar, fourStar, threeStar, twoStar, oneStar)}
          </Text>
          <View>
            <CusProgressBar percent={fiveStar} rating="5" />
            <CusProgressBar percent={fourStar} rating="4" />
            <CusProgressBar percent={threeStar} rating="3" />
            <CusProgressBar percent={twoStar} rating="2" />
            <CusProgressBar percent={oneStar} rating="1" />
          </View>

          {/* <View style={styles.evaluationContainer}>
                      <Evaluation name= 'Minh Chinh Tran' rating = '5' date = '01/04/2023' comment="Great!"/>
                      <Evaluation name= 'Xuan Thao Vo' rating = '5' date = '05/04/2023' comment="This course helps me a lot!"/>
                      <Evaluation name= 'Nhu Phi Vo' rating = '5' date = '05/04/2023' comment="I really like this course and Mr.Hau"/>
                      <TouchableOpacity style={styles.buttonContainer}>
                          <Text style={styles.textButton}>See more</Text>
                      </TouchableOpacity>
                  </View> */}

          <FlatList
            data={evaluation}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderEvaluationItem}
          />
          <View style={styles.space}>
            <View style={[styles.space]}></View>
          </View>
        </View>
      </ScrollView>
      {item.author === name.email ? (
        <TouchableOpacity
          style={styles.fixedBtnEdit}
          onPress={() =>
            navigation.navigate('CourseStack', {
              screen: 'EditCourse',
              params: {preItem: item},
            })
          }>
          <IC_Edit />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity style={styles.fixedButton}>
        <Text style={styles.start}>Start</Text>
        <Image style={styles.iconNext} source={IC_NEXT} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: CUSTOM_COLORS.white,
  },
  container1: {
    height: scale(254, 'h'),
    width: '100%',
  },

  container2: {
    height: '100%',
    marginHorizontal: scale(20, 'w'),
  },
  conOperator: {
    marginRight: scale(20, 'w'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
  },
  title: {
    color: CUSTOM_COLORS.black,
    fontSize: scale(36, 'w'),
    fontWeight: '500',
  },
  subTitle: {
    color: CUSTOM_COLORS.black,
    fontSize: scale(13, 'w'),
  },
  horizontalContainer: {
    flexDirection: 'row',
    marginTop: scale(10, 'h'),
    alignItems: 'center',
  },
  ratingNum: {
    fontSize: scale(16, 'w'),
    fontWeight: 'bold',
    color: CUSTOM_COLORS.black,
  },
  rating: {
    marginLeft: scale(10, 'w'),
  },
  star: {
    marginHorizontal: 0,
  },
  viewerNum: {
    fontSize: scale(10, 'w'),
    color: CUSTOM_COLORS.black,
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  normalText: {
    color: CUSTOM_COLORS.black,
    fontSize: scale(13, 'w'),
  },
  authorName: {
    fontWeight: 'bold',
  },
  iconContainer: {
    height: scale(20, 'w'),
    width: scale(20, 'h'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: scale(24, 'w'),
    color: CUSTOM_COLORS.black,
    fontWeight: '500',
    marginTop: scale(10, 'h'),
  },
  normalText2: {
    color: CUSTOM_COLORS.black,
    fontSize: scale(16, 'w'),
  },
  lessonContainer: {
    height: scale(580, 'h'),
  },

  buttonContainer: {
    width: scale(154, 'w'),
    height: scale(40, 'h'),
    marginTop: scale(30, 'h'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: CUSTOM_COLORS.FrenchViolet,
    borderRadius: scale(16, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: CUSTOM_COLORS.FrenchViolet,
    fontSize: scale(16, 'w'),
    fontWeight: '500',
  },
  avaImage: {
    borderWidth: 1,
    borderRadius: scale(50, 'w'),
    alignSelf: 'center',
    height: scale(60, 'w'),
    width: scale(60, 'w'),
    marginLeft: scale(10, 'w'),
  },
  infoLecturer: {
    width: scale(180, 'w'),
    height: '100%',
    marginLeft: scale(10, 'w'),
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: CUSTOM_COLORS.black,
  },
  infoText: {
    fontSize: scale(12, 'w'),
    fontWeight: '300',
    color: CUSTOM_COLORS.black,
  },
  infoCourse: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numCourse: {
    fontSize: scale(20, 'w'),
    fontWeight: '600',
    color: CUSTOM_COLORS.black,
    textAlign: 'center',
  },
  evaluationContainer: {
    height: scale(500, 'h'),
  },
  fixedButton: {
    position: 'absolute',
    width: scale(295, 'w'),
    height: scale(55, 'h'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    borderRadius: scale(16, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: scale(90, 'h'),
    flexDirection: 'row',
    elevation: 7,
  },
  start: {
    fontSize: scale(16, 'w'),
    fontWeight: '500',
    color: CUSTOM_COLORS.white,
  },
  iconNext: {
    position: 'absolute',
    right: scale(20, 'w'),
  },

  space: {
    height: scale(400, 'h'),
    // backgroundColor: 'pink',
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
