import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import BorderScreen from "./screens/BorderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ListScreen from "./screens/ListScreen";
import {useEffect, useState} from "react";
import {AsyncStorage} from "react-native";

const Stack = createNativeStackNavigator();
export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          < Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
          < Stack.Screen name="Liste" component={ListScreen} />
          < Stack.Screen name="Register" component={RegisterScreen} />
          < Stack.Screen name="Border" component={BorderScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}