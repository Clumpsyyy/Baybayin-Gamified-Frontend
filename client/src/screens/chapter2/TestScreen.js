// import React, { useRef, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
// import Canvas from 'react-native-canvas';

// const TestScreen = () => {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
//   const [prediction, setPrediction] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleCanvas = (canvas) => {
//     if (!canvas) return;
    
//     canvas.width = 300;
//     canvas.height = 300;
//     const ctx = canvas.getContext('2d');
    
//     // Initialize white background
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, 300, 300);
    
//     // Set drawing styles
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 8;
//     ctx.lineCap = 'round';
//     ctx.lineJoin = 'round';

//     // Touch handlers
//     canvas.addEventListener('touchstart', (e) => {
//       setIsDrawing(true);
//       const { locationX: x, locationY: y } = e.touches[0];
//       ctx.beginPath();
//       ctx.moveTo(x, y);
//       setLastPos({ x, y });
//     });

//     canvas.addEventListener('touchmove', (e) => {
//       if (!isDrawing) return;
//       const { locationX: x, locationY: y } = e.touches[0];
//       ctx.lineTo(x, y);
//       ctx.stroke();
//       setLastPos({ x, y });
//     });

//     canvas.addEventListener('touchend', () => {
//       setIsDrawing(false);
//     });

//     canvasRef.current = canvas;
//   };

//   const predictBaybayin = async (imageData) => {
//     try {
//       const response = await fetch('https://backend-ml-0t6q.onrender.com/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ image: imageData }),
//       });
//       return await response.json();
//     } catch (err) {
//       throw new Error('Failed to connect to prediction service');
//     }
//   };

//   const captureDrawing = async () => {
//     if (!canvasRef.current) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const base64 = await canvasRef.current.toDataURL();
//       const imageData = base64.split(',')[1];
//       const result = await predictBaybayin(imageData);
      
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setPrediction(result);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearCanvas = () => {
//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext('2d');
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, 300, 300);
//     setPrediction(null);
//     setError(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Baybayin Recognition Test</Text>
      
//       <Canvas 
//         ref={handleCanvas}
//         style={styles.canvas}
//       />
      
//       <View style={styles.buttonRow}>
//         <TouchableOpacity 
//           style={[styles.button, styles.clearButton]} 
//           onPress={clearCanvas}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>Clear</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.button, styles.predictButton]} 
//           onPress={captureDrawing}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={styles.buttonText}>Predict</Text>
//           )}
//         </TouchableOpacity>
//       </View>
      
//       {error && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       )}
      
//       {prediction && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultLabel}>Prediction:</Text>
//           <Text style={styles.resultText}>
//             {prediction.predictedCharacter}
//           </Text>
//           <Text style={styles.confidenceText}>
//             Confidence: {(prediction.confidence * 100).toFixed(1)}%
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   canvas: {
//     width: 300,
//     height: 300,
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//     marginBottom: 20,
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   clearButton: {
//     backgroundColor: '#dc3545',
//   },
//   predictButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   resultContainer: {
//     width: '100%',
//     padding: 16,
//     backgroundColor: '#e8f5e9',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   resultLabel: {
//     fontSize: 16,
//     color: '#2e7d32',
//     marginBottom: 4,
//   },
//   resultText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1b5e20',
//     marginBottom: 8,
//   },
//   confidenceText: {
//     fontSize: 16,
//     color: '#388e3c',
//   },
//   errorContainer: {
//     width: '100%',
//     padding: 16,
//     backgroundColor: '#f8d7da',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   errorText: {
//     color: '#721c24',
//     textAlign: 'center',
//   },
// });

// export default TestScreen;

import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PanResponder, ActivityIndicator } from 'react-native';

const TestScreen = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const viewRef = useRef(null);

  // Drawing handlers
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const { locationX: x, locationY: y } = e.nativeEvent;
      setCurrentPath([{ x, y }]);
    },
    onPanResponderMove: (e) => {
      const { locationX: x, locationY: y } = e.nativeEvent;
      setCurrentPath(prev => [...prev, { x, y }]);
    },
    onPanResponderRelease: () => {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
    },
  });

  const predictBaybayin = async (drawingPaths) => {
    try {
      // Convert drawing paths to image (simplified example)
      const imageData = await convertPathsToImage(drawingPaths);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          timestamp: new Date().toISOString()
        }),
        timeout: 10000 // 10 second timeout
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to connect to prediction service. Please try again later.');
    }
  };
  
  const captureDrawing = async () => {
    if (paths.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you'd capture the drawing as an image here
      // For demo, we'll simulate it with the paths data
      const result = await predictBaybayin('simulated-image-uri');
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
    setPrediction(null);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baybayin Recognition Test</Text>
      
      {/* Drawing Area */}
      <View
        ref={viewRef}
        style={styles.canvas}
        {...panResponder.panHandlers}
      >
        {[...paths, currentPath].map((path, pathIndex) => (
          <View
            key={pathIndex}
            style={StyleSheet.absoluteFill}
          >
            {path.map((point, index) => {
              if (index === 0) return null;
              return (
                <View
                  key={index}
                  style={[
                    styles.lineSegment,
                    {
                      left: path[index-1].x,
                      top: path[index-1].y,
                      width: Math.sqrt(
                        Math.pow(point.x - path[index-1].x, 2) + 
                        Math.pow(point.y - path[index-1].y, 2)
                      ),
                      transform: [
                        {
                          rotate: Math.atan2(
                            point.y - path[index-1].y,
                            point.x - path[index-1].x
                          ) + 'rad'
                        }
                      ]
                    }
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
      
      {/* Controls */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearCanvas}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.predictButton]} 
          onPress={captureDrawing}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Predict</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Results */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Prediction:</Text>
          <Text style={styles.resultText}>
            {prediction.predictedCharacter}
          </Text>
          <Text style={styles.confidenceText}>
            Confidence: {(prediction.confidence * 100).toFixed(1)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  canvas: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  lineSegment: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'black',
    transformOrigin: '0% 50%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  predictButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: 16,
    color: '#388e3c',
  },
  errorContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
});

export default TestScreen;