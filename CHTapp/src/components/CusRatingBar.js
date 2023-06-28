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
import CUSTOM_COLORS from '../constants/colors';
import StarRating from 'react-native-star-rating-widget';
import { IC_FILLEDSTART, IC_START } from '../assets/icons';



export default CustomRatingBar = (props) => {
    const [defaultRating, setDefaultRating] = useState(1);

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={item <= defaultRating ? IC_FILLEDSTART : IC_START}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const styles = StyleSheet.create({
    customRatingBarStyle: {
      flexDirection: 'row',
    },
    starImageStyle: {
      width: scale(20, 'w'),
      height: scale(20, 'w'),
      marginLeft: scale(5, 'w'),
    },
  });