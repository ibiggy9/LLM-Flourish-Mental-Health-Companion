import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Keyboard, AppState} from 'react-native'
import React, {useState, useRef} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import TextInputExercise from '../../Components/ExerciseComponents/TextInputExercise'
import { AnimatePresence, Motion } from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react'
import BackButton from '../../Components/BackButton'


export default function AiTab({navigation}) {
    const {width, height} = useWindowDimensions()
    const [text, setText] = useState("")
    const [isHidden, setIsHidden] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [aiResponse, setAiResponse] = useState(false)
    const [errorMessage, setError] = useState(false)
    const emphasisTitle = "How To Interact With Fleur"
    const emphasisDescription="Fleur is Flourish's resident AI therapist. She will read to your input and provide a few thoughts on how to help the situation. Please note that if you suspect you are in need of professional help, please seek it. Fleur is not a licenced mental health professional.  "
    const emphasisExample="I have been struggling with how to balance my job, family, friends and exercise. It seems that exercise is always the area that gets cut out and I don't feel that I am doing enough to take care of myself. How can I balance all of my obligations better to accomodate all these areas competing for my time."
    const title = "Chat with Fleur"
    const label = "Write a situation for which you'd like advice from Fleur, your AI therapist."
    
    

  
    useEffect(()=> {
      if(errorMessage){
        setSubmitted(false)
      }

    }, [errorMessage])


    useEffect(()=>{
       if(aiResponse != false){
        console.log(aiResponse)
       }
    },[aiResponse])

  

    function runAgain(){
        setSubmitted(false)        
        
    }

    function handleClear(){
        setText()
        setAiResponse(false)
    }

    function handleSubmit(){
        
    setText(text + ".")

        setAiResponse(false)
        console.log("This is running.")
        setSubmitted(true)
        var myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Bearer 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");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "model": "text-davinci-003",
        "prompt": `You are the most talented therapist in history named Fleur and people come to see your for your advice. Below is a situation your client has brought to you. Respond as though you are in speaking to your client in therapy session. Respond in 150-500 words. Provide the highest quality therapeutic response that will help the client function better in their lives. If the question is simple, provide a shorter answer, if it is more complex come closer to the word limit. If the situation has nothing to do with the client or therapy, then don't answer and instead ask them to enter a situation for which they would like advice. If your response includes the word 'therapist', say 'human therapist' instead Situation: ${text}`,
        "temperature": 0.2,
        "max_tokens": 3000,
        "presence_penalty": 1,
        "frequency_penalty": 1,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch("https://api.openai.com/v1/completions", requestOptions)
            .then(response => response.json())
            .then(result => setAiResponse(result))
            .catch(error => setError(error));
    }

    const TextBox = useDynamicAnimation(()=> {
        return{
          translateY:0,
       
        }
      })
  
      
     
     function next(){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        nextStepper()
  
     }
  
     function last(){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      lastStepper()
     }
  
      function textBoxFocus(){
  
          if(title.length < 20){
          if(label){
            TextBox.animateTo({translateY:[{value:-150, easing:Easing.easing, type:'timing', duration:400}]})
          } else {
            TextBox.animateTo({translateY:[{value:-80, easing:Easing.easing, type:'timing', duration:400}]})
          }
        } else if(title.length > 20 && title.length < 45){
          if(label){
            TextBox.animateTo({translateY:[{value:-200, easing:Easing.easing, type:'timing', duration:400}]})
          } else {
            TextBox.animateTo({translateY:[{value:-120, easing:Easing.easing, type:'timing', duration:400}]})
          }
        } else if (title.length > 45){
          if(label){
            TextBox.animateTo({translateY:[{value:-200, easing:Easing.easing, type:'timing', duration:400}]})
          } else {
            TextBox.animateTo({translateY:[{value:-150, easing:Easing.easing, type:'timing', duration:400}]})
          }
        }
          setIsHidden(true)
      }
  
      function isNotFocused(){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        TextBox.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:400}]})
        
        setIsHidden(false)
        Keyboard.dismiss()
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
    <View style={[tw`flex-1 justify-start pb-50 mt-10`,{height:height, width:width, opacity:1, position:'absolute'}]}>
    {!submitted ? 
    <View>
        
        <View>
        <AnimatePresence style={{height:1, width:1}}>
        {isHidden === false &&
        
        <MotiView style={tw``} animate={{opacity:1}} exit={{opacity:0}} key='asdf' >
        
       <BackButton navigation={navigation}/>
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        <Text style={tw`text-white  text-3xl mx-5 text-center  mt-5 text-white`}>{title}</Text>
        </MotiView>
        
       
        <MotiView from={{ opacity:0, scale:1.3}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        
        
        <View style={tw``}>

        <Text style={tw`text-white text-center  mx-2 text-lg items-start text-left font-light mt-3 text-white `}>{label}</Text>
        
        </View>
          
        
        <TouchableOpacity style={tw``} onPress={() => navigation.navigate('Reminder', {title: emphasisTitle, description:emphasisDescription, example:emphasisExample})}>
        <Text id="emphasis" style={[tw` text-center text-blue-100 text-xl mt-3 underline`, {width:'100%'}]}>See an Example</Text>
        </TouchableOpacity>
          
        </MotiView>
        </MotiView>
        }
      
      
        
        
      <MotiView from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
       
        
        
        <MotiView style={{height:'100%'}} state={TextBox}>
        {!isHidden &&
        <Text style={tw`mx-10 text-right  mt-2 text-lg text-white`}>{text ? text.length : 0}/750</Text>
          }
      
        
        <ScrollView>
       
        <TextInput
        style={[tw`my-4 px-3 rounded-xl border border-white text-white text-lg mx-2`, {aspectRatio:4/3, width:'95%'}]}
        multiline={true}
        numberOfLines={5}
        selectionColor={'white'}
        maxLength={750}
        onFocus={textBoxFocus}
        onBlur={()=> isNotFocused()}
        keyboardAppearance="dark"
        
        onChangeText={setText}
        value={text}
        
      />
      

      {isHidden &&
      <KeyboardAvoidingView style={tw`flex-1 flex-row justify-end`}>
      <View style={[tw`flex-row justify-end `, {aspectRatio:4/3}]}>
      
        <MotiText key='asdfasflkjrh' exit={{opacity:0}} from={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`mx-10 text-right  mt-2 text-lg text-white`}>{text ? text.length : 0}/750</MotiText>
          
      <MotiView key="asdfadgh" exit={{opacity:0, translateX:-20}} from={{opacity:0, translateX:50}} animate={{opacity:1, translateX:-20}}><TouchableOpacity onPress={()=>isNotFocused()} style={[tw`items-end  `]} ><AntDesign name="checkcircle" size={50} color="white" /></TouchableOpacity></MotiView> 
      </View>
      </KeyboardAvoidingView>
        }
      {!isHidden && 
      <MotiView style={tw`flex-1`}>
        {text &&
        <View style={tw`flex-row`}>
        <TouchableOpacity onPress={()=> handleClear()} style={tw`flex-1 items-center p-3 mt-10 mx-5 rounded-2xl border border-white justify-end `}>
        <Text style={tw`text-white  text-lg`}>Clear</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleSubmit()} style={tw`flex-1 items-center p-3 mt-10 mx-5 rounded-2xl border border-white justify-end `}>
        <Text style={tw`text-white  text-lg`}>Submit</Text>
      </TouchableOpacity>
        </View>
      
        }
        {aiResponse && 
        <TouchableOpacity onPress={()=> setSubmitted(true)} style={tw`flex-1 items-center p-3 mt-3 mx-5 rounded-2xl border border-white justify-end `}>
        <Text style={tw`text-white  text-lg`}>Go Back to Response</Text>
      </TouchableOpacity>
        
        }

          </MotiView>}
      </ScrollView>
     
      </MotiView>
      
      
      
      
      </MotiView>
     
       </AnimatePresence>
      </View>
      
      </View>
      :
      <View style={tw` `}>
        <MotiView style={{height:height}} from={{ opacity:0, scale:0.7}} animate={{opacity:1, scale:1}} transition={{default:{type:"timing", duration:1000, easing: Easing.easing}}}>
        <ScrollView contentContainerStyle={tw` pb-40 mx-5`}>
        <View style={tw`mt-4`}>
        <Text style={tw`text-white text-3xl text-center`}>Fleur's Response:</Text>
        
        {aiResponse == false ? 
            <MotiView from={{scale:0.7}} animate={{scale:1}} transition={{duration:400, easing:Easing.easing, type:'timing'}} style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
              
              <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Loading: Please Don't Leave The App</Text>
            <ActivityIndicator size={"large"} color={"white"}/>
            <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running. You can use other tools in this app in the meantime. </Text>
            </MotiView>
        :
        <>
        <Text style={tw`text-white text-lg mt-10`}>{aiResponse.choices[0].text ? aiResponse.choices[0].text : aiResponse}</Text>
        </>
        
        }
        </View>
        {aiResponse &&
        <View style={tw`mt-10`}>
        <TouchableOpacity style={tw` border border-white items-center mx-20 rounded-2xl p-3 justify-end mt-1`} onPress={()=> runAgain()}>
            <Text style={tw`text-white text-center text-lg`}>Enter Again</Text>
        </TouchableOpacity>
        </View>
        }
        </ScrollView>
        
        </MotiView>
    </View>
      }
      
    </View>
    </View>
  )
}