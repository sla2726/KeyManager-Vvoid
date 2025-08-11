import { services } from '../data/services';

export function servicesVerification(input: string) {
	const lowerInput = input.toLowerCase();

	for (const service of services) {
		if (service.keywords.some((keyword) => lowerInput.includes(keyword))) {
			return service;
		}
	}

	return { name: 'Outro', icon: 'Globe', color: '#9E9E9E' };
}
