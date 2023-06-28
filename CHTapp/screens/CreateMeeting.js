import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, {Component} from 'react';
  import BackButton from '../src/components/backButton';
  import {IMG_BG1} from '../src/assets/img';
  import BtnTick from '../src/components/BtnTick';
  import scale from '../src/constants/responsive';
  import CUSTOM_FONTS from '../src/constants/fonts';
  import CUSTOM_SIZES from '../src/constants/size';
  import CUSTOM_COLORS from '../src/constants/colors';
  import BtnDelete from '../src/components/BtnDelete';
  import ItemMeeting from '../src/components/ItemMeeting';
  
  const data = [
    {
      id: 'content1',
      meetingName: 'Meeting 1',
      time: '20h',
      courseName: 'C++ for beginers 2023',
      lectureName: 'Tran Minh Chinh',
    },
    {
      id: 'dropdown',
      meetingName: 'Meeting 2',
      time: '20h',
      courseName: 'C++ for beginers 2023',
      lectureName: 'Tran ',
    },
    {
      id: 'content2',
      meetingName: 'Meeting 3',
      time: '20h',
      courseName: 'C++ for beginers 2023',
      lectureName: 'Tran Minh Chinh',
    },
  ];
  
  export default class CreateMeeting extends Component {
    render() {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.vwImg}
            source={IMG_BG1}
            resizeMode="cover">
            <View style={styles.vwTitle}>
              <BackButton onPress={() => this.props.navigation.goBack()} />
              <Text style={styles.txtHeader}>Create Meeting</Text>
            </View>
          </ImageBackground>
          <View style={styles.content}>
            <TextInput
              style={styles.txbMeetingName}
              placehoder={'Name your meeting'}
              placeholderTextColor={CUSTOM_COLORS.stateBlue}></TextInput>
          </View>
  
          <BtnTick />
        </SafeAreaView>
      );
    }
  }
  
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
    txbMeetingName: {
      height: scale(50, 'h'),
    },
  });