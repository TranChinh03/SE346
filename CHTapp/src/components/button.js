// import React, {Component} from 'react';
// import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import scale from '../constants/responsive';
// import {Card} from 'react-native-paper';

// export class CustomButton extends Component{
//  render() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.buttonLayout}>
//         <Text style={styles.textInside}>Enter password</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   )
//  }
// }

// export default CustomButton;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: scale(60, 'h'),
//     width: scale(304, 'w'),
//     alignItems: 'center',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   buttonLayout: {
//     color: '#6930C3',
//     height: scale(60, 'h'),
//     width: scale(304, 'w'),
//     borderRadius: scale(12, 'w'),
//     backgroundColor: '#6930C3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInside: {
//     color: 'white',
//     fontSize: '20',
//     fontWeight: 'bold',
//   },
// });

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLOR from '../constants/colors';
import {IC_SEARCH, IC_FILLEDHEART, IC_HEART} from '../assets/icons';

export class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textButton: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity style={[styles.buttonLayout, this.props.layoutStyle]} onPress={this.props.onPress}>
          <Text style={[styles.textInside, this.props.textStyle]}>
            {this.props.textButton}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scale(55, 'h'),
    width: scale(304, 'w'),
    borderRadius: scale(12, 'w'),
  },

  buttonLayout: {
    height: scale(55, 'h'),
    width: scale(304, 'w'),
    backgroundColor: CUSTOM_COLOR.Grape,
    borderRadius: scale(12, 'w'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInside: {
    fontSize: scale(16, 'w'),
    color: CUSTOM_COLOR.white,
    fontWeight: '600',
  },
});

export default CustomButton;
