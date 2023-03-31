import React from 'react'
import {View, Text, useWindowDimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import { LinearGradient } from 'expo-linear-gradient'

export default function UpdateVision({navigation}) {
    const {width, height} = useWindowDimensions()
    const items = [
        {
            titleMain: 'Personal Development',
            description: 'Update your personal development ideal, strategies and goals',
            leaf:{
                title:'Personal Development',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
        }, 

        {
            titleMain: 'Career Ideals',
            description: 'Update your career ideal, strategies and goals',
            leaf:{
                title:'Career Ideals',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
        },

        {
            titleMain: 'Health & Fitness',
            description: 'Update your health and fitness ideal, strategies and goals',
            leaf:{
                title:'Health & Fitness',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
        },

        {
            titleMain: 'Family Ideals',
            description: 'Update your family ideal, strategies and goals',
            leaf:{
                title:'Family Ideals',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
        },

        {
            titleMain: 'Social Life Ideals',
            description: 'Update your social life ideal, strategies and goals.',
            leaf:{
                title:'Social Life Ideals',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
        },

        {
            titleMain: 'Leisure Ideals',
            description: 'Update your leisure ideal, strategies and goals.',
            leaf:{
                title:'Leisure Ideals',
                vision:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                strategy1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                strategy2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                strategy3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                goal1:"ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec",
                goal2:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
                goal3:'ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec',
            }
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
    <View style={[tw`flex-1 justify-start mt-10 pb-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <BackButton navigation={navigation} />
        <View style={tw`flex-1 justify-start items-center`}>
        <Text style={tw`text-white text-2xl`}>Edit Your Ideals</Text>
        
             
            <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-20`}
            data={items}
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity style={[tw` items-center p-3 rounded-2xl mt-5 border border-white`, {width:width -40, aspectRatio:12/5, }]} onPress={()=> navigation.navigate('EditVision', {
                        title: itemData.item.leaf.title,
                        vision: itemData.item.leaf.vision,
                        strategy1: itemData.item.leaf.strategy1,
                        strategy2: itemData.item.leaf.strategy2,
                        strategy3: itemData.item.leaf.strategy3,
                        goal1: itemData.item.leaf.goal1,
                        goal2: itemData.item.leaf.goal2,
                        goal3: itemData.item.leaf.goal3,
                     })}>
                        <Text style={tw`text-white text-xl font-bold mt-5`}>{itemData.item.titleMain}</Text>
                        <Text style={tw`text-white text-lg text-center font-light`}>{itemData.item.description}</Text>
                    </TouchableOpacity>
                )
            }}
            
            />
            
            </View>
    </View>
    </View>
)
}
