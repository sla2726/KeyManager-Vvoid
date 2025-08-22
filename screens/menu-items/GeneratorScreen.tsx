import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Clipboard from 'expo-clipboard';
import { Home, Copy } from 'lucide-react-native';
import AnimatedSwitch from '../../components/AnimateSwitch';
import generatePassword from '../../components/utils/generatePassword';

interface GeneratorScreenProps {
	setOnScreen: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function GeneratorScreen({ setOnScreen }: GeneratorScreenProps) {
	const [length, setLength] = useState<number>(12);

	const [hasSymbols, setHasSymbols] = useState<boolean>(false);
	const [hasNumbers, setHasNumbers] = useState<boolean>(false);
	const [hasLower, setHasLower] = useState<boolean>(false);
	const [hasUpper, setHasUpper] = useState<boolean>(true);

	const createdPassword = generatePassword(length, {
		symbols: hasSymbols,
		numbers: hasNumbers,
		lower: hasLower,
		upper: hasUpper,
	});

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(createdPassword);
	};

	return (
		<View className="flex h-full w-full flex-col items-center">
			<TouchableOpacity className="absolute right-2 top-2" onPress={() => setOnScreen(null)}>
				<Home color="white" size={42} />
			</TouchableOpacity>

			<View style={{ marginTop: 80, width: '95%' }} className="w-full flex-col gap-6">
				<View style={{ borderRadius: 8 }} className="flex-row bg-gray-700 px-4 py-6">
					<Text className="text-lg font-bold text-slate-300">{createdPassword}</Text>
					<TouchableOpacity className="ml-auto" onPress={() => copyToClipboard()}>
						<Copy color="white" />
					</TouchableOpacity>
				</View>
				
				<View style={{ borderRadius: 8 }} className="bg-gray-700 py-6">
					<View className="flex-row gap-1 px-4">
						<Text className="font-bold text-slate-100">Quantidades de caracteres:</Text>
						<Text className="bg-gray-600 px-2 font-bold text-slate-100">{length}</Text>
					</View>
					<Slider
						style={{ width: '100%', height: 30 }}
						minimumValue={4}
						maximumValue={32}
						step={1}
						value={length}
						onValueChange={(val) => setLength(val)}
						minimumTrackTintColor="#62748e"
						thumbTintColor="#e2e8f0"
						accessibilityLabel={`Quantidade de caracteres: ${length}`}
					/>
				</View>
			</View>
		</View>
	);
}
