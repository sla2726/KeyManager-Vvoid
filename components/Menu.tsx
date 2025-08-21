import { View, Text, TouchableOpacity } from 'react-native';
import { RectangleEllipsis } from 'lucide-react-native';

interface MenuItemsListProps {
	title: string;
	id: string;
}

export default function MenuItems({
	setOnScreen,
}: {
	setOnScreen: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const menuItemsList: MenuItemsListProps[] = [{ title: 'Gerador', id: 'generate' }];

	return (
		<>
			{menuItemsList.map((item, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => setOnScreen(item.id)}
					className="flex flex-col gap-2 border-b border-slate-400 py-2">
					<View className="flex-row ml-4 gap-6">
						<RectangleEllipsis color="white" />
						<Text className="text-lg font-bold text-slate-100 ">{item.title}</Text>
					</View>
				</TouchableOpacity>
			))}
		</>
	);
}
