import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Timer = ({ onTimerChange }) => {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          onTimerChange(newSeconds, true);
          return newSeconds;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      onTimerChange(seconds, false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    onTimerChange(0, false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Timer: {seconds}s</Text>
      
      <TouchableOpacity onPress={toggleTimer} style={[styles.button, isActive ? styles.buttonPause : styles.buttonStart]}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetTimer} style={[styles.button, styles.buttonReset]}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    width: 120,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonStart: {
    backgroundColor: '#4CAF50', // Green for start
  },
  buttonPause: {
    backgroundColor: '#FF5722', // Orange for pause
  },
  buttonReset: {
    backgroundColor: '#2196F3', // Blue for reset
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Timer;
