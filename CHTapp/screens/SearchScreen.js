import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import SearchBar from '../src/components/searchBar';
import ItemSearchCourse from '../src/components/ItemSearchCourse';
import {IMG_CPPBACKGROUND, IMG_CSHARP} from '../src/assets/img';
import {firebase} from '../configs/FirebaseConfig';
import BackButton from '../src/components/backButton';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const [allCourses, setAllCourses] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function getData() {
      const allCourses = (await joinedAllCourses()).slice(0, 10);
      setAllCourses(allCourses);
    }

    getData();
  }, [allCourses]);

  async function joinedAllCourses() {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => doc.data());

    const joinedData = courseData.map(firstItem => {
      const secondItem = authorData.find(
        item => item.email === firstItem.author,
      );

      return {...firstItem, ...secondItem};
    });

    return joinedData;
  }

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <BackButton type={1} onPress={() => navigation.goBack()} />
      <View style={styles.conSearch}>
        <SearchBar
          placeholder={'Search Course...'}
          onChangeText={text => setSearchText(text)}></SearchBar>
      </View>
      <View style={styles.conItems}>
        <FlatList
          scrollEnabled={true}
          numColumns={1}
          data={filteredCourses}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CourseStack', {
                    screen: 'CourseDetail',
                    params: {item: item},
                  })
                }>
                <ItemSearchCourse
                  courseName={item.title}
                  lectureName={item.name}
                  image={item.image}
                  rate={item.rate}
                  language={item.language}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

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
