import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import BackButton from '../src/components/backButton'
import scale from '../src/constants/responsive'
import CUSTOM_COLORS from '../src/constants/colors'
import { IMG_AVT } from '../src/assets/img'
import { IC_RightArrow, IC_Help, IC_Language, IC_Moon, IC_Notification, IC_LOGOUT } from '../src/assets/iconsvg'
// import SwitchButton from '../src/components/switch'
import {firebase} from '../configs/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import { IMG_LOGOUTBACKGROUND } from '../src/assets/imgsvg'

const SettingScreen = ()  => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        firebase.auth()
          .signOut()
          .then(() => {
            navigation.replace("Loading")
          })
          .catch(error => alert(error.message))
      }
    
      const [profile, setProfile] = useState('');
    
    
      useEffect(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            if (snapshot.exists) {
              setProfile(snapshot.data());
            } else {
              console.log('User does not exist');
            }
          });
        });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backContainer} >
                {/* <BackButton type={1}/> */}
            </View>
            <View style={styles.titleContainer} >
                <Text style={styles.title}>Setting</Text>
            </View>
            <View style={styles.accountContainer} >
                <View style={styles.accountLabel}>
                    <Text style={styles.label}>Account</Text>
                </View>
                <View style={styles.accountContent}>
                    <View style={{flex: 3}}>
                        <View style={styles.avtFrame}>
                            <Image style={styles.avt} source={IMG_AVT}/>
                        </View>
                    </View>
                    <View style={{flex: 5, padding: scale(20, 'w')}}>
                        <Text style={styles.name}>{profile.name}</Text>
                    </View>
                    <View style={{flex: 2, padding: scale(10, 'w')}}>
                        <TouchableOpacity
                         onPress={() => navigation.navigate('Profile')}
                         style={styles.arrowContainer}>
                            <IC_RightArrow/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <View style={styles.settingContainer} >
                <View style={styles.settingLabel}>
                    <Text style={styles.label}>Setting</Text>
                </View>

                <View style={[styles.settingContent, {display: 'flex'}]}>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.FrenchViolet}]}>
                                <IC_Language/>
                            </View>
                        </View>
                        <View style={{flex: 6}}>
                            <View style={{    
                                width: '100%',
                                height: scale(36, 'w'),
                                display: 'flex', 
                                justifyContent: 'center', 
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: scale(10, 'w'),
                                paddingRight: scale(10, 'w')}}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.itemText}>Language</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <Text style={{fontSize: scale(14, 'w')}}>English</Text>
                                    </View>
                            </View>
                        </View>
                        <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                            <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                <IC_RightArrow type={1}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.PictionBlue}]}>
                                <IC_Notification/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Notification</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                    <IC_RightArrow type={1}/>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <View style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.stateBlue}]}>
                                <IC_Moon/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Dark Mode</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                </View>
                            </View>
                    </View>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={{flex: 2.5}}>
                            <View style={[styles.icFrame, {backgroundColor: CUSTOM_COLORS.Aquamarine}]}>
                                <IC_Help/>
                            </View>
                        </View>
                            <View style={{flex: 6}}>
                                <View style={{    
                                    width: '100%',
                                    height: scale(36, 'w'),
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: scale(10, 'w'),
                                    paddingRight: scale(10, 'w')}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.itemText}>Notification</Text>
                                        </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5, padding: scale(10, 'w')}}>
                                <View style={{width: '100%', height: scale(36-14, 'w'), justifyContent: 'center'}}>
                                    <IC_RightArrow type={1}/>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={{flex: 3}}/>
            <View style={styles.logOutContainer}>
                <TouchableOpacity onPress={handleSignOut} style={{
                  flex: 6,
                  padding: scale(10, 'w'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                    <Text style={styles.logouttext}>Log Out  </Text>
                    <IC_LOGOUT></IC_LOGOUT>
                </TouchableOpacity>

                <View style={{flex: 4}}>
                    <IMG_LOGOUTBACKGROUND/>
                </View>
            </View>
            <View style={{height: scale(100, 'h')}} />
        </SafeAreaView>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
    },
    backContainer: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        paddingLeft: scale(38, 'w'),
    },
    title:{
        fontSize: scale(40, 'w'),
        fontWeight: 'normal',
        color: CUSTOM_COLORS.black,
    },
    accountContainer: {
        flex: 2,
        display: 'flex',
    },
    accountLabel: {
        justifyContent: 'center',
        paddingLeft: scale(38, 'w'),
        flex: 3,
    },
    accountContent: {
        flex: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avtFrame: {
        backgroundColor: CUSTOM_COLORS.white,
        alignSelf: 'flex-end',
        width: scale(50, 'w'),
        height: scale(50, 'w'),
        borderRadius: scale(25, 'w'),
        overflow: 'hidden',
    },
    avt: {
        width: scale(50, 'w'),
        height: scale(50, 'w'),
        borderRadius: scale(50/2, 'w'),
    },
    name: {
        fontSize: scale(14, 'w'),
        color: CUSTOM_COLORS.gray,
        fontWeight: 'bold',
    },
    subName: {
        fontSize: scale(14, 'w'),
        color: CUSTOM_COLORS.gray,
    },
    arrowContainer: {
        width: scale(45, 'w'),
        height: scale(45, 'w'),
        backgroundColor: CUSTOM_COLORS.usBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(10, 'w'),
    },
    settingContainer: {
        flex: 5,
        display: 'flex',
    },
    settingLabel: {
        justifyContent: 'center',
        paddingLeft: scale(38, 'w'),
        flex: 1.5,
    },
    settingContent: {
        flex: 8.5,
        display: 'flex',
    },
    settingItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    icFrame: {
        width: scale(36 , 'w'),
        height: scale(36, 'w'),
        borderRadius: scale(18, 'w'),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.2,
        },
    logOutContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        
    },
    label: {
        fontSize: scale(20, 'w'),
        fontWeight: 'normal',
        color: CUSTOM_COLORS.black,
    },
    itemText: {
        fontSize: scale(14, 'w'),
        color: CUSTOM_COLORS.gray,
    },
    logouttext: {
        fontSize: scale(20, 'w'),
        color: CUSTOM_COLORS.usBlue,
    }
})

