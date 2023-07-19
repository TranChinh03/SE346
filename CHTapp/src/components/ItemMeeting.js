import {Text, StyleSheet, View, TouchableOpacity, Linking, Alert} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';
import CUSTOM_SIZES from '../constants/size';
import CUSTOM_FONTS from '../constants/fonts';
import {Button} from 'react-native-paper';
import { Link } from '@react-navigation/native';

export default class ItemMeeting extends Component {

  handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(this.props.link);
      console.log('props.link', this.props.link);
      console.log('supported', supported);

      await Linking.openURL(this.props.link)

    } catch (error) {
      // console.error('An error occurred while checking if the URL can be opened:', error);
      Alert.alert('This link is wrong!');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content1}>
          <Text style={styles.txtMeetingName}>{this.props.meetingName}</Text>
          <Text style={styles.txtTime}>
            {this.props.date} {this.props.time}
          </Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.txtTitle}>{this.props.courseName}</Text>
          <View style={styles.container3}>
            <View style={styles.conLec}>
              <Text style={styles.txtTitle2}>{this.props.lectureName}</Text>
            </View>
            {/* <View style={styles.txtTitle2}>
              <Text>{this.props.link}</Text>
            </View> */}
            <View style={styles.conBtn}>
              {/* <TouchableOpacity
                onPress={async () => {
                const supported = await Linking.canOpenURL(this.props.link);
                
                {console.log('item.joinUrl',this.props.link)}

                if (supported) {
                  {console.log('item.joinUrl',this.props.link)}
                  await Linking.openURL(this.props.link);
                } else {
                  Alert.alert('This link is wrong!');
                }
              }}
              style={styles.btnJoin}>
                <Text style={styles.txtJoin}>Join</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={this.handlePress}
                style={styles.btnJoin}>
                <Text style={styles.txtJoin}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `mailto:demo@example.com?subject=Invitation Mail&body=You have invited to the meeting: ${this.props.link}`,
                  )
                }
                style={styles.btnInvite}>
                <Text style={styles.txtJoin}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scale(95, 'h'),
    width: scale(325, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLORS.stateBlue,
    marginVertical: scale(20, 'h'),
    alignSelf: 'center',
    borderRadius: scale(15, 'w'),
  },
  content1: {
    flex: 1,
    //backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  content2: {
    //marginTop: scale(20, 'h'),
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'yellow',
  },
  container3: {
    flexDirection: 'row',
    alignContent: 'center',
    //backgroundColor: 'yellow',
  },
  txtMeetingName: {
    fontSize: CUSTOM_SIZES.xLarge,
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.stateBlue,
    marginLeft: scale(10, 'w'),
    marginTop: scale(10, 'w'),
  },
  txtTime: {
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.stateBlue,
    //marginLeft: scale(10, 'w'),
    marginRight: scale(10, 'w'),
    marginTop: scale(10, 'w'),
    alignItems: 'flex-end',
  },
  txtTitle: {
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.stateBlue,
    marginLeft: scale(10, 'w'),
    marginRight: scale(10, 'w'),
    //marginTop: scale(10, 'w'),
    alignItems: 'center',
  },
  txtTitle2: {
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.stateBlue,
    marginLeft: scale(10, 'w'),
    marginRight: scale(10, 'w'),
    //marginTop: scale(10, 'w'),
    alignItems: 'flex-end',
  },
  btnJoin: {
    height: scale(40, 'h'),
    width: scale(95, 'w'),
    backgroundColor: CUSTOM_COLORS.stateBlue,
    borderRadius: scale(10, 'w'),
    justifyContent: 'center',
    margin: scale(5, 'w'),
  },
  btnInvite: {
    height: scale(40, 'h'),
    width: scale(95, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    borderRadius: scale(10, 'w'),
    justifyContent: 'center',
    margin: scale(5, 'w'),
  },
  txtJoin: {
    color: 'white',
    fontSize: CUSTOM_SIZES.large,
    alignSelf: 'center',
  },
  conBtn: {
    flex: 1,
    flexDirection: 'row',
  },
  conLec: {
    flex: 0.7,
    flexDirection: 'row',
  },
});
