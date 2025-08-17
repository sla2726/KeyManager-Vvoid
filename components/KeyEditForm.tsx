import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Eye, EyeClosed, X } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { Key } from './types/keys';

type KeyFormProps = {
	setKeyToEdit: React.Dispatch<React.SetStateAction<Key | null>>;
	keyToEdit: Key | null;
	keys: Key[];
	setKeys: React.Dispatch<React.SetStateAction<Key[]>>;
	setIsEditKey: (value: boolean) => void;
};

export default function KeyEditForm({
	keys,
	setKeys,
	setIsEditKey,
	setKeyToEdit,
	keyToEdit,
}: KeyFormProps) {
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

	const handleEditKey = () => {
		if (!keyToEdit) return;
		const updatedKey: Key = {
			...keyToEdit,
			name: newKeyName,
			key: newKeyPass,
			dist: newKeyDist,
		};
		setKeys((prev) => prev.map((key) => (key.id === keyToEdit.id ? updatedKey : key)));
		setIsEditKey(false);
		setKeyToEdit(null);
		setNewKeyName('');
		setNewKeyPass('');
		setNewKeyDist('');
		setIsPassDuplicate(false);
	};

	useEffect(() => {
		if (keyToEdit) {
			setNewKeyName(keyToEdit.name);
			setNewKeyPass(keyToEdit.key);
			setNewKeyDist(keyToEdit.dist);
		}
	}, [keyToEdit]);

	const defaultTextInput = 'w-full text-gray-500 rounded-md bg-gray-700 px-2 h-14';

	return (
		<TouchableWithoutFeedback onPress={() => setIsEditKey(false)}>
			<View className="absolute inset-0 z-10 h-full bg-black/50">
				<TouchableWithoutFeedback onPress={() => {}}>
					<View className="h-full w-full rounded-md bg-slate-900 px-4 py-2">
						<TouchableOpacity onPress={() => setIsEditKey(false)} className="absolute right-2 z-20 mt-2">
							<X color="white" size={26} />
						</TouchableOpacity>

						<View className="mt-12 flex flex-col gap-2">
							<TextInput
								style={{
									borderWidth: 1,
									borderColor: '#6B7280',
									borderRadius: 6,
								}}
								className={defaultTextInput}
								onChangeText={setNewKeyName}
								value={newKeyName}
								placeholder="Senha do YouTube..."
								placeholderTextColor="gray"
							/>
							<TextInput
								style={{
									borderWidth: 1,
									borderColor: '#6B7280',
									borderRadius: 6,
								}}
								className={defaultTextInput}
								onChangeText={setNewKeyDist}
								value={newKeyDist}
								placeholder="Conta user123..."
								placeholderTextColor="gray"
							/>
							<TextInput
								style={{
									borderWidth: 1,
									borderColor: '#6B7280',
									borderRadius: 6,
								}}
								className={defaultTextInput}
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
						</View>

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
							onPress={() => handleEditKey()}>
							<Text className="text-slate-100">Salvar alterações</Text>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	);
}
