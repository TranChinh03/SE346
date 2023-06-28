// import {
//   Text,
//   StyleSheet,
//   View,
//   ImageBackground,
//   Image,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {IMG_AVT, IMG_TODOBG1, IMG_TODOEMPTY} from '../src/assets/img';
// import CUSTOM_COLORS from '../src/constants/colors';
// import scale from '../src/constants/responsive';
// import {Calendar, LocaleConfig} from 'react-native-calendars';
// import React, {
//   Component,
//   useCallback,
//   useRef,
//   useState,
//   useEffect,
// } from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import BottomSheet, {BottomSheetRefProps} from '../src/components/BottomSheet';
// import CUSTOM_FONTS from '../src/constants/fonts';
// import {FAB} from '@rneui/themed';
// import {Button} from 'react-native-paper';
// import CustomButton from '../src/components/button';
// import ListItemCustom from '../src/components/ListItemCustom';
// import CUSTOM_SIZES from '../src/constants/size';

// var tasks = [
//   {
//     id: '1',
//     title: 'C++ for Beginners 2023',
//     time: '10 AM - 11AM',
//   },
//   {
//     id: '2',
//     title: 'C# for Beginners 2023',
//     time: '20 PM - 21 PM',
//   },
//   {
//     id: '3',
//     title: 'Python for Beginners 2023',
//     time: '20 PM - 21 PM',
//   },
//   {
//     id: '4',
//     title: 'JavaScript for Beginners 2023',
//     time: '20 PM - 21 PM',
//   },
//   {
//     id: '5',
//     title: 'React Native for Beginners 2023',
//     time: '20 PM - 21 PM',
//   },
// ];

// var tasks2 = [];

// export default function TodoScreen() {
//   // const [visible, setVisible] = React.useState(
//   //   tasks2.length === 0 ? false : true,
//   // );
//   const ref2 = useRef(null);
//   const [shouldShow, setShouldShow] = useState(
//     tasks.length === 0 ? true : false,
//   );
//   const [date, setDate] = useState(
//     new Date().toLocaleString('en-US', {timeZone: 'Asia/Barnaul'}),
//   );
//   useEffect(() => {
//     setInterval(() => {
//       setDate(new Date().toLocaleString('en-US', {timeZone: 'Asia/Barnaul'}));
//     }, 1000);
//   }, []);

//   const [currentPage, setCurrentPage] = useState('InProgress');
//   //   const onPress = useCallback(() => {
//   //     const isActive = ref2?.current?.isActive();
//   //     if (isActive) {
//   //       ref2?.current?.scrollTo(-330);
//   //     } else {
//   //       ref2?.current?.scrollTo(-600);
//   //     }
//   //   }, [ref2]);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* <TouchableOpacity style={styles.button} onPress={onPress} /> */}

//       {/* <Button
//         title="Hide/Show Component"
//         onPress={() => setShouldShow(!shouldShow)}
//       /> */}
//       <BottomSheet ref={ref2}>
//         <View style={styles.containerTitle}>
//           {/* <Text style={styles.txtDate}>13/06/2023</Text> */}
//           <Text style={styles.txtTime}>{date}</Text>
//         </View>
//         <View style={styles.vwNavigate}>
//           <TouchableOpacity
//             onPress={() => setCurrentPage('InProgress')}
//             style={
//               currentPage === 'InProgress'
//                 ? styles.btnSelectedNavigate
//                 : styles.btnNavigate
//             }>
//             <Text style={styles.txtNavigate}>In Progress</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setCurrentPage('Todo')}
//             style={
//               currentPage === 'Todo'
//                 ? styles.btnSelectedNavigate
//                 : styles.btnNavigate
//             }>
//             <Text style={styles.txtNavigate}>Todo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setCurrentPage('Complete')}
//             style={
//               currentPage === 'Complete'
//                 ? styles.btnSelectedNavigate
//                 : styles.btnNavigate
//             }>
//             <Text style={styles.txtNavigate}>Complete</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           numColumns={1}
//           data={tasks}
//           renderItem={({item, index}) => {
//             return (
//               <ListItemCustom type={true} title={item.title} time={item.time} />
//             );
//           }}></FlatList>

//         {shouldShow ? (
//           <View style={styles.bottomPopup}>
//             <View style={styles.EmptyFrame}>
//               <Image
//                 setVisible="hidden"
//                 resizeMode="contain"
//                 style={styles.imgEmpty}
//                 source={IMG_TODOEMPTY}
//               />
//             </View>
//             <Text style={styles.textTitle}>Manage your daily task so easy</Text>
//             <Text style={styles.textTitle2}>Let’s be productive today</Text>
//             {/* <CustomButton textButton="Get Started"></CustomButton> */}
//           </View>
//         ) : null}
//         {/* <ListItemCustom type={true} />
//         <ListItemCustom type={false} />
//         <ListItemCustom type={true} /> */}
//       </BottomSheet>

//       <ImageBackground style={styles.imgBG} source={IMG_TODOBG1}>
//         <View style={styles.containerOpacity}>
//           <View style={styles.conGreeting}>
//             <View style={styles.conGreeting2}>
//               <View style={styles.avtFrame}>
//                 <Image style={styles.avt} source={IMG_AVT} />
//               </View>
//               <Text style={styles.txtGreeting}>Welcome, Nhu Huynh!</Text>
//             </View>
//           </View>
//           <View style={styles.conCalendar}>
//             <Calendar
//               style={styles.calendar}
//               theme={{
//                 backgroundColor: 'transparent',
//                 calendarBackground: 'transparent',
//                 textSectionTitleColor: 'white',
//                 selectedDayBackgroundColor: '#00adf5',
//                 selectedDayTextColor: '#ffffff',
//                 todayTextColor: 'white',
//                 todayBackgroundColor: 'rgba(0, 173, 245, 0.8)',
//                 dayTextColor: 'white',
//                 textDisabledColor: '#F6C1C7',
//                 monthTextColor: 'white',
//                 textMonthFontSize: scale(24, 'w'),
//                 textMonthFontWeight: 'bold',
//                 arrowColor: 'white',
//               }}
//             />
//           </View>
//         </View>
//       </ImageBackground>
//       {/* <View style={styles.container2}> */}
//       {/* </View> */}
//       {/* <FAB
//         size="large"
//         backgroundColor={CUSTOM_COLORS.primary}
//         color={CUSTOM_COLORS.primary}
//         visible={visible}
//         style={styles.btnFAB}
//         // icon={{name: 'add', color: 'white'}}
//         title={'+'}
//         upperCase
//         titleStyle={{fontSize: 20}}
//         padding={0}
//       /> */}
//       <TouchableOpacity style={styles.btnFAB}>
//         <Text style={styles.txtFAB}>+</Text>
//       </TouchableOpacity>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     backgroundColor: 'blue',
//   },
//   containerOpacity: {
//     height: '100%',
//     backgroundColor: 'rgba(116, 0, 184, 0.5)',
//   },
//   conGreeting2: {
//     height: '70%',
//     width: '80%',
//     backgroundColor: 'rgba(94, 96, 206, 0.5)',
//     alignSelf: 'center',
//     borderRadius: scale(15, 'w'),
//     borderColor: 'white',
//     borderWidth: 0.3,
//     alignContent: 'center',
//     // /justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   imgBG: {
//     height: '95%',
//     width: '100%',
//     borderRadius: 15,
//     //backgroundColor: 'green',
//     //zIndex: 5,
//   },
//   conGreeting: {
//     flex: 1,
//     justifyContent: 'center',
//     //backgroundColor: 'orange',
//   },
//   conCalendar: {
//     flex: 7.5,
//     // /backgroundColor: 'pink',
//   },
//   container2: {
//     flex: 1,
//     backgroundColor: 'yellow',
//   },
//   avtFrame: {
//     height: scale(40, 'w'),
//     width: scale(40, 'w'),
//     borderRadius: scale(40 / 2, 'w'),
//     backgroundColor: 'red',
//     marginLeft: scale(15, 'w'),
//     alignSelf: 'center',
//   },
//   avt: {
//     height: scale(40, 'w'),
//     width: scale(40, 'w'),
//     borderRadius: scale(40 / 2, 'w'),
//   },
//   txtGreeting: {
//     color: 'white',
//     fontSize: scale(18, 'w'),
//     alignSelf: 'center',
//     marginLeft: scale(10, 'w'),
//     fontFamily: CUSTOM_FONTS.medium,
//   },
//   calendar: {
//     backgroundColor: 'transparent',
//     borderColor: 'transparent',
//     //color: 'transparent',
//     borderWidth: 1,
//     //height: scale(50, 'h'),
//   },
//   textTitle: {
//     marginTop: scale(30, 'h'),
//     color: CUSTOM_COLORS.Grape,
//     fontSize: scale(20, 'w'),
//     alignSelf: 'center',
//     fontFamily: CUSTOM_FONTS.medium,
//   },
//   textTitle2: {
//     marginTop: scale(10, 'h'),
//     marginBottom: scale(50, 'h'),
//     color: CUSTOM_COLORS.Grape,
//     fontSize: scale(15, 'w'),
//     alignSelf: 'center',
//     fontFamily: CUSTOM_FONTS.regular,
//   },
//   bottomPopup: {
//     flex: 1,
//     alignItems: 'center',
//     //backgroundColor: 'red',
//   },
//   imgEmpty: {
//     height: '100%',
//     alignSelf: 'center',
//   },
//   EmptyFrame: {
//     height: '60%',
//   },
//   btnFAB: {
//     zIndex: 1,
//     position: 'absolute',
//     height: scale(64, 'w'),
//     width: scale(64, 'w'),
//     borderRadius: scale(64 / 2, 'h'),
//     backgroundColor: CUSTOM_COLORS.secondary,
//     marginTop: scale(580, 'h'),
//     marginLeft: scale(270, 'w'),
//     justifyContent: 'center',
//   },
//   txtFAB: {
//     color: 'white',
//     fontSize: scale(35, 'w'),
//     alignSelf: 'center',
//   },
//   containerTitle: {
//     height: '7%',
//     //backgroundColor: 'yellow',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderColor: CUSTOM_COLORS.stateBlue,
//     borderWidth: 1,
//     width: '80%',
//     borderRadius: 10,
//     alignSelf: 'center',
//   },
//   txtDate: {
//     fontSize: CUSTOM_SIZES.xLarge,
//     fontFamily: CUSTOM_FONTS.medium,
//     color: CUSTOM_COLORS.primary,
//     alignSelf: 'center',
//   },
//   txtTime: {
//     fontSize: CUSTOM_SIZES.xLarge,
//     fontFamily: CUSTOM_FONTS.regular,
//     color: CUSTOM_COLORS.stateBlue,
//     alignSelf: 'center',
//   },
//   vwNavigate: {
//     //backgroundColor: 'green',
//     height: '5%',
//     marginVertical: scale(10, 'h'),
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   btnNavigate: {
//     height: '100%',
//     width: '30%',
//     //backgroundColor: 'yellow',
//     justifyContent: 'center',
//     //borderBottomWidth: 2,
//   },
//   btnSelectedNavigate: {
//     height: '100%',
//     width: '30%',
//     //backgroundColor: 'yellow',
//     justifyContent: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: CUSTOM_COLORS.stateBlue,
//   },
//   txtNavigate: {
//     color: CUSTOM_COLORS.stateBlue,
//     fontSize: CUSTOM_SIZES.medium,
//     fontFamily: CUSTOM_FONTS.semibold,
//     alignSelf: 'center',
//   },
// });

import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class TodoScreen extends Component {
  render() {
    return (
      <View>
        <Text>TodoScreen</Text>
        <Button onPress={() => Linking.openURL('mailto:minhchinhtran03@example.com?subject=SendMail&body=Description') }title="support@example.com" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
