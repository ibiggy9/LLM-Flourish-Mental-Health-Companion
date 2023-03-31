import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import Settings from '../Screens/Settings'
import ExercisesNew from '../Screens/ExercisesNew'
import ExploreNew from '../Screens/ExploreNew'
import AiTab from '../Screens/AI/AiTab'
import Fleur from '../Screens/AI/ChatBot/Fleur';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function Tabs() {
/*
This is the screen for the chatbot. 
<Tab.Screen 
            name="Fleur"
            component={Fleur}
            options={{   
                tabBarIcon: ({focused, size}) => (
                        <View>
                            
                            <FontAwesome5 name="brain" size={28} color={focused ? "orange" : "white"} />
                        </View>
                    ),
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white",  
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />
  */      



  return (
    <Tab.Navigator
        screenOptions={{
            
            headerTitle: "",
            headerTitleAlign: 'left',     
            headerTransparent:true,
            headerShadowVisible: false,
            
        tabBarStyle:{
            height:65,
            marginVertical:30,
            
            //backgroundColor:"transparent",
            backgroundColor:'#484950',
            opacity:0.95,
            shadowOpacity:0.5,
            shadowRadius:5,
            shadowOffset:{width:5, height:10},
            
            marginHorizontal:30,
            borderRadius:30,
            borderTopWidth:0,
            borderTopColor:"#030B27",
            position:'absolute',
            
        },
        tabBarItemStyle:{
            height:60,
            
            
        }
        
          
    }}
    >

        
       

        <Tab.Screen 
            name="Explore" 
            component={ExploreNew} 
            
            options={{
                tabBarIcon: ({focused, size}) => (
                        <View>
                            <AntDesign name="key" size={28} color={focused ? "orange" : "white"} />
                        </View>
                    ),
                    
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white"   ,
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />

<Tab.Screen 
            name="Fleur"
            component={Fleur}
            options={{   
                tabBarIcon: ({focused, size}) => (
                        <View>
                            
                            <FontAwesome5 name="brain" size={28} color={focused ? "orange" : "white"} />
                        </View>
                    ),
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white",  
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />
            
           
        

        <Tab.Screen 
            name="Exercises" 
            component={ExercisesNew}
            options={{   
                tabBarIcon: ({focused, size}) => (
                        <View>
                            <MaterialIcons name="auto-fix-high" size={28} color={focused ? "orange" : "white"} />
                        </View>
                    ),
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white",  
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />

        <Tab.Screen 
            name="Profile" 
            component={Settings}
            options={{   
                tabBarIcon: ({focused, size}) => (
                        <View>
                            <Ionicons name="person" size={28} color={focused ? "orange" : "white"} />
                        
                        </View>
                    ),
                    tabBarActiveTintColor: "orange",
                    tabBarInactiveTintColor: "white",  
                    tabBarLabelStyle:{fontSize:14},      
            }}
            />
     
     
    </Tab.Navigator>
  )
}
