import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
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
  import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

  
  
  const CreateMeeting = () => {

    const [shouldShow, setShouldShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState('');
    const [course, setCourse] = useState([]);

    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()
    const [link, setLink] = useState()


    const navigation = useNavigation();

    const renderItem = ({item}) => {
      if(item.type ==='content1'){
        return  (
          <View>
            <Text style={styles.txtTiltle}>{item.title}</Text>
            <TextInput multiline style={styles.txtInput} onChangeText={item.onChange}></TextInput>
          </View>
        )
      }
      else if(item.type === 'dropdown')
      {
        return (
          <View>
            <Text style={styles.txtTiltle}>Course</Text>
            <View style={styles.conDropDown}>
              <DropDownPicker
                style={styles.dropDown}
                textStyle={styles.txtDropDown}
                dropDownDirection="TOP"
                dropDownContainerStyle={styles.condropdown2}
                open={open1}
                value={value1}
                items={course}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setCourse}
                multiple={false}
                mode="BADGE"
                badgeDotColors={['#e76f51', '#00b4d8']}
                onChangeValue={(value) => {
                  // Find the selected item
                  const selectedItem = course.find(item => item.value === value);
                  // Set the myCourse state to the label of the selected item
                  if (selectedItem) {
                    setMyCourse(selectedItem.label);
                  }
                }}
              />
            </View>
          </View>
        )
      }
      else {
        return (
          <View>
            <View style={styles.space}>
              <View style={[styles.space]}></View>
           </View>
          </View>
        )
      }
    }

    const data = [
      { id: 'content1', type: 'content1', title: 'Meeting Name'},
      { id: 'content3', type: 'content1', title: 'Time'},
      { id: 'dropdown', type: 'dropdown' },
      { id: 'content2', type: 'content2' },
    ];

      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.vwImg}
            source={IMG_BG1}
            resizeMode="cover">
            <View style={styles.vwTitle}>
              <BackButton onPress={() => navigation.goBack()} />
              <Text style={styles.txtHeader}>Create Meeting</Text>
            </View>
          </ImageBackground>
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.txtTiltle}>Meeting Name</Text>
              <TextInput style={styles.txtInput} onChangeText={(name) => setName(name)}></TextInput>
            </View>

            <View>
              <Text style={styles.txtTiltle}>Time</Text>
              <TextInput style={styles.txtInput} onChangeText={(time) => setTime(time)}></TextInput>
            </View>

            <View>
              <Text style={styles.txtTiltle}>Date</Text>
              <TextInput style={styles.txtInput} onChangeText={(date) => setDate(date)}></TextInput>
            </View>

            <Text style={styles.txtTiltle}>Course</Text>
            <View style={styles.conDropDown}>
              <DropDownPicker
                style={styles.dropDown}
                textStyle={styles.txtDropDown}
                dropDownDirection="TOP"
                dropDownContainerStyle={styles.condropdown2}
                open={open1}
                value={value1}
                items={course}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setCourse}
                multiple={false}
                mode="BADGE"
                badgeDotColors={['#e76f51', '#00b4d8']}
                onChangeValue={(value) => {
                  // Find the selected item
                  const selectedItem = course.find(item => item.value === value);
                  // Set the myCourse state to the label of the selected item
                  if (selectedItem) {
                    setMyCourse(selectedItem.label);
                  }
                }}
              />
            </View>

            <View>
              <Text style={styles.txtTiltle}>Link</Text>
              <TextInput style={styles.txtInput} onChangeText={(link) => setLink(link)}></TextInput>
            </View>

            <View style={styles.space}/>
              
            </ScrollView>
          </View>
          <BtnTick onPress = {() => {console.log(name, time, date, link)}}/>
        </SafeAreaView>
      );
    }

export default CreateMeeting
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
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
    space: {
      height: scale(200, 'h'),
      // backgroundColor: 'pink',
    },
  });