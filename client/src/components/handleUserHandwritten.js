import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Canvas from 'react-native-canvas';

const handleUserHandwritten = ({ onPrediction }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleCanvas = async (canvas) => {
    if (!canvas) return;
    
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Set drawing styles
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Touch handlers
    canvas.addEventListener('touchstart', (e) => {
      setIsDrawing(true);
      const { locationX: x, locationY: y } = e.touches[0];
      ctx.beginPath();
      ctx.moveTo(x, y);
      setLastPos({ x, y });
    });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const { locationX: x, locationY: y } = e.touches[0];
      ctx.lineTo(x, y);
      ctx.stroke();
      setLastPos({ x, y });
    });

    canvas.addEventListener('touchend', () => {
      setIsDrawing(false);
    });

    canvasRef.current = canvas;
  };

  const captureDrawing = async () => {
    if (!canvasRef.current) return;
    
    // Convert canvas to base64 image
    const base64 = await canvasRef.current.toDataURL();
    const imageData = base64.split(',')[1]; // Remove data URL prefix
    
    // Call your prediction API
    const prediction = await predictBaybayin(imageData);
    onPrediction(prediction);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
  };

  return (
    <View style={styles.container}>
      <Canvas 
        ref={handleCanvas}
        style={styles.canvas}
      />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={clearCanvas}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.predictButton]} 
          onPress={captureDrawing}
        >
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  button: {
    padding: 12,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  predictButton: {
    backgroundColor: '#03dac6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default handleUserHandwritten;