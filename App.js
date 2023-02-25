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
            if(data === 'false') {
                setIsLogged(false)
            }else if(data === 'true') {
                setIsLogged(false);
            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect( () => {
        _retrieveData().then(() => console.log("isLogged: " + isLogged));
    })

  return (
      <NavigationContainer>
          {!isLogged ?
              <Stack.Navigator>
                  < Stack.Screen options={{headerShown: false}} name="Giriş" component={LoginScreen}/>
                  < Stack.Screen name="Liste" component={ListScreen} />
                  < Stack.Screen name="Kaydol" component={RegisterScreen} />
                  < Stack.Screen name="Ana Menu" component={BorderScreen} />
                  < Stack.Screen name="Detay" component={UserDetailScreen} />
                  < Stack.Screen name="Ek Bilgi" component={InformationScreen} />
                  < Stack.Screen name="Aydinlatma Metni" component={KVKKScreen} />
              </Stack.Navigator> :
              <Stack.Navigator>
                  < Stack.Screen name="Ana Menu" component={BorderScreen} />
                  < Stack.Screen name="Liste" component={ListScreen} />
                  < Stack.Screen name="Kaydol" component={RegisterScreen} />
                  < Stack.Screen name="Detay" component={UserDetailScreen} />
                  < Stack.Screen name="Ek Bilgi" component={InformationScreen} />
                  < Stack.Screen name="Aydinlatma Metni" component={KVKKScreen} />
              </Stack.Navigator>
          }
      </NavigationContainer>
  );
}