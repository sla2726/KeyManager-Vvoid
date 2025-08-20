import './global.css';
import * as Updates from 'expo-updates';
import { useFonts, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { preventScreenCaptureAsync } from 'expo-screen-capture';
import { AlignJustify, Plus, RefreshCw, X, Home } from 'lucide-react-native';
import { saveData, loadData } from './components/utils/saveStorage';
import { FONTS } from './components/data/fonts';
import { Key } from './components/types/keys';
import KeyAddForm from './components/KeyAddForm';
import KeyEditForm from './components/KeyEditForm';
import KeyView from './components/KeyView';
import MenuItems from './components/Menu';
import GeneratorScreen from './screens/menu-items/GeneratorScreen';
// import { RenderChecker, ArrayRenderChecker } from './components/helpers/VariableChecker';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Oswald_400Regular': Oswald_400Regular,
    'Oswald_700Bold': Oswald_700Bold,
  });
  useEffect(() => {
    if (fontError) {
      console.error('Erro ao carregar fontes:', fontError);
    }
    console.log('Fontes carregadas:', fontsLoaded);
  }, [fontsLoaded, fontError]);

  const [keys, setKeys] = useState<Key[]>([]);

  const [isAddKey, setIsAddKey] = useState<boolean>(false);
  const [isEditKey, setIsEditKey] = useState<boolean>(false);

  const [keyToEdit, setKeyToEdit] = useState<Key | null>(null);

  const [isInfoKey, setIsInfoKey] = useState<boolean>(false);
  const [infoKey, setInfoKey] = useState<Key | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [menuItemOnScreen, setMenuItemOnScreen] = useState<string | null>(null);

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

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Erro ao recarregar o app:', error);
    }
  };

  // Bloqueamento de prints e exibição em abas
  useEffect(() => {
    preventScreenCaptureAsync();
  }, []);

  // Telas do Menu
  const screenMap: { [key: string]: ReactNode } = {
    generate: <GeneratorScreen setOnScreen={setMenuItemOnScreen} />,
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

        <Text style={{ fontFamily: fontsLoaded ? 'Oswald_400Regular' : 'System' }} className="text-slate-100">
          Key Manager
        </Text>
      </SafeAreaView>

      {menuItemOnScreen ? (
        screenMap[menuItemOnScreen] || (
          <View className="z-20 flex h-full w-full flex-col items-center justify-center bg-slate-900">
            <Text className="text-4xl text-slate-100">Página não encontrada...</Text>
            <TouchableOpacity
              className="absolute right-2 top-2"
              onPress={() => setMenuItemOnScreen(null)}>
              <Home size={46} color="white" />
            </TouchableOpacity>
          </View>
        )
      ) : (
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
      )}

      <View className="absolute bottom-0 z-10 flex h-16 w-full flex-row items-center justify-center bg-slate-800 ">
        <TouchableOpacity
          className="absolute w-24 items-center rounded-full bg-gray-600 px-2"
          onPress={() => setIsAddKey(true)}>
          <Plus size={28} />
        </TouchableOpacity>

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
          <View className="absolute inset-0 z-30 bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animatable.View
                ref={animationRef}
                animation="slideInLeft"
                duration={400}
                className="z-20 h-full w-2/4 bg-slate-900">
                <MenuItems setOnScreen={setMenuItemOnScreen} />
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {isInfoKey && infoKey && (
        <TouchableWithoutFeedback onPress={() => setIsInfoKey(false)}>
          <View className="absolute inset-0 z-10 w-full bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="h-full w-full rounded-md border border-gray-500/60 bg-slate-900 px-4 py-6">
                <TouchableOpacity
                  onPress={() => setIsInfoKey(false)}
                  className="absolute right-2 z-20 mt-2">
                  <X color="white" size={26} />
                </TouchableOpacity>

                <View className="mt-6">
                  {Object.entries({
                    Nome: infoKey.name,
                    Senha: infoKey.key,
                    Destino: infoKey.dist,
                    Data: new Date(infoKey.date).toLocaleDateString('pt-BR'),
                  }).map(([label, value]) => (
                    <View className="flex flex-col" key={label}>
                      <Text className="text-slate-100">{label}</Text>
                      <View className="h-14 w-full rounded-md bg-gray-600 py-2">
                        <Text className="ml-4 text-slate-300 ">{value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
