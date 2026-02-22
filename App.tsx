import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { colors } from './src/theme/colors';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
