import { StatusBar } from 'expo-status-bar';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './Navigation/Stack';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {




  return (
    <NavigationContainer   
    >
    <Provider store={store} >
       <Stack/>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
