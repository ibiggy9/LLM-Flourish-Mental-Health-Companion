import React, {useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, Easing, useWindowDimensions} from 'react-native'
import BackButton from '../../Components/BackButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Motion } from '@legendapp/motion';

export default function Stepper({navigation, completeCount, stepper, setStepper, noBack}) {
  const [step, setStep] = useState(0)
  const {height, width} = useWindowDimensions()
  const items=[
    {
        title:"Step 1: Articulate Your Vision", 
        image: <MaterialCommunityIcons  style={tw`ml--6`} name="car-shift-pattern" size={50} color="white" />,   
        linkName:"Begin",
        component:"ModuleOne"

    },
    {
        title:"Step 2: Create A Strategy", 
        image: <MaterialIcons style={tw`ml--6`} name="auto-fix-off" size={45} color="white" />,
        linkName:"Unlock",
        component:"ModuleTwo"
    },
    {
        title:"Step 3: Set & Prioritize Goals", 
        image: <SimpleLineIcons  style={tw`ml--5 mr-3`} name="frame" size={45}  color="white" />,
        linkName:'Unlock',
        component:"ModuleThree"
    },
    
  ]

  return (
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
      
      {step == 0 &&
        //Exercise Overview
        <View>
          
          
          
        <Motion.Text 
      initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}
      style={tw`text-center  text-white font-bold text-3xl mx-5`}>Values-Based Planning Overview</Motion.Text>
       <Motion.View initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:1200}}}>
        <FlatList
        scrollEnabled={false}
        contentContainerStyle={tw`justify-center items-center m-10`}
        data={items}  
        renderItem={(itemData)=> {
        return(
          
            <View>
              {completeCount == itemData.index ?
          <View style={[tw` w-85  border-2 border-orange-400 rounded-2xl mb-4 justify-center items-center`]} key={itemData.index} >
              
          <View id="card" style={tw` ml-3 pl-2 pr-10  `}>
              
          
          <View style={tw`flex flex-row items-center`}>
              <View style={tw`ml-5 mr-1`}>{itemData.item.image}</View>
              <Text style={tw`text-white text-lg py-12`}>{itemData.item.title}</Text>
            
            
            </View>
            
            </View>
            </View>
            :
            <View style={[tw` w-85  border border-white rounded-2xl mb-5 justify-center items-center`]} key={itemData.index} >
              
            <View id="card" style={tw` ml-3 pl-2 pr-10  `}>
                
            
            <View style={tw`flex flex-row items-center`}>
                <View style={tw`ml-5 mr-1`}>{itemData.item.image}</View>
                <Text style={tw`text-white text-lg py-12`}>{itemData.item.title}</Text>
              
              
              </View>
              
              </View>
              </View>

            }
            </View>
          
        )
      }
        
      }/>
      </Motion.View >
      <Motion.View initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:1200}}} style={tw`flex-row justify-center items-center`}>
     {!noBack &&
      <TouchableOpacity style={tw` mx-20 rounded-2xl p-3 px-8 mt-3`} onPress={()=>setStepper(stepper-1)}>
      <MaterialIcons name="navigate-before" size={50} color="white" />
      </TouchableOpacity>
      }
      <TouchableOpacity style={tw`  mx-20 rounded-2xl p-3 px-8 mt-3`} onPress={()=>setStepper(stepper+1)}>
          <MaterialIcons name="navigate-next" size={50} color="white" />
          </TouchableOpacity>
         
        </Motion.View>
      </View>
      }
      
    </View>
  )
}
