import React from 'react'
import { Animated, Dimensions } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

const screen = Dimensions.get('window')

const PinchableBox = ({ imageUri }) => {
  scale = new Animated.Value(1)
  console.log(scale, imageUri)

  onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <PinchGestureHandler
      onGestureEvent={this.onPinchEvent}
      onHandlerStateChange={this.onPinchStateChange}>
      <Animated.Image
        source={imageUri}
        style={{
          width: screen.width,
          height: screen.height,
          transform: [{ scale: this.scale }]
        }}
        resizeMode='stretch'
      />
    </PinchGestureHandler>
  )
}

export default PinchableBox