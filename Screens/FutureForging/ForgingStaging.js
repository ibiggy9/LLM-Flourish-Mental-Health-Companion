import React from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity, } from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'

export default function ForgingStaging({navigation}) {
    const {width, height} = useWindowDimensions()
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
    <View style={tw`flex-1 justify-start mt-10 items-center`}>
            <Text style={tw`text-white text-center font-bold text-3xl`}>Choose An Option</Text>
            <TouchableOpacity style={[tw` p-3 rounded-2xl mt-5 border border-white`, {width:width-80, height:height/6}]} onPress={()=> navigation.navigate('ForgingExercise')}>
            <Text style={tw`text-white text-center font-bold mt-4 text-xl`}>Start A New Vision</Text>
            <Text style={tw`text-white text-center font-extralight text-lg`}>Update your plan as your goals progress</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("UpdateGoals")}style={[tw` p-3 rounded-2xl mt-5 border border-white`, {width:width-80, height:height/6}]}>
            <Text style={tw`text-white text-center font-bold mt-4  text-xl `}>Update Your View/Edit</Text>
            <Text style={tw`text-white text-center font-extralight text-lg`}>Reprioritize & Mark Your Goals as Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("UpdateVision")}style={[tw` p-3 rounded-2xl mt-5 border border-white`, {width:width-80, height:height/6}]}>
            <Text style={tw`text-white text-center font-bold mt-4  text-xl`}>Edit Your Vision/Plans</Text>
            <Text style={tw`text-white text-center font-extralight text-lg`}>Update your Vision, Strategy & Goals </Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  )
}
