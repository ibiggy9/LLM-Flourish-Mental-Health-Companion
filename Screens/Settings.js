import React, {useState, useEffect} from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity, Linking, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'moti';
import { useAuth } from '../Context/AuthContext';
import { Entypo } from '@expo/vector-icons';
import app from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import useRevHook from '../Components/useRevHook';
import analytics from '@react-native-firebase/analytics';


export default function Settings({navigation}) {
  const {width, height} = useWindowDimensions()
  const {logout, auth} = useAuth(app)
  
  
  function openSubscriptions(){
    
    Linking.openURL('https://apps.apple.com/account/subscriptions')
  }

  async function openPrivacy(){
    await WebBrowser.openBrowserAsync('https://www.termsfeed.com/live/d95ac4f5-6025-4554-8ee8-7b40b3f7adf1')
  }

  async function openSite(){
    await WebBrowser.openBrowserAsync('https://www.flourishtech.app/')
  }

  return (
    <View style={{width:width, height:height}}>
<LinearGradient 

colors={['#182E77','#EA1D3F']}
start={{x:0.05, y:0.6}}
end={{x:0.9, y:0.3}}
locations={[0.1,0.99]}


style={{width:width, height:height, opacity:0.65}}
>
</LinearGradient>
<View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <Text style={tw`text-white text-center text-3xl font-bold mt-20`}>Your Profile</Text>
        <ScrollView>  
       
        
        

    
        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>

        


        <TouchableOpacity onPress={async () => {
          await analytics().logEvent('aboutUsClicked')
          openSite()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('supportClicked')
          Linking.openURL('mailto:support@flourishtech.app')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Feature Requests & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={async ()=> {
          openSubscriptions()
          await analytics().logEvent('cancelMembershipClicked')
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2`}>Cancel Membership</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('privacyClicked', {
            id:"clicked"
          })
          openPrivacy()
          }}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> logout()}>
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>Logout</Text>
        </TouchableOpacity>

        <View  style={tw`bg-white h-0.5 mx-4 mt-5 my-4`}></View>
        
        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("goalsCheckedOnSettings")
          navigation.navigate("ViewWorkScreen", {tool:'goals'})
      
      }}>
          <View style={tw`flex-row items-center`}>
        <Entypo name="battery" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Goals</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("cogCoachClickedOnSettings")
          navigation.navigate("ViewWorkScreen", {tool:'cog'})
      }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="basecamp" style={tw`ml-10 mr--5`}  size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Cog Coach Sessions</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('freeWritingSettingsClicked')
          navigation.navigate("ViewWorkScreen", {tool:'free'})
          }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="book" style={tw`ml-10 mr--5 `} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Free Writing Sessions</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent('dailyJournalSettingsClicked')
          navigation.navigate("ViewWorkScreen", {tool:"daily"})
      }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="archive" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Daily Journals</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=> {
          await analytics().logEvent("reflectAISettingsClicked`")
          navigation.navigate("ViewWorkScreen",{tool:"reflection"})

        }}>
        <View style={tw`flex-row items-center`}>
        <Entypo name="lab-flask" style={tw`ml-10 mr--5`} size={30} color="white" />
        <Text style={tw`text-white text-xl mx-10 mt-2 mb-2 `}>View Reflect AI Reflections</Text>
        </View>
        </TouchableOpacity>

        </ScrollView>

      


      </View>
      
  
    </View>
  )
}
