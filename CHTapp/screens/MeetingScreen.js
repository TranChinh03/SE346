import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import BackButton from '../src/components/backButton';
import {IMG_BG1} from '../src/assets/img';
import BtnTick from '../src/components/BtnTick';
import scale from '../src/constants/responsive';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_COLORS from '../src/constants/colors';
import BtnDelete from '../src/components/BtnDelete';
import ItemMeeting from '../src/components/ItemMeeting';
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import moment from 'moment'


const MeetingScreen = () => {
  const [data, setData] = useState([]);

  const [name, setName] = useState('');

  // const [date, setDate] = useState(null)

  const [link, setLink] = useState('');

  const navigation = useNavigation();

  async function joinedCourse() {
    const meetingRef = firebase.firestore().collection('meetings');
    const meetingSnapshot = await meetingRef.get();
    const meetingData = meetingSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return meetingData;
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
      const newCourse = await joinedCourse();
      setData(newCourse);
    }

    getData();
  }, [name, data]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.txtHeader}>Meetings</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.txtTiltle}>Meetings</Text>

        <FlatList
          style={{
            marginTop: scale(10, 'h'),
            marginLeft: scale(5, 'h'),
            marginBottom: scale(80, 'h'),
          }}
          scrollEnabled={true}
          numColumns={1}
          data={data}
          renderItem={({item, index}) => {
            return (
              <ItemMeeting
                meetingName={item.title}
                time={item.time}
                date={item.date.toDate().toLocaleDateString('en-GB')}
                courseName={item.subject}
                lectureName={item.host}
                link={item.joinUrl}
              />
            );
          }}
        />
      </View>

      {/* <View style={styles.space}>
        <View style={[styles.space]}></View>
      </View>
 */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => navigation.navigate('CreateMeeting')}>
        <Text style={styles.start}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MeetingScreen;

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
  fixedButton: {
    position: 'absolute',
    width: scale(70, 'w'),
    height: scale(70, 'w'),
    borderRadius: scale(70 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.Grape,
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
    height: scale(88, 'h'),
    // backgroundColor: 'pink',
  },
});
