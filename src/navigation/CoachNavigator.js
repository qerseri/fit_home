import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {ListCoaches, Coach, QueryForCoach, CoachInteraction, Chat} from '../screens'
import { ROUTES } from '../components';

import useAuth from '../../src/config/useAuth';
import { useNavigation } from "@react-navigation/core";
import { firestore } from "../../src/config/firebase";
import { doc, updateDoc, getDoc, onSnapshot} from "firebase/firestore";

const Stack = createStackNavigator();

export default CoachNavigator = () => {
    const { user } = useAuth();
    const [isCoachActive, setIsCoachActive] = useState(false);
    const [renderCoachScreen, setRenderCoachScreen] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
          const unsubscribe = onSnapshot(doc(firestore, `users/${user.uid}`), (doc) => {
            const userData = doc.data();
            if (userData && userData.coach !== undefined && userData.coach !== null) {
              setIsCoachActive(true);
            } else {
              setIsCoachActive(false);
            }
          });
    
          return () => unsubscribe();
        }
      }, [user]);
    
      useEffect(() => {
        if (isCoachActive) {
          setRenderCoachScreen(true);
        } else {
          setRenderCoachScreen(false);
        }
      }, [isCoachActive]);

    return (
        (!renderCoachScreen ? (
            <Stack.Navigator 
                screenOptions={{
                    headerTintColor: '#574327',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#93C47D',
                    },
                    
                }} 
                initialRouteName={ROUTES.LIST_COACHES}
            >
                <Stack.Screen name={ROUTES.LIST_COACHES} component={ListCoaches} />
                <Stack.Screen name={ROUTES.COACH} component={Coach} />
                <Stack.Screen name={ROUTES.QUERY_FOR_COACH} component={QueryForCoach} />
            </Stack.Navigator>
        ) : (
            <Stack.Navigator 
                screenOptions={{
                    headerTintColor: '#574327',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#93C47D',
                    },
                    
                }} 
                initialRouteName={ROUTES.COACH_INTERACTION}
            >
                <Stack.Screen name={ROUTES.COACH_INTERACTION} component={CoachInteraction} options={{headerLeft: null}}/>
                <Stack.Screen name={ROUTES.CHAT} component={Chat}/>
            </Stack.Navigator>          
        ))
        
    );
}