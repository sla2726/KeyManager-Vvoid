import * as SQLite from 'expo-sqlite';

// Use a nova API
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

export function keySave(keyData) {
		try {
				db.runSync(
						'INSERT INTO keys (name, key, dist, date) VALUES (?, ?, ?, ?)',
						[keyData.name, keyData.key, keyData.dist, keyData.date]
				);
				console.log('Chave salva com sucesso!');
		} catch (error) {
				console.error('Erro ao salvar chave:', error);
		}
}

export function keyLoad(callback) {
		try {
				const result = db.getAllSync('SELECT * FROM keys');
				callback(result);
				console.log('Chaves carregadas com sucesso!');
		} catch (error) {
				console.error('Erro ao carregar chaves:', error);
				callback([]);
		}
}