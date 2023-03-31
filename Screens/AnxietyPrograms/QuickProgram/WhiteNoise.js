import React from 'react'
import {View, Text, useWindowDimensions} from 'react-native'
import AudioPlayer from '../../../Components/AudioPlayer'
import whiteNoise from '../../../assets/audio/whiteNoise.mp3'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'

export default function WhiteNoise({navigation}) {
    const {height, width} = useWindowDimensions()
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
    <View style={[tw`flex-1 justify-start mt-20 pb-40`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <AudioPlayer audio={whiteNoise} navigation={navigation} title={"White Noise Machine"} />
    </View>
    </View>
  )
}
