import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import CUSTOM_COLORS from '../constants/colors';
import scale from '../constants/responsive';

export default class CourseAttendedBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          courses: props.courses,
        }
      }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.numCourses}>{this.props.courses}</Text>
        <Text style={styles.desbribe}>Courses Attended</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: scale(140, 'w'),
        height: scale(87, 'h'),
        backgroundColor: CUSTOM_COLORS.Grape,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    numCourses: {
        fontSize: scale(36, 'w'),
        color: CUSTOM_COLORS.white,
    },
    desbribe: {
        fontSize: scale(13, 'w'),
        color: CUSTOM_COLORS.white,
    }
})