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
import CUSTOM_COLORS from '../constants/colors';
import StarRating from 'react-native-star-rating-widget';
  
  export default CusProgressBar = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={styles.progressBackground}></View>
                <View style={[styles.progress, { width: `${props.percent}%`}]}></View>
            </View>
            <StarRating
              onChange={() => {}}
              maxStars={5}
              starSize={25}
              rating={props.rating}
              starStyle={styles.star}
              style={{marginLeft: scale(10, 'w')}}
            />
            <Text style={styles.percentageText}>{`${props.percent}%`}</Text>
        </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: scale(15, 'h'),
        alignItems: 'center',
    },
    container1: {
        width: scale(160, 'w'),
        height: scale(9, 'h'),
        borderRadius: scale(5, 'w'),
    },
    progressBackground: {
        backgroundColor: 'pink',
        width: '100%',
        height: '100%',
        borderRadius: scale(5, 'w'),
        position: 'absolute',
        backgroundColor: CUSTOM_COLORS.Grape,
        opacity: 0.3,
    },
    progress: {
        height: '100%',
        backgroundColor: CUSTOM_COLORS.Grape,
        borderRadius: scale(5, 'w'),
        position: 'absolute',
    },
    star: {
        padding: 0,
        marginHorizontal: 0,
    },
    percentageText: {
        color: CUSTOM_COLORS.gray,
        fontWeight: '300',
        fontSize: scale(13, 'w'),
        marginLeft: scale(5, 'w'),
    },
  });
  
  