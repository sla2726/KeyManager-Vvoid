import { View, Text, TouchableOpacity } from 'react-native';


interface MenuItemsListProps {
	title: string;
}

export default function MenuItems({setOnScreen} : {setOnScreen: React.Dispatch<React.SetStateAction<boolean>>}) {
	const menuItemsList: MenuItemsListProps[] = [
		{ title: 'Gerador' },
	];

	return (
		<>
			{menuItemsList.map((item, index) => (
				<TouchableOpacity key={index} onPress={() =>  setOnScreen(true)} className="flex flex-col gap-2 border-b border-slate-400">
					<Text className="ml-6 text-slate-100 ">{item.title}</Text>
				</TouchableOpacity>
			))}
			
		</>
	);
}
