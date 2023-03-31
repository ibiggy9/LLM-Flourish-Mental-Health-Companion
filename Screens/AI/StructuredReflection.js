import { LinearGradient } from 'expo-linear-gradient'
import React , {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ActivityIndicator, ScrollView, Image, FlatList} from 'react-native'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import InstructionSlider from '../../Components/ExerciseComponents/InstructionSlider'
import { MotiView, MotiText } from 'moti'
import * as Haptics from 'expo-haptics';
import { Motion } from '@legendapp/motion'
import TitleEntry from '../../Components/ExerciseComponents/TitleEntry'
import TextInputExercise from '../../Components/ExerciseComponents/TextInputExercise'
import ExerciseComplete from '../../Components/ExerciseComponents/ExerciseComplete'
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import app from '../../firebaseConfig'
import analytics from '@react-native-firebase/analytics';

export default function StructuredReflection({navigation}) {
  const [step, setStep] = useState(0)
  const auth = getAuth(app)
  const [aiSteps, setAiSteps] = useState(0)
  const [title, setTitle] = useState("")
  const [questionCount, setQuestionCount] = useState(5)
  const [sitDescription, setSitDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [aiResponse, setAiResponse] = useState(false)
  const [aiQuestions, setAiQuestions] = useState()
  const [errorMessage, setError] = useState(false)
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
  const {width, height} = useWindowDimensions()
  const [pastEntries, setPastEntries] = useState([])


  
  async function saveAnalytics(){
    await analytics().logEvent("ReflectAIComplete", {id:true})
  }

  useEffect(()=>{
    if(aiSteps == 100){
      saveAnalytics()
      saveEntry()
    }
    if(step == 1){ 
      getPastEntries()
    }

  }, [aiSteps, step])

  useEffect(()=> {
    if(errorMessage){
      //setStep(3)
    }

  }, [errorMessage])

 

  useEffect(()=> {console.log("This is questions" + aiQuestions)},[aiQuestions])

  function handleError(){
    setAiResponse(false)
    setStep(3)
    setAiSteps(0)
    setError("Sorry there was an error, please press next again.")
}
  
  

  const instructionStart = [
    {
      instructionTitle:"What It Does",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/structuredRef/struct1.jpg')}/>,
      instructionShort:"Reflect AI helps give structure to your thoughts and reflections. Sometimes the issues in our lives can be complicated. Reflect AI prompts you with questions custom to your situation to help you have a productive writing session",
    },
    {
      instructionTitle:"How It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/structuredRef/struct2.jpg')}/>,
      instructionShort:"It's simple - you describe a situation that's on your mind and Fleur will produce a series of questions to help you think through that specific situation."
    },
    {
      instructionTitle:"Benefits of Doing This Exercise",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../assets/structuredRef/struct3.jpg')}/>,
      instructionShort:"Research has shown that productive reflections can increase your self awareness, reduce stress, enhance creativity, improve emotional intelligence and much more. "
    },
  ]

  function runFleur(){
    setSitDescription(sitDescription + ".")
    console.log(sitDescription)
    setAiResponse(false)
    console.log("This is running.")
    setSubmitted(true)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "model": "text-davinci-003",
    "prompt": `you are a world-class therapist and your client is about to do a journalling exercise. The client has given you the topic they would like to write about. Your task is to construct a series of ${questionCount} questions that can help the client reflect about their topic. Your answer should only include a JSON object with a question number paired with the question itself. Example JSON object {"1": "What does love mean to you?"}. Your answer should not include any plain text. Client's journal topic: ${sitDescription + "."}`,
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
        .then(result => {
          setAiQuestions(JSON.parse(result.choices[0].text))
          setAiSteps(aiSteps+1)
        })
        .catch(error => handleError(error));
}

//This function gets the users past entries from the database
  function getPastEntries(){
    
  console.log("Getting Database")
  const db = getDatabase()
  const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/journals/reflectai/`)

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
      question6: aiQuestions["6"] ? aiQuestions["6"] : "",
      answer6:q6,
      question7: aiQuestions["7"] ? aiQuestions["7"] : "",
      answer7:q7,
      question8: aiQuestions["8"] ? aiQuestions["8"] : "",
      answer8:q8,
      question9: aiQuestions["9"] ? aiQuestions["9"] : "",
      answer9:q9,
      question10: aiQuestions["10"] ? aiQuestions["10"] : "",
      answer10:q10,

    }
    
  if(auth.currentUser.uid){
  set(ref(db, `users/${auth.currentUser.uid}/userdata/journals/reflectai/${currentDate}/`), {
      entry
  })
} else {
  console.log("no user id")
}
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
      {pastEntries.length != 0 ?
      <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:500, delay:1500}} style={[tw` mt-3 `, {height:height/1.5}]}>
            
            <FlatList
            showsVerticalScrollIndicator={false}
            data={pastEntries}
            contentContainerStyle={tw``}
            renderItem={(itemData) => {
                return(
                    <View style={[tw``, {width:width/1.2}]}>
                        <TouchableOpacity  style={[tw`border border-white rounded-xl px-8 py-5 mt-2`, ]} 
                        onPress={()=> navigation.navigate('ReflectAIPast',{
                          title: itemData.item.entry.title,
                          date: itemData.item.entry.date, 
                          reflectionTopic: itemData.item.entry.reflectionTopic,
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
                          q6: itemData.item.entry.question6,
                          a6: itemData.item.entry.answer6,
                          q7: itemData.item.entry.question7,
                          a7: itemData.item.entry.answer7,
                          q8: itemData.item.entry.question8,
                          a8: itemData.item.entry.answer8,
                          q9: itemData.item.entry.question9,
                          a9: itemData.item.entry.answer9,
                          q10: itemData.item.entry.question10,
                          a10: itemData.item.entry.answer10,
                      
                        })}
                        
                        >
                            <Text style={tw`text-white`}>{itemData.item.entry.date}</Text>
                            <Text style={tw`text-white text-center text-xl`}>{itemData.item.entry.title}</Text>
                            <View style={tw`flex-row`}>
                            <Text style={tw`text-white mr-3`}>{itemData.item.entry.reflectionTopic.substring(0,70)}...</Text>
                            
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
           
      
        </Motion.View>
        :
        <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:500, delay:1500}} style={[tw` mt-3 `, {height:height/1.5}]}>
          <Text style={tw`text-white text-2xl font-light px-2`}>No reflections yet! Press start new to get started!</Text>
          </Motion.View>
        }
       
        
        
        
    

    </View>
    <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:500, delay:1500}} style={[tw` `]}>
    <TouchableOpacity style={tw` rounded-xl p-1 px-10 mx-12`} onPress={()=> next()}>
           <Text style={tw`text-white m-auto text-2xl font-bold`}>Start New</Text>
       </TouchableOpacity>
       </Motion.View>
    </View>
    
    }



    {step == 2 &&
    <View style={tw`mt-30`}>
      <TitleEntry title={title} setTitle={setTitle} nextStep={()=> setStep(step+1)} titleName={"Write a title for this reflection"}/>
    </View>
    }
    

    {step == 3 &&
    <View style={[tw`mt-30`, {height:height, width:width}]}>
      <TextInputExercise
      title={"Tell Fleur about the topic, decision or situation you'd like to reflect on."}
      emphasis={"See an example"}
      emphasisTitle={"Instructions"}
      emphasisDescription={"It's important to enter as much detail as you can as this will help Fleur design the best possible exercise for you."}
      emphasisExample={"I am trying to figure out how to deal and improve my social anxiety. Specifically at work when I'm asked to present or lead meetings."}
      navigation={navigation}
      text={sitDescription}
      setText={setSitDescription}
      nextStepper={next}
      lastStepper={lastStep}
      questionCount={questionCount}
      setQuestionCount={setQuestionCount}
      />
      

    </View>
    }

    {step == 4 && 
     <MotiView from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{type:'timing', duration:1000, easing:Easing.easing}} style={tw`flex-1 justify-center items-center mt-30`}>
     <Text style={tw`text-white text-2xl mx-10 text-center mb-30`}> Select the number of questions you want generated.</Text>
     <View style={tw`flex-row justify-between items-center`}>
     {questionCount >=3 ?
     <TouchableOpacity onPress={()=> setQuestionCount(questionCount-1)}>
     <MaterialIcons name="navigate-before" size={60} color="white" />
     </TouchableOpacity>
     :
     <MaterialIcons name="navigate-before" size={60} color="white" />

     }

     {questionCount <=9 ? 
     <>
     <Text style={tw`text-white text-3xl font-bold text-center items-center mx-20`}>{questionCount}</Text>
     <TouchableOpacity onPress={()=> setQuestionCount(questionCount+1)}>
     <MaterialIcons name="navigate-next" size={60} color="white" />
     </TouchableOpacity>
     </>
     :
     <>
     <Text style={tw`text-white text-3xl font-bold text-center items-center mx-20`}>{questionCount}</Text>
     <MaterialIcons name="navigate-next" size={60} color="white" />
     </>
      }


     
     </View>
     <View style={[tw`justify-center`,{height:height/3}]}>
      <TouchableOpacity style={tw`border border-white px-10 py-5 rounded-2xl`} onPress={()=> nextFleur()}>
      <Text style={tw`text-white text-xl`}>Submit</Text>
      </TouchableOpacity>
     </View>
 </MotiView>
    
    
    }

    {step == 5 && 
      <MotiView from={{scale:0.7}} animate={{scale:1}} transition={{duration:400, easing:Easing.easing, type:'timing'}} >
        {!aiResponse && aiSteps == 0 &&
      <View style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
      <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Exercise Loading: Please Don't Leave The App Or Exercise</Text>
        <ActivityIndicator size={"large"} color={"white"}/>
      <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running.</Text>
      </View>
     

      

    }
    </MotiView>
    }

    {aiSteps == 1 && 
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions && aiQuestions["1"]}
        text={q1}
        setText={setQ1}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100):setAiSteps(aiSteps+1)}
        
        noBack
      />
      </View>
    }

    {aiSteps == 2 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["2"] : "Nothing"}
        text={q2}
        setText={setQ2}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

    {aiSteps == 3 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["3"] : "Nothing"}
        text={q3}
        setText={setQ3}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

    {aiSteps == 4 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["4"] : "Nothing"}
        text={q4}
        setText={setQ4}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }
    {aiSteps == 5 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["5"] : "Nothing"}
        text={q5}
        setText={setQ5}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

{aiSteps == 6 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["6"] : "Nothing"}
        text={q6}
        setText={setQ6}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

{aiSteps == 7 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["7"] : "Nothing"}
        text={q7}
        setText={setQ7}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

{aiSteps == 8 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["8"] : "Nothing"}
        text={q8}
        setText={setQ8}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

{aiSteps == 9 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["9"] : "Nothing"}
        text={q9}
        setText={setQ9}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }

{aiSteps == 10 &&
      <View style={tw`mt-30`}>
      <TextInputExercise 
        title={aiQuestions ? aiQuestions["10"] : "Nothing"}
        text={q10}
        setText={setQ10}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
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