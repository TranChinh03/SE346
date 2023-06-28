import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import { IMG_AUTHBACKGROUND } from '../src/assets/img'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CustomButton from '../src/components/button'
import TextBox from '../src/components/textBox'
import BackButton from '../src/components/backButton'
import {useNavigation} from '@react-navigation/native'
import {firebase} from '../configs/FirebaseConfig'

const ForgotPasswordScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')

    changePassword = async(email) => {
      try {
        await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
             Alert.alert("Password reset email sent")
             navigation.navigate('Login')
        }).catch ((error) => {
             Alert.alert(error.message)
        })
      } catch (error) {
        Alert.alert(error.message)
      }
    }

    return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={IMG_AUTHBACKGROUND} resizeMode='cover' style={styles.image}>
             <View style={styles.container1}>
                  <BackButton style={{position: 'absolute', left: 0, top: 0}} onPress={() => navigation.goBack()}/>
                  <Text style={styles.text1}>CHT</Text>
                  <Text style={styles.subtext1}>Course - Homework - Technical</Text>
             </View>
             <View style={styles.container2}>
                  <Text style={styles.text2}>Forgot</Text>
                  <Text style={styles.text2}>password</Text>
                  <Text style={styles.subtext2}>Enter your email address you're using and we will send you a reset password code to this email</Text>
             </View>
                  
             <View style={styles.container3}>
                  <View style={styles.subContainer3}>
                      <TextBox text="" 
                      placeholder="Email"
                      onChangeText = {email => setEmail(email)}></TextBox>
                      {/* <TextBox text="" 
                      placeholder="New Password" 
                      secureTextEntry={true}
                      onChangeText = {password => this.setState({password : password})}></TextBox> */}
                      {/* <TextBox text="" 
                      placeholder="Confirm Password" 
                      secureTextEntry={true}
                      onChangeText = {confirmPassword => this.setState({confirmPassword : confirmPassword})}></TextBox> */}
                      <CustomButton textButton="Send" 
                      onPress={() => {
                          changePassword(email)
                      }}
                      ></CustomButton>
                  </View>
                  <View style={styles.bottomContainer}>
                      <Text style={styles.bottomText}>Or back to </Text>
                      <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}>
                          <Text style={[styles.bottomText, styles.addBottomText]}>Log in</Text>
                      </TouchableOpacity>
                  </View>
             </View>
          </ImageBackground>
        </SafeAreaView>
      )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        flex: 1,
    },
    container1: {
        flex:2,
        alignItems: 'center'
    },

    container2: {
        flex: 1.5,
    },

    container3: {
        flex:2.5,
        alignSelf: 'center',
    },

    text1: {
        color: CUSTOM_COLORS.white,
        fontSize: scale(75, 'w'),
        marginTop: scale(40, 'h'),
        fontWeight:'bold'
    },
    subtext1: {
        color: CUSTOM_COLORS.white,
        fontSize: scale(16, 'w'),
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
        alignSelf: 'center',
        marginTop: scale(20, 'h'),
        alignSelf: 'center',
        marginHorizontal: scale(30, 'w'),
        textAlign: 'center',
    },

    subContainer3: {
        height: scale(253,'h'),
        justifyContent: 'space-around',
    },

    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: scale(20,'h'),
        alignSelf: 'center'
    },
    bottomText: {
        fontSize: scale(16,'w'),
        color: CUSTOM_COLORS.usBlue,
    },
    addBottomText: {
        fontWeight: 'bold'
    }
})