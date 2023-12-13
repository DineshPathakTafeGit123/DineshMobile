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
import ViewPersonScreen from '../screens/ViewPersonScreen';
import { imageIndex } from '../constants/images';

const LogoTitle = () => (
  <Image
    style={{ width: 30, height: 30 }}
    source={require('../constants/images')}
  />
);


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
        // Insert logo to left of here
        options={{ title: 'View All Staff' }} />
      <Stack.Screen
        name="ViewPerson"
        component={ViewPersonScreen}
        options={{ title: 'View person' }} />
      <Stack.Screen
        name="EditPerson"
        component={EditPersonScreen}
        options={{ title: 'Edit Person' }} />
    </Stack.Navigator>
  );
}