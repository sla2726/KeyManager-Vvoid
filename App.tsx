import './global.css';
import * as Updates from 'expo-updates';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AlignJustify, Plus, RefreshCw } from 'lucide-react-native';
import { Key } from './components/types/keys';
import KeyAddForm from './components/KeyAddForm';
import KeyEditForm from './components/KeyEditForm';
import KeyView from './components/KeyView';

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald.ttf'),
  });

  // Senhas - Auxiliares
  const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);

  // Senhas
  const [keys, setKeys] = useState<Key[]>([
    { name: 'Hello world', key: '123cool', dist: 'youtube', date: '2025', id: id },
  ]);

  const [isAddKey, setIsAddKey] = useState<boolean>(false);
  const [isEditKey, setIsEditKey] = useState<boolean>(false);

  const [keyToEdit, setKeyToEdit] = useState<Key | null>(null);

  const [isInfoKey, setIsInfoKey] = useState<boolean>(false);
  const [infoKey, setInfoKey] = useState<Key | null>(null);

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Erro ao recarregar o app:', error);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View className="relative h-full w-full bg-slate-900">
      <SafeAreaView className="relative flex h-16 w-full items-center justify-center bg-slate-800">
        <View className="absolute left-2">
          <Text className="font-bold">
            <AlignJustify color="white" />
          </Text>
        </View>

        <Text className="font-bold text-white">Key Manager</Text>
      </SafeAreaView>

      <KeyView
        {...{
          keys,
          setKeys,
          setIsEditKey,
          setKeyToEdit,
          setIsInfoKey,
          setInfoKey,
        }}
      />

      <View className="relative z-20 flex h-10 w-full flex-row items-center justify-center bg-slate-800 ">
        <View className="absolute rounded-full bg-gray-600 px-2">
          <TouchableOpacity onPress={() => setIsAddKey((prev) => !prev)}>
            <Plus />
          </TouchableOpacity>
        </View>
        <View className="ml-auto rounded-full bg-gray-600 px-2">
          <TouchableOpacity onPress={reloadApp}>
            <RefreshCw />
          </TouchableOpacity>
        </View>
      </View>

      {isAddKey && (
        <KeyAddForm
          {...{
            keys,
            setKeys,
            setIsAddKey,
            setIsEditKey,
          }}
        />
      )}

      {isEditKey && (
        <KeyEditForm
          {...{
            keys,
            setKeys,
            setIsEditKey,
            setKeyToEdit,
            keyToEdit,
          }}
        />
      )}

      {isInfoKey && infoKey && (
        <TouchableWithoutFeedback
          onPress={() => setIsInfoKey(false)}
          className="absolute inset-0 z-10 flex w-full items-center justify-center">
          <View className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="flex w-3/4 flex-col rounded-md border border-gray-500/60 bg-slate-900 px-4 py-2">
                {Object.entries({
                  Nome: infoKey.name,
                  Senha: infoKey.key,
                  Destino: infoKey.dist,
                  Data: new Date(infoKey.date).toLocaleDateString('pt-BR'),
                }).map(([label, value]) => (
                  <View key={label}>
                    <Text className="text-slate-100">{label}</Text>
                    <Text className="w-full rounded-md bg-gray-600 px-4 py-2 text-slate-300">
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
