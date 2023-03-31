import { View, Text, useWindowDimensions, FlatList, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import analytics from '@react-native-firebase/analytics';

export default function ExercisesNew({navigation}) {
    const{height, width} = useWindowDimensions()
    
    const DailyItems = [
        {
            fleurPowered: true,
            title:'Reflect AI',
            description:"Write about a topic you'd like to reflect on and Fleur will create prompting questions to help structure your thoughts.",
            link:'StructuredReflection',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/structured.jpg')} />,
           

        },
        {
            title:'Daily Morning Journal',
            description:'Check in, establish your key focuses for the day, and capture your thoughts in this all-in-one journalling tool.',
            link:'DailyJournal',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/Journal.jpg')} />,
           

        },
        {
            title:'Free Writing',
            description:'A place to quickly capture your thoughts, simple as that.',
            link:'FreeWriting',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/unstruct.jpg')} />,
           

        },

    ]
    const ShortTermItems =[
        
          {
          
          title:'Mindful Exhale Breathwork',
          description:'This tool is based on one of the scientifically most effective breathing techniques to help you relax in as little as a few breaths.',
          link:'BreathingExercise',
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/breath.jpg')} />,
          duration:'1-3 minutes',
          moduleCount:'1 Tool'

        },
      
        {
          
          title:'Sigh Relief Breathwork',
          description:'Did you know all mammels do this breathing pattern to relax unconsciously? This breathing technique helps you find calm fast.',
          link:'PhysiologicalBreath',
          duration:'1-3 minutes',
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/physbreath.jpg')} />,
          moduleCount:'1 Tool'

        },
        
        
        /*
        {
          
          title:'Hyperventilation for Chronic Stress Reduction',
          description:'Use this exercise to improve your attention and focus, and for lowering chronic stress.',
          link:'Hyperventilation',
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/feather.jpg')} />,
          duration:'1-5 minutes',
          moduleCount:'1 Tool'

        },
        */
      ]

      const SelfGuidedItems = [

        {
            fleurPowered:true,
            title:'Cognitive Coach',
            description:'Write about a challenging situation and Fleur will guide you through a therapeutic exercise and provide some guidance and advice on your situation.',
            link:'CbtAi',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/cbtAi/cbai1.jpg')} />,
            duration:'10-20 Minutes',
            moduleCount:'8 Steps'
        }, 
        {
            fleurPowered:true,    
            title:"Goal Planner",
            description:"Goals provide direction, motivation and improve performance. But we often don't set them up to maximize our chance of success. In this tool, Fleur helps you develop robust goals.",
            link:'GoalPlanner',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/goals/goals1.jpg')} />,
            duration:'10-20 minutes',
            moduleCount:'8 Parts'
            },

            
            /*
        {
          
            title:'Self-CBT',
            description:'Empower your mind: our CBT-based software guides you to identify and overcome negative automatic thoughts for better mental health.',
            link:'Moderate',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/nat.jpg')} />,
            duration:'1-7 daily entries',
            moduleCount:'3 Parts'
            }, 

            */
            /*
            {
            
              title:'Values-Based Life Planning',
              description:'Discover your life vision: our values-based life planning tool guides you to develop a strategy and achieve your goals for a fulfilling future',
              link:'ForgingIntro',
              image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/vblp.jpg')} />,
              duration:'60 Minutess',
              moduleCount:'3 Parts'
            },
            */


      ]
      
         
      

      const AssessmentItems = [
        {
          
            title:'Mental Health Assessment',
            description:"Take this short assessment to see if you are flourishing, moderately mentally health, or languishing.",
            link:'MhContQuiz',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/continuum.jpg')} />,
            duration:'1-5 Minutes',
            moduleCount:'14 Questions'
          },
          {
          
          title:'Anxiety & Depression Severity Assessment',
          description:"This assessment will help you understand how severe your anxiety and depressive symptoms are and whether you'd benefit from professional licensed therapy.",
          image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/lao.jpg')} />,
          link:'Quiz',
          duration:'1-3 Minutes',
          moduleCount:'14 Questions'
        },
        {
          
            title:'Stress & Recovery Test',
            description:'Did you know your urge to breath is tightly tied to your stress levels? This breathing test will reveal how stressed or recovered you are in less than a minute.',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/hm.jpg')} />,
            link:'StressTest',
            duration:'1 Minute',
            moduleCount:'1 Tool'
          }

      ]
        
      const otherItems = [

        {
          
            title:'Binaural Beats',
            description:'Listening to Binaural Beats has been shown to boost focus. Listen to this track when trying to be productive. Headphones are required for the best results.',
            link:'Binural',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/bi.jpg')} />,
            duration:'30 Minutes of Sound',
            moduleCount:'1-Track'
          },
          {
            
            title:'White Noise',
            description:'Similar to Binaural Beats, White Noise has also been shown to boost focus and productivity. Listen to this during your next work session.',
            link:'WhiteNoise',
            image:<Image style={[tw`rounded-xl`, {height:height/4.5, width:width/1.35}]} source={require('../assets/headphone.jpg')} />,
            duration:'30 Minutes of Sound',
            moduleCount:'1-Track'
          },
      ]

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
    <View style={[tw`flex-1 justify-start mt-15 pb-20`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        <ScrollView contentContainerStyle={tw`pb-20`} showsVerticalScrollIndicator={false}>
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Self Guided Therapy</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Rewire unhelpful thoughts, create a powerful vision.</Text>
            <FlatList 
            data={SelfGuidedItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        await analytics().logEvent('exerciseSelection', {
                            id:itemData.item.title
                        })
                        navigation.navigate(itemData.item.link)
                    }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                        {itemData.item.fleurPowered &&
                            <View style={[tw`bg-blue-400 items-center rounded-2xl bg-opacity-60 mt-3`, {width:width/3}]}>
                                <Text style={tw`text-white`}>Powered By Fleur</Text>
                                </View>
                            
                        }
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Mental Health Assessments</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Scientific mental health assessments.</Text>
            <FlatList 
            data={AssessmentItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent('exerciseSelection', {
                            id:itemData.item.title
                        })

                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        <View style={tw``}>
            <Text style={tw` ml-3 text-white text-2xl`}>Daily Exercises</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Check in and capture your thoughts</Text>
            <FlatList 
            data={DailyItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        await analytics().logEvent('exerciseSelection', {
                            id:itemData.item.title
                        })
                        navigation.navigate(itemData.item.link)
                    }}
                     style={[tw`mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        
                        
                        
                        
                        <View style={[tw`m-3  rounded-xl`]}>
                        {itemData.item.image}
                        {itemData.item.fleurPowered &&
                            <View style={[tw`bg-blue-400 items-center rounded-2xl bg-opacity-60 mt-3`, {width:width/3}]}>
                                <Text style={tw`text-white`}>Powered By Fleur</Text>
                                </View>
                            
                        }
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                      
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        
        <View style={tw``}>
            <Text style={tw` ml-3 text-white text-2xl`}>Quick Stress Reliever</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Reduce stress & anxiety now.</Text>
            <FlatList 
            data={ShortTermItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent("exerciseSelection",{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
       
        
        <View>
            <Text  style={tw` ml-3 text-white text-2xl`}>Focus and Productivity Tools</Text>
            <Text style={tw` ml-3 text-white font-light text-lg`}>Get it done, feel better.</Text>
            <FlatList 
            data={otherItems}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
            snapToEnd
            snapToStart
            snapToOffsets={[0, width-80]}
            decelerationRate='fast'
            renderItem={(itemData)=> {
                return(
                    <TouchableOpacity onPress={async ()=> {
                        navigation.navigate(itemData.item.link)
                        await analytics().logEvent("exerciseSelection",{
                            id:"exerciseSelection"
                        })
                        }} style={[tw` mb-5`, {width:width-80}]}>
                        <View style={[tw``,{width:width-80}]}>
                        <View style={[tw`m-3  rounded-xl border-white`]}>
                        {itemData.item.image}
                       <Text style={tw`text-white mt-2 text-lg`}>{itemData.item.title}</Text>
                       <Text style={tw`text-white font-light  text-sm`}>{itemData.item.description}</Text>
                       <View style={tw`flex-row justify-start`}> 
                       <View style={tw`flex-row`}>
                       
                       <Ionicons style={tw`mt-1 text-slate-300`} name="ios-time-outline" size={20}  />
                       <Text style={tw`text-white font-light mt-1 text-sm`}>{itemData.item.duration}</Text>
                       </View>
                       <View style={tw`flex-row`}>
                       <MaterialCommunityIcons style={tw`text-slate-300 ml-4`} name="bookshelf" size={25} />
                       <Text style={tw`text-white font-light mt-1  text-sm`}>{itemData.item.moduleCount}</Text>
                       </View>
                       </View>
                       </View>
                       </View>
                    </TouchableOpacity>
                )}
            }
            />
        </View>
        </ScrollView>
    </View>
    
    </View>
  )
}