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
import {IC_Camera} from '../src/assets/iconsvg';
import DropDownPicker from 'react-native-dropdown-picker';
import {SpeedDial} from '@rneui/themed';
import LessonBox from '../src/components/lessonBox';
import LessonBoxAdd from '../src/components/LessonBoxAdd';
import {useNavigation} from '@react-navigation/native';
import BtnDelete from '../src/components/BtnDelete';
import BtnTick from '../src/components/BtnTick';
import {firebase} from '../configs/FirebaseConfig';
import ItemPdf from '../src/components/ItemPdf';
import DocumentPicker from 'react-native-document-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
// import RNFetchBlob from 'rn-fetch-blob'
import {PermissionsAndroid} from 'react-native';
import {preset} from '../jest.config';

var titles = [
  'Python.pdf',
  'SQL.pdf',
  'Java.pdf',
  'Ruby.pdf',
  'Go.pdf',
  'C#.pdf',
  'C++.pdf',
];
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

const EditLessonScreen = ({route}) => {
  const {preItem} = route.params;
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('');
  const [chapter, setChapter] = useState([]);

  const [course, setCourse] = useState([]);
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tests, setTests] = useState([]);

  const [documents1, setDocuments1] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [myChapter, setMyChapter] = useState('');

  const [myCourse, setMyCourse] = useState('');

  const [name, setName] = useState('');

  const [materials, setMaterials] = useState([]);
  const [refreshMaterial, setRefreshMaterial] = useState(false);
  const [refreshTests, setRefreshTests] = useState(false);

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
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data());
          setTitle(preItem.lessonTitle);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  async function MaterialList() {
    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData.filter(
      filter =>
        filter.courseAuthor === preItem.courseAuthor &&
        filter.courseTitle === preItem.courseTitle &&
        filter.chapterTitle === preItem.chapterTitle &&
        filter.lessonTitle === preItem.lessonTitle,
    );
    const finalData = joinedData[0].files.map(file =>
      firebase.storage().refFromURL(file),
    );
    return finalData;
  }

  async function TestList() {
    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData.filter(
      filter =>
        filter.courseAuthor === preItem.courseAuthor &&
        filter.courseTitle === preItem.courseTitle &&
        filter.chapterTitle === preItem.chapterTitle &&
        filter.lessonTitle === preItem.lessonTitle,
    );

    console.log('joinedData', joinedData);
    if (
      joinedData[0].tests ||
      (joinedData[0].tests.length !== 0 && joinedData[0].tests[0] !== null)
    ) {
      console.log('Hello1');
      const finalData = joinedData[0].tests.map(file =>
        firebase.storage().refFromURL(file),
      );

      return finalData;
    }
    console.log('Hello2');
    return;
  }

  useEffect(() => {
    MaterialList().then(data => setMaterials(data));
  }, [materials]);

  useEffect(() => {
    TestList().then(data => setTests(data));
  }, [tests]);

  const handleDelete = item => {
    console.log('item', item);
    Alert.alert(
      'Delete Material',
      'Are you sure you want to delete this material?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const storageRef = item;
            storageRef
              .getDownloadURL()
              .then(url => {
                console.log('url', url);
                firebase
                  .firestore()
                  .collection('lessons')
                  .where('courseTitle', '==', preItem.courseTitle)
                  .where('courseAuthor', '==', preItem.courseAuthor)
                  .where('chapterTitle', '==', preItem.chapterTitle)
                  .where('lessonTitle', '==', preItem.lessonTitle)
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
                            files:
                              firebase.firestore.FieldValue.arrayRemove(url),
                          })
                          .then(() => {
                            Alert.alert('File is deleted!');
                          });
                      });
                    }
                  });
              })
              .catch(error => {
                console.log(error.message);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete1 = item => {
    console.log('item', item);
    Alert.alert(
      'Delete Material',
      'Are you sure you want to delete this material?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const storageRef = item;
            storageRef
              .getDownloadURL()
              .then(url => {
                console.log('url', url);
                firebase
                  .firestore()
                  .collection('lessons')
                  .where('courseTitle', '==', preItem.courseTitle)
                  .where('courseAuthor', '==', preItem.courseAuthor)
                  .where('chapterTitle', '==', preItem.chapterTitle)
                  .where('lessonTitle', '==', preItem.lessonTitle)
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
                            tests:
                              firebase.firestore.FieldValue.arrayRemove(url),
                          })
                          .then(() => {
                            Alert.alert('File is deleted!');
                          });
                      });
                    }
                  });
              })
              .catch(error => {
                console.log(error.message);
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
          <Text style={styles.txtTiltle}>Title</Text>
          <TextInput
            multiline
            style={styles.txtInput}
            onChangeText={myTitle => setTitle(myTitle)}>
            {preItem.lessonTitle}
          </TextInput>
        </View>
      );
    } else if (item.type === 'dropdown') {
      return <View></View>;
    } else {
      return (
        <View>
          <Text style={styles.txtTiltle}>Material</Text>
          <View style={{marginLeft: scale(15, 'w'), flexDirection: 'row'}}>
            <FlatList
              horizontal
              numColumns={1}
              data={materials}
              renderItem={({item, index}) => {
                return (
                  <ItemPdf
                    title={item.name}
                    onPress={() => handleDelete(item)}
                  />
                );
              }}
            />
          </View>
          <View
            style={{
              marginLeft: scale(15, 'w'),
              flexDirection: 'row',
              marginTop: scale(10, 'w'),
            }}>
            <TouchableOpacity
              style={styles.fixedButton}
              onPress={() => pickDocument()}>
              <Text style={styles.start}>+</Text>
            </TouchableOpacity>
            <FlatList
              horizontal
              numColumns={1}
              data={documents}
              extraData={refreshMaterial}
              renderItem={({item, index}) => {
                return (
                  <ItemPdf
                    title={item.name}
                    onPress={() => deleteDocument(item.name)}
                  />
                );
              }}
            />
          </View>
          <Text style={styles.txtTiltle}>Test</Text>
          <View style={{marginLeft: scale(15, 'w'), flexDirection: 'row'}}>
            <FlatList
              horizontal
              numColumns={1}
              data={tests}
              renderItem={({item, index}) => {
                return (
                  <ItemPdf
                    title={item.name}
                    onPress={() => handleDelete1(item)}
                  />
                );
              }}
            />
          </View>
          <View
            style={{
              marginLeft: scale(15, 'w'),
              flexDirection: 'row',
              marginTop: scale(10, 'w'),
            }}>
            <TouchableOpacity
              style={styles.fixedButton}
              onPress={() => pickDocument1()}>
              <Text style={styles.start}>+</Text>
            </TouchableOpacity>
            <FlatList
              horizontal
              numColumns={1}
              data={documents1}
              extraData={refreshTests}
              renderItem={({item, index}) => {
                return (
                  <ItemPdf
                    title={item.name}
                    onPress={() => deleteDocument1(item.name)}
                  />
                );
              }}
            />
          </View>
          <View style={{marginBottom: scale(30, 'h')}}></View>
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

  async function pickDocument() {
    try {
      let index = 0;
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // const newResult = result.map(item =>({
      //   ...item,
      //   key: index.toString()
      //   }))

      //   console.log(newResult)
      setDocuments(prevData => [...prevData, result[0]]);

      index++;

      console.log(documents);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  async function pickDocument1() {
    try {
      let index = 0;
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // const newResult = result.map(item =>({
      //   ...item,
      //   key: index.toString()
      //   }))

      //   console.log(newResult)
      setDocuments1(prevData => [...prevData, result[0]]);

      index++;

      console.log(documents1);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }
  async function deleteDocument(value2) {
    try {
      //let index = 0;
      // Let's say it's Bob.
      // console.log(documents);
      // console.log(value2);

      var index;
      documents.map(temp => {
        if (temp.name === value2) index = documents.indexOf(temp);
      });
      //var index = documents.indexOf(value2);
      console.log('index: ' + index);
      delete documents[index];
      for (index; index < documents.length; index++) {
        documents[index] = documents[index + 1];
      }
      documents.length--;
      // const newResult = result.map(item =>({
      //   ...item,
      //   key: index.toString()
      //   }))

      //   console.log(newResult)
      //setDocuments(prevData => [...prevData, result[0]]);

      //index++;

      setRefreshMaterial(!refreshMaterial);
      console.log(documents);
      console.log('index: ' + index);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  async function deleteDocument1(value2) {
    try {
      //let index = 0;
      // Let's say it's Bob.
      // console.log(documents);
      // console.log(value2);

      var index;
      documents1.map(temp => {
        if (temp.name === value2) index = documents1.indexOf(temp);
      });
      //var index = documents.indexOf(value2);
      console.log('index: ' + index);
      delete documents1[index];
      for (index; index < documents1.length; index++) {
        documents1[index] = documents1[index + 1];
      }
      documents1.length--;
      // const newResult = result.map(item =>({
      //   ...item,
      //   key: index.toString()
      //   }))

      //   console.log(newResult)
      //setDocuments(prevData => [...prevData, result[0]]);

      //index++;

      setRefreshTests(!refreshTests);
      console.log(documents1);
      console.log('index: ' + index);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'This app needs access to your storage ' +
            'so you can upload files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can now access storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const handleUpload = async () => {
    await requestStoragePermission();

    if (documents) {
      try {
        const urls = [];
        for (const document of documents) {
          const blob = await uriToBlob(document.uri);
          console.log(blob);
          const reference = storage().ref().child(`files/${Date.now()}`);
          const task = reference.put(blob);

          task.on('state_changed', snapshot => {
            console.log(document);
            console.log(
              `${
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }% completed`,
            );
          });

          await task;
          const url = await reference.getDownloadURL();
          console.log('File uploaded to Firebase storage:', url);
          urls.push(url);
        }
        return urls;
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  const handleUpload1 = async () => {
    await requestStoragePermission();

    if (documents1) {
      try {
        const urls = [];
        for (const document of documents1) {
          const blob = await uriToBlob(document.uri);
          console.log(blob);
          const reference = storage().ref().child(`files/${Date.now()}`);
          const task = reference.put(blob);

          task.on('state_changed', snapshot => {
            console.log(document);
            console.log(
              `${
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }% completed`,
            );
          });

          await task;
          const url = await reference.getDownloadURL();
          console.log('File uploaded to Firebase storage:', url);
          urls.push(url);
        }
        return urls;
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  const now = firebase.firestore.Timestamp.now();

  const editLesson = async () => {
    const fileUrls = await handleUpload();
    const fileUrls1 = await handleUpload1();

    if (title !== '') {
      firebase
        .firestore()
        .collection('lessons')
        .where('lessonTitle', '==', preItem.lessonTitle)
        .where('courseTitle', '==', preItem.courseTitle)
        .where('courseAuthor', '==', preItem.courseAuthor)
        .where('chapterTitle', '==', preItem.chapterTitle)
        .get()
        .then(querrySnapshot => {
          if (!querrySnapshot.empty) {
            console.log('1');
            const documentId = querrySnapshot.docs[0].id;
            firebase
              .firestore()
              .collection('lessons')
              .doc(documentId)
              .update({
                lessonTitle: title,
                files: firebase.firestore.FieldValue.arrayUnion(...fileUrls),
                tests: firebase.firestore.FieldValue.arrayUnion(...fileUrls1),
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
            console.log('Da vao day!');
            const data = querrySnapshot.docs[0].data();
            preItem.language = data.language;
            (preItem.lastUpdate = now),
              (preItem.description = data.description),
              (preItem.programLanguage = data.programLanguage);
            preItem.image = data.image;

            preItem.title = preItem.courseTitle;
            preItem.author = preItem.courseAuthor;

            console.log('preItem after edit lessons', preItem);

            navigation.navigate('CourseDetail', {preItem: preItem});
            Alert.alert('Edit Lesson Successfully!');
          }
        });
    } else {
      Alert.alert('Please fill full enough information!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log('preItemEditLesson', preItem)}
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={backButtonAlert} />
          <Text style={styles.txtHeader}>Edit Lesson</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}></FlatList>
      </View>

      <BtnTick
        onPress={() => {
          editLesson();
        }}
      />
    </SafeAreaView>
  );
};
export default EditLessonScreen;

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
    fontSize: CUSTOM_SIZES.large,
    padding: scale(15, 'w'),
  },
  txtInput2: {
    height: scale(115, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.large,
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
  fixedButton: {
    width: scale(40, 'w'),
    height: scale(40, 'w'),
    borderRadius: scale(70 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    elevation: 7,
  },
  start: {
    fontSize: scale(25, 'w'),
    fontWeight: '300',
    color: CUSTOM_COLORS.white,
  },
});
