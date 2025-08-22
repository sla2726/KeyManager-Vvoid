import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Home } from 'lucide-react-native';

interface GeneratorScreenProps {
	setOnScreen: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function GeneratorScreen({ setOnScreen }: GeneratorScreenProps) {
	const [length, setLength] = useState<number>(12);

	return (
		<View className="flex h-full w-full flex-col">
			<View className="mt-2 items-center">
				<TouchableOpacity className="absolute right-2 top-2" onPress={() => setOnScreen(null)}>
					<Home color="white" size={42} />
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 80 }} className="w-full flex-col">
				<View className="bg-slate-700">
					<Text className="px-4 text-slate-100">Quantidades de caracteres: {length}</Text>
					<Slider
						style={{ width: '100%', height: 40 }}
						minimumValue={4}
						maximumValue={32}
						step={1}
						value={length}
						onValueChange={(val) => setLength(val)}
						minimumTrackTintColor="#4ade80" // tailwind green-400
						maximumTrackTintColor="#d1d5db" // tailwind gray-300
						thumbTintColor="#22c55e" // tailwind green-500
						accessibilityLabel={`Quantidade de caracteres: ${length}`}
					/>
				</View>
			</View>
		</View>
	);
}
