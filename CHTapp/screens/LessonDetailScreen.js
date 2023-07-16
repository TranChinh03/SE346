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
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {
  IMG_AUTHBACKGROUND,
  IMG_COURSEBACKGROUND,
  IMG_CPP,
  IMG_CPPBACKGROUND,
  IMG_VIDEO,
} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';

import {
  IC_DOWNLOAD,
  IC_FAVORITE,
  IC_FILLEDFAVORITE,
  IC_GLOBAL,
  IC_INFORMATION,
  IC_NEXT,
} from '../src/assets/icons';
import LessonBox from '../src/components/lessonBox';
import {IMG_LECTURERAVA} from '../src/assets/img';
import Evaluation from '../src/components/evaluation';
import BackButton from '../src/components/backButton';
import {IC_Edit, IC_LeftArrow} from '../src/assets/iconsvg';
import {IC_EYE, IC_VIEW} from '../src/assets/icons';
import CusRatingBar from '../src/components/CusRatingBar';
import {firebase} from '../configs/FirebaseConfig';
import RNFetchBlob from 'rn-fetch-blob';
import ItemPdf from '../src/components/ItemPdf';
import ItemPDFDetail from '../src/components/ItemPDFDetail';

const LessonDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {item, item1} = route.params;
  const [materials, setMaterials] = useState([]);
  const [tests, setTests] = useState([])
  const [name, setName] = useState('')

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


  async function MaterialList() {
    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('joinedData');
    const joinedData = lessonData.filter(
      filter =>
        filter.courseAuthor === item.courseAuthor &&
        filter.courseTitle === item.courseTitle &&
        filter.chapterTitle === item.chapterTitle &&
        filter.lessonTitle === item.lessonTitle,
    );
    const finalData = joinedData[0].files.map(file =>
      firebase.storage().refFromURL(file),
    );

    console.log(finalData);
    return finalData;
  }


  useEffect(() => {
    MaterialList().then(data => setMaterials(data))
    TestList().then(data => setTests(data))
  }, [])

  async function TestList() {
    const lessonRef = firebase.firestore().collection('lessons');
    const lessonSnapshot = await lessonRef.get();
    const lessonData = lessonSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const joinedData = lessonData.filter(
      filter =>
        filter.courseAuthor === item.courseAuthor &&
        filter.courseTitle === item.courseTitle &&
        filter.chapterTitle === item.chapterTitle &&
        filter.lessonTitle === item.lessonTitle,
    );
    console.log('joinedData');
    const finalData = joinedData[0].tests.map(file =>
      firebase.storage().refFromURL(file),
    );

    console.log(finalData);
    return finalData;
  }

  const handleDownload = myItem => {
    firebase
      .firestore()
      .collection('lessons')
      .where('lessonTitle', '==', item.lessonTitle)
      .where('courseTitle', '==', item.courseTitle)
      .where('courseAuthor', '==', item.courseAuthor)
      .where('chapterTitle', '==', item.chapterTitle)
      .get()
      .then(querySnapshot => {
        let documentId;
        if (!querySnapshot.empty) {
          documentId = querySnapshot.docs[0].id;
        }
        return documentId;
      })
      .then(documentId => {
        const docRef = firebase
          .firestore()
          .collection('lessons')
          .doc(documentId);

        // Get the document from Firestore
        docRef.get().then(doc => {
          if (doc.exists) {
            const storageRef1 = myItem;
            storageRef1
              .getDownloadURL()
              .then(url => {
                const files = doc.data().files;
                if (files) {
                  const index = files.findIndex(file => file === url);
                  if (index !== -1) {
                    const fileRef = doc.data().files[index];
                    const storageRef = firebase.storage().refFromURL(fileRef);
                    console.log('Download1!');
                    storageRef.getDownloadURL().then(async url => {
                      console.log('Download2!');
                      const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                          title: 'Storage Permission',
                          message:
                            'This app needs access to your storage to download files.',
                          buttonNeutral: 'Ask Me Later',
                          buttonNegative: 'Cancel',
                          buttonPositive: 'OK',
                        },
                      );

                      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // Permission granted
                        const {config, fs} = RNFetchBlob;
                        const date = new Date();
                        const fileDir = fs.dirs.DownloadDir;
                        config({
                          fileCache: true,
                          addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            path:
                              fileDir +
                              '/download_' +
                              Math.floor(
                                date.getDate() + date.getSeconds() / 2,
                              ) +
                              '.pdf',
                            description: 'file download',
                          },
                        })
                          .fetch('GET', fileRef, {})
                          .then(res => {
                            console.log('The file saved to ', res);
                            Alert.alert('Download sucessfully!');
                          });
                        // console.log(require('react-native').NativeModules)
                        // const DownloadManager = require('react-native').NativeModules.DownloadManager;

                        // // Download the file from the URL
                        // DownloadManager.download(url, 'filename.pdf', 'Description', (result) => {
                        //   console.log('Download result:', result);
                        // });
                      } else {
                        // Permission denied
                        console.log('Storage permission denied');
                      }
                    });
                  }
                }
              })
              .catch(error => {
                console.log(error.message);
              });
          }
        });
      });
  };

  const handleDownload1 = myItem => {
    firebase
      .firestore()
      .collection('lessons')
      .where('lessonTitle', '==', item.lessonTitle)
      .where('courseTitle', '==', item.courseTitle)
      .where('courseAuthor', '==', item.courseAuthor)
      .where('chapterTitle', '==', item.chapterTitle)
      .get()
      .then(querySnapshot => {
        let documentId;
        if (!querySnapshot.empty) {
          documentId = querySnapshot.docs[0].id;
        }
        return documentId;
      })
      .then(documentId => {
        const docRef = firebase
          .firestore()
          .collection('lessons')
          .doc(documentId);

        // Get the document from Firestore
        docRef.get().then(doc => {
          if (doc.exists) {
            const storageRef1 = myItem;
            storageRef1
              .getDownloadURL()
              .then(url => {
                const files = doc.data().tests;
                if (files) {
                  const index = files.findIndex(file => file === url);
                  if (index !== -1) {
                    const fileRef = doc.data().files[index];
                    const storageRef = firebase.storage().refFromURL(fileRef);
                    console.log('Download1!');
                    storageRef.getDownloadURL().then(async url => {
                      console.log('Download2!');
                      const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                          title: 'Storage Permission',
                          message:
                            'This app needs access to your storage to download files.',
                          buttonNeutral: 'Ask Me Later',
                          buttonNegative: 'Cancel',
                          buttonPositive: 'OK',
                        },
                      );

                      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // Permission granted
                        const {config, fs} = RNFetchBlob;
                        const date = new Date();
                        const fileDir = fs.dirs.DownloadDir;
                        config({
                          fileCache: true,
                          addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            path:
                              fileDir +
                              '/download_' +
                              Math.floor(
                                date.getDate() + date.getSeconds() / 2,
                              ) +
                              '.pdf',
                            description: 'file download',
                          },
                        })
                          .fetch('GET', fileRef, {})
                          .then(res => {
                            console.log('The file saved to ', res);
                            Alert.alert('Download sucessfully!');
                          });
                        // console.log(require('react-native').NativeModules)
                        // const DownloadManager = require('react-native').NativeModules.DownloadManager;

                        // // Download the file from the URL
                        // DownloadManager.download(url, 'filename.pdf', 'Description', (result) => {
                        //   console.log('Download result:', result);
                        // });
                      } else {
                        // Permission denied
                        console.log('Storage permission denied');
                      }
                    });
                  }
                }
              })
              .catch(error => {
                console.log(error.message);
              });
          }
        });
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {console.log('item', item)}
      {console.log('item1', item1)}
      <BackButton
        style={{marginBottom: scale(10, 'h')}}
        type={1}
        onPress={() => navigation.goBack()}
      />
      <View>
        <View style={styles.container1}>
          <ImageBackground
            style={styles.image}
            source={IMG_VIDEO}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.lessonTitle}>{item.lessonTitle}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{item1.name}</Text>
            {/* <Text style={[styles.infoText, {marginLeft: scale(20, 'w')}]}>
              Times: 30 mins
            </Text> */}
            {/* <View style={styles.numOfView}>
              <Text style={styles.infoText}>320</Text>
              <Image style={{marginLeft: scale(5, 'w')}} source={IC_VIEW} />
            </View> */}
          </View>
          {/* <Text style={styles.description}>
            This is the first lesson in the course C++ for beginners. The goal
            of this lesson is to help you get familiar with CodeLearn and
            setting up the C++ programming environment.
          </Text> */}
          <View style={styles.downloadContainer}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Material:</Text>
            </View>
            {/* <TouchableOpacity style={styles.downloadBox} onPress={() => handleDownload()}>
              <Text style={styles.downloadText}>Download</Text>
              <Image source={IC_DOWNLOAD} />
            </TouchableOpacity> */}
          </View>
          <FlatList
            horizontal
            numColumns={1}
            data={materials}
            renderItem={({item, index}) => {
              return (
                <ItemPDFDetail
                  title={item.name}
                  onPress={() => handleDownload(item)}
                />
              );
            }}
          />
          <View style={styles.downloadContainer}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Test:</Text>
            </View>
            {/* <TouchableOpacity style={styles.downloadBox}>
              <Text style={styles.downloadText}>Download</Text>
              <Image source={IC_DOWNLOAD} />
            </TouchableOpacity> */}
          </View>
          <FlatList
            horizontal
            numColumns={1}
            data={tests}
            renderItem={({item, index}) => {
              return (
                <ItemPDFDetail
                  title={item.name}
                  onPress={() => handleDownload1(item)}
                />
              );
            }}
          />
          {/* <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity> */}

          {/* <View style={styles.evaluataionBar}>
            <CusRatingBar />
            <TouchableOpacity
              style={styles.iconFavor}
              onPress={() => {
                this.setState({addFavor: !this.state.addFavor});
              }}>
              <Image
                source={
                  this.state.addFavor === true
                    ? IC_FILLEDFAVORITE
                    : IC_FAVORITE
                }></Image>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      {
        item.courseAuthor === name.email ? (
          <TouchableOpacity
            style={styles.fixedBtnEdit}
            onPress={() =>
              navigation.navigate('EditLesson', {
                preItem:item
              })
            }>
            <IC_Edit />
          </TouchableOpacity>
        ) : null
      }
    </SafeAreaView>
  );
};

export default LessonDetailScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: CUSTOM_COLORS.white,
  },

  container1: {
    height: scale(175, 'h'),
    width: '100%',
  },
  container2: {
    hright: '100%',
    marginHorizontal: scale(15, 'w'),
  },

  image: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: scale(36, 'w'),
    color: CUSTOM_COLORS.black,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: scale(13, 'w'),
    fontWeight: '400',
    color: CUSTOM_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numOfView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: scale(13, 'w'),
    color: CUSTOM_COLORS.black,
    fontWeight: '400',
    marginTop: scale(10, 'h'),
  },
  downloadContainer: {
    flexDirection: 'row',
    marginTop: scale(15, 'h'),
    alignItems: 'center',
  },
  downloadBox: {
    flexDirection: 'row',
    width: scale(115, 'w'),
    height: scale(25, 'h'),
    borderWidth: 1,
    borderColor: 'rgba(60,58,54, 0.5)',
    borderRadius: scale(7, 'w'),
    paddingHorizontal: scale(12, 'w'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadText: {
    fontSize: scale(13, 'w'),
    textDecorationLine: 'underline',
  },
  infoTextContainer: {
    width: scale(65, 'w'),
  },
  nextButton: {
    width: scale(235, 'w'),
    height: scale(44, 'h'),
    borderRadius: scale(16, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLORS.PictionBlue,
    marginTop: scale(45, 'h'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: scale(16, 'w'),
    fontWeight: '500',
    alignSelf: 'center',
    color: CUSTOM_COLORS.PictionBlue,
  },
  evaluataionBar: {
    marginTop: scale(20, 'h'),
    marginHorizontal: scale(20, 'w'),
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40, 'h'),
  },
  iconFavor: {
    position: 'absolute',
    right: 0,
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
    bottom: scale(100, 'h'),
    right: scale(35, 'w'),
    flexDirection: 'row',
    elevation: 7,
  },
});
