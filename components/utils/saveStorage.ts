import AsyncStorage from '@react-native-async-storage/async-storage';
import { Key } from '../types/keys';

export async function saveData(keys: Key[]): Promise<void> {
	if (!keys) return;

	try {
		await AsyncStorage.setItem('keys', JSON.stringify(keys));
	} catch (error) {
		console.error('Erro salvar dados: ' + error.message);
	}
}

export async function loadData(): Promise<Key[]> {
	try {
		const data = await AsyncStorage.getItem('keys');
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error('Erro ao carregar dados: ' + error.message);
		return [];
	}
}
