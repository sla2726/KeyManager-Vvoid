import { useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
}

export default function AnimatedSwitch({ value, onValueChange, label }: SwitchProps) {
  const trackRef = useRef<any>(null);
  const thumbRef = useRef<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    if (isAnimating) return; 

    setIsAnimating(true);

    // Background animation
    trackRef.current?.transitionTo(
      { backgroundColor: !value ? '#22c55e' : '#d1d5db' },
      200
    );

    // Circle animation
    thumbRef.current?.transitionTo(
      { transform: [{ translateX: !value ? 30 : 0 }] },
      300,
      'ease-out'
    );

    onValueChange(!value);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <View className="flex-row items-center gap-3">
      <Pressable onPress={handlePress}>
        <Animatable.View 
          ref={trackRef}
          className="w-14 h-7 rounded-full p-1 justify-center shadow-sm"
          style={{
            backgroundColor: value ? '#22c55e' : '#d1d5db',
          }}
        >
          <Animatable.View 
            ref={thumbRef}
            className="w-5 h-5 bg-white rounded-full shadow-md"
            style={{
              transform: [{ translateX: value ? 30 : 0 }],
            }}
          />
        </Animatable.View>
      </Pressable>

    </View>
  );
} 
