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
import {
  IC_SEARCH,
  IC_FILLEDHEART,
  IC_HEART,
  IC_INFORMATION,
  IC_PLAYCIRCLE,
  IC_DROPDOWN,
} from '../assets/icons';
import {SelectList} from 'react-native-dropdown-select-list';
import DropDown from './dropDown';

  data = [
    {
      key: '1',
      value: 'PDF',
    },
    {
      key: '2',
      value: 'Test',
    },
  ]
  
  export class LessonBox extends Component {
    constructor(props) {
      super(props);
      this.state = {showFavor: false};
    }
  
    render() {
      return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity  style={styles.playIcon} onPress={this.props.onPress}>
              <Image source={IC_PLAYCIRCLE}></Image>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.duration}>{this.props.duration}</Text>
                </View>
                <View style={styles.docsContainer}>
                    <Text style={styles.docs}>PDF</Text>
                    <Text style={[styles.docs, {marginLeft: scale(30, 'w')}]}>Test</Text>
                </View>
            </View>
            <DropDown/>

        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: scale(60, 'h'),
      width: scale(319, 'w'),
      borderWidth: 1,
      borderRadius: scale(15 ,'w'),
      borderColor: 'rgba(60, 58, 54, .5)',
      alignItems: 'center',
      marginTop: scale(15, 'h'),
    },
    playIcon:{
        marginLeft: scale(10, 'w'),
    },
    textContainer: {
        width: scale(230, 'w'),
        height: '100%',
        marginLeft: scale(10, 'w'),
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    title: {
        color: CUSTOM_COLOR.black,
        fontSize: scale(16,'w'),
    },
    docsContainer: {
        flexDirection: 'row',
        marginTop: scale(5, 'h'),
    },
    docs: {
        color: CUSTOM_COLOR.gray,
        fontSize: scale(13, 'w'),
        opacity: 0.8,
        textDecorationLine: 'underline',
    },
    duration: {
        color: CUSTOM_COLOR.gray,
        fontSize: scale(10, 'w'),
        opacity: 0.8,
        textDecorationLine: 'underline',
        marginLeft: scale(10, 'w'),
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
  
  export default LessonBox;
  