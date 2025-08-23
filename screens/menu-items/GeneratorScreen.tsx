import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
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
	const [tempLength, setTempLength] = useState<number>(length);

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
		<ScrollView
			className="flex h-full w-full"
			contentContainerClassName="flex flex-col items-center">
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
						<Text className="font-bold text-slate-300 text-lg">Quantidades de caracteres:</Text>
						<Text className="bg-gray-600 px-2 font-bold text-slate-100">{tempLength}</Text>
					</View>
					<Slider
						style={{ width: '100%', height: 30 }}
						minimumValue={4}
						maximumValue={32}
						step={1}
						value={length}
						onValueChange={(val) => setTempLength(Math.round(val))}
						onSlidingComplete={(val) => setLength(Math.round(val))}
						minimumTrackTintColor="#62748e"
						thumbTintColor="#e2e8f0"
						accessibilityLabel={`Quantidade de caracteres: ${length}`}
					/>
				</View>

				<View style={{ borderRadius: 8 }} className="bg-gray-700 px-4 py-6">
					<Text style={{ marginBottom: 18 }} className="text-lg font-extrabold text-slate-300">
						A senha deve possuir:
					</Text>
					<View className="flex-col gap-1">
						<AnimatedSwitch
							value={hasUpper}
							onValueChange={setHasUpper}
							label="Letras maiúsculas?"
							disabled={true}
						/>
						<AnimatedSwitch
							value={hasLower}
							onValueChange={setHasLower}
							label="Letras minúsculas?"
						/>
						<AnimatedSwitch value={hasNumbers} onValueChange={setHasNumbers} label="Números?" />
						<AnimatedSwitch value={hasSymbols} onValueChange={setHasSymbols} label="Símbolos?" />
					</View>
				</View>
				
			</View>
		</ScrollView>
	);
}
