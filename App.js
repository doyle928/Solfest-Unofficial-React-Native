import React, { useState, useRef, createRef } from 'react';import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  Animated,
  Button,
  ScrollView
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

import background from './assets/background.mp4'
import logo from './assets/logotest.png';
import lineupThursday from './assets/lineup_thursday_4x.jpg';
import lineupFriday from './assets/lineup_friday_4x.jpg';
import lineupSaturday from './assets/lineup_saturday_2x.jpg';
import lineupSunday from './assets/lineup_sunday_4x.jpg';
// import map from './assets/map_v1_4x.jpg';
import map from './assets/map_v2_4x.png';


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import ImageZoom from 'react-native-image-pan-zoom';

// import { ImageZoom } from '@likashefqet/react-native-image-zoom';

import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

// import PhotoView from 'react-native-photo-view-ex';

import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PinchableBox from './components/PinchableBox';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};



function HomeScreen() {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.25)', paddingBottom: '40%' }}>

      <TouchableOpacity style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

    </View>
  );
}

function SettingsScreen() {

  const [count, setCount] = useState(0);

  function leftContent() {
    if (count < 3) {
      setCount(count + 1)
    }
  }
  function rightContent() {
    if (count > 0) {
      setCount(count - 1)
    }

  }

  function imgLineup() {
    if (count === 0)
      return lineupThursday;
    else if (count === 1)
      return lineupFriday
    else if (count === 2)
      return lineupSaturday
    else if (count === 3)
      return lineupSunday
  }

  function lineupZoom(){
    const images = [{
          url: '',
          styles: styles.lineup,
          height: '100%',
          props: {
              source: lineupThursday,
              styles: styles.lineup
          }
        },{
          url: '',
          props: {
              source: lineupFriday
          }
        },{
          url: '',
          props: {
              source: lineupSaturday
          }
        },{
          url: '',
          props: {
              source: lineupSunday
          }
        },
      ]
    
        return(
            <Modal visible={true} transparent={true} style={styles.lineup}>
                    <ImageViewer imageUrls={images} backgroundColor='rgba(0,0,0,0)' style={styles.lineup}/>
                </Modal>      )
  }

  function Thursday(){

    return(
      <Image source={lineupThursday} style={styles.lineup} />
      )
    // return(
    //   // <TouchableHighlight onPress={() => this.lineupZoom()} style={styles.lineup}>
    //   // <Image source={lineupThursday} style={styles.lineup} />
    //   // </TouchableHighlight>
    //   <View style={styles.lineup}>
    //     <PinchableBox imageUri={lineupThursday} style={styles.lineup}/>
    //     </View>
    //   )
  

  //   const images = [{
  //     url: '',
  //     styles: styles.lineup,
  //     height: '100%',
  //     props: {
  //         source: lineupThursday,
  //         styles: styles.lineup
  //     }
  //   },{
  //     url: '',
  //     props: {
  //         source: lineupFriday
  //     }
  //   },{
  //     url: '',
  //     props: {
  //         source: lineupSaturday
  //     }
  //   },{
  //     url: '',
  //     props: {
  //         source: lineupSunday
  //     }
  //   },
  // ]

  //   return(
  //       <Modal visible={true} transparent={true} style={styles.lineup}>
  //               <ImageViewer imageUrls={images} backgroundColor='rgba(0,0,0,0)' style={styles.lineup}/>
  //           </Modal>      )
  
  }
  function Friday(){
    return(
    <Image source={lineupFriday} style={styles.lineup} />
    )
  }
  function Saturday(){
    return(
    <Image source={lineupSaturday} style={styles.lineup} />
    )
  }
  function Sunday(){
    return(
    <Image source={lineupSunday} style={styles.lineup} />
    )
  }


  const Tab = createMaterialTopTabNavigator();

   return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.25)' }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="Thursday"
          activeColor="#f0edf6"
          inactiveColor="#f0edf6"
          tabBarIcon ={{focused: true, color: "#ffffff"}}
          height={100}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 20 },
            tabBarItemStyle: { height: 50 },
            tabBarStyle: { backgroundColor: '#694fad' },
            tabBarActiveTintColor: "#f0edf6",
            tabBarInactiveTintColor: "#f0edf6",
            
          }}
        >
          <Tab.Screen name="Thursday" component={Thursday} />
          <Tab.Screen name="Friday" component={Friday} />
          <Tab.Screen name="Saturday" component={Saturday} />
          <Tab.Screen name="Sunday" component={Sunday} />
        </Tab.Navigator>
      </NavigationContainer>
    //  </View>
  );
}

function MapScreen() {
  console.log(Dimensions.get('window').width)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.25)' }}>
      {/* <ImageViewer source={map} style={styles.map} /> */}
      <ImageZoom cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').width*1.3}>
        <Image style={{ width: '100%', height: '100%' }}
          source={map} />
      </ImageZoom>

{/* <ImageZoom
  uri={map}
  minScale={0.5}
  maxScale={3}
  onInteractionStart={() => console.log('Interaction started')}
  onInteractionEnd={() => console.log('Interaction ended')}
  onPinchStart={() => console.log('Pinch gesture started')}
  onPinchEnd={() => console.log('Pinch gesture ended')}
  onPanStart={() => console.log('Pan gesture started')}
  onPanEnd={() => console.log('Pan gesture ended')}
  imageContainerStyle={{width: '100%', height: '100%' }}
/> */}
    </View>
  );
}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (

    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={SettingsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>

  )
}

export default function App() {

  const video = React.useRef(null);
  React.useEffect(() => {
    if (video) {
      video.current.playAsync();
    }
  }, [video]);

  return (
    <>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={background}
          isLooping
          isMuted={true}
          resizeMode="cover"
        />
        <NavigationContainer theme={navTheme} >
          <MyTabs />
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    zIndex: 1
  },
  video: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    height: "120%",
    position: 'absolute',
  },
  navigation: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    aspectRatio: .4,
    resizeMode: 'contain',
    paddingBottom: 300
  },
  lineup: {
    flex: 1,
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
    paddingBottom: '10%'
  },
  map: {
    flex: 1,
    aspectRatio: .5,
    resizeMode: 'contain',
    paddingBottom: 300
  },

  containerSub: {
    position: 'absolute',
    top: 0
  },

});