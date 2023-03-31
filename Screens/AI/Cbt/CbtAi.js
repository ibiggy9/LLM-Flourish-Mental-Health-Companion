import { LinearGradient } from 'expo-linear-gradient'
import React , {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ActivityIndicator, ScrollView, Image, FlatList, Modal} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../../Components/BackButton'
import InstructionSlider from '../../../Components/ExerciseComponents/InstructionSlider'
import { MotiView, MotiText } from 'moti'
import * as Haptics from 'expo-haptics';
import { Motion } from '@legendapp/motion'
import TitleEntry from '../../../Components/ExerciseComponents/TitleEntry'
import TextInputExercise from '../../../Components/ExerciseComponents/TextInputExercise'
import ExerciseComplete from '../../../Components/ExerciseComponents/ExerciseComplete'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import app from '../../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import analytics from '@react-native-firebase/analytics';

export default function CbtAi({navigation}) {
  const auth = getAuth(app)
  const [pastEntries, setPastEntries] = useState([])
  const [step, setStep] = useState(0)
  const [aiSteps, setAiSteps] = useState(0)
  const [title, setTitle] = useState("")
  const [questionCount, setQuestionCount] = useState(10)
  const [sitDescription, setSitDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [aiResponse, setAiResponse] = useState(false)
  const [aiQuestions, setAiQuestions] = useState()
  const [errorMessage, setError] = useState(false)
  const [additionalAdvice, setAdditionalAdvice] = useState(false)
  const [additionalError, setAdditionalError] = useState(false)
  const [clarifyingQuestion, setClarifyingQuestion] = useState(false)
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [q3, setQ3] = useState("")
  const [q4, setQ4] = useState("")
  const [q5, setQ5] = useState("")
  const [q6, setQ6] = useState("")
  const [q7, setQ7] = useState("")
  const [q8, setQ8] = useState("")
  const [q9, setQ9] = useState("")
  const [q10, setQ10] = useState("")
  const isFocused = useIsFocused()


  //DATABASE FUNCTIONS
  //This function gets the users past entries from the database
  function getPastEntries(){
    console.log("Getting Database")
    const db = getDatabase()
    const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/cogCoach/`)
    onValue(userRef, (snapshot) => {
      snapshot.forEach((value) => {
        var temp = value
        
        setPastEntries((prev)=>[...prev, temp.val()])
      })
    });
    }
  
    useEffect(()=> {
      if(pastEntries){
      console.log(pastEntries)
      }
    },[pastEntries])


    // This function saves the entries from the database
    function saveEntry(){
      var currentDate = new Date();
  
      var month = currentDate.getMonth();
      if (month < 10) month = "0" + month;
      var dateOfMonth = currentDate.getDate();
      if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
      var year = currentDate.getFullYear();
      var formattedDate = dateOfMonth + "/" + month + "/" + year;
  
      var mili = currentDate.getTime()
      const db = getDatabase()
      const userRef = ref(db, 'users/')
      const entry={
        date: formattedDate,
        title:title,
        reflectionTopic: sitDescription,
        question1: aiQuestions["1"] ? aiQuestions["1"] : "",
        answer1:q1,
        question2: aiQuestions["2"] ? aiQuestions["2"] : "",
        answer2:q2,
        question3: aiQuestions["3"] ? aiQuestions["3"] : "",
        answer3:q3,
        question4: aiQuestions["4"] ? aiQuestions["4"] : "",
        answer4:q4,
        question5: aiQuestions["5"] ? aiQuestions["5"] : "",
        answer5:q5,
        clarifyingQuestion: clarifyingQuestion ? clarifyingQuestion : "",
        additionalAdvice: additionalAdvice ? additionalAdvice : ""
  
      }
      
    if(auth.currentUser.uid){
    set(ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/cogCoach/${currentDate}/`), {
        entry
    })
  } else {
    console.log("no user id")
  }
    }

    async function saveAnalytics(){
      await analytics().logEvent("CogCoachComplete", {id:true})
    }

    useEffect(()=> {
      if(aiSteps==100){
          saveEntry()
          saveAnalytics()
      }
      if(step==1){
          getPastEntries()
      }
      console.log(title.length)
  }, [step, aiSteps])

  //DATABASE FUNCTIONS END
  

  const {width, height} = useWindowDimensions()
  useEffect(()=> {
    if(errorMessage){
        //setStep(3)
    }

  }, [errorMessage])

  

  useEffect(()=> {console.log(aiQuestions)},[aiQuestions])

  useEffect(()=> {
    if(aiSteps==6){
        additionalAdviceFleur()
    } 
    if(aiSteps==8){
        clarifyingQuestionFleur()
    }
    
  }, [aiSteps])
  

  const instructionStart = [
    {
      instructionTitle:"How it works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/cogCoach/cc1.jpg')}/>,
      instructionShort:"You provide a description of a challenging situation and Fleur, your AI therapist will design a Cognitive Behavioral Therapy exercise tailored to you."
    },
    {
      instructionTitle:"Why It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/cogCoach/cc2.jpg')}/>,
      instructionShort:"CBT works by helping individuals identify and change negative patterns of thinking and behavior, leading to improved mental health and well-being."
    },
    {
      instructionTitle:"Benefits of Doing This Exercise",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/cogCoach/cc3.jpg')}/>,
      instructionShort:"The benefits of CBT include improved coping skills, reduced symptoms of anxiety and depression, enhanced self-awareness, and greater overall well-being."
    },
  ]




  function runFleur(){
    console.log(sitDescription)
  
    
    setAiResponse(false)
    console.log("This is running.")
    setSubmitted(true)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "model": "text-davinci-003",
    "prompt": `You are a world-class therapist and your client is coming to you for a CBT session. The client has given a description of a recent situation in which they struggled. Your task is to construct a series of 5 questions that can help guide the client through a CBT process for this situation with the goal of reframing the experience. Your answer should only include a JSON object with a question number paired with the question itself. Example JSON object {"1": "What does love mean to you?"}. Your answer should not include any plain text. Client's journal topic: ${sitDescription + "."}`,
    "temperature": 0.2,
    "presence_penalty": 1,
    "frequency_penalty": 1.2,
    "max_tokens": 3000
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => response.json())
        .then(result => {
          setAiQuestions(JSON.parse(result.choices[0].text))
          setAiSteps(aiSteps+1)
        })
        .catch(error => handleError());
}

function clarifyingQuestionFleur(){
    setSubmitted(true)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "model": "text-davinci-003",
    "prompt": `You are a world-class therapist named Fleur and are in a CBT session with your client. 
    Client situation you're discussing:
    ${sitDescription}
    
    Your advice:
    ${additionalAdvice}

    Your client's question:
    ${clarifyingQuestion}

    Your client has asked a question about the advice you gave them. Answer this question by producing a response to the client.  Respond directly to the client's question, but use your advice to the client and the client's situation as context for your answer. If the client does not provide a question, then just say "Sorry, that was not a question". Conclude the session at the end of your response. Respond as though you are speaking to the client. Note that the answer should not be in dialogue form.
    `,
    "temperature": 0.2,
    "max_tokens": 3000
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => response.json())
        .then(result => setClarifyingQuestion(result))
        .catch(error => console.log(error));
}




function additionalAdviceFleur(){
    
    setAiResponse(false)
    console.log("This is running.")
    setSubmitted(true)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "model": "text-davinci-003",
    "prompt": `You are a world class therapist in session with your client. Your client came to your with the following situation:${sitDescription}. 
    You then had a conversation with the client that went as follows:
    Therapist:${aiResponse["1"]}
    Client:${q1}
    Therapist:${aiResponse["2"]}
    Client:${q2}
    Therapist:${aiResponse["3"]}
    Client:${q3}
    Therapist:${aiResponse["4"]}
    Client:${q4}
    Therapist:${aiResponse["5"]}
    Client:${q5}
    
    Your task is to provide therapeutic advice as though you are speaking to the client, about the clients situation, given the responses to your previous questions. Your response must not exceed 400 words. You must never write your response as a dialogue.  
    `,
    
    "temperature": 0.2,
    "max_tokens": 3000
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => response.json())
        .then(result => setAdditionalAdvice(result))
        .catch(error => setAdditionalError(error));
}


function handleError(){
    setAiResponse(false)
    setStep(3)
    setAiSteps(0)
    setError("Sorry there was an error, please press next again.")
}


  //This function goes to the next step and submits the prompt to Fleur:
  function nextFleur(){
    if(sitDescription.length-1 != "." || sitDescription.length-1 != "?" || sitDescription.length-1 != "."){
      setSitDescription(sitDescription + ".")
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setStep(step+1)
    runFleur()
  }

  function next(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setStep(step+1)
  }

  function nextAi(){
    setAiSteps(aiSteps + 1)
    setStep(step + 1)  
  }
  
  function lastStep(){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setStep(step-1)
  }

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
    <View style={[tw`flex-1 justify-start  pb-40`,{height:height, width:width, opacity:1, position:'absolute'}]}>
         
    {step == 0 ?
    <View style={[tw``,{height:height, width:width}]}>
    <ScrollView key="adf" contentContainerStyle={[tw`pb-10`]}>
    
    <BackButton navigation={navigation} />
    <MotiView key="a" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw``}>
      
    <InstructionSlider instructions={instructionStart} />
      
    </MotiView>
    <TouchableOpacity style={tw`mx-15 rounded-2xl items-center `} onPress={()=> next()}>
    <MotiText key="b" from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}}  style={tw`items-center justify-center text-white m-4 text-left text-2xl`}>Begin</MotiText>
    </TouchableOpacity>
    </ScrollView>
    </View>
    :
    null
    }



    {step == 1 &&
    <View style={tw`flex-1 justify-start`}>
      <BackButton navigation={navigation} />
    <View style={tw`items-center`}>
      
      <Motion.View  style={[tw`flex-row mt-3`]} initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:500, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}>
      
      <Text style={tw`text-white mx-auto text-3xl font-bold `}>Past Entries</Text>
      </Motion.View>
      
      <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:500, delay:1500}} style={[tw` mt-3 `, {height:height/1.5}]}>
            {pastEntries.length !=0 ?
            <FlatList
            showsVerticalScrollIndicator={false}
            data={pastEntries}
            contentContainerStyle={tw``}
            renderItem={(itemData) => {
                return(
                    <View style={{width:width/1.2}}>
                        <TouchableOpacity style={[tw`border border-white rounded-xl px-8 py-5 mt-2`, ]} 
                        onPress={()=>
                        navigation.navigate('CogCoachReflection', {
                            title: itemData.item.entry.title, 
                            date: itemData.item.entry.date,
                            situation: itemData.item.entry.reflectionTopic,
                            q1: itemData.item.entry.question1,
                            a1: itemData.item.entry.answer1,
                            q2: itemData.item.entry.question2,
                            a2: itemData.item.entry.answer2,
                            q3: itemData.item.entry.question3,
                            a3: itemData.item.entry.answer3,
                            q4: itemData.item.entry.question4,
                            a4: itemData.item.entry.answer4,
                            q5: itemData.item.entry.question5,
                            a5: itemData.item.entry.answer5,
                            advice: itemData.item.entry.additionalAdvice.choices[0].text
                            

                        })
                        }
                        >
                           <Text style={tw`text-white  mr-3`}>{itemData.item.entry.date}</Text>
                            <Text style={tw`text-white text-xl my-3  text-center`}>{itemData.item.entry.title}</Text>
                            <View style={tw`flex-row`}>
                           
                            <Text style={tw`text-white font-light`}>{itemData.item.entry.reflectionTopic.substring(0,70)}...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            :
            <Text style={tw`text-white text-2xl font-light px-2`}>No reflections yet! Press start new to get started!</Text>
            }
           
      
        </Motion.View>
       
        
        
        
    

    </View>
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:500, delay:1500}} style={[tw` `]}>
    <TouchableOpacity style={tw` rounded-xl p-1 px-10 mx-12`} onPress={()=> next()}>
           <Text style={tw`text-white m-auto text-2xl font-bold`}>Start New</Text>
       </TouchableOpacity>
       </Motion.View>
    </View>
    
    }



    {step == 2 &&
    <View style={tw`mt-10`}>
      <BackButton navigation={navigation} />
      <TitleEntry title={title} setTitle={setTitle} nextStep={()=> setStep(step+1)} titleName={"Write a title for this session"}/>
    </View>
    }
    

    {step == 3 &&
    <View style={[tw`mt-10`, {height:height, width:width}]}>
      
      {errorMessage ?
        <View style={tw` mt-5 flex-row bg-opacity-60 bg-red-600 rounded-2xl py-5 mx-6 px-3 items-center`}>
            <Entypo style={tw`px-2`} name="warning" size={24} color="white" />
            <Text style={tw` mt-1 text-white text-center`}>{errorMessage}</Text>
        </View>
        :
        <BackButton navigation={navigation} />

        }


      <TextInputExercise
      title={"Tell Fleur about a recent stressful, anxiety provoking or otherwise difficult situation."}
      emphasis={"See an example"}
      emphasisTitle={"Instructions"}
      emphasisDescription={"It's important to enter as much detail as you can as this will help Fleur design the best possible exercise for you."}
      emphasisExample={"I recently had a panic attack when giving a presentation at work. I have never had one before and it was very upsetting. I'm not sure what caused it but I'm concerned it will continue."}
      navigation={navigation}
      text={sitDescription}
      setText={setSitDescription}
      nextStepper={nextFleur}
      lastStepper={lastStep}
      questionCount={questionCount}
      setQuestionCount={setQuestionCount}
      />
      
    </View>
    }

   

     

    {step == 4 && 
      <MotiView from={{scale:0.7}} animate={{scale:1}} transition={{duration:400, easing:Easing.easing, type:'timing'}} >
        
        {!aiResponse && aiSteps == 0 &&
        <View style={[tw` justify-center items-center`, {width:width, height:height}]}>
        
      <View style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 `}>
      <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Exercise Loading: Please Don't Leave The App Or Exercise</Text>
        <ActivityIndicator size={"large"} color={"white"}/>
      <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running.</Text>
      </View>
      </View>
    }
    </MotiView>
    }

    {aiSteps == 1 && 
      <View style={tw`mt-15`}>
      
      <TextInputExercise 
        backButton
        title={aiQuestions ? aiQuestions["1"] : "Nothing"}
        text={q1}
        setText={setQ1}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        
        noBack
      />
      </View>
    }

    {aiSteps == 2 &&
      <View style={tw`mt-15`}>
      
      <TextInputExercise 
      backButton
        title={aiQuestions ? aiQuestions["2"] : "Nothing"}
        text={q2}
        setText={setQ2}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

    {aiSteps == 3 &&
      <View style={tw`mt-15`}>
      
      <TextInputExercise 
      backButton
        title={aiQuestions ? aiQuestions["3"] : "Nothing"}
        text={q3}
        setText={setQ3}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

    {aiSteps == 4 &&
      <View style={tw`mt-15`}>
      
      <TextInputExercise 
      backButton
        title={aiQuestions ? aiQuestions["4"] : "Nothing"}
        text={q4}
        setText={setQ4}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }
    {aiSteps == 5 &&
      <View style={tw`mt-15`}>
      
      <TextInputExercise 
      backButton
        title={aiQuestions ? aiQuestions["5"] : "Nothing"}
        text={q5}
        setText={setQ5}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }



{aiSteps == 6 &&
<>
{!additionalAdvice ?
<View style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
<Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Loading Advice: Please Don't Leave The App Or Exercise</Text>
  <ActivityIndicator size={"large"} color={"white"}/>
<Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running.</Text>
</View>  
:
<View style={[tw`mt-20`, {width:width, height:height}]}>
<ScrollView contentContainerStyle={tw`pb-40`}>
<Text style={tw`text-2xl text-center text-white`}>Fleur's Response:</Text>
    <Text style={tw`text-white text-lg mx-5`}>{additionalAdvice.choices[0] && additionalAdvice.choices[0].text}</Text>
    <View style={tw`flex-row justify-center`}>
       
    <TouchableOpacity onPress={()=> setAiSteps(100)} style={tw`mt-5 px-20 border border-white rounded-2xl py-5`}>
        <Text style={tw`text-white text-center text-xl`}>Done</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
</View>
}


</>

}

{aiSteps == 7 &&
<View>
<View style={tw`mt-30`}>
      <TextInputExercise 
        title={"Ask a question about Fleurs advice"}
        emphasis={"Review the advice Fleur gave you"}
        emphasisTitle={"Fleurs Advice"}
        emphasisDescription={additionalAdvice.choices[0].text}
        text={q6}
        setText={setQ6}
        nextStepper={()=> setAiSteps(aiSteps+1)}
        noBack
        navigation={navigation}
      />
      </View>
    
</View>

}

{aiSteps == 8 &&
<View>
    {!clarifyingQuestion ? 
    <View style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
    <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Loading: Please Don't Leave The App Or Exercise</Text>
      <ActivityIndicator size={"large"} color={"white"}/>
    <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running.</Text>
    </View>  
     :
     <View style={[tw`mt-20`, {width:width, height:height}]}>
     <ScrollView contentContainerStyle={tw`pb-40`}>
     <Text style={tw`text-2xl text-center text-white`}>Fleur's Response:</Text>
         <Text style={tw`text-white text-lg mx-5`}>{clarifyingQuestion.choices[0] && clarifyingQuestion.choices[0].text}</Text>
         <View style={tw`flex-row justify-center`}>
         <TouchableOpacity onPress={()=> setAiSteps(100)} style={tw`mt-5 rounded-2xl  py-5 mx-15`}>
             <Text style={tw`text-white text-center text-xl`}>Done</Text>
         </TouchableOpacity>
         </View>
         </ScrollView>
     </View>
    }
    

 </View>   
}




    {aiSteps == 100 &&
    <View style={[tw`mt-10`,{height:height}]}>
    
        
      <ExerciseComplete navigation={navigation} link={'goBack'} message={"You have completed your reflection and your prompts & answers have been saved."} />
      
    </View>
    }

    </View>
    </View>
    
  )
}