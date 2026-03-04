import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { TabNavigator } from './TabNavigator';
import { VenueScreen } from '../screens/VenueScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CommitteeScreen } from '../screens/CommitteeScreen';
import { GuidelinesScreen } from '../screens/GuidelinesScreen';
import { ConferenceTracksScreen } from '../screens/ConferenceTracksScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background }
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="MainTabs" component={TabNavigator} />

                <Stack.Screen
                    name="Venue"
                    component={VenueScreen}
                    options={{
                        headerShown: true,
                        title: 'Venues',
                        headerStyle: { backgroundColor: colors.primary },
                        headerTintColor: colors.surface,
                    }}
                />
                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        headerShown: true,
                        title: 'About',
                        headerStyle: { backgroundColor: colors.primary },
                        headerTintColor: colors.surface,
                    }}
                />
                <Stack.Screen
                    name="Committee"
                    component={CommitteeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Guidelines"
                    component={GuidelinesScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ConferenceTracks"
                    component={ConferenceTracksScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
