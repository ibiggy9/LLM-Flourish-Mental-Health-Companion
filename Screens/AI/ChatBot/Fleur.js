import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Keyboard, AppState, Pressable} from 'react-native'
import React, {useState, useRef} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tw from 'twrnc'
import TextInputExercise from '../../../Components/ExerciseComponents/TextInputExercise'
import { AnimatePresence, Motion } from '@legendapp/motion'
import { MotiView, useDynamicAnimation, MotiText } from 'moti';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TypingAnimation } from 'react-native-typing-animation'
import useRevHook from '../../../Components/useRevHook'
import analytics from '@react-native-firebase/analytics';


export default function Fleur({navigation}) {
    
    const abortControllerRef = useRef(null)
    const {width, height} = useWindowDimensions()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [fleurError, setFleurError] = useState(false)
    const [userLeft, setUserLeft] = useState(false)
    const scrollRef = useRef()
    const {membershipLevel} = useRevHook()
    const transcriptRef = useRef([
      {role: "system", content:"You are a world class therapist named Fleur. Your job is to talk with your clients, understand their issues and help them with their issues whether that be anxiety, loss, depression, addition, lonliness and/or more.",},
      {role: "assistant", content:"Hi I'm Fleur, your AI Therapist. Please ask me a question or for advice on something you're interesting in working on."},
     ])
    const [error, setError] = useState(false)
    const [fleurResponse, setFleurResponse] = useState("")
    const [wordCount, setWordCount] = useState(0)
    const latest = useRef()
    const [tokens, setTokens] = useState(0)
    const [conversationString, setConversationString] = useState("")
    
    //State with message component in it
    const [messageList, setMessageList] = useState([
        <Message type={'fleur'} content="Hi I'm Fleur, your AI Therapist. You can ask me a question, for advice, tell me about a difficult situation, and much more." />
    ])

   
   

   //Appstate, state.
   const appState = useRef(AppState.currentState)
   const [appStateVisible, setAppStateVisible] = useState(appState.current)
   

   //Function that dismisses the keyboard
   function blur(){
    Keyboard.dismiss()
    setClicked(false)
   }
   
   
   //Background or foreground app state listener
   useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active'
        
      ) {
        console.log('App has come to the foreground!');
      } else{
        console.log("App has gone to the background.")
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log(appState.current)
      
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(()=> {
    console.log(AppState.currentState)
    if(AppState.currentState != 'active' && loading == true){
      
      
      cancelRun()

    }
  },[AppState.currentState])
   
  //Function that clears conversation
   function clear(){
    setError()
    setUserLeft(false)
    console.log("Cleared!")
    setMessageList([
        <Message type={'fleur'} content="Hi I'm Fleur, your AI Therapist. You can ask me a question, for advice, tell me about a difficult situation, and much more." />
    ])
   
    setConversationString("")
    transcriptRef.current = [
      {role: "system", content:"You are a world class therapist named Fleur. Your job is to provide therapeutic advice to your client who may be suffering from anxiety, loss, depression, addition, lonliness and/or more.",},
      {role: "assistant", content:"Hi I'm Fleur, your AI Therapist. Please ask me a question or for advice on something you're interesting in working on."},
     ]
   }
   
  //This function calls the API


  

   async function fleurResponseFunc(latestInput){
      console.log("Request to Fleur sent.")
      abortControllerRef.current = new AbortController()

      transcriptRef.current.push({role:"user", content:latestInput})
      console.log(transcriptRef.current)
      
        setFleurResponse(false)
        var myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Bearer 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");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "model": "gpt-3.5-turbo-0301",
        
        "messages": transcriptRef.current,

        "presence_penalty": 1,
        "frequency_penalty": 1,
        "temperature": 0.2,
        "max_tokens": 3500
        });

        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        signal: abortControllerRef.current.signal,
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        const respJson = await response.json()
        setTimeout(()=> !respJson ? cancelFleurRequest('timeout'): null, 7000)
        
        return respJson

        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            .then(response => response.json())
            .then(result => appStateVisible == 'active' && fleurError != true ? processFleurResponse(result, latest) : null)
            .catch(error => setFleurError(true) && console.log(error))  

      
    }

    async function processFleurResponse(response){
      console.log("Processing Fleur Response")
      setError(false)
      if(response){
      console.log(response)
        await analytics().logEvent('fleurResponse', {id:response})
        const tokenUsage = response.usage.total_tokens
        console.log(tokenUsage)
        if(tokenUsage > 3800){
          transcriptRef.current = transcriptRef.current.slice(0,10)
        }

        var resString = response.choices[0].message.content
        var resStringNoSpace = resString.replace(/\r?\n|\r/, "")
        setLoading(false)
        var messageObj = {role:'assistant', content: resStringNoSpace}
        var messageComponent = <Message type='fleur' content={resStringNoSpace} />
        setMessageList((prev)=>[...prev, messageComponent])
        transcriptRef.current.push(messageObj)
        
      } else {
        console.log("Hi")
      }
        return 
    }

    //This runs  when the user enters a message
     async function addMessage(type, input){

        let tempText = text
        await analytics().logEvent("fleurMessageSent", {
          id:tempText
        })
        setText("")
        setUserLeft(false)
        //This switches on the typing animation
        setLoading(true)
        //This builds the message object for the model
        var messageObj = {role:'user', content:input}
        //create the message component
        var newMessage = <Message type="user" content={tempText} />
        

        //add the message component to the list of messages to be displayed to the users. 
        setMessageList((prev)=> [...prev, newMessage]) 
        

        //This calls the api
        try{
         let fleurResp = await fleurResponseFunc(tempText)
          
         let processed = await processFleurResponse(fleurResp)
        } catch (error){
          console.log(error.message)
        }
        
        //This contains the conversation history. Important to note that ref is required to avoid rerender. 
        //transcriptRef.current.push(messageObj)
        //Clear the text box once a message is sent to Fleur. 
        
      }


      function Message({type, content}){
        if(type=="fleur"){
            return(
                <MotiView from={{translateY:500, opacity:0, scale:0.6}} animate={{translateY:0, opacity:1, scale:1}} transition={{type:'timing', duration:300}} id="text-Fleur" style={[tw`bg-slate-800 ml-2 justify-center mt-3 items-start rounded-2xl bg-opacity-60 p-2`, {maxWidth:width/1.5}]}>
                  <Pressable
                  
                  
                  >
                <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                </Pressable>
                </MotiView>

                )

        } else {
            return(
                <MotiView from={{translateY:500}} animate={{translateY:0}} transition={{type:'timing', duration:200}} id="row" style={[{width:width}, tw`items-end`]}>
                <View id="text-Fleur" style={[tw`bg-blue-700 mr-2 mt-1 justify-end items-start mt-3 rounded-2xl bg-opacity-60 p-2`, {maxWidth:width/1.5}]}>
                    <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                </View>
                </MotiView>

            )
        }
        
      }

      const scrollToBottom = () => {
        scrollRef.current.scrollToEnd({ animated: true });
      };


      useEffect(()=> {scrollToBottom()}, [messageList, fleurResponse, addMessage])

      //This reruns the message
      function reTry(){
        setError("Sorry, there was an error, retrying...")
        fleurResponseFunc()

      }

      //This function cancels the run if a user leaves the app
      function cancelRun(){
        cancelFleurRequest()
        const lastMessage = transcriptRef.current[transcriptRef.current.length -1]
        setMessageList(messageList.slice(0, -1))
        setText(lastMessage.content)
        transcriptRef.current.pop()
        setUserLeft(true)
        setLoading(false)

      }

      //This function cancells the fetch request. 
      function cancelFleurRequest(reasonCode){
        setLoading(false)
        reasonCode == "timeout" && setError("Either the network timed out or there was a server error. Retry sending")
        abortControllerRef.current && abortControllerRef.current.abort()
        console.log("Request to Fleur cancelled.")
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
    <View style={[tw`flex-1 justify-start mt-10`,{height:height/1.18, width:width, opacity:1, position:'absolute'}]}>
    
    <Text style={tw`text-white text-2xl text-center mt-5`}>Chat with Fleur</Text>
    <ScrollView ref={scrollRef} onContentSizeChange={()=> scrollToBottom()} contentContainerStyle={[tw` pb-10 `,]}>
    
    
    {messageList}
    {userLeft &&
    <View style={tw`mr-30 px-5 py-3`} onPress={()=> clear()}>
    <Text style={tw`text-white`}>Please don't leave the app while Fleur is responding. Send your message again.</Text>
    </View>
  
    }
    {loading &&
    <View style={tw`ml-10 mt-10 mb-20`}>
    
    <TypingAnimation 
        dotStyles={tw`mb-3`}
        dotColor="silver"
        dotMargin={15}
        dotSpeed={0.20}
        dotRadius={5}
        dotX={20}
        
      />
      
      </View>
    }
    {error &&
      <View style={tw`mr-30 px-5 py-3 mb-2 `} onPress={()=> clear()}>
      <Text style={tw`text-white`}>{error}</Text>
      </View>
    }
    {messageList.length > 1 && !loading && 
    <TouchableOpacity style={tw`mr-30 px-5 py-2 mb-15`} onPress={()=> clear()}>
    <Text style={tw`text-white `}>Close this conversation</Text>
    </TouchableOpacity>
    }
    </ScrollView>
    


    <KeyboardAvoidingView
    behavior='padding'
    style={tw` `}
    keyboardVerticalOffset={40}
    
    > 
         

    <View style={tw`justify-start items-center`} id="text-input-container">
    {clicked ? 
    <TouchableOpacity style={{position:'absolute', bottom:12, left:10, right:10}}  onPress={()=> addMessage("user", text)}>
    <View  style={[{}, tw`bg-slate-700 flex-row items-center bg-opacity-90 rounded-2xl`]} >
        
        <TextInput
        style={[tw`ml-3 text-white text-lg py-3`, { width:width/1.3}]}
        placeholder={"Enter Message..."}
        placeholderTextColor={'gray'}
        multiline={true}
        numberOfLines={4}
        value={text}
        autoFocus
        onChangeText={setText}
        onFocus={()=> scrollToBottom()}
        onBlur={()=> blur()}
        />
        <View style={tw`flex-col justify-center ml-3`}>
        <Feather name="send" style={tw`mr-3  mt-2 text-slate-200`} size={30} color="white" />
        </View>
    </View>
   
        
    </TouchableOpacity>
    :
    <TouchableOpacity style={tw` mb-3`} onPress={()=> setClicked(true)}>
    <MotiView from={{scale:0.2}} animate={{scale:1}} transition={{type:'timing'}}>
    <Ionicons name="add-circle" size={50} color="white" />
    </MotiView>
    </TouchableOpacity>

    }

    </View>
    </KeyboardAvoidingView>
   

    </View>
    
    </View>
  )
}