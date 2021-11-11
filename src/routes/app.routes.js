import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn";
import ChatRoom from "../screens/ChatRoom";
import Messages from "../screens/Messages";

const AppStack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Faça o Login" }}
      />

      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({ title: route.params.thread.name })}
      />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
