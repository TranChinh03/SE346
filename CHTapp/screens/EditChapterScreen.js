import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
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
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../configs/FirebaseConfig';
import uuid from 'react-native-uuid';

const EditChapterScreen = ({route}) => {
  const {preItem} = route.params;
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  const backButtonAlert = () =>
    Alert.alert('Warning', 'Changes that you made may not be save', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Leave & Discard', onPress: () => navigation.goBack()},
    ]);

  useEffect(() => {
    LessonList().then(data => setLessons(data));
  }, [preItem.title, preItem.courseAuthor, lessons]);

  useEffect(() => {
    console.log('title', title);
  }, [title]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data());
          setTitle(preItem.title);
          console.log('1', title);
        } else {
          console.log('User does not exist');
        }
      });
  }, [preItem.title]);

  async function LessonList() {
    const lessonRef = firebase
      .firestore()
      .collection('lessons')
      .orderBy('openDate');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData.filter(
      filter =>
        filter.courseAuthor === preItem.courseAuthor &&
        filter.courseTitle === preItem.courseTitle &&
        filter.chapterTitle === preItem.title,
    );
    return joinedData;
  }

  const updateChapter = async () => {
    console.log('title1', title);
    if (title !== '') {
      firebase
        .firestore()
        .collection('chapters')
        .where('title', '==', preItem.title)
        .where('courseTitle', '==', preItem.courseTitle)
        .where('courseAuthor', '==', preItem.courseAuthor)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            const documentId = querrySnapshot.docs[0].id;
            firebase.firestore().collection('chapters').doc(documentId).update({
              title: title,
            });

            firebase
              .firestore()
              .collection('lessons')
              .where('courseTitle', '==', preItem.courseTitle)
              .where('courseAuthor', '==', preItem.courseAuthor)
              .where('chapterTitle', '==', preItem.title)
              .get()
              .then(querrySnapshot => {
                if (!querrySnapshot.empty) {
                  querrySnapshot.forEach(doc => {
                    const documentId1 = doc.id;
                    firebase
                      .firestore()
                      .collection('lessons')
                      .doc(documentId1)
                      .update({
                        chapterTitle: title,
                      });
                  });
                }
              });

            firebase
              .firestore()
              .collection('courses')
              .where('title', '==', preItem.courseTitle)
              .where('author', '==', preItem.courseAuthor)
              .get()
              .then(querrySnapshot => {
                if (!querrySnapshot.empty) {
                  const documentId = querrySnapshot.docs[0].id;
                  const data = querrySnapshot.docs[0].data();
                  preItem.image = data.image;
                  preItem.language = data.language;
                  preItem.description = data.description;
                  preItem.openDate = data.openDate;
                  preItem.programLanguage = data.programLanguage;
                  preItem.rate = data.rate;

                  const now = firebase.firestore.Timestamp.now();
                  preItem.title = preItem.courseTitle;
                  preItem.author = preItem.courseAuthor;
                  preItem.lastUpdate = now;

                  console.log('preItem after editing chapter', preItem);
                  navigation.navigate('CourseDetail', {preItem: preItem});
                  Alert.alert('Edit chapter sucessfully!');
                } else {
                  Alert.alert('Please fill full enough information!');
                }
              });
          }
        });
    }
  };

  const data = [
    {id: 'content1', type: 'content1'},
    {id: 'content2', type: 'content2'},
  ];

  const handleDelete = item => {
    Alert.alert(
      'Delete Lesson',
      'Are you sure you want to delete this lesson?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            firebase
              .firestore()
              .collection('lessons')
              .where('courseTitle', '==', item.courseTitle)
              .where('courseAuthor', '==', item.courseAuthor)
              .where('chapterTitle', '==', item.chapterTitle)
              .where('lessonTitle', '==', item.lessonTitle)
              .get()
              .then(querrySnapshot => {
                if (!querrySnapshot.empty) {
                  querrySnapshot.forEach(doc => {
                    const documentId1 = doc.id;
                    firebase
                      .firestore()
                      .collection('lessons')
                      .doc(documentId1)
                      .delete()
                      .then(() => {
                        console.log('Lesson is deleted!');
                      });
                  });
                }
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    if (item.type === 'content1') {
      return (
        <View>
          {/* <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={() => {}}
            value={'Hello'}
          /> */}
          {/* <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(title) => setTitle(title)}
            value={preItem.title}
          /> */}
          <Text style={styles.txtChapter}>Lesson</Text>
          <TouchableOpacity
            style={styles.conAddLesson}
            onPress={() =>
              navigation.navigate('CourseStack', {
                screen: 'AddLessonScreen2',
                params: {preItem: preItem},
              })
            }>
            <Text style={styles.txtInfo}>Add Lesson</Text>
            <IC_RightArrow2 />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
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
                    onPress={() =>
                      navigation.navigate('EditLesson', {preItem: item})
                    }
                    title={item.lessonTitle}
                    time={item.time}
                    onDeletedPress={() => handleDelete(item)}
                  />
                );
              }}
            />
          </View>
          <View style={styles.space}>
            <View style={[styles.space]}></View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={backButtonAlert} />
          <Text style={styles.txtHeader}>Edit Chapter</Text>
        </View>
      </ImageBackground>
      <Text style={[styles.txtChapter, {marginLeft: scale(35, 'w')}]}>
        Chapter name
      </Text>
      <TextInput
        multiline
        style={styles.txbChapterName}
        onChangeText={myTitle => {
          console.log('onChangeText called with:', myTitle);
          setTitle(myTitle);
        }}>
        {preItem.title}
      </TextInput>
      <View style={styles.content}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => (item.id = uuid.v4())}
          renderItem={renderItem}
        />
      </View>

      <BtnTick onPress={() => updateChapter()} />
    </SafeAreaView>
  );
};

export default EditChapterScreen;

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
    borderWidth: scale(1, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: scale(17, 'w'),
    padding: scale(15, 'w'),
    marginLeft: scale(20, 'w'),
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
  space: {
    height: scale(100, 'h'),
    // backgroundColor: 'pink',
  },
});
