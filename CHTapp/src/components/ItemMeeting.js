import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';
import CUSTOM_SIZES from '../constants/size';
import CUSTOM_FONTS from '../constants/fonts';
import {Button} from 'react-native-paper';
import {Link} from '@react-navigation/native';

export default class ItemMeeting extends Component {
  handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(this.props.link);
      console.log('props.link', this.props.link);
      console.log('supported', supported);

      await Linking.openURL(this.props.link);
    } catch (error) {
      // console.error('An error occurred while checking if the URL can be opened:', error);
      Alert.alert('This link is wrong!');
    }
  };

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <Text style={styles.txtTime}>
            {this.props.time.substring(16, 21)}
          </Text>
          <Text style={styles.txtTime}>{this.props.date}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.content1}>
            <Text style={styles.txtMeetingName} numberOfLines={1}>
              {this.props.meetingName}
            </Text>
          </View>
          <View style={styles.content2}>
            <Text style={styles.txtTitle} numberOfLines={1}>
              {this.props.courseName}
            </Text>
            <View style={styles.container3}>
              <View style={styles.conLec}>
                <Text style={styles.txtTitle2} numberOfLines={1}>
                  {this.props.lectureName}
                </Text>
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
                  onPress={() => {
                    const appUrl = 'https://bit.ly/3Q5AfPI';
                    Linking.openURL(
                      `mailto:?subject=Join Our Meeting: [${
                        this.props.meetingName
                      }]&body=Dear ..., \n\nI hope this email finds you well. I am writing to extend a warm invitation to join us for an meeting."${
                        this.props.meetingName
                      }" at CHTapp. \n\nMeeting Details: \n\n\tDate: ${
                        this.props.date
                      } \n\tTime: ${this.props.time.substring(
                        16,
                        21,
                      )} \n\tLink: ${this.props.link} \nCourse: ${
                        this.props.courseName
                      } \nLecturer: ${
                        this.props.lectureName
                      } \n\nThank you for considering our invitation. We look forward to having you join us for this meeting \n\nBest regards, \n\n${
                        this.props.user
                      },\n\n\nYou can download CHTapp at this link: ${appUrl}
                      `,
                    );
                  }}
                  style={styles.btnInvite}>
                  <Text style={styles.txtJoin}>Invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={this.props.onPressDel}
          style={styles.btnDelete}>
          <Text style={styles.txtJoin}>Delete</Text>
        </TouchableOpacity>
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
    marginTop: scale(5, 'h'),
    marginBottom: scale(20, 'h'),
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
    width: scale(300, 'w'),
  },
  txtTime: {
    fontSize: CUSTOM_SIZES.small,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.stateBlue,
    //marginLeft: scale(10, 'w'),
    marginRight: scale(10, 'w'),
    marginTop: scale(10, 'w'),
    alignSelf: 'flex-end',
  },
  txtTitle: {
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    color: CUSTOM_COLORS.stateBlue,
    marginLeft: scale(10, 'w'),
    marginRight: scale(10, 'w'),
    marginTop: scale(10, 'w'),
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
    //marginRight: scale(15, 'w'),
  },
  btnInvite: {
    height: scale(40, 'h'),
    width: scale(95, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    borderRadius: scale(10, 'w'),
    justifyContent: 'center',
    margin: scale(5, 'w'),
    //marginHorizontal: scale(20, 'w'),
  },
  btnDelete: {
    height: scale(40, 'h'),
    width: scale(95, 'w'),
    backgroundColor: CUSTOM_COLORS.sunsetOrange,
    borderRadius: scale(10, 'w'),
    justifyContent: 'center',
    marginRight: scale(2, 'w'),
    alignSelf: 'flex-end',
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
