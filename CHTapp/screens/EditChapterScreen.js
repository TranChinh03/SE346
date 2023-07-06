import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {IMG_BG1} from '../src/assets/img';
import BackButton from '../src/components/backButton';
import BtnTick from '../src/components/BtnTick';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';
import {IC_RightArrow, IC_RightArrow2} from '../src/assets/iconsvg';
import CourseItem from '../src/components/courseItem';
import CourseAttendedBox from '../src/components/courseAttendedBox';
import LessonBox from '../src/components/lessonBox';
import LessonBox2 from '../src/components/LessonBox2';
import BtnDelete from '../src/components/BtnDelete';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../configs/FirebaseConfig'

const data = [
  {
    id: 'content1',
    time: '20h',
    title: 'C++ for beginers 2023',
    lectureName: 'Tran Minh Chinh',
  },
  {
    id: 'dropdown',
    time: '20h',
    title: 'C++ for beginers 2023',
    lectureName: 'Tran ',
  },
  {
    id: 'content2',
    time: '20h',
    title: 'C++ for beginers 2023',
    lectureName: 'Tran Minh Chinh',
  },
];

const  EditChapterScreen = ({route})  => {
  const {preItem} = route.params;
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([])
  const [title, setTitle] = useState('')

  useEffect (() => {
    LessonList().then(data => setLessons(data));
  })

  
  async function LessonList() {
    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData
      .filter(
        filter =>
          filter.courseAuthor === preItem.courseAuthor &&
          filter.courseTitle === preItem.courseTitle &&
          filter.chapterTitle === preItem.title
      )
    return joinedData;
  }

  const updateChapter = async() => {
    if ( title !== '') {
      firebase
      .firestore()
      .collection('chapters')
      .where('title', '==', preItem.title)
      .where('courseTitle', '==', preItem.courseTitle)
      .where('courseAuthor', '==', preItem.courseAuthor)
      .get().then((querrySnapshot) => {
        if(!querrySnapshot.empty)
        {
          const documentId = querrySnapshot.docs[0].id
          firebase
          .firestore()
          .collection('chapters')
          .doc(documentId)
          .update({
            title: title
          })
    
          firebase
          .firestore()
          .collection('lessons')
          .where('courseTitle', '==', preItem.courseTitle)
          .where('courseAuthor', '==', preItem.courseAuthor)
          .where('chapterTitle', '==', preItem.title)
          .get().then((querrySnapshot) => {
            if(!querrySnapshot.empty)
            {
              const documentId1 = querrySnapshot.docs[0].id
              firebase
              .firestore()
              .collection('lessons')
              .doc(documentId1)
              .update({
                chapterTitle: title
              })
            }
          })
    
          firebase
          .firestore()
          .collection('lessons')
          .where('courseTitle', '==', preItem.title)
          .where('courseAuthor', '==', name.email)
          .get().then((querrySnapshot) => {
            if(!querrySnapshot.empty)
            {
              const documentId1 = querrySnapshot.docs[0].id
              firebase
              .firestore()
              .collection('lessons')
              .doc(documentId1)
              .update({
                courseTitle: title
              })
            }
          })
        }
        else {
          Alert.alert('Please fill full enough information!');
        }
        })}
  }


  return (
    <SafeAreaView style={styles.container}>
    {console.log('preItem',preItem)}
      <ImageBackground
        style={styles.vwImg}
        source={IMG_BG1}
        resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.txtHeader}>Edit Chapter</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.txtChapter}>Chapter name</Text>
        <TextInput
          style={styles.txbChapterName}
          //placehoder={'Name your meeting'}
          onChangeText={(myTitle) => setTitle(myTitle)}
        >
          {preItem.title}
        </TextInput>
        <Text style={styles.txtChapter}>Lesson</Text>
        <TouchableOpacity
          style={styles.conAddLesson}
          onPress={() => navigation.navigate('AddLessonScreen')}
          >
          <Text style={styles.txtInfo}>Add Lesson</Text>
          <IC_RightArrow2 />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', flex: 1.5}}>
          <FlatList
            style={{
              marginTop: scale(20, 'h'),
              marginLeft: scale(5, 'h'),
              marginBottom: scale(80, 'h'),
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            numColumns={1}
            data={lessons}
            renderItem={({item, index}) => {
              return (
                <LessonBox2
                  onPress={() => navigation.navigate('EditLesson')}
                  title={item.lessonTitle}
                  time={item.time}
                />
              );
            }}
          />
          {/* <FlatList
            style={{
              marginTop: scale(20, 'h'),
              marginLeft: scale(5, 'h'),
              marginBottom: scale(80, 'h'),
            }}
            scrollEnabled={true}
            numColumns={1}
            data={data}
            renderItem={({item, index}) => {
              return <BtnDelete title={item.title} time={item.time} />;
            }}
          /> */}
        </View>
      </View>

      <BtnTick />
    </SafeAreaView>
  );
}

export default EditChapterScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    //backgroundColor: 'yellow',
  },
  header: {
    flex: 1,
    backgroundColor: 'orange',
    borderBottomLeftRadius: scale(15, 'w'),
    borderBottomRightRadius: scale(15, 'w'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  content: {
    flex: 5,
    marginLeft: scale(20, 'w'),
    //backgroundColor: 'pink',
  },
  flLesson: {
    marginVertical: scale(15, 'h'),
    //backgroundColor: 'red',
    //alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  vwImg: {
    flex: 1.3,
    //height: '20%',
    justifyContent: 'center',
  },
  vwTitle: {
    height: '50%',
    width: '85%',
    borderColor: 'white',
    backgroundColor: 'rgba(94, 96, 206, 0.5)',
    alignSelf: 'center',
    borderRadius: scale(15, 'w'),
    borderWidth: scale(0.2, 'w'),
    flexDirection: 'row',
    //justifyContent: 'center',
    alignContent: 'center',
  },
  txtHeader: {
    fontFamily: CUSTOM_FONTS.medium,
    fontSize: CUSTOM_SIZES.large,
    color: 'white',
    alignSelf: 'center',
    marginLeft: scale(15, 'w'),
  },
  txtTiltle: {
    fontSize: CUSTOM_SIZES.xLarge,
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.stateBlue,
    marginLeft: scale(30, 'w'),
    marginTop: scale(30, 'h'),
    marginBottom: scale(10, 'h'),
  },
  txbChapterName: {
    height: scale(85, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.large,
    padding: scale(15, 'w'),
  },
  txtChapter: {
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.large,
    fontFamily: CUSTOM_FONTS.medium,
    marginLeft: scale(15, 'w'),
    marginTop: scale(30, 'w'),
    marginBottom: scale(10, 'h'),
  },
  conAddLesson: {
    height: scale(60, 'h'),
    width: scale(320, 'w'),
    borderWidth: scale(1, 'w'),
    borderRadius: scale(15, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15, 'w'),
    flexDirection: 'row',
  },
  txtInfo: {
    color: CUSTOM_COLORS.usBlue,
    fontFamily: CUSTOM_FONTS.regular,
    fontSize: CUSTOM_SIZES.medium,
  },
});
