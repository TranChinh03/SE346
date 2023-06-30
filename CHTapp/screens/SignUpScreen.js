import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {Component, useState} from 'react';
import {IMG_AUTHBACKGROUND} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import {IC_FACEBOOK, IC_GOOGLE} from '../src/assets/icons';
import BackButton from '../src/components/backButton';
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import CUSTOM_FONTS from '../src/constants/fonts';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  registerUser = async (email, password, name) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            // url: 'https://chtapp-3a342.firebaseapp.com',
            url: 'https://se346-cht.firebaseapp.com',
          })
          .then(() => {
            Alert.alert('Verification email sent');
          })
          .catch(error => {
            Alert.alert(error.message);
            console.log(error.message)
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                name,
                email,
              });
          })
          .catch(error => {
            Alert.alert(error.message);
            console.log(error.message)
          });
      })
      .catch(error => {
        Alert.alert(error.message);
        console.log(error.message)
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
        <ImageBackground
          source={IMG_AUTHBACKGROUND}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.container1}>
            <BackButton
              style={{position: 'absolute', left: 0, top: 0}}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.text1}>CHT</Text>
            <Text style={styles.subtext1}>Course - Homework - Technical</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.text2}>Sign up</Text>
            <Text style={styles.subtext2}>Create your Account</Text>
            <View style={styles.subContainer2}>
              <TextBox
                text={name}
                placeholder="Name"
                onChangeText={name => setName(name)}></TextBox>
              <TextBox
                text={email}
                placeholder="Email"
                onChangeText={email => setEmail(email)}></TextBox>
              <TextBox
                text={password}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}></TextBox>
              <CustomButton
                onPress={() => {
                  registerUser(email, password, name);
                }}
                textButton="Sign up"></CustomButton>
            </View>
          </View>

          <View style={styles.container3}>
            {/* <Text style={styles.textButton}>- Or log in with -</Text>
            <View style={styles.subContainer3}>
              <TouchableOpacity style={styles.iconContainer}>
                <Image style={styles.icon} source={IC_GOOGLE}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Image style={styles.icon} source={IC_FACEBOOK}></Image>
              </TouchableOpacity>
            </View> */}
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.bottomText, styles.addBottomText]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    flex: 1,
  },
  container1: {
    flex: 2,
    alignItems: 'center',
  },

  container2: {
    flex: 2.8,
  },

  container3: {
    flex: 1,
    alignItems: 'center',
  },

  text1: {
    color: CUSTOM_COLORS.white,
    fontSize: scale(75, 'w'),
    marginTop: scale(40, 'h'),
    fontFamily: CUSTOM_FONTS.bold,
  },
  subtext1: {
    color: CUSTOM_COLORS.white,
    fontSize: scale(16, 'w'),
    fontFamily: CUSTOM_FONTS.italic,
  },
  text2: {
    color: CUSTOM_COLORS.black,
    fontSize: scale(40, 'w'),
    fontWeight: '500',
    marginLeft: scale(25, 'w'),
    marginTop: scale(-10, 'h'),
  },
  subtext2: {
    fontSize: scale(14, 'w'),
    marginTop: scale(20, 'h'),
    marginHorizontal: scale(40, 'w'),
    color: CUSTOM_COLORS.black,
  },

  subContainer2: {
    alignSelf: 'center',
    marginTop: scale(10, 'h'),
    height: scale(240, 'h'),
    justifyContent: 'space-between',
  },

  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  textButton: {
    fontSize: scale(14, 'w'),
    color: CUSTOM_COLORS.black,
  },

  subContainer3: {
    flexDirection: 'row',
    width: scale(150, 'w'),
    justifyContent: 'space-between',
    marginTop: scale(20, 'h'),
  },

  iconContainer: {
    height: scale(48, 'h'),
    width: scale(65, 'w'),
    borderWidth: 1,
    borderColor: CUSTOM_COLORS.gray,
    borderRadius: scale(15, 'w'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: scale(24, 'h'),
    width: scale(24, 'w'),
  },

  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: scale(16, 'w'),
    color: CUSTOM_COLORS.usBlue,
  },
  addBottomText: {
    fontWeight: 'bold',
  },
});
