import React, {useEffect, useState} from 'react'
import{View, Text, useWindowDimensions, FlatList, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager,
    Platform,} from 'react-native'
import BackButton from '../../Components/BackButton'
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc'
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

import DraggableFlatList, {
    ScaleDecorator,
  } from "react-native-draggable-flatlist";
import { Easing } from 'react-native-reanimated';


export default function UpdateGoals({navigation}) {
    const [editView, setEditView] = useState(false)
    const [viewCompleted, setViewCompleted] = useState(false)
    const [completedGoals, setCompletedGoals] = useState([])
    const{width, height} = useWindowDimensions()
    
    const [goalState, setGoalState] = useState([
        {name:"Run a 10 minute Mile", id:1, completed: false},
        {name:"Get a stellar performance review", id:2, completed: false},
        {name:"Connect with Neighbours on a more regular basis", id:3, completed: false},
        {name:"Improve noticably at public speaking", id:4, completed: false},

    ])
    
    if (
        Platform.OS === "android" &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }


    const layoutAnimConfig = {
        duration: 300,
        
        update: {
          type: LayoutAnimation.Types.easeInEaseOut, 
        },
        delete: {
            
          duration: 300,
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      };

  
    const removeItem = (id, index, name) => {
        
        console.log(goalState[id])
        //regular removal
        let arr = goalState.filter(function(item) {
          return item.name !== name
        })
        setGoalState(arr);
        LayoutAnimation.configureNext(layoutAnimConfig)

        
        //Add to complete list
        setCompletedGoals((prev) => [...prev, {name:name, id:id, completed: true}])

      
      };

      const removeComplete = (id, index, name) => {
        console.log(completedGoals[id])
        //regular removal
        let arr = completedGoals.filter(function(item) {
          return item.name !== name
        })
        setCompletedGoals(arr);
        LayoutAnimation.configureNext(layoutAnimConfig)

        //Add to current goals list
        setGoalState((prev) => [...prev, {name:name, id:id, completed:false}])
        
    

        
        console.log(goalState)
      };

    

    //For Reprioritization
    const renderItem = ({item, drag, isActive}) => {
        
        return (
          <ScaleDecorator>
            <MotiView from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:300, easing:Easing.easing}} style={tw`text-white justify-center items-center text-2xl rounded-xl border border-white mx-10 mb-4`}>
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              style={tw``}
            >
              <Text style={[tw`text-white text-center text-2xl px-10 rounded-xl py-4`, {width:width - 40}]}>{item.name}</Text>
            </TouchableOpacity>
            </MotiView>
          </ScaleDecorator>
        )
      };

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
        <View style={tw`justify-end items-end mb-3 `}>
         {editView && !viewCompleted &&
        <TouchableOpacity onPress={()=> setEditView(!editView)}>
        <Text style={tw`text-white text-2xl mr-7`}>Done</Text>
        </TouchableOpacity>
        }
        {!editView && !viewCompleted &&
        <TouchableOpacity onPress={()=> setEditView(!editView)}>
        <Text style={tw`text-white text-2xl mr-7`}>Edit</Text>
        </TouchableOpacity>
        }
        </View>
        
        {!editView && !viewCompleted &&
        <MotiView from={{opacity:0}}  animate={{opacity:1}} transition={{type:'timing', duration:500, easing:Easing.easing}} style={tw`flex-1 justify-start pb-15`}>
        <Text style={tw`text-white text-3xl text-center`}>Current Goals</Text>
        {goalState[0] &&
        <FlatList 
        contentContainerStyle={tw`mt-5 `}
        data={goalState}
        //keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
            
            return(
                //tw`flex-1 flex-row items-baseline mx-13 my-2`
                <View style={{ width:width}}>
                <View style={{marginHorizontal:40, marginVertical:20}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ flex:1,color:'#FFFFFF', fontSize:20, fontWeight:'400' }}>{itemData.index +1}. {itemData.item.name}</Text>
                    <TouchableOpacity style={{alignSelf:'baseline'}} onPress={() => removeItem(itemData.item.id, itemData.index, itemData.item.name)}>
                    <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={40} color="white" />
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            )
        

        }}
        
        />
        }
        </MotiView>
        }
        {editView && !viewCompleted &&
        <View style={tw`justify-start`}>
        
        <View>
            <Text style={tw`items-center text-center text-3xl text-white my-2`}>Re-Prioritize Your Goals</Text>
            <Text style={tw`items-center text-center text-xl font-light text-white my-2`}>Press & Hold to Reprioritze Goals</Text>
            <DraggableFlatList
        data={goalState}
        onDragEnd={({ data }) => setGoalState(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        containerStyle={[{aspectRatio:7.25/10}, tw`rounded-xl`]}
        
        />
    
        </View>

        </View>
        
        }

        
        {!viewCompleted ?
        
        <View style={tw`  mb-10 justify-start items-center`}>
            <TouchableOpacity style={tw``} onPress={()=> setViewCompleted(true)}>
            <Text style={tw`text-white text-2xl`}>See Completed Goals</Text>
            </TouchableOpacity>
        </View>
        
        :
        <View  style={tw`flex-1`}>
            <View style={`justify-start items-center`}>
                <Text style={tw`text-white text-center text-3xl`}>Completed Goals</Text>
            </View>
            
            <FlatList 
            data={completedGoals}
            contentContainerStyle={tw``}
            //keyExtractor={(item) => item.id}
            renderItem={(itemData)=>{
                
                    return(
                <View style={{ width:width}}>
                <View style={{marginHorizontal:41, marginVertical:20}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ flex:1,color:'#FFFFFF', fontSize:20, fontWeight:'400' }}>{itemData.item.name}</Text>
                    <TouchableOpacity style={{alignSelf:'baseline'}} onPress={() => removeComplete(itemData.item.id, itemData.index, itemData.item.name)}>
                    <AntDesign name="checkcircle" size={30} color="white" />
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
                    )
                
            }}
            
            />
        
        <View style={tw`justify-end items-center mb-20`}>
            <TouchableOpacity onPress={()=> setViewCompleted(false)}>
            <Text style={tw`text-white text-2xl`}>See Current Goals</Text>
            </TouchableOpacity>
        </View>
        </View>
        }
        
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    rowItem: {
      height: 100,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
  });