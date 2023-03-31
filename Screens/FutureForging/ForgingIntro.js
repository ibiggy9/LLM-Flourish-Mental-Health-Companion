import React from 'react'
import {FlatList, Text, TouchableOpacity, useWindowDimensions, View, Image} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native'

export default function FutureIntro({navigation}) {
  const {width, height} = useWindowDimensions()
  const data= [
    {
      instructionTitle: "Develop an Actionable Life Vision",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/bino.png')}/>,
      instructionShort:"This exercise will walk you through several key areas that help to create a fulfilling and meaningful life."
       
    },
    {
      instructionTitle: "Why It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/instruction.png')}/>,
      instructionShort:"By focusing on what truly matters to you, you will be empowered to shape your future and live according to your values and aspirations"
    },
    {
      instructionTitle: "How It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/gear.png')}/>,
      instructionShort:"First you start with generating a vision for key areas of your life. Then you'll set concrete strategies and goals to guide you there."
    },
   
    
    
    
    
  
  ]

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
        <ScrollView>
        <View style={tw` justify-start items-center mt-5 `}>
          
        <Text style={tw`text-white  text-center font-bold text-xl`}>Values-Based Life Planning</Text>
        
        <View style={tw``}>
          
        <FlatList 
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
        snapToEnd
        snapToStart
        snapToInterval={width}
        
        decelerationRate='fast'
        renderItem={(itemData)=> {
          return(
            <View style={[{height:height/1.5, width:width}, tw`flex-1 justify-start mt-3 items-center`]}>
              <View style={[tw`flex-1 bg-slate-600 bg-opacity-40 rounded-2xl items-center mb-3 `, {width:width-40}]}>
              <View style={[tw`flex-7 justify-center`, {width:width}]}>
              <View style={tw`mt-0 mx-5 items-center justify-center`}>
              
              {itemData.item.image}
              <Text style={tw`text-white text-xl text-center mt-7 font-bold`}>{itemData.item.instructionTitle}</Text>
              <Text style={tw`text-white text-lg font-light text-center mx-3`}>{itemData.item.instructionShort}</Text>
              </View>
              
                </View>
                <View style={tw`flex-1 justify-end  flex-row items-center mt-5 `}>
                {itemData.index == 0 &&
                <>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                </>
                }
                {itemData.index == 1 &&
                <>
                
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                </>
                }
                {itemData.index == 2 &&
                <>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-slate-400 rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                <View style={tw`bg-white rounded-full w-3 h-3 mx-2 mb-20 `}></View>
                </>
                }
                </View>

              </View>
            </View>
          )
          }
        }
        />
        
        </View>
        
 </View>

      
      

      <View style={tw` items-center justify-end `}>
      
        <TouchableOpacity style={tw``} onPress={() => navigation.navigate('ForgingStaging')}>
            <Text style={tw`text-white text-2xl`}>Next</Text>
        </TouchableOpacity>
        </View>
        
        </ScrollView>
    </View>

    
    </View>
  )
}