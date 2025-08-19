import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

export default function GeneratorScreen({setOnScreen}: {setOnScreen: React.Dispatch<React.SetStateAction<string | null>>}) {
	return (
		<View className="">
			<TouchableOpacity onPress={() => setOnScreen(null)}><X /></TouchableOpacity>
			<Text>Hello world</Text>
		</View>
	)
}