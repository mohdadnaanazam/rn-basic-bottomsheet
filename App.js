import React from 'react';
import {View, Text, Button, useWindowDimensions, Alert} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const dimensions = useWindowDimensions();

  const topSharedValue = useSharedValue(dimensions.height);

  // this return the style based on shared value
  const reanimatedTopStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(topSharedValue.value, {
        damping: 300,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
      }),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.topStartValue = topSharedValue.value;
    },

    onActive(event, context) {
      topSharedValue.value = context.topStartValue + event.translationY;
    },

    onEnd() {
      if (topSharedValue.value > dimensions.height / 2 + 100) {
        topSharedValue.value = dimensions.height;
      } else {
        topSharedValue.value = dimensions.height / 2;
      }
    },
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title={'Open sheet'}
          onPress={() => {
            topSharedValue.value = withSpring(dimensions.height / 2, {
              damping: 300,
              overshootClamping: true,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
              stiffness: 500,
            });
          }}
        />
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2.84,
              elevation: 5,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
            reanimatedTopStyle,
          ]}>
          <Text>Sheet</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
