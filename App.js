import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import BorderScreen from "./screens/BorderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ListScreen from "./screens/ListScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import {useEffect, useState} from "react";
import {AsyncStorage} from "react-native";
import InformationScreen from "./screens/InformationScreen";
import KVKKScreen from "./screens/KVKKScreen";

export default function App() {
    const Stack = createNativeStackNavigator();
    const [isLogged, setIsLogged] = useState(false);

    const _retrieveData = async () => {
        try{
            const data = await AsyncStorage.getItem("keepLoggedIn");
            setIsLogged(false);
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        _retrieveData();
    })

  return (
      <NavigationContainer>
          {!isLogged?
              <Stack.Navigator>
                  < Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                  < Stack.Screen name="Liste" component={ListScreen} />
                  < Stack.Screen name="Register" component={RegisterScreen} />
                  < Stack.Screen name="Border" component={BorderScreen} />
                  < Stack.Screen name="UserDetail" component={UserDetailScreen} />
                  < Stack.Screen name="Additional-Information" component={InformationScreen} />
                  < Stack.Screen name="Aydinlatma-Metni" component={KVKKScreen} />
              </Stack.Navigator> :
              <Stack.Navigator>
                  < Stack.Screen name="Border" component={BorderScreen} />
                  < Stack.Screen name="Liste" component={ListScreen} />
                  < Stack.Screen name="Register" component={RegisterScreen} />
                  < Stack.Screen name="UserDetail" component={UserDetailScreen} />
                  < Stack.Screen name="Additional-Information" component={InformationScreen} />
                  < Stack.Screen name="Aydinlatma-Metni" component={KVKKScreen} />
              </Stack.Navigator>
          }
      </NavigationContainer>
  );
}