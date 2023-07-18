import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextBox,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import scale from '../src/constants/responsive';
import {assets} from '../react-native.config';
import {IMG_BG1, IMG_CPP, IMG_TODOBG1} from '../src/assets/img';
import BackButton from '../src/components/backButton';
import ListItemCustom from '../src/components/ListItemCustom';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_COLORS from '../src/constants/colors';
import {IC_Camera, IC_RightArrow, IC_RightArrow2} from '../src/assets/iconsvg';
import DropDownPicker from 'react-native-dropdown-picker';
import {SpeedDial} from '@rneui/themed';
import LessonBox from '../src/components/lessonBox';
import LessonBoxAdd from '../src/components/LessonBoxAdd';
import {useNavigation} from '@react-navigation/native';
import BtnDelete from '../src/components/BtnDelete';
import BtnTick from '../src/components/BtnTick';
import {firebase} from '../configs/FirebaseConfig';
import uuid from 'react-native-uuid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const EditCourseScreen = ({route}) => {
  const {preItem} = route.params;
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(preItem.programLanguage);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(preItem.language);
  const [programLanguage, setProgramLanguage] = useState([
    {label: 'Python', value: 'Python'},
    {label: 'Java', value: 'Java'},
    {label: 'Ruby', value: 'Ruby'},
    {label: 'C#', value: 'C#'},
    {label: 'C++', value: 'C++'},
    {label: 'JavaScript', value: 'Javascript'},
  ]);

  const [items, setItems] = useState([
    {label: 'English', value: 'English'},
    {label: 'VietNamese', value: 'Vietnamese'},
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');

  const [myProgramLanguage, setMyProgramLanguage] = useState('');

  const [name, setName] = useState('');

  const [imageUri, setImageUri] = useState(null);
  const [chapters, setChapters] = useState([]);

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
    ChapterList().then(data => setChapters(data));
  }, [preItem.title, preItem.author]);

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

  async function ChapterList() {
    const chapeterRef = firebase
      .firestore()
      .collection('chapters')
      .orderBy('openDate');
    const chapterSnapshot = await chapeterRef.get();
    const chapterData = chapterSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const chapterList = chapterData.filter(
      chapter =>
        chapter.courseTitle === preItem.title &&
        chapter.courseAuthor === preItem.author,
    );
    return chapterList;
  }

  const renderChapterItem = ({item: chapter, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditChapter', {preItem: chapter});
        }}>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.normalText2, {fontWeight: '500'}]}>
            Chapter {index + 1}:{' '}
          </Text>
          <Text style={styles.normalText2}>{chapter.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    if (item.type === 'content1') {
      return (
        <View>
          <Text style={styles.txtTiltle}>Thumbnail</Text>
          <View style={styles.vwThumnail}>
            <TouchableOpacity
              style={styles.btnThumnail}
              onPress={handleButtonPress}>
              <IC_Camera style={styles.icCamera} />
              <Text style={styles.txtThumnail}>Upload from your device</Text>
            </TouchableOpacity>
            <View style={styles.currentThumnail}>
              {/* <Image
                    style={styles.imgThumnail}
                    source={{uri: preItem.image}}
                    resizeMode="cover"
                  /> */}
              {imageUri ? (
                <Image
                  source={{uri: imageUri}}
                  style={styles.imgThumnail}
                  resizeMode="cover"
                />
              ) : preItem.image === '' ? (
                <Image
                  source={IMG_CPP}
                  style={styles.imgThumnail}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{uri: preItem.image}}
                  style={styles.imgThumnail}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
          <Text style={styles.txtTiltle}>Title</Text>
          <TextInput
            multiline
            style={styles.txtInput}
            onChangeText={myTitle => setTitle(myTitle)}>
            {preItem.title}
          </TextInput>
          <Text style={styles.txtTiltle}>Description</Text>
          <TextInput
            multiline
            style={styles.txtInput2}
            onChangeText={myDescription => setDescription(myDescription)}>
            {preItem.description}
          </TextInput>
          <Text style={styles.txtTiltle}>Program Language</Text>
        </View>
      );
    } else if (item.type === 'dropdown') {
      return (
        <View>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open}
              value={value}
              items={programLanguage}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setProgramLanguage}
              multiple={false}
              defaultValue={preItem.programLanguage}
              // mode="BADGE"
              // badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={myProgramLanguage =>
                setMyProgramLanguage(myProgramLanguage)
              }
            />
          </View>
          <Text style={styles.txtTiltle}>Language</Text>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open1}
              value={value1}
              items={items}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems}
              multiple={false}
              mode="BADGE"
              defaultValue={preItem.language}
              badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={myLanguage => setLanguage(myLanguage)}
            />
          </View>

          <View>
            <Text style={styles.txtTiltle}>Chapters in this course: </Text>
            <FlatList
              data={chapters}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => (item.id = uuid.v4())}
              renderItem={renderChapterItem}
            />
          </View>

          <TouchableOpacity
            style={styles.conAddLesson}
            onPress={() =>
              navigation.navigate('CourseStack', {
                screen: 'AddChapterScreen2',
                params: {preItem: preItem},
              })
            }>
            <Text style={styles.txtInfo}>Add Chapter</Text>
            <IC_RightArrow2 />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.space}>
            <View style={[styles.space]}></View>
          </View>
        </View>
      );
    }
  };

  const data = [
    {id: 'content1', type: 'content1'},
    {id: 'dropdown', type: 'dropdown'},
    {id: 'content2', type: 'content2'},
  ];

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
          setDescription(preItem.description);
          setMyProgramLanguage(preItem.programLanguage);
          setLanguage(preItem.language);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  const now = firebase.firestore.Timestamp.now();

  const updateCourse = async () => {
    const imageUrl = await handleUpload();

    console.log('imageUrl', imageUrl);

    if (
      title !== '' &&
      description !== '' &&
      language !== '' &&
      myProgramLanguage !== ''
    ) {
      firebase
        .firestore()
        .collection('courses')
        .where('title', '==', preItem.title)
        .where('author', '==', name.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            const documentId = querrySnapshot.docs[0].id;
            if (imageUrl) {
              preItem.image = imageUrl;
              console.log('preItem.image', preItem.image);
              console.log('Hi');
              firebase
                .firestore()
                .collection('courses')
                .doc(documentId)
                .update({
                  title: title,
                  description: description,
                  language: language,
                  programLanguage: myProgramLanguage,
                  lastUpdate: now,
                  image: imageUrl,
                });
            } else {
              console.log('Hello1');
              firebase
                .firestore()
                .collection('courses')
                .doc(documentId)
                .update({
                  title: title,
                  description: description,
                  language: language,
                  programLanguage: myProgramLanguage,
                  lastUpdate: now,
                });
            }
          }
        });

      firebase
        .firestore()
        .collection('chapters')
        .where('courseTitle', '==', preItem.title)
        .where('courseAuthor', '==', name.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            querrySnapshot.forEach(doc => {
              const documentId = doc.id;
              firebase
                .firestore()
                .collection('chapters')
                .doc(documentId)
                .update({
                  courseTitle: title,
                });
            });
          }
        });

      firebase
        .firestore()
        .collection('evaluate')
        .where('courseTitle', '==', preItem.title)
        .where('courseAuthor', '==', name.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            querrySnapshot.forEach(doc => {
              const documentId = doc.id;
              firebase
                .firestore()
                .collection('evaluate')
                .doc(documentId)
                .update({
                  courseTitle: title,
                });
            });
          }
        });

      firebase
        .firestore()
        .collection('lessons')
        .where('courseTitle', '==', preItem.title)
        .where('courseAuthor', '==', name.email)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            querrySnapshot.forEach(doc => {
              const documentId = doc.id;
              firebase
                .firestore()
                .collection('lessons')
                .doc(documentId)
                .update({
                  courseTitle: title,
                });
            });
          }
        });

      firebase
        .firestore()
        .collection('users')
        .get()
        .then(querrySnapshot => {
          querrySnapshot.forEach(doc => {
            if (doc.exists) {
              const documentId = doc.id;
              const courses = doc.data().favoriteCourses;
              if (courses) {
                const index = courses.findIndex(
                  course =>
                    course.courseTitle === preItem.title &&
                    course.courseAuthor === name.email,
                );
                if (index !== -1) {
                  courses[index].courseTitle = title;
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(documentId)
                    .update({
                      favoriteCourses: courses,
                    });
                }
              }
            }
          });
        });

      preItem.title = title;
      (preItem.description = description),
        (preItem.language = language),
        (preItem.programLanguage = myProgramLanguage);

      navigation.navigate('CourseStack', {
        screen: 'CourseDetail',
        params: {preItem: preItem},
      });
    } else {
      Alert.alert('Please fill full enough information!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={backButtonAlert} />
          <Text style={styles.txtHeader}>Edit course</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <BtnTick
        onPress={() => {
          updateCourse();
        }}
      />
    </SafeAreaView>
  );
};

export default EditCourseScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
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
    fontSize: CUSTOM_SIZES.large,
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.usBlue,
    marginLeft: scale(30, 'w'),
    marginTop: scale(50, 'h'),
    marginBottom: scale(10, 'h'),
  },
  txtInput: {
    height: scale(85, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: scale(17, 'w'),
    padding: scale(15, 'w'),
  },
  txtInput2: {
    height: scale(200, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: scale(17, 'w'),
    padding: scale(15, 'w'),
  },
  btnThumnail: {
    width: scale(150, 'w'),
    backgroundColor: 'rgba(83, 144, 217, 0.2)',
    borderRadius: scale(15, 'w'),
    justifyContent: 'center',
  },
  vwThumnail: {
    height: scale(100, 'h'),
    width: '90%',
    alignSelf: 'center',
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentThumnail: {
    width: scale(150, 'w'),
    height: scale(100, 'h'),
    borderColor: 'rgba(83, 144, 217, 0.2)',
    borderWidth: 1,
    borderRadius: scale(15, 'w'),
  },
  imgThumnail: {
    width: scale(150, 'w'),
    height: scale(100, 'h'),
    borderRadius: scale(15, 'w'),
  },
  icCamera: {
    alignSelf: 'center',
  },
  txtThumnail: {
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.xSmall,
    marginTop: scale(5, 'h'),
    alignSelf: 'center',
  },
  conDropDown: {
    height: scale(45, 'h'),
    width: scale(320, 'w'),
    //backgroundColor: 'yellow',
    alignSelf: 'center',
    //marginLeft: scale(15, 'w'),
  },
  dropDown: {
    borderColor: CUSTOM_COLORS.usBlue,
    //color: CUSTOM_COLORS.usBlue,
    //width: '80%',
    borderRadius: scale(15, 'w'),
  },
  txtDropDown: {
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    backgroundColor: 'transparent',
  },
  condropdown2: {
    borderColor: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
  },
  btnSd: {
    color: CUSTOM_COLORS.usBlue,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  conSpeedDial: {
    height: scale(100, 'h'),
    width: scale(320, 'h'),
    //backgroundColor: 'yellow',
    alignSelf: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSD: {
    height: scale(65, 'h'),
    width: scale(65, 'w'),
    borderRadius: scale(65 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.usBlue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtSD: {
    color: 'white',
    fontSize: CUSTOM_SIZES.xxLarge,
  },
  txtSDAction: {
    color: 'white',
    fontSize: CUSTOM_SIZES.large,
    alignSelf: 'center',
  },
  spAction: {
    height: scale(45, 'h'),
    width: scale(150, 'h'),
    borderRadius: scale(45 / 3, 'h'),
    marginLeft: scale(15, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    justifyContent: 'center',
  },
  space: {
    height: scale(200, 'h'),
    // backgroundColor: 'pink',
  },
  horizontalContainer: {
    flexDirection: 'row',
    marginTop: scale(10, 'h'),
    alignItems: 'center',
    marginLeft: scale(30, 'w'),
  },
  normalText2: {
    color: CUSTOM_COLORS.black,
    fontSize: CUSTOM_SIZES.medium,
    textDecorationLine: 'underline',
  },
  conAddLesson: {
    height: scale(60, 'h'),
    width: scale(320, 'w'),
    marginTop: scale(30, 'w'),
    borderWidth: scale(1, 'w'),
    borderRadius: scale(15, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15, 'w'),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  txtInfo: {
    color: CUSTOM_COLORS.usBlue,
    fontFamily: CUSTOM_FONTS.regular,
    fontSize: CUSTOM_SIZES.medium,
  },
});
