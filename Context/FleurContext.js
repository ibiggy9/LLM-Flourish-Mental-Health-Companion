import React, {createContext, useContext, useEffect, useState, useRef} from 'react'
import { 
    createUserWithEmailAndPassword, 
    signout,
    onAuthStateChanged, 
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    getUserByEmail,
    signInWithEmailAndPassword,
    signOut, 
    getAuth,
    GoogleAuthProvider,
    getRedirectResult,

 } from 'firebase/auth'
 import { getDatabase, ref, onValue, set, get,  } from 'firebase/database'
 import * as AppleAuthentication from 'expo-apple-authentication';
 import { MotiView, useDynamicAnimation, MotiText } from 'moti';
 import { View, Text, useWindowDimensions, Easing, TouchableOpacity, ScrollView, TextInput, FlatList, StatusBar, ActivityIndicator, Platform, KeyboardAvoidingView, Keyboard, AppState, Pressable, SafeAreaView} from 'react-native'
import app from '../firebaseConfig'
import { AppContext } from '../App'
import tw from 'twrnc'
import useRevHook from '../Components/useRevHook';
import analytics from '@react-native-firebase/analytics';
import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FleurContext = createContext()

export function useFleur(){
    return useContext(FleurContext)
}   

export function FleurProvider({children, navigation}) {
    const [isFleur, setIsFleur] = useState(false)
    const [chatMenuShow, setChatMenuShow] = useState(true)
    const [fleurHelperRun, setFleurHelperRun] = useState(false)
    const textInputRef = useRef(null)
    const abortControllerRef = useRef(null)
    const [tellMeAboutThatCount, setTellMeAboutThatCount] = useState(0)
    const auth = getAuth(app)
    const {width, height} = useWindowDimensions()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [clicked, setClicked] = useState(false)
    const scrollRef = useRef()
    const {isProMember} = useRevHook()
    const transcriptRef = useRef([
      {role: "system", content:"You are a world class therapist named Fleur. Your job is to provide highly personalized support to your clients who don't have any other mental health professionals they can talk with by understanding their issues and helping them. Whether that be anxiety, loss, depression, addition, lonliness and/or anything else mental health related. You may need to ask for more information before providing advice."},
      {role: "assistant", content:"Hi I'm Fleur, your AI Therapist. Please ask me a question or for advice on something you're interesting in working on."},
     ])
    const [error, setError] = useState(false)
    const [fleurResponse, setFleurResponse] = useState("")
    const [conversationString, setConversationString] = useState("")
    const [helper, setHelper] = useState(false)
    const [usageCount, setUsageCount] = useState()
    const appState = useRef(AppState.currentState)
   const [appStateVisible, setAppStateVisible] = useState(appState.current)
   const [userLeft, setUserLeft] = useState(false)
   const [keyboardHeight, setKeyboardHeight] = useState(0);
   const [startSelection, setStartSelection] = useState(null)
   const [messageList, setMessageList] = useState([
    <Message type={'fleur'} key={Math.random()* 1000} content="Hi I'm Fleur, your AI Therapist. You can ask me a question, for advice, tell me about a difficult situation, and much more." />
])

  useEffect(()=> {getChatData()}, [])

  
    
    const AndroidKey = useDynamicAnimation(()=> {
        return{
          translateY:0,
          opacity:1,
          scale:1
       
        }
      })

      const approaches = [
        {
            title:"Dialectical Behavior Therapy (DBT):", 
            description:"DBT is a therapy that helps people manage emotions, build resilience, and improve relationships through individual and group skill-building sessions. It is particularly beneficial for those with borderline personality disorder and those prone to self-harm or suicidal thoughts, providing them with tools to better handle distressing situations and build fulfilling lives.", 
            message:"Walk me through a personalized DBT exercise for my specific situation."
        },
        {
            title:"Rational Emotive Behavior Therapy (REBT):", 
            description:"REBT is a cognitive-behavioral therapy that helps individuals identify, challenge, and alter irrational beliefs that lead to emotional distress and behavioral problems. It promotes a healthier, more flexible outlook on life, and is used to treat conditions like depression, anxiety, and stress, enhancing problem-solving skills and emotional management.", 
            message:"Please conduct a REBT session with me."
        },
        {
            title:"Family Systems Therapy", 
            description:" This therapy looks at families as a whole unit and works on the interpersonal dynamics. It can enhance communication and understanding among family members, improving the overall health of the family unit.", 
            message:"Please conduct a family systems therapy session with me."
        },
        {
            title:"Mindfulness-Based Cognitive Therapy (MBCT)", 
            description:"This approach uses mindfulness strategies to break the cycle of chronic unhappiness and depression. It can help individuals become more aware of their thoughts and feelings without judgment, reducing the risk of relapse into depression.", 
            message:"Please conduct a MBCT session with me."
        }, 
        {
            title:"Positive Psychotherapy", 
            description:"This therapy builds on personal strengths and assets, aiming to foster a sense of fulfillment, happiness, and wellbeing. It can boost resilience, optimism, and an individual's capacity to pursue meaningful goals.", 
            message:"Please conduct a positive psychotherapy session with me."   
        }
            ,
        {
            title:"Humanistic Therapy", 
            description:"This approach centers on the individual's innate capacity for self-understanding and growth. It promotes self-esteem, personal responsibility, and understanding of one's own feelings. It can enhance self-awareness, authenticity, and the ability to manage difficult feelings.", 
            message:"Please conduct a humanistic therapy session with me."
        },
        {
            title:"Existential Therapy", 
            description:"This therapy focuses on free will, self-determination, and the search for meaning. It can help individuals confront life's existential anxieties (like death and isolation) and encourages the creation of a life with purpose and meaning.", 
            message:"Please conduct an existential therapy session with me."
        },
        {
            title:"Interpersonal Psychotherapy", 
            description:"This therapy emphasizes improving interpersonal relationships to help alleviate psychological distress. It can help individuals gain insights into their relationships, improve their social skills, and enhance their communication abilities.", 
            message:"Please conduct an interpersonal psychotherapy session with me."
        },
        {
            title:"Acceptance & Commitment Therapy (ACT)", 
            description:"ACT encourages individuals to embrace their thoughts and feelings rather than fighting or feeling guilty for them. It can improve psychological flexibility, leading to a more adaptable response to life's difficulties.", 
            message:"Please conduct an ACT session with me."
        },
        {
            title:"Solution-Focused Brief Therapy", 
            description:" This therapy focuses on finding solutions in the present and building one's future. It emphasizes the individual's strengths and resources, which can foster self-confidence and resilience.", 
            message:"Please conduct a solution-focused brief therapy session with me."
        },
        {
            title:"Narrative Therapy", 
            description:"This approach separates a person from their problems, allowing them to view these problems from different perspectives. This can alleviate the influence of problems in their life and foster empowerment", 
            message:"Please conduct a narrative therapy session with me."    
        },
        {
            title:"Eye Movement Desensitization and Reprocessing (EMDR)", 
            description:"This therapy helps individuals process and make sense of traumatic memories. It can reduce the intensity of distressing feelings and symptoms associated with trauma.", 
            message:"Please conduct an EMDR session with me."
        },
        {
            title:"Psychoanalysis/Psychodynamic Therapy", 
            description:"This therapy focuses on the impact of the unconscious on thoughts and behaviors, as well as the importance of childhood experiences on the current psychological state. It can help uncover deeply rooted patterns and conflicts, fostering self-understanding and personal growth.", 
            message:"Please conduct a psychoanalysis/psychodynamic therapy session with me."
        },
        
      ]

      const exercises =[
        {
            title:"Cognitive Behavioral Therapy (CBT)", 
            description:"CBT exercises aim to help individuals recognize and change negative thinking patterns and behaviors that may lead to emotional distress. This can help clients deal with issues such as anxiety, depression, or phobias in a more productive way.", 
            message:"Please conduct a CBT session with me."
        },
        
        {
            title:"Mindfullness Exercises", 
            description:" Mindfulness involves focusing on the present moment without judgment. It can help reduce stress, improve concentration, and improve emotional regulation.", 
            message:"Please walk me through a mindfulness exercise."
        },
        {
            title:"Progressive Muscle Relaxation", 
            description:"PMR involves tensing and then relaxing each muscle group in the body. This can help with reducing physical tension and anxiety, and it often pairs well with mindfulness exercises.This technique involves systematically tensing and then releasing different muscle groups in the body.", 
            message:"Please walk me through a progressive muscle relaxation exercise."    
        },
        {
            title:"Journalling", 
            description:"Writing about thoughts, feelings, and experiences can help clients identify patterns, triggers, and potential solutions. It can also serve as a form of emotional release.", 
            message:"Please conduct Journalling session with me."
        },
        {
            title:"Assertiveness and communication training", 
            description:"These exercises can help individuals express their feelings and needs more effectively, improve their relationships, and increase their confidence.", 
            message:"Please conduct an assertiveness and communication training session with me."
        },
        {
            title:"Goal Setting", 
            description:"Setting specific and achievable goals can provide direction and motivation in therapy. It also helps track progress and reinforce the idea that change is possible.", 
            message:"Please conduct a goal setting session with me."
        },
        {
            title:"Self-Care Planning", 
            description:"Self-care is an essential part of mental health. Regularly engaging in activities that promote well-being can help reduce stress and prevent burnout.", 
            message:"Please conduct a self-care planning session with me."
        },
        {
            title:"Visualization", 
            description:"This exercise can help individuals manage anxiety, improve mood, and rehearse desired behaviors. By creating a mental image of a calming or positive situation, clients can learn to better regulate their emotions.", 
            message:"Please conduct a visualization exercise with me."
        },
        {
            title:"Exposure Therapy", 
            description:"Particularly common in treating phobias and post-traumatic stress disorder, these exercises involve gradual exposure to the feared object or context without any danger, in order to extinguish the conditioned fear response.", 
            message:"Please help me build an exposure hierarchy for my specific situation."
        },
        {
            title:"Behavioral Activation", 
            description:"This is a therapeutic activity in which clients are guided to engage in routine activities that they have been avoiding due to depression, anxiety, etc.", 
            message:"Please conduct a behavioral activation session with me."
        },
        {
            title:"Psychoeduation", 
            description:"This involves teaching clients about their mental health conditions, including potential causes, symptoms, and treatment strategies. This can be a standalone exercise or incorporated into other types of therapy.", 
            message:"Please conduct a psychoeducation session with me."
        },
        {
            title:"Problem Solving Therapy", 
            description:"This technique involves identifying a problem, brainstorming possible solutions, comparing and contrasting those solutions, choosing a solution, and making a plan to implement it.", 
            message:"Please conduct a problem solving therapy session with me."
        },
        {
            title:"Values Clarification", 
            description:"This exercise can help clients identify, clarify, and prioritize their personal values, which can guide decision-making and behavior.", 
            message:"Please conduct a values clarification session with me."
        },
        {
            title:"Self-Monitoring", 
            description:"Clients keep a record of their symptoms or behaviors, including when and where these occur, what triggers them, and what consequences they have. This can increase awareness and help in the treatment planning process.", 
            message:"Please conduct a self-monitoring session with me."
        },
        {
            title:"Cognitive Restructuring", 
            description:"This involves learning to identify and dispute irrational or maladaptive thoughts known as cognitive distortions.", 
            message:"Please conduct a cognitive restructuring session with me."
        },
        {
            title:"Empty Chair Therapy", 
            description:"Common in Gestalt therapy, this exercise involves clients imagining someone (like a person they have conflict with or a part of themselves) in an empty chair and then speaking to or confronting that person or aspect of themselves.", 
            message:"Please conduct an empty chair therapy session with me."
        },
        {
            title:"Role Playing", 
            description:"This technique can help clients prepare for potentially difficult interactions, and can also be used to help them gain a better understanding of their own and others' perspectives.", 
            message:"Please conduct a role playing session with me."
        },
        {
            title:"Mind-Body Bridging", 
            description:"This involves learning to recognize and map tension in the body and mind, and using this awareness to promote relaxation and wellness.",
             message:"Please conduct a mind-body bridging session with me."
            },
        {
            title:"Positive Affirmation", 
            description:"Using positive statements about oneself to counter negative self-beliefs and promote a more positive self-image.",
             message:"Please help me create positive affirmations for my specific situation."
            },
        {
            title:"Strength Inventory", 
            description:"This involves identifying and acknowledging personal strengths and abilities, which can help boost self-esteem and resilience.",
             message:"Please conduct a strength inventory session with me."
            },
        {
            title:"Grounding Techniques", 
            description:"These exercises help individuals stay in the present moment and are particularly helpful for managing symptoms of PTSD, anxiety, and dissociation. Examples include describing the details of an object or focusing on physical sensations like feeling your feet on the floor.", 
            message:"Please conduct a grounding techniques session with me."
        },
        {
            title:"Distress Tolerance Skills", 
            description:"Commonly used in Dialectical Behavioral Therapy (DBT), these skills help individuals tolerate and accept distress, and include exercises such as self-soothing, distraction, and improving the moment.", 
            message:"Please conduct a distress tolerance skills session with me."
        },
        {
            title:"Thought Stopping Techniques", 
            description:"This involves consciously stopping negative or unhelpful thoughts and often pairing it with a positive or neutral thought. It's particularly useful in managing obsessive thoughts or rumination.", 
            message:"Please conduct a thought stopping techniques session with me."
        },
      ]

      const initialSuggestions = [
        {
            title: "Stress" , 
        suggestion: "I've been feeling overwhelmed lately and can't seem to relax. Can you help me find strategies to manage my stress better?"
    },
        {
            title: "Anxiety" ,
        suggestion: "I'm always worried about everything, even when there's no real reason to be. It's interfering with my life. What can I do to reduce my anxiety?"
    },
        {
            title: "Depression", 
        suggestion: "I've been feeling really low for a long time and can't seem to shake it. I don't enjoy things I used to. Is this depression, and how can therapy help?"
    },
        {
            title: "Trauma", 
        suggestion: "I experienced a traumatic event and I can't seem to move past it. It's affecting my daily life. Can you help me process this?"
    },
        {
            title: "Grief & Loss",  
        suggestion: "I recently lost someone very close to me and I'm having a hard time coping with the grief. What are some ways to manage this pain?"
    },
        {
            title: "Relationship Issues",  
        suggestion: "I'm having a lot of arguments with my partner and it feels like we're not communicating well. Can you help us understand each other better?"
    },
        {
            title: "Self Esteem",  
        suggestion: "I often feel like I'm not good enough and it's affecting my relationships and work. How can I build a healthier self-esteem?"
    },
        {
            title: "Life Transition",  
        suggestion: "I've recently retired and I'm finding it hard to adjust to this new phase of life. Can therapy help me navigate through this transition?"
    },
        {
            title: "Personal Growth & Exploration",  
        suggestion: "I want to understand myself better and work on self-improvement. Can therapy assist me in exploring my personal patterns and behaviors?"
    }
      ]

      function runFocus(kbHeight){
        console.log("running Animation"+kbHeight)
        
        AndroidKey.animateTo({translateY:[{value:-kbHeight, easing:Easing.easing, type:'timing', duration:100}]})
        //AndroidKey.animateTo({scale:[{value:4, easing:Easing.easing, type:'timing', duration:400}]})
        try {
        scrollRef.current.scrollToEnd({ animated: true });
        } catch {
          console.log("Passed")
        }
        setIsFocused(true)
      }
    
      function runBlur(){
        AndroidKey.animateTo({translateY:[{value:0, easing:Easing.easing, type:'timing', duration:100}]})
        setIsFocused(false)
      }

      async function review(){
        if (usageCount % 11 === 0) {  // Check if usageCount is a multiple of 3
          if (await StoreReview.hasAction()) {
            // you can call StoreReview.requestReview()
            StoreReview.requestReview()
          }
        }
      }

      async function storeChatData(value){
        
        try {
          console.log("updating value to", value)
          await AsyncStorage.setItem('chatUsage', String(value));
          console.log('Data saved successfully.');
          
        } catch (error) {
          console.error('Error storing data:', error);
        }
      }

      async function getChatData(){
          //storeChatData(20)
          
        try{
          
          const value = await AsyncStorage.getItem('chatUsage')
          if(value != null ){
            console.log("Value Found", value)
            setUsageCount(Number(value))
          } else{
            console.log("No value found")
            storeChatData(20)
          
          }
        } catch(error){
          console.error("Error retrieving data", error)
        }
      }
      

      useEffect(()=> {
        if(clicked && Platform.OS != 'ios'){
          setTimeout(() => {
            textInputRef.current && textInputRef.current.focus();
            console.log('focus');
          }, 10);
        }
      }, [clicked])

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

      function clear(){
        setHelper(false)
        setError()
        setUserLeft(false)
        console.log("Cleared!")
        setMessageList([
            <Message type={'fleur'} content="Hi I'm Fleur, your AI Therapist. You can ask me a question, for advice, tell me about a difficult situation, and much more." />
        ])
       
        setConversationString("")
        transcriptRef.current = [
          {role: "system", content:"You are a world class therapist named Fleur. Your job is to provide highly personalized mental health support to your clients by understanding their issues and helping them. Whether that be anxiety, loss, depression, addition, loneliness and/or anything else mental health related. Ask many clarifying questions before providing advice.",},
          {role: "assistant", content:"Hi I'm Fleur, your AI Therapist. Please ask me a question or for advice on something you're interesting in working on."},
         ]
       }

       async function storeChatData(value){
        try {
          console.log("updating value to", value)
          await AsyncStorage.setItem('chatUsage', String(value));
          console.log('Data saved successfully.');
          
        } catch (error) {
          console.error('Error storing data:', error);
        }
      }
  
      
       
    async function classifier(latestResponse){
        abortControllerRef.current = new AbortController()
    
          //transcriptRef.current.push({role:"user", content:latestInput})
          //console.log(transcriptRef.current)
          
            setFleurResponse(false)
            var myHeaders = new Headers();
      
            myHeaders.append("Authorization", "Chat GPT-4 Token");
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
            "model": "gpt-4",
            "messages": [
              {role:'system', content:"Your job is to classify the users input as either giving advice or asking questions, conversing etc."},
              {role:'user', content:"It sounds like you're interested in getting into great physical shape. Can you tell me a bit more about why this is important to you? Are there any specific goals or events that are motivating you to get shredded?"},
              {role:"assistant", content:'Asking Questions'},
              {role:'user', content:"It sounds like you're interested in building muscle and getting into shape. That's great! Before we get started, can you tell me a bit more about why you want to get ripped? Is it for health reasons or aesthetic reasons? Are there any underlying issues that may be contributing to this desire, such as low self-esteem or body dysmorphia? Understanding your motivations and goals will help us create a plan that is tailored specifically to your needs."},
              {role:"assistant", content:'Asking Questions'},
  
              {role:"user", content:latestResponse}
    
            ],
    
            "presence_penalty": 1,
            "frequency_penalty": 1,
            "temperature": 0.2,
            "max_tokens": 300
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
            
            console.log(respJson)
            if(respJson && respJson.choices[0].message.content.includes('advice') || respJson.choices[0].message.content.includes("Advice")){
              fleurHelper(latestResponse)
            }
            return respJson
    
      
    }


   async function fleurHelper(latestResponse){
    setFleurHelperRun(true)
    abortControllerRef.current = new AbortController()

      //transcriptRef.current.push({role:"user", content:latestInput})
      //console.log(transcriptRef.current)
      
        setFleurResponse(false)
        var myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Chat GPT-4 Token");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "model": "gpt-4",
        
        "messages": [
          {role:'system', content:"The user is a therapist and you are a client. Generate a 2-5 questions about the therapists advice to get more insight into their advice."},
          {role:'user', content:"Certainly! Achieving a specific body fat percentage can be challenging, but it is definitiley possible with the right approach. Here are some tips that may help you reach your goal: 1. Focus on nutrition: Eating a healthy and balanced diet is key to reducing body fat. Aim for whole foods like fruits, vegetables, lean proteins, and healthy fats while avoiding processed foods and sugary drinks. 2.Incorporate strength training: Building muscle through strength training can help increase your metabolism and burn more calories even at rest."},
          {role:"assistant", content:'1. Create a personalized nutrition plan for me., 2.Create a personalized workout plan for me.'},
          {role:"user", content:latestResponse}

        ],

        "presence_penalty": 1,
        "frequency_penalty": 1,
        "temperature": 0.2,
        "max_tokens": 300
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
        
        console.log(respJson)
        const str = respJson.choices[0].message.content

        

        const sentences = str.split(/\d+\./).filter(Boolean);


        
        const questions = sentences.map((sentence) => {
          return { q: sentence.trim() };
        });

          console.log(questions);
          setFleurHelperRun(false)
          setHelper(!questions.includes("As an") ? questions : null)

   }

   async function fleurResponseFunc(latestInput){
    console.log("Request to Fleur sent.")
    abortControllerRef.current = new AbortController()

    transcriptRef.current.push({role:"user", content:latestInput})
    //console.log(transcriptRef.current)
    
      setFleurResponse(false)
      var myHeaders = new Headers();

      myHeaders.append("Authorization", "Chat GPT-4 Token");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "model": "gpt-4",
      
      "messages": transcriptRef.current,

      "presence_penalty": 1,
      "frequency_penalty": 1,
      "temperature": 0.2,
      "max_tokens": 500
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
      /*
      fetch("https://api.openai.com/v1/chat/completions", requestOptions)
          .then(response => response.json())
          .then(result => appStateVisible == 'active' && fleurError != true ? processFleurResponse(result, latest) : null)
          .catch(error => setFleurError(true) && console.log(error))  
        */
    
  }

  async function processFleurResponse(response){
    console.log("Processing Fleur Response")
    setError(false)
    if(response){
      console.log(response)
     
      await analytics().logEvent('fleurResponse', {id:response})
      const tokenUsage = response.usage.total_tokens
      //console.log(tokenUsage)
      
      if(tokenUsage > 3400){
        transcriptRef.current = transcriptRef.current.slice(1,3)
        
      }

      var resString = response.choices[0].message.content
      console.log(resString)
      if(resString.includes("I'm really sorry that you're feeling this way, but I'm unable to provide") && tellMeAboutThatCount<3){
        setTellMeAboutThatCount((prev)=> prev+1)

        console.log("Attempting to change the response")
        resString = "Could you tell me a bit more about that?"
        var resStringNoSpace = resString.replace(/\r?\n|\r/, "")
        setLoading(false)
        var messageObj = {role:'assistant', content: resStringNoSpace}
        var messageComponent = <Message type='fleur' content={resStringNoSpace} />
        setMessageList((prev)=>[...prev, messageComponent])
        transcriptRef.current.pop()
        
        
        

        console.log(transcriptRef.current)


      } else{
      console.log(resString)
      classifier(resString)
      

      var resStringNoSpace = resString.replace(/\r?\n|\r/, "")
      setLoading(false)
      var messageObj = {role:'assistant', content: resStringNoSpace}
      var messageComponent = <Message type='fleur' content={resStringNoSpace} />
      setMessageList((prev)=>[...prev, messageComponent])
      transcriptRef.current.push(messageObj)
      storeChatData(usageCount-1)
      getChatData()
      }
    } 
      return 
  }


  async function addMessage(type, input, nav){
    

    getChatData()
    if(!isProMember && usageCount <= 0){
      console.log("Should be navigate")
      nav.navigate('Paywall')
    } else {
    if(usageCount){
      
      review()
    }
      setHelper(false)
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
    }

    const scrollToBottom = () => {
        scrollRef.current.scrollToEnd({ animated: true });
        setIsFocused(true)
        
      };

    function scrollToTop(){
        scrollRef.current.scrollTo({x:0, y:0, animated:true})
        
    }



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
        setHelper(false)

      }

      //This function cancells the fetch request. 
      function cancelFleurRequest(reasonCode){
        setLoading(false)
        reasonCode == "timeout" && setError("Either the network timed out or there was a server error. Retry sending")
        abortControllerRef.current && abortControllerRef.current.abort()
        console.log("Request to Fleur cancelled.")
      }     

      useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          (e) => {
            setKeyboardHeight(e.endCoordinates.height)
            runFocus(e.endCoordinates.height)
            console.log(e.endCoordinates.height)
            console.log("keyboard open")
          }
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
           (e) => {
            setKeyboardHeight(0)
            console.log("keyboard closed")
            runBlur()
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);



      function Message({type, content}){
        if(type=="fleur"){
            return(
              <View style={tw`flex-row`}>
                <MotiView from={{translateY:500, opacity:0, scale:0.6}} animate={{translateY:0, opacity:1, scale:1}} transition={{type:'timing', duration:300}} id="text-Fleur" style={[tw`${Platform.OS == 'android' ? `bg-slate-600` : `bg-slate-600` } ml-2 justify-center mt-3 items-start rounded-2xl bg-opacity-60 p-2`, {maxWidth:width/1.5}]}>
                  
                  
                  
                  
                <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                
                </MotiView>
                
                </View>

                )

        } else {
            return(
                <MotiView from={{translateY:500}} animate={{translateY:0}} transition={{type:'timing', duration:200}} id="row" style={[{width:width}, tw`items-end`]}>
                <View id="text-Fleur" style={[tw`${Platform.OS == 'android' ? `bg-blue-500` : `bg-blue-600` }  mr-2 mt-1 justify-end items-start mt-3 rounded-2xl bg-opacity-60 p-2`, {maxWidth:width/1.5}]}>
                    <Text style={[tw`p-1 text-white `, {fontSize:17}]}>{content}
                </Text>
                </View>
                </MotiView>

            )
        }
        
      }

    const value = {
        isFleur, 
        setIsFleur, 
        chatMenuShow, 
        setChatMenuShow,
        fleurHelperRun, 
        setFleurHelperRun,
        textInputRef,
        abortControllerRef, 
        width,
        height,
        text,
        setText,
        loading, 
        setLoading,
        isFocused,
        setIsFocused,
        clicked, 
        setClicked,
        scrollRef, 
        transcriptRef, 
        error, 
        setError, 
        fleurResponse, 
        setFleurResponse,
        conversationString, 
        setConversationString, 
        helper, 
        setHelper,
        usageCount,
        setUsageCount,
        appStateVisible, 
        setAppStateVisible,
        appState,
        AndroidKey,
        initialSuggestions,
        runFocus,
        runBlur,
        clear, 
        classifier,
        fleurHelper,
        fleurResponseFunc,
        processFleurResponse,
        addMessage,
        scrollToBottom,
        reTry,
        cancelRun,
        cancelFleurRequest,
        userLeft, 
        setUserLeft,
        messageList,
        setMessageList,
        Message,
        setKeyboardHeight,
        keyboardHeight,
        startSelection, 
        setStartSelection,
        exercises,
        approaches,
        scrollToTop,
        getChatData,
        storeChatData,

    }

  return (
    <FleurContext.Provider value={value}>
        {children}
    </FleurContext.Provider>
  )
}
