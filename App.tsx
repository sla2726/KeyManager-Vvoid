import './global.css';
import * as Updates from 'expo-updates';
import { useFonts } from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AlignJustify, Plus, RefreshCw } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { Key } from './components/types/keys';
import KeyAddForm from './components/KeyAddForm';
import KeyEditForm from './components/KeyEditForm';
import KeyView from './components/KeyView';
import { saveData, loadData } from './components/utils/saveStorage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald: require('./assets/fonts/Oswald.ttf'),
  });

  // Senhas
  const [keys, setKeys] = useState<Key[]>([]);

  const [isAddKey, setIsAddKey] = useState<boolean>(false);
  const [isEditKey, setIsEditKey] = useState<boolean>(false);

  const [keyToEdit, setKeyToEdit] = useState<Key | null>(null);

  const [isInfoKey, setIsInfoKey] = useState<boolean>(false);
  const [infoKey, setInfoKey] = useState<Key | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Animação de saída do Menu
  const animationRef = useRef(null);

  const closeMenu = () => {
    animationRef.current?.slideOutLeft(400).then(() => setIsMenuOpen(false));
  };

  // Recarregando e Salvando
  useEffect(() => {
    async function fetchKeys() {
      const storedKeys = await loadData();
      setKeys(storedKeys);
    }
    fetchKeys();
  }, []);

  useEffect(() => {
    saveData(keys);
  }, [keys]);

  function addKey(newKeyData: Key) {
    const newKey: Key = {
      ...newKeyData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    };
    setKeys((prev) => [...prev, newKey]);
  }

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Erro ao recarregar o app:', error);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View className="h-full w-full flex-1 bg-slate-900">
      <SafeAreaView className="absolute relative top-0 flex h-16 w-full items-center justify-center bg-slate-800">
        <View className="absolute left-2">
          <TouchableOpacity onPress={() => setIsMenuOpen(true)} className="font-bold">
            <AlignJustify color="white" />
          </TouchableOpacity>
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

      <View className="absolute bottom-0 z-10 flex h-10 w-full flex-row items-center justify-center bg-slate-800 ">
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

      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={() => closeMenu()}>
          <View className="absolute inset-0 z-10 bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animatable.View
                ref={animationRef}
                animation="slideInLeft"
                duration={400}
                className="z-20 h-full w-2/4 bg-black">
                <View>
                  <Text className="text-slate-100">jksksksk</Text>
                </View>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {isInfoKey && infoKey && (
        <TouchableWithoutFeedback onPress={() => setIsInfoKey(false)}>
          <View className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="flex w-3/4 flex-col rounded-md border border-gray-500/60 bg-slate-900 px-4 py-6">
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
