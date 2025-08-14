import * as SQLite from 'expo-sqlite';
import { encryptPassword, decryptPassword } from './components/utils/encrypt';

const db = SQLite.openDatabaseSync('key-manager.db');

export function createDB() {
	try {
		db.execSync(`
			CREATE TABLE IF NOT EXISTS keys (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT,
				key TEXT,
				dist TEXT,
				date TEXT
			);
		`);
		console.log('Tabela criada com sucesso!');
	} catch (error) {
		console.error('Erro ao criar tabela:', error);
	}
}

export async function keySave(keyData) {
	try {
		const encryptedKey = await encryptPassword(keyData.key);
		db.runSync('INSERT INTO keys (name, key, dist, date) VALUES (?, ?, ?, ?)', [
			keyData.name,
			encryptedKey,
			keyData.dist,
			keyData.date,
		]);
		console.log('Chave salva com sucesso!');
	} catch (error) {
		console.error('Erro ao salvar chave:', error);
	}
}

export async function keyLoad(callback) {
	try {
		const result = db.getAllSync('SELECT * FROM keys');
		const decrypted = await Promise.all(
			result.map(async (item) => ({
				...item,
				key: await decryptPassword(item.key),
			}))
		);
		callback(decrypted);
		console.log('Chaves carregadas com sucesso!');
	} catch (error) {
		console.error('Erro ao carregar chaves:', error);
		callback([]);
	}
}

export function keySaveSync(keyData) {
	try {
		db.runSync('INSERT INTO keys (name, key, dist, date) VALUES (?, ?, ?, ?)', [
			keyData.name,
			encryptPassword(keyData.key),
			keyData.dist,
			keyData.date,
		]);
		console.log('Chave salva com sucesso!');
	} catch (error) {
		console.error('Erro ao salvar chave:', error);
	}
}

export function keyLoadSync(callback) {
	try {
		const result = db.getAllSync('SELECT * FROM keys');
		const decrypted = result.map((item) => ({
			...item,
			key: decryptPassword(item.key),
		}));
		callback(decrypted);
		console.log('Chaves carregadas com sucesso!');
	} catch (error) {
		console.error('Erro ao carregar chaves:', error);
		callback([]);
	}
}