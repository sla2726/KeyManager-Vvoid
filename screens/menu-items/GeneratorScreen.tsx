import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

export default function GeneratorScreen({setOnScreen}: {setOnScreen: React.Dispatch<React.SetStateAction<string | null>>}) {
	return (
		<View>
			<TouchableOpacity onPress={() => setOnScreen(null)}><X /></TouchableOpacity>
			<Text className="text-slate-100">Hello world</Text>
		</View>
	)
}