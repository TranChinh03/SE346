import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {Component} from 'react';
import CUSTOM_FONTS from '../src/constants/fonts';

export class LoadingScreen extends Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Intro');
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../src/assets/img/Loading.png')}
          resizeMode="cover"
          style={styles.image}>
          <Text style={[styles.text, styles.title]}>CHT</Text>
          <Text style={[styles.text, styles.subTitle]}>
            Course - Homework - Technical
          </Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: 75,
    fontFamily: CUSTOM_FONTS.bold,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: CUSTOM_FONTS.italic,
  },
});
