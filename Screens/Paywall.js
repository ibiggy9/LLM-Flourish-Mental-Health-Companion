import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'twrnc'
import { MotiView, MotiText } from 'moti'
import Purchases from 'react-native-purchases'
import useRevHook from '../Components/useRevHook'
import Spinner from 'react-native-loading-spinner-overlay'
import analytics from '@react-native-firebase/analytics';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext'

export default function Paywall({navigation}) {
const {firstLogin, setFirstLogin} = useAuth()
const {height, width} = useWindowDimensions()
const [spinner, setSpinner] = useState(false) 
const {currentOffering, isProMember, customerInfo} = useRevHook()

useEffect(()=> 
{
  console.log(currentOffering)
  setFirstLogin(true)
}, [])

async function restorePurchases(){
    setSpinner(true)
    const purchaserInfo = await Purchases.restorePurchases().catch((error)=> {
      setSpinner(false)
    })

    if(purchaserInfo.activeSubscriptions.length > 0){
      Alert.alert("Success", "Your purchase has been restored")
    } else {
      Alert.alert("Error", "No purchases to restore")
      setSpinner(false)
    }

    if(!currentOffering){
      return(
        <View>
          <ActivityIndicator size="large" color='white' />
        </View>
      )
    }
  }

async function handleMonthlyPurchase(){
    setSpinner(true)
    if(!currentOffering?.monthly) return
    
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.monthly).catch((error)=> {
      setSpinner(false)
    })

    console.log("Monthly sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active.pro){
      setSpinner(false)
      
    } else {
      setSpinner(false)
    }
  }

  async function handleAnnualPurchase(){
    setSpinner(true)
    if(!currentOffering?.annual) return console.log('false')
    const purchaserInfo = await Purchases.purchasePackage(currentOffering.annual).catch((error)=> {
      setSpinner(false)
    })

    console.log("Annual sub purchased", purchaserInfo.customerInfo.entitlements.active)
    if(purchaserInfo.customerInfo.entitlements.active.pro){
      setSpinner(false)
      
    } else{
      setSpinner(false)
    }
    
    
  }



  return (
    <View style={[{width:width, height:height}, tw`bg-indigo-900`]}>
      <Spinner
        visible={spinner}
        
        textStyle={{color:'white'}}
        />
      <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={tw`absolute top-3 right-3`}>
      <AntDesign name="closecircle" size={35} color="white" />
      </TouchableOpacity>
      <Text style={tw`text-white text-2xl text-center font-bold mt-5`}>Select A Plan To Login</Text>
      <Text style={tw`text-slate-200 text-center font-light`}>Pick a plan to get unlimited access to all Features</Text>
      <View style={tw`items-center`}>
      <MaterialCommunityIcons name="trophy-award" size={130} color="#E5962D" />
      </View>

      {/*Content Block */}
      <View style={tw`my-5 px-10`}>
      <View style={tw`flex-row items-center`}>
        <Ionicons style={tw`mr-5`} name="key" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
        <Text style={tw`text-white font-bold`}>Get Unlimited Access to All Features</Text>
        <Text style={tw`text-slate-300 font-light`}>This includes all exercises and tools including cogntive-behavorial-therapy, goal setting, AI-powered reflection, breathwork and much more.</Text>
        </View>
        
      </View>

      <View style={tw`flex-row items-center pt-5`}>
        <Ionicons style={tw`mr-5`} name="ios-person-add" size={32} color="#E5962D" />
        <View style={tw`flex-1 `}>
        <Text style={tw`text-white font-bold`}>24/7 Access to Fleur, Our AI-Therapist</Text>
        <Text style={tw`text-slate-300 font-light`}>Support your mental wellness with unlimited access to Fleur that can help you through life's difficult times. She can provide evidence based advicea and help you process difficult situations.</Text>
        </View>
      </View>

      <View style={tw`flex-row items-center pt-5`}>
        
        <Ionicons style={tw`mr-5`} name="md-star" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
        <Text style={tw`text-white font-bold`}>Early access to new tools, content and exercises</Text>
        <Text style={tw`text-slate-300 font-light`}>Be first to get access to our newest cutting edge tools based on the science of mental wellness.</Text>
        </View>

      </View>
      </View>
      {currentOffering ?
      <>
                
                <MotiView style={tw`items-center`} from={{scale:0.5}} animate={{scale:1}} transition={{type:'spring', stiffness:300}}>
                {currentOffering && currentOffering.monthly &&
                <TouchableOpacity onPress={() => handleMonthlyPurchase()} style={[tw`flex-col px-5 mb-3 justify-center border-2 border-white bg-blue-900  rounded-3xl `, {height:height/8, width:width/1.4, backgroundColor:'#E5962D'}]}>
                  
                  <Text style={tw`ml-2 text-white font-bold italic text-center text-lg`}> 1 Week Free Trial + Monthly Subscription</Text>
                  <Text style={tw`text-center font-light text-white`}>{currentOffering.monthly?.product.priceString}/Month After</Text>
                  <Text style={tw`ml-2 text-white text-center font-light mt-1`}>Cancel anytime</Text>
  
                  
                </TouchableOpacity>
                }
                {currentOffering.annual && 
                <TouchableOpacity onPress={() => handleAnnualPurchase()} style={[tw`flex-col px-5 mb-3 justify-center bg-blue-900 border-2 border-white rounded-3xl  `, {height:height/8 , width:width/1.4, backgroundColor:'#E5962D'}]}>
                  <MotiText from={{scale:0}} animate={{scale:1.2}} transition={{type:'spring', stiffness:250, delay:400}} style={tw`ml-2 text-white text-center text-xl font-extrabold`}>Save {100-((currentOffering.annual?.product.price) / (currentOffering.monthly?.product.price * 12)*100).toPrecision(2)}%</MotiText>
                  <Text style={tw`ml-2 text-white font-bold italic text-lg text-center`}> 1 Week Free Trial + Annual Subscription</Text>
                  
                  <Text style={tw`text-center font-light text-white`}>{currentOffering.annual?.product.priceString}/Year</Text>
                  
                </TouchableOpacity>
                }
                  <TouchableOpacity onPress={() => restorePurchases()} style={tw`flex-col mb-5  rounded-2xl  `}>
                  <Text style={tw`ml-2 text-white font-light text-center`}>Restore Purchases</Text>
                  
                </TouchableOpacity>
  
                </MotiView>
                </>
                :
                <View>
                  <Spinner
                  visible={spinner}
                  
                  textStyle={{color:'white'}}
                  />
                </View>

                
                
                }
                
    </View>
    </View>
  )
}