import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Eye, EyeClosed } from 'lucide-react-native';
import { useState } from 'react';
import { Key } from './types/keys';

type KeyFormProps = {
	keys: Key[];
	setKeys: React.Dispatch<React.SetStateAction<Key[]>>;
	setIsAddKey: (value: boolean) => void;
};

export default function KeyAddForm({ keys, setKeys, setIsAddKey }: KeyFormProps) {
	const [newKeyName, setNewKeyName] = useState('');
	const [newKeyPass, setNewKeyPass] = useState('');
	const [newKeyDist, setNewKeyDist] = useState('');

	const [showPassword, setShowPassword] = useState(true);

	const [isPassDuplicate, setIsPassDuplicate] = useState(false);

	const formIsValid =
		newKeyName.trim() !== '' &&
		newKeyPass.trim() !== '' &&
		newKeyDist.trim() !== '' &&
		!isPassDuplicate;

	const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);

	const handleAddKey = () => {
		const validatedKey: Key = {
			name: newKeyName,
			key: newKeyPass,
			dist: newKeyDist,
			date: new Date().toISOString(),
			id: id,
		};
		setKeys((prev) => [...prev, validatedKey]);
		setIsAddKey(false);
		setNewKeyName('');
		setNewKeyPass('');
		setNewKeyDist('');
		setIsPassDuplicate(false);
	};

	return (
		<TouchableWithoutFeedback onPress={() => setIsAddKey(false)}>
			<View className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/50">
				<TouchableWithoutFeedback onPress={() => {}}>
					<View className="flex w-3/4 flex-col items-center justify-center rounded-md border border-gray-500/60 bg-slate-900 px-4 py-2">
						<Text className="self-start text-slate-100">Título</Text>
						<TextInput
							className="w-full rounded-md bg-gray-700 px-2"
							onChangeText={setNewKeyName}
							value={newKeyName}
							placeholder="Senha do YouTube..."
							placeholderTextColor="gray"
						/>
						<Text className="self-start text-slate-100">Local/Destino</Text>
						<TextInput
							className="w-full rounded-md bg-gray-700 px-2"
							onChangeText={setNewKeyDist}
							value={newKeyDist}
							placeholder="Conta user123..."
							placeholderTextColor="gray"
						/>
						<Text className="self-start text-slate-100">Senha</Text>
						<TextInput
							className="w-full rounded-md bg-gray-700 px-2"
							onChangeText={(text) => {
								setNewKeyPass(text);
								const isDuplicate = keys.some((item) => item.key === text);
								setIsPassDuplicate(isDuplicate);
							}}
							value={newKeyPass}
							placeholder="juninh987grau123..."
							placeholderTextColor="gray"
							secureTextEntry={showPassword}
						/>

						<TouchableOpacity
							className="mt-1 self-start rounded-md bg-gray-600/40 px-4"
							onPress={() => setShowPassword((prev) => !prev)}>
							<View className="flex-row space-x-2">
								{showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
								<Text className="pl-2 text-gray-400/60">Exibir senha</Text>
							</View>
						</TouchableOpacity>
						{isPassDuplicate && <Text className="text-red-500">Senha duplicada!</Text>}
						<TouchableOpacity
							className={`mt-4 w-full rounded-full px-4 py-2 ${formIsValid ? 'bg-sky-600' : 'bg-gray-600'}`}
							disabled={!formIsValid}
							onPress={() => handleAddKey()}>
							<Text className="text-slate-100">Adicionar</Text>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	);
}