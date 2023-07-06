import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import LoadingScreen from './screens/LoadingScreen';
import SearchBar from './src/components/searchBar';
import textBox from './src/components/textBox';
import VerifyCodeScreen from './screens/VerifyCodeScreen';
import CustomButton from './src/components/button';
import TextBox from './src/components/textBox';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import IntroScreen from './screens/IntroScreen';
import SwitchButton from './src/components/switch';
import BottomTab from './src/components/bottomTab';
import CourseScreen from './screens/CourseScreen';
import AppNavigation from './navigation/AppNavigation';
import NavigationBottomTab from './src/components/navigationBottomTab';
import CourseDetailScreen from './screens/CourseDetailScreen';
import {LessonBox} from './src/components/lessonBox';
import {ProgressBar} from 'react-native-paper';
import CusProgressBar from './src/components/progressBar';
import DropDown from './src/components/dropDown';
import Evaluation from './src/components/evaluation';
import ProfileScreen from './screens/ProfileScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import CusRatingBar from './src/components/CusRatingBar';
import SettingScreen from './screens/SettingScreen';
import HomeScreen from './screens/HomeScreen';
import NoticationScreen from './screens/NotificationScreen';
import NotificationItem from './src/components/notificationItem';
import TickButton from './src/components/tickButton';
import ListItemCustom from './src/components/ListItemCustom';
import TodoScreen from './screens/TodoScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import AddCourseScreen from './screens/AddCourseScreen';
import AddChapterScreen from './screens/AddChapterScreen';
import AddLessonScreen from './screens/AddLessonScreen';
import AddOptionScreen from './screens/AddCourseScreen';
import SearchScreen from './screens/SearchScreen';
import EditCourseScreen from './screens/EditCourseScreen';
import RatingScreen from './screens/RatingScreen';
import EditChapterScreen from './screens/EditChapterScreen';
import EditLessonScreen from './screens/EditLessonScreen';

export default function App() {
  return (
    // <SearchBar placeholder='Find Course...'/>
    // textBox("Enter Text", true),
    // <VerifyCodeScreen/>
    // <CustomButton textButton='Confirm'/>
    // <TextBox text="abc" placeholder="Enter..." secureTextEntry={true}></TextBox>
    // <ForgotPasswordScreen/>
    // <LoginScreen/>
    // <SignUpScreen/>
    // <IntroScreen/>
    // <SwitchButton />
    //<CourseScreen />
    <AppNavigation />
    // <AddOptionScreen/>
    // <ProfileEditScreen/>
    // <ProfileScreen/>
    // <BottomTab/>
    //<CourseDetailScreen />
    // <LessonBox/>
    // <CusProgressBar percent = '80%'/>
    // <DropDown/>
    // <Evaluation/>
    // <LessonDetailScreen/>
    //<HomeScreen />
    // <IntroScreen/>
    // <HomeScreen1/>
    // <NoticationScreen />
    // <NotificationItem />
    // <TickButton />
    //<TodoScreen />
    //<ListItemCustom />
    //<AddCourseScreen />
    //<AddChapterScreen />
    //<AddLessonScreen />
    // <SearchScreen />
    // <EditCourseScreen />
    //<RatingScreen />
    // <EditChapterScreen />
    // <EditLessonScreen />

  );
}
