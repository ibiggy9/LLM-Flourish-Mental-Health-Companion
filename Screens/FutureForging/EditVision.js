import React, {useState} from 'react'
import {View, Text, useWindowDimensions, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import tw from 'twrnc'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BackButton from '../../Components/BackButton'
import {MotiView} from 'moti'
import { Easing } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

export default function EditVision({navigation, route}) {
const {title, vision, strategy1, strategy2, strategy3, goal1, goal2, goal3} = route.params
  const {width, height} = useWindowDimensions()
  const [newVision, setNewVision] = useState(vision)
  const [newStrategy1, setNewStrategy1] = useState(strategy1)
  const [newStrategy2, setNewStrategy2] = useState(strategy2)
  const [newStrategy3, setNewStrategy3] = useState(strategy3)
  const [newGoal1, setNewGoal1] = useState(goal1)
  const [newGoal2, setNewGoal2] = useState(goal2)
  const [newGoal3, setNewGoal3] = useState(goal3)
  const [editOn, setEditOn] = useState(false)
  
    return (
      <View style={{width:width, height:height}}>
      <LinearGradient 
      
      colors={['#27178C','#8C4917']}
      start={{x:0.05, y:0.6}}
      end={{x:0.9, y:0.3}}
      locations={[0.1,0.99]}
      
      
      style={{width:width, height:height, opacity:0.65}}
      >
      </LinearGradient>
      <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        
        <BackButton navigation={navigation} />
        
        <View style={tw`justify-end items-end`}>
        {editOn ?
        <TouchableOpacity onPress={()=> setEditOn(!editOn)}>
        <Text style={tw`text-white text-2xl mr-5`}>Done</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=> setEditOn(!editOn)}>
        <Text style={tw`text-white text-2xl mr-5`}>Edit</Text>
        </TouchableOpacity>
        }
        </View>
        <View style={tw`flex-1 justify-start mt-5 mx-5`}>
            
            <Text style={tw`text-white font-bold text-3xl text-center mb-5 mt--2`}>{title}</Text>
            {!editOn ?
            <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={tw`mb-20`}>
            <Text style={tw`text-white font-bold text-2xl`}>Ideal</Text>
            <Text style={tw`text-white text-xl`}>{newVision}</Text> 
            <Text style={tw`text-white font-bold text-2xl mt-10`}>Strategies</Text>
            <Text style={tw`text-white text-xl`}>1. {strategy1}</Text>
            <Text style={tw`text-white text-xl mt-5`}>2. {strategy2}</Text>
            <Text style={tw`text-white text-xl mt-5`}>3. {strategy3}</Text>
            <Text style={tw`text-white text-2xl font-bold mt-10`}>Goals</Text>
            <Text style={tw`text-white text-xl`}>1. {goal1}</Text>
            <Text style={tw`text-white text-xl mt-5`}>2. {goal2}</Text>
            <Text style={tw`text-white text-xl mt-5`}>3. {goal3}</Text>
            </KeyboardAwareScrollView >
            </MotiView>
            :
            <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}}>
            <KeyboardAwareScrollView style={tw`mb-20`} showsVerticalScrollIndicator={false}>
            <Text style={tw`text-white font-bold text-3xl mb-5 text-center`}>Ideal</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewVision} multiline value={newVision} />
            <Text style={tw`text-white font-bold text-3xl mt-10 text-center`}>Strategies</Text>
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2`}>Strategy 1:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewStrategy1} multiline value={newStrategy1} />
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2 `}>Strategy 2:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewStrategy2} multiline value={newStrategy2} />
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2`}>Strategy 3:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewStrategy3} multiline value={newStrategy3} />
            <Text style={tw`text-white text-3xl font-bold mt-10 text-center`}>Goals</Text>
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2`}>Goal 1:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewGoal1} multiline value={newGoal1} />
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2`}>Goal 2:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewGoal2} multiline value={newGoal2} />
            <Text style={tw`text-white font-bold text-xl mt-5 mb-2`}>Goal 3:</Text>
            <TextInput style={[tw`text-white text-xl border border-white rounded-xl px-2`, {aspectRatio:4/3 }]} numberOfLines={10} keyboardAppearance="dark" onChangeText={setNewGoal3} multiline value={newGoal3} />
            </KeyboardAwareScrollView>
            </MotiView>
            }
        </View>
    </View>
            </View>
  )
}
