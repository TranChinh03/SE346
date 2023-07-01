import {Text, StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import React, {Component} from 'react';
import SearchBar from '../src/components/searchBar';
import ItemSearchCourse from '../src/components/ItemSearchCourse';
import {IMG_CPPBACKGROUND, IMG_CSHARP} from '../src/assets/img';

const data = [
  {
    id: 'content1',
    title: 'Meeting 1',
    language: 'English',
    courseName: 'C++ for beginers 2023',
    lectureName: 'Tran Minh Chinh',
    img: IMG_CPPBACKGROUND,
    rate: 4.8,
  },
  {
    id: 'dropdown',
    title: 'Meeting 2',
    language: 'English',
    courseName: 'C++ for beginers 2023',
    lectureName: 'Bich Hang Le ',
    img: IMG_CPPBACKGROUND,
    rate: 4.5,
  },
  {
    id: 'content2',
    title: 'Meeting 3',
    language: 'English',
    courseName: 'JavaScript for Beginners 2023',
    lectureName: 'Tran Minh Chinh',
    img: IMG_CSHARP,
    rate: 4.9,
  },
];
export default class SearchScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.conSearch}>
          <SearchBar placeholder={'Search Course...'}></SearchBar>
        </View>
        <View style={styles.conItems}>
          <FlatList
            scrollEnabled={true}
            numColumns={1}
            data={data}
            renderItem={({item, index}) => {
              return (
                <ItemSearchCourse
                  courseName={item.courseName}
                  lectureName={item.lectureName}
                  link={item.joinUrl}
                  source={item.img}
                  rate={item.rate}
                  language={item.language}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  conSearch: {
    flex: 1,
    justifyContent: 'center',
    // /backgroundColor: 'yellow',
  },
  conItems: {
    flex: 10,
    //backgroundColor: 'green',
  },
});
