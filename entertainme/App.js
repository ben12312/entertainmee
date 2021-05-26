import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Favorite from './pages/Favorite';
import EditMovie from './pages/Edit';
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native'

const client = new ApolloClient({
  uri: 'http://192.168.18.14:4000',
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="detail" component={Detail} options={{ headerShown: false }} />
            <Stack.Screen name="create" component={Create} options={{ headerShown: false }} />
            <Stack.Screen name="edit" component={EditMovie} options={{ headerShown: false }} />
            <Stack.Screen name="favorite" component={Favorite} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
});
