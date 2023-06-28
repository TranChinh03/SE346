import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    Modal,
  } from 'react-native';
  import React, {Component, useState} from 'react';
  import scale from '../constants/responsive';
  import CUSTOM_COLOR from '../constants/colors';
  import {IC_SEARCH, IC_FILLEDHEART, IC_HEART} from '../assets/icons';
import CUSTOM_COLORS from '../constants/colors';
import StarRating from 'react-native-star-rating-widget';
import { IC_DROPDOWN } from '../assets/icons';
  
  export default Evaluation = (props) => {
    return (
       <View style={styles.container}>
          <Text style={styles.studentName}>{props.name}</Text>
          <View style={styles.evaluationContainer}>
            <StarRating
                onChange={() => {}}
                maxStars={5}
                starSize={scale(15, 'w')}
                rating={props.rating}
                starStyle={styles.star}
              />
              <Text style={styles.date}>{props.date}</Text>
          </View>
          <Text style={styles.comment}>{props.comment}</Text>
       </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
        height: scale(75, 'h'),
        width: '100%',
        marginTop:  scale(10, 'h'),
    },
    studentName: {
      fontSize: scale(15, 'w'),
      color: CUSTOM_COLORS.black,
      fontWeight: '500',
    },
    star: {
      padding: 0,
      marginHorizontal: 0,
    },
    evaluationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      fontSize: scale(10, 'w'), 
      fontWeight: '400',
      color: CUSTOM_COLORS.gray,
      marginLeft: scale(10, 'w'),
    },
    comment: {
      fontSize: scale(13, 'w'),
      fontWeight: '400',
      color: CUSTOM_COLOR.gray,
      marginTop: scale(10, 'h'),
    },
  });
  
  