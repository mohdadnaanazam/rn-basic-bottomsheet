import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  useAnimatedScrollHandler,
  interpolateColor,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  // shared values which works on UI thread
  const sharedOpacity = useSharedValue(0);

  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const scrollY = useSharedValue(0);

  useEffect(() => {
    // updating shared value after 1 second
    // sharedOpacity.value = withTiming(1, {
    //   duration: 1000,
    // });
    // spring animation
    // sharedOpacity.value = withSpring(1);
    // with delay
    // sharedOpacity.value = withDelay(5000, withSpring(1));
    //with repeat
    //sharedOpacity.value = withRepeat(withSpring(1), 4, true);
    //with sequence
    // sharedOpacity.value = withSequence(
    //   withSpring(1),
    //   withSpring(0.5),
    //   withSpring(0),
    // );
  }, []);

  // for scroll behaviour
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  // for gesture behaviour
  const gestureHandler = useAnimatedGestureHandler({
    onActive(event) {
      (touchX.value = event.translationX), (touchY.value = event.translationY);
    },
    onEnd(event) {
      (touchX.value = withSpring(0)), (touchY.value = withSpring(0));
    },
  });

  // const sharedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: sharedOpacity.value,
  //     transform: [
  //       {
  //         scale: interpolate(sharedOpacity.value, [0, 1], [1, 3]),
  //       },
  //     ],
  //   };
  // });

  const sharedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: touchX.value,
        },
        {
          translateY: touchY.value,
        },
      ],
    };
  });

  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        touchY.value,
        [-50, 0, 50],
        ['rgb(10,10,10)', 'rgba(255,255,255)', 'rgb(10,10,10)'],
      ),
    };
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={[scrollViewAnimatedStyle]}
      contentContainerStyle={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: 'red',
                },
                sharedStyle,
              ]}
            />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
    </Animated.ScrollView>
  );
};

export default App;
