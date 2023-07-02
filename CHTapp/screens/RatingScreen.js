import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Component} from 'react';
import BackButton from '../src/components/backButton';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_COLORS from '../src/constants/colors';
import CUSTOM_FONTS from '../src/constants/fonts';
import scale from '../src/constants/responsive';
import {
  IMG_AVT,
  IMG_CPP,
  IMG_CPPBACKGROUND,
  IMG_CSHARP,
} from '../src/assets/img';
import StarRating from 'react-native-star-rating-widget';

export default class RatingScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.conHeader}>
          <View style={styles.conTitle}>
            <BackButton type={1} onPress={() => {}} />
            <TouchableOpacity style={styles.conPost}>
              <Text style={styles.txtPost}>Post</Text>
            </TouchableOpacity>
            {/* <Text style={styles.header}>Rating Couse</Text> */}
          </View>
          <View style={styles.conCourse}>
            <View style={styles.conSub}>
              <Text style={styles.courseName}>
                JavaScript for Beginners 2023
              </Text>
              <Text style={styles.lecturer}>Bich Hang Le</Text>
            </View>
            <View style={styles.conImg}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={IMG_CPPBACKGROUND}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: CUSTOM_COLORS.lightGray,
            margin: scale(20, 'h'),
          }}
        />
        <View style={styles.conRate}>
          <View style={styles.conUsr}>
            <Image style={styles.imgAvt} source={IMG_AVT} />
            <Text style={styles.txtUsrName}>Xuan Thao</Text>
          </View>
          <StarRating
            //onChange={() => navigation.navigate('RatingScreen')}
            onChange={() => {}}
            maxStars={5}
            starSize={scale(40, 'w')}
            rating={0}
            starStyle={[
              styles.star,
              {marginHorizontal: scale(7, 'w'), marginTop: scale(10, 'w')},
            ]}
          />

          {/* <TextInput
            placeholder="Tell us more (optional)"
            style={styles.txtInput}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  conHeader: {
    flex: 2.5,
    //backgroundColor: 'pink',
    justifyContent: 'space-between',
  },
  conRate: {
    flex: 8,
    //backgroundColor: 'pink',
  },
  conTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: CUSTOM_SIZES.large,
    color: CUSTOM_COLORS.usBlue,
    fontFamily: CUSTOM_FONTS.medium,
    marginLeft: scale(15, 'w'),
    //marginBottom: scale(5, 'w'),
  },
  courseName: {
    fontSize: CUSTOM_SIZES.large,
    color: CUSTOM_COLORS.gray,
    fontFamily: CUSTOM_FONTS.medium,
    marginLeft: scale(15, 'w'),
    //marginBottom: scale(5, 'w'),
  },
  lecturer: {
    fontSize: CUSTOM_SIZES.small,
    color: CUSTOM_COLORS.gray,
    fontFamily: CUSTOM_FONTS.light,
    marginLeft: scale(15, 'w'),
    //marginBottom: scale(5, 'w'),
  },
  conCourse: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    height: '60%',
    alignItems: 'center',
  },
  img: {
    height: '80%',
    width: '100%',
    alignSelf: 'flex-end',
    borderRadius: scale(10, 'w'),
    marginRight: scale(10, 'w'),
  },
  conSub: {
    flex: 2,
    // /backgroundColor: 'green',
  },
  conImg: {
    flex: 1,
    // /justifyContent: 'flex-end',
    //backgroundColor: 'gray',
  },
  conPost: {
    width: '20%',
    //backgroundColor: 'gray',
    justifyContent: 'center',
    marginRight: scale(10, 'w'),
    marginTop: scale(20, 'w'),
    //alignSelf: 'flex-end',
  },
  txtPost: {
    fontSize: CUSTOM_SIZES.large,
    color: CUSTOM_COLORS.usBlue,
    alignSelf: 'center',
    fontFamily: CUSTOM_FONTS.medium,
  },
  conUsr: {
    flexDirection: 'row',
    //backgroundColor: 'yellow',
  },
  imgAvt: {
    height: scale(50, 'h'),
    width: scale(50, 'h'),
    borderRadius: scale(50 / 2, 'h'),
    marginLeft: scale(15, 'w'),
  },
  txtUsrName: {
    fontSize: CUSTOM_SIZES.small,
    color: CUSTOM_COLORS.gray,
    fontFamily: CUSTOM_FONTS.medium,
    marginLeft: scale(15, 'w'),
    alignSelf: 'center',
  },
  star: {
    marginLeft: scale(20, 'w'),
  },
  txtInput: {
    marginTop: scale(20, 'h'),
    height: scale(100, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.gray,
    fontSize: CUSTOM_SIZES.medium,
    padding: scale(15, 'w'),
  },
});
