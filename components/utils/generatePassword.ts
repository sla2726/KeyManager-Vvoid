export function generatePassword(length: number, options: { upper?: boolean, lower?: boolean, numbers?: boolean, symbols?: boolean }): string {
	const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lower = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

	let chars = "";

	if (options.upper) chars += upper;
	if (options.lower) chars += lower;
	if (options.numbers) chars += numbers;
	if (options.symbols) chars += symbols;

	if (!chars) return "";

	let password = "";

	for (let i = 0; i < length; i++) {
		const rand = Math.floor(Math.random() * chars.length);
		password += chars[rand];
	}

	return password;

}