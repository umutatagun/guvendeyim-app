import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import BorderScreen from "./screens/BorderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ListScreen from "./screens/ListScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import {useEffect, useState} from "react";
import {AsyncStorage, Text, View} from "react-native";
import InformationScreen from "./screens/InformationScreen";
import KVKKScreen from "./screens/KVKKScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EmergencyButtons from "./screens/EmergencyButtons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}
const HomeComponent = () => {
    const [isLogged, setIsLogged] = useState(false);

    const _retrieveData = async () => {
        try{
            const data = await AsyncStorage.getItem("keepLoggedIn");
            if(data === 'false') {
                setIsLogged(false)
            }else if(data === 'true') {
                setIsLogged(true);
            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect( () => {
        _retrieveData().then(() => console.log("isLogged: " + isLogged));
    },[])
    // <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}  />
    return (
        <>
            {isLogged ?
                <Stack.Navigator>
                    < Stack.Screen name="Ana Menu" component={BorderScreen} />
                    < Stack.Screen name="Kaydol" component={RegisterScreen} />
                    <Stack.Screen name="Liste" component={ListScreen} />
                    < Stack.Screen name="Detay" component={UserDetailScreen} />
                    < Stack.Screen name="Ek Bilgi" component={InformationScreen} />
                    < Stack.Screen name="Aydinlatma Metni" component={KVKKScreen} />
                    < Stack.Screen name="Emergency" component={EmergencyButtons} />
                </Stack.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}  />
                    < Stack.Screen name="Ana Menu" component={BorderScreen} />
                    < Stack.Screen name="Kaydol" component={RegisterScreen} />
                    <Stack.Screen name="Liste" component={ListScreen} />
                    < Stack.Screen name="Detay" component={UserDetailScreen} />
                    < Stack.Screen name="Ek Bilgi" component={InformationScreen} />
                    < Stack.Screen name="Aydinlatma Metni" component={KVKKScreen} />
                    < Stack.Screen name="Emergency" component={EmergencyButtons} />
                </Stack.Navigator>

            }

        </>

    )
}

export default function App() {
  return (
      <NavigationContainer>

              <Tab.Navigator screenOptions={{ headerShown: false }}>
                  <Tab.Screen
                      name="Genel"
                      component={HomeComponent}
                      options={{
                          tabBarLabel: 'Home',
                          tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="home" color={color} size={size} />
                          ),
                      }}
                  />
                  <Tab.Screen
                      name="Profil"
                      component={ProfileComponent}
                      options={{
                          tabBarLabel: 'Profile',
                          tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="face-man-profile" color={color} size={size} />
                          ),
                      }}
                  />
              </Tab.Navigator>
      </NavigationContainer>
  );
}
