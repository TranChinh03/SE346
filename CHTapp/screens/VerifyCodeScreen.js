import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { IMG_AUTHBACKGROUND } from '../src/assets/img'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CustomButton from '../src/components/button'
import BackButton from '../src/components/backButton'

export class VerifyCodeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMG_AUTHBACKGROUND} resizeMode='cover' style={styles.image}>
           <View style={styles.container1}>
                <BackButton onPress={() => this.props.navigation.goBack()}/>
                <Text style={styles.text1}>CHT</Text>
                <Text style={styles.subtext1}>Course - Homework - Technical</Text>
           </View>
           <View style={styles.container2}>
                <Text style={styles.text2}>Verify</Text>
                <Text style={styles.text2}>email address</Text>
                <Text style={styles.subtext2}>Verification code sent to your email</Text>
                <View style={styles.subcontainer2}>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} selectionColor={CUSTOM_COLORS.FrenchViolet} maxLength={1}></TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} selectionColor={CUSTOM_COLORS.FrenchViolet} maxLength={1}></TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} selectionColor={CUSTOM_COLORS.FrenchViolet} maxLength={1}></TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} selectionColor={CUSTOM_COLORS.FrenchViolet} maxLength={1}></TextInput>
                    </View>

                </View>
           </View>
                
           <View style={styles.container3}>
                <CustomButton onPress={() => this.props.navigation.navigate('Login')} textButton="Confirm code"></CustomButton>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.subTextButton}>Resend confirmation code</Text>
                </TouchableOpacity>
                <View style={styles.subContainer3}>
                    <Text style={styles.bottomText}>Or back to </Text>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={[styles.bottomText, styles.addBottomText]}>Log in</Text>
                    </TouchableOpacity>
                </View>
           </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default VerifyCodeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        flex: 1,
    },
    container1: {
        flex:1,
        alignItems: 'center'
    },

    container2: {
        flex:1,
    },

    container3: {
        flex:1,
        alignSelf: 'center',
        marginTop: scale(80,'h'),
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
        marginTop: scale(40, 'h'),
    },
    subcontainer2: {
        marginTop: scale(40, 'h'),
        flexDirection: 'row',
        marginHorizontal: scale(25, 'w'),
        justifyContent: 'space-between'
    },
    textInputContainer: {
        height: scale(57, 'h'),
        width: scale(48,'w'),
        borderWidth: 1,
        borderColor: CUSTOM_COLORS.FrenchViolet,
        borderRadius: scale(10,'w'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        fontSize: scale(35, 'h'),
        color: CUSTOM_COLORS.FrenchViolet,

    },
    buttonContainer: {
        alignSelf: 'center',
        marginTop: scale(15, 'h'),
    },
    subTextButton: {
        fontSize: scale(14, 'w'),
        color: CUSTOM_COLORS.usBlue,
        fontWeight: '500'
    },
    subContainer3: {
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