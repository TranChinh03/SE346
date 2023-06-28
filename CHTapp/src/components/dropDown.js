import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    Modal,
  } from 'react-native';
  import React, {Component, useState} from 'react';
  import scale from '../constants/responsive';
  import CUSTOM_COLOR from '../constants/colors';
  import {IC_SEARCH, IC_FILLEDHEART, IC_HEART} from '../assets/icons';
import CUSTOM_COLORS from '../constants/colors';
import StarRating from 'react-native-star-rating-widget';
import { IC_DROPDOWN } from '../assets/icons';
  
  export default DropDown = (props) => {
    const [visible, setVisible] = useState(false);
    const options = [
      {
        title: 'PDF',
      },
      {
        title: 'Test',
      },
    ];
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Image source= {IC_DROPDOWN}/>
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex: 1}} onTouchStart={() => setVisible(false)}>
                    <View style={styles.popup}>
                        {options.map((op, i) => (
                        <TouchableOpacity
                            style={styles.option}
                            key={i}
                            onPress={() => {}}>
                            <Text style={styles.title}>{op.title}</Text>
                        </TouchableOpacity>
                        ))}
                </View>
                </SafeAreaView>
            </Modal>
        </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {

    },
    popup: {
        borderRadius: scale(5, 'w'),
        borderColor: CUSTOM_COLOR.gray,
        borderWidth: 0.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(87 , 'h'),
        width: scale(80, 'w'),
      },
      option: {
        paddingVertical: scale(10 , 'h'),
      },
      title: {
        fontSize: scale(13, 'w'),
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
      },
  });
  
  