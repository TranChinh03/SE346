import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import StarRating from 'react-native-star-rating-widget';
import CUSTOM_FONTS from '../constants/fonts';
import CUSTOM_SIZES from '../constants/size';
import CUSTOM_COLORS from '../constants/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IC_EYE} from '../assets/icons';
import scale from '../constants/responsive';
import {IMG_CPP, IMG_CSHARP, IMG_JAVASCRIPT, IMG_PYTHON, IMG_RUBY} from '../assets/img';

export default class CourseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      title: '',
      author: '',
      rating: '',
      view: '',
      key: '',
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        {this.props.image === '' ? (
          <Image 
          source={IMG_CPP}
          resizeMode="contain"
          style={styles.logoImage}
          />
        ) : (
          <Image
          source = {{uri : this.props.image}}
          resizeMode="contain"
          style={styles.logoImage}
        />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.courseName}>{this.props.title}</Text>
          <Text style={styles.lecturerName}>{this.props.author}</Text>
          <View style={styles.infoWrapper}>
            <StarRating
              onChange={() => {}}
              maxStars={5}
              starSize={15}
              rating={this.props.rating}
              starStyle={styles.star}
            />
            <View style={styles.viewContainer}>
              <Text style={styles.view}>{this.props.view}</Text>
              <Image source={IC_EYE} style={styles.icon} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: scale(141.24, 'w'),
    height: scale(167.78, 'h'),
    borderRadius: CUSTOM_SIZES.medium,
    shadowColor: CUSTOM_COLORS.white,
    backgroundColor: CUSTOM_COLORS.white,
  },
  logoImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    borderRadius: CUSTOM_SIZES.medium,
  },
  infoContainer: {
    flex: 2,
    marginHorizontal: CUSTOM_SIZES.small / 1.5,
    //backgroundColor: 'yellow',
  },
  courseName: {
    flex: 2,
    fontSize: CUSTOM_SIZES.small,
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.gray,
  },
  lecturerName: {
    flex: 1,
    marginTop: 5,
    fontSize: CUSTOM_SIZES.xSmall,
    fontFamily: CUSTOM_FONTS.light,
    color: CUSTOM_COLORS.gray,
    //backgroundColor: 'green',
  },
  infoWrapper: {
    flex: 1,
    padding: 0,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  star: {
    padding: 0,
    marginHorizontal: 0,
    //backgroundColor: 'violet',
  },
  viewContainer: {
    width: scale(28, 'w'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    color: CUSTOM_COLORS.gray,
    fontSize: CUSTOM_SIZES.xSmall,
    fontFamily: CUSTOM_FONTS.light,
  },
  icon: {
    height: scale(10, 'h'),
    width: scale(10, 'h'),
  },
});