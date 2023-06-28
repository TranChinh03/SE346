import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import NotificationItem from '../src/components/notificationItem';
import {IC_Delete, IC_Prev} from '../src/assets/iconsvg';
import TickButton from '../src/components/tickButton';

export default function NotificationsScreen(props) {
  const [notifications, setNotifications] = useState([
    {
      notiID: '1',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
    {
      notiID: '2',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
    {
      notiID: '3',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
    {
      notiID: '4',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
    {
      notiID: '5',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
    {
      notiID: '6',
      sourceInfo: 'Hau Nguyen',
      notiInfo: 'updated a new course',
    },
  ]);
  const handleDelete = () => {
    setNotifications(null);
  };
  // useEffect(() => {
  //   fetch notification data ...
  // });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <IC_Prev />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Notifications</Text>
        <Text>
          You have{' '}
          <Text style={styles.numberOfNoti}>
            {notifications ? notifications.length : 0} notifications
          </Text>{' '}
          today
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <IC_Delete />
        </TouchableOpacity>
      </View>
      <View style={styles.todayNoti}>
        <Text style={styles.category}>Today</Text>
        {notifications
          ? notifications.map(notification => {
              return (
                <NotificationItem
                  key={notification.notiID}
                  text={`${notification.sourceInfo} ${notification.notiInfo}`}
                />
              );
            })
          : null}
      </View>
      <View style={styles.todayNoti}>
        <Text style={styles.category}>Old</Text>
        {notifications
          ? notifications.map(notification => {
              return (
                <NotificationItem
                  key={notification.notiID}
                  text={`${notification.sourceInfo} ${notification.notiInfo}`}
                />
              );
            })
          : null}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  header: {
    marginTop: scale(45, 'h'),
    marginLeft: scale(30, 'w'),
  },
  textHeader: {
    fontSize: scale(35, 'w'),
    fontWeight: '500',
    marginBottom: scale(10, 'h'),
  },
  numberOfNoti: {
    color: CUSTOM_COLORS.skyBlue,
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '78%',
    top: '80%',
    width: scale(45, 'w'),
    height: scale(45, 'h'),
    backgroundColor: '#FF5F50',
    borderRadius: 999,
  },
  category: {
    fontSize: scale(22, 'w'),
    fontWeight: '500',
    marginLeft: scale(30, 'w'),
    marginTop: scale(15, 'h'),
  },
});
