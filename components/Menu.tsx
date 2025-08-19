import { View, Text, TouchableOpacity } from 'react-native';


interface MenuItemsListProps {
	title: string;
	id: string;
}

export default function MenuItems({setOnScreen} : {setOnScreen: React.Dispatch<React.SetStateAction<string | null>>}) {
	const menuItemsList: MenuItemsListProps[] = [
		{ title: 'Gerador', id: 'generate' },
	];

	return (
		<>
			{menuItemsList.map((item, index) => (
				<TouchableOpacity key={index} onPress={() => setOnScreen(item.id)} className="flex flex-col py-2 gap-2 border-b border-slate-400">
					<Text className="ml-6 text-lg text-slate-100 ">{item.title}</Text>
				</TouchableOpacity>
			))}
			
		</>
	);
}
