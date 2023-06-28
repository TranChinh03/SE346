// import {ListItem} from '@rneui/themed';
// import {Text, StyleSheet, View, Button, Touchable, Image} from 'react-native';
// import React, {Component} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import CUSTOM_COLORS from '../constants/colors';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import scale from '../constants/responsive';
// import {IC_BIN, IC_EDIT_PRO5} from '../assets/icons';
// import {Snackbar} from 'react-native-paper';
// import CUSTOM_SIZES from '../constants/size';
// import CUSTOM_FONTS from '../constants/fonts';

// export default class ListItemCustom extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       typeColor: this.props.type,
//       title: '',
//       time: '',
//     };
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <ListItem.Swipeable
//           style={styles.containerItem}
//           // leftContent={reset => (
//           //   <Button
//           //     title="Info"
//           //     onPress={() => reset()}
//           //     icon={{name: 'info', color: 'white'}}
//           //     buttonStyle={{minHeight: '100%'}}
//           //   />
//           // )}
//           rightContent={reset => (
//             <View style={styles.container}>
//               <TouchableOpacity style={styles.containerEdit}>
//                 <Image style={{alignSelf: 'center'}} source={IC_EDIT_PRO5} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.containerDel}>
//                 <Image style={{alignSelf: 'center'}} source={IC_BIN} />
//               </TouchableOpacity>
//             </View>
//           )}>
//           {/* <Icon name="My Icon" /> */}
//           <ListItem.Content style={{height: scale(70, 'h')}}>
//             <ListItem.Title>
//               <View
//                 style={{
//                   height: scale(70, 'h'),
//                   width: scale(330, 'w'),
//                   borderRadius: scale(15, 'w'),
//                   backgroundColor:
//                     this.props.type === true
//                       ? CUSTOM_COLORS.primary
//                       : CUSTOM_COLORS.skyBlue,
//                 }}>
//                 <Text style={styles.txtTitle}>{this.props.title}</Text>
//                 <Text style={styles.txtTime}>{this.props.time}</Text>
//               </View>
//             </ListItem.Title>
//           </ListItem.Content>
//           {/* <ListItem.Chevron /> */}
//         </ListItem.Swipeable>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     //backgroundColor: CUSTOM_COLORS.yellow,
//     height: scale(90, 'h'),
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   containerItem: {
//     height: scale(90, 'h'),
//   },
//   containerEdit: {
//     backgroundColor: 'white',
//     height: scale(50, 'h'),
//     width: scale(50, 'h'),
//     borderRadius: scale(50 / 2, 'h'),
//     borderColor: CUSTOM_COLORS.primary,
//     borderWidth: 1,
//     justifyContent: 'center',
//   },
//   containerDel: {
//     backgroundColor: CUSTOM_COLORS.sunsetOrange,
//     height: scale(50, 'h'),
//     width: scale(50, 'h'),
//     borderRadius: scale(50 / 2, 'h'),
//     marginLeft: scale(15, 'w'),
//     justifyContent: 'center',
//   },
//   txtTitle: {
//     color: 'white',
//     marginLeft: scale(15, 'w'),
//     fontSize: CUSTOM_SIZES.medium,
//     fontFamily: CUSTOM_FONTS.regular,
//     marginTop: scale(15, 'h'),
//   },
//   txtTime: {
//     color: 'white',
//     alignSelf: 'flex-end',
//     marginTop: scale(10, 'h'),
//     marginRight: scale(10, 'h'),
//   },
//   containerContent: {
//     // backgroundColor:
//     //   this.state.typeColor === 1
//     //     ? CUSTOM_COLORS.primary
//     //     : CUSTOM_COLORS.skyBlue,
//     height: scale(70, 'h'),
//     width: scale(300, 'w'),
//     borderRadius: scale(15, 'w'),
//   },
// });
import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class ListItemCustom extends Component {
  render() {
    return (
      <View>
        <Text>ListItemCustom</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
