import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const Sketch = forwardRef((props, ref) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prevPath) => `${prevPath} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath('');
    },
  });

  useImperativeHandle(ref, () => ({
    clear: () => {
      setPaths([]);
    },
  }));

  return (
    <View {...panResponder.panHandlers} style={props.style}>
      <Svg style={{ flex: 1 }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="black" stopOpacity="1" />
            <Stop offset="100%" stopColor="black" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            stroke="url(#grad)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        <Path
          d={currentPath}
          stroke="url(#grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
});

export default Sketch;