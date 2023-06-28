import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image, Animated, Dimensions, useWindowDimensions, findNodeHandle } from 'react-native'
import React, { Component, useRef } from 'react'
import { IMG_AUTHBACKGROUND, IMG_INTRO1, IMG_INTRO2, IMG_INTRO3, IMG_INTROBACKGROUND } from '../src/assets/img'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CustomButton from '../src/components/button'
import TextBox from '../src/components/textBox'



const images = [
    {
        id: 1,
        img: IMG_INTRO1,
        title1: 'Learn anytime',
        title2: 'and anywhere',
        subtitle: 'Quarantine is the perfect time to spend your day learning something new, from anywhere!',
        button: 'Next',
    },

    {
        id: 2,
        img: IMG_INTRO2,
        title1: 'Find a course',
        title2: 'and anywhere',
        subtitle: 'Quarantine is the perfect time to spend your day learning something new, from anywhere!', 
        button: 'Next',
    },

    {
        id: 3,
        img: IMG_INTRO3,
        title1: 'Expand your knowledge',
        subtitle: 'Quarantine is the perfect time to spend your day learning something new, from anywhere!',
        button: "Let's Start",
    }
]

var screenWidth =Dimensions.get("window").width;


export class IntroScreen extends Component{
    state={
        active: 0,
    }

    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active) {
           this.setState({active: slide})
        }
    }

//     // let {width: windowWidth, height: windowHeight} = useWindowDimensions();
   
//    const scrollX = useRef (new Animated.Value(0)).current;
//    const scrollY = useRef (new Animated.Value(0)).current;

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={IMG_INTROBACKGROUND} resizeMode='cover' style={styles.image}>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
    
                <View style={styles.container2}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled= {true}
                    ref={(node) => this.scroll = node}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event(
                    //     [{nativeEvent: {
                    //         contentOffset: {x: this.scrollX, y: 0}
                    //         }}],
                    //     {useNativeDriver: false}
                    // )}
                    onScroll={this.change}
                    scrollEventThrottle={16}
                    >
                    {
                    images.map ((image, imageIndex) => {
                        return (
                            <Animated.View style={styles.introContainer}  key={imageIndex}>
                                <View style={styles.imageContainer}>
                                    <Image  source={image.img} ></Image>
                                </View>
    
                                <View style={[styles.titleContainer, {marginTop: scale(20, 'h')}]}>
                                    <Text style={styles.title}>{image.title1}</Text>
                                </View>
    
                                <View  style={styles.titleContainer}>
                                    <Text style={styles.title}>{image.title2}</Text>
                                </View>
    
                                <View style={styles.subTitleContainer}>
                                    <Text style={styles.subTitle}>{image.subtitle}</Text>
                                </View>

    
                                {/* <View style={styles.indicatorContainer}>
                                {
                                images.map((image, imageIndex) => {
                                    const width= scrollX.interpolate({
                                        inputRange: [
                                            windowWidth*(imageIndex - 1),
                                            windowWidth*(imageIndex),
                                            windowWidth*(imageIndex + 1),
                                        ],
                                        outputRange: [8,16,8],
                                        extrapolate: "clamp",
                                    })
    
                                    return (
                                        <Animated.View style={[styles.normalDots, {width}, {backgroundColor: image.color}]} key={imageIndex}>
    
                                        </Animated.View>
                                    )
                                })
                                }
                                </View> */}

                                <View style={styles.pagination}>
                                    {
                                        images.map((i, k) => (
                                            <Text key={k} style={k === this.state.active ? styles.pagingActiveText : styles.pagingText}>•</Text>
                                        ))
                                    }

                                </View>

                                <View style={styles.bottomButton}>
                                    <TouchableOpacity style={styles.buttonLayout}
                                        onPress={() => {
                                            if(image.id === 1)
                                                this.scroll.scrollTo({x: screenWidth * 1});
                                            else if (image.id === 2)
                                                this.scroll.scrollTo({x: screenWidth * 2});
                                            else if(image.id === 3)
                                                this.props.navigation.navigate('Login')
                                        }}>
                                            <Text style={styles.textInside}>{image.button}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        )
                    })
                    }

                    </ScrollView>

                    



                </View>
            </ImageBackground>
        </SafeAreaView>
        )
    }

}



const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        flex: 1,
    },
    container1: {
        flex:1,
        justifyContent: 'center',
    },

    container2: {
        flex: 7.5,
        // backgroundColor: 'pink',
    },

    buttonContainer: {
        width: scale(50 , 'w'),
        position: 'absolute',
        right: 0,
        marginRight: scale(20, 'w')
    },
    buttonText: {
        fontSize: scale(20, 'w'),
        color: CUSTOM_COLORS.FrenchViolet,
        alignSelf: 'center',
        fontWeight: '500'
    },
    introContainer:{

    },
    imageContainer: {
        width: scale(360, 'w'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: scale(265, 'w'),
        height: scale(32, 'h'),
        justifyContent: 'center',
        alignSelf:'center',
        textAlign: 'center',
    },
    title: {
        fontSize: scale(24, 'w'),
        color: CUSTOM_COLORS.FrenchViolet,
        alignSelf: 'center',
        fontWeight: '500',
    },
    subTitleContainer: {
        width: scale(290, 'w'),
        height: scale(64, 'h'),
        marginTop: scale(20 ,'h'),
        justifyContent: 'center',
        alignSelf:'center',
        textAlign: 'center',
    },
    subTitle: {
        color: CUSTOM_COLORS.Arrowtown,
        fontSize: scale(14, 'w'),
        alignSelf: 'center',
    },

    bottomButton: {
        position: 'absolute',
        bottom: 0,
        marginBottom: scale(40, 'w'),
        alignSelf: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(20, 'w'),
    },
    normalDots: {
        flexDirection: 'row',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: CUSTOM_COLORS.FrenchViolet,
        marginHorizontal: 4,
        opacity: 0.3,
    },
    pagination: {
        flexDirection: 'row', 
        alignSelf: 'center',
    },
    pagingText: {
        color: CUSTOM_COLORS.FrenchViolet,
        margin: 3,
        fontSize: scale(50, 'w'),
        opacity: 0.3,
    },
    pagingActiveText: {
        color: CUSTOM_COLORS.FrenchViolet,
        margin: 3,
        fontSize: scale(50, 'w'),
    },
    buttonScrollContainer: {
        width: '100%',
        backgroundColor: 'pink',
        justifyContent: 'center',
    },
    buttonLayout: {
        height: scale(55, 'h'),
        width: scale(304, 'w'),
        backgroundColor: CUSTOM_COLORS.Grape,
        borderRadius: scale(12,'w'),
        justifyContent: 'center',
      },
    
      textInside: {
        fontSize: scale(16,'w'),
        color: CUSTOM_COLORS.white,
        fontWeight: '600',
        alignSelf: 'center',
      },
 
})

export default IntroScreen