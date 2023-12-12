import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import navigation and screens
import ViewPeopleScreen from '../screens/ViewPeopleScreen';

// Import styling and components
import Styles from "../styles/MainStyle";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

// Import page
import EditPersonScreen from '../screens/EditPersonScreen';


export default function PeopleNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="ViewPeople"
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Back",
        headerStyle: Styles.headerBar,
        headerTitleStyle: Styles.headerBarTitle,
      }}>
      <Stack.Screen
        name="ViewPeople"
        component={ViewPeopleScreen}
        options={{ title: 'View All People' }} />
      <Stack.Screen
        name="EditPerson"
        component={EditPersonScreen}
        options={{ title: 'Edit Person' }} />
    </Stack.Navigator>
  );
}