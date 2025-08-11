import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Pencil, Trash } from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import { servicesVerification } from './utils/servicesVerification';
import { Key } from './types/keys';

type KeyViewProps = {
	keys: Key[];
	setKeys: React.Dispatch<React.SetStateAction<Key[]>>;
	setIsEditKey: React.Dispatch<React.SetStateAction<boolean>>;
	setKeyToEdit: React.Dispatch<React.SetStateAction<Key | null>>;
	setIsInfoKey: React.Dispatch<React.SetStateAction<boolean>>;
	setInfoKey: React.Dispatch<React.SetStateAction<Key | null>>;
};

export default function KeyView({ keys, setKeys, setIsEditKey, setKeyToEdit, setIsInfoKey, setInfoKey }: KeyViewProps) {
	
	const handleKeyPress = (key: Key) => {
		setInfoKey(key);
		setIsInfoKey(prev => !prev);
	}
	
	return (
		<ScrollView className="flex flex-col">
			<View className="bg-slate-800/60">
				{keys.map((key) => {
					const passwordDivided2 = Math.floor(key.key.length / 2);
					const passwordVisible = key.key.slice(0, passwordDivided2);
					const passwordOcult = '*'.repeat(key.key.length - passwordDivided2);
					const password = passwordVisible + passwordOcult;

					const service = servicesVerification(key.dist);
					const IconService = (Icons as any)[service.icon];

					return (
						<TouchableOpacity onPress={() => handleKeyPress(key)} className="relative w-full border-b border-slate-400 py-2" key={key.id}>
							<View className="ml-4 flex flex-row">
								{IconService && (
									<View>
										<IconService size={50} color={service.color} />
									</View>
								)}

								<View className="ml-4">
									<Text className="font-bold text-slate-100">{key.name}</Text>
									<Text className="text-xs text-slate-100/40">{key.dist}</Text>
									<Text className="text-slate-100">{password}</Text>
								</View>
								<View className="absolute right-2 bottom-4 flex flex-row gap-1">
									<TouchableOpacity
										onPress={() => {
											setIsEditKey((prev) => !prev);
											setKeyToEdit(key);
										}}>
										<Pencil color="white" />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => setKeys(prev => prev.filter(k => k.id !== key.id))}>
										<Trash color="white" />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		</ScrollView>
	);
}
