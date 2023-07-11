import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationRoutes} from './NavigationRoutes';
import CommentsScreen from '../screens/comments/CommentsScreen';
import GalleryImagesScreen from '../screens/gallery/GalleryImagesScreen';

export type StackNavigatorProps = {
  Gallery: undefined;
  Comments: {id: string};
};
const AppStackNavigator = createStackNavigator<StackNavigatorProps>();
export type NavigationProps = NativeStackScreenProps<
  StackNavigatorProps,
  NavigationRoutes.Comments
>;

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator
        initialRouteName={NavigationRoutes.Gallery}
        screenOptions={{
          headerShown: false,
        }}>
        <AppStackNavigator.Screen
          name={NavigationRoutes.Gallery}
          component={GalleryImagesScreen}
        />
        <AppStackNavigator.Group
          screenOptions={{presentation: 'modal', headerShown: true}}>
          <AppStackNavigator.Screen
            name={NavigationRoutes.Comments}
            component={CommentsScreen}
          />
        </AppStackNavigator.Group>
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
