import { LinearGradient } from 'expo-linear-gradient'
import React , {useState, useEffect} from 'react'
import {View, Text, Easing, TouchableOpacity, Alert, TouchableWithoutFeedback, Animated, useWindowDimensions, ActivityIndicator, ScrollView, Image, FlatList} from 'react-native'
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
import app from '../../../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, onValue, forEach, push } from "firebase/database";
import analytics from '@react-native-firebase/analytics';

export default function GoalPlanner({navigation}) {
  const auth = getAuth(app)
  const [pastEntries, setPastEntries] = useState([])
  const [step, setStep] = useState(0)
  const [aiSteps, setAiSteps] = useState(0)
  const [title, setTitle] = useState("")
  const [questionCount, setQuestionCount] = useState(5)
  const [planQuestions, setPlanQuestions] = useState(false)
  const [planStep, setPlanStep] = useState(0)
  const [planResponse, setPlanResponse ] = useState(false)
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
  const [q11, setQ11] = useState("")
  const [q12, setQ12] = useState("")
  const [q13, setQ13] = useState("")


  //DATABASE FUNCTIONS
  //This function gets the users past entries from the database
  function getPastEntries(){
    
    console.log("Getting Database")
    const db = getDatabase()
    const userRef = ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/goalPlanner/`)
  
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
        goal: sitDescription,
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
        plan: planResponse,
       
       

  
      }
      
    if(auth.currentUser.uid){
    set(ref(db, `users/${auth.currentUser.uid}/userdata/aiTools/goalPlanner/${currentDate}/`), {
        entry
    })
  } else {
    console.log("no user id")
  }
    }

    async function saveAnalytics(){
      await analytics().logEvent("GoalComplete", {id:true})
    }

    useEffect(()=> {
      if(aiSteps==100){
          saveAnalytics()
          saveEntry()
      }
      if(step==1){
          getPastEntries()
      }
      console.log(title.length)
  }, [step, aiSteps])
  

  //DATABASE FUNCTIONS END

  useEffect(()=> {console.log(planStep)},[planStep])

  const {width, height} = useWindowDimensions()
  useEffect(()=> {
    if(errorMessage){
        setStep(3)
    }

  }, [errorMessage])


  

  const instructionStart = [
    {
      instructionTitle:"How It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/goals/goals2.jpg')}/>,
      instructionShort:"It's simple. You provide a goal and Fleur will help you make it more robust, then she will provide you with a recommended plan of action."
    },
    {
      instructionTitle:"Why It Works",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/goals/goals3.jpg')}/>,
      instructionShort:"Goal setting provides direction, motivation, and a clear plan of action, helping individuals prioritize tasks, manage their time more effectively, and achieve a greater sense of control and accomplishment."
      
    },
    {
      instructionTitle:"Benefits of Doing This Exercise",
      image:<Image  style={[tw` rounded-xl `, {height:height/3, width:width/1.3}]} source={require('../../../assets/goals/goals4.jpg')}/>,
      instructionShort:"Effective goal setting can increase motivation, focus, performance, time management, self-confidence, sense of control, and overall well-being."
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
    "prompt": `you are a world-class therapist and your client seeking help with goal setting. 
    The client has given a description of a general goal they have. 
    Your task is to write 5 prompting questions to help the client define the goal well enough to design an implementation plan.
    Your response should be a JSON object with the question number paired with the prompting question. Example JSON object: {"1": "question goes here"}. 
    Your response should have no plain text. Client's goal: ${sitDescription}`,
    "temperature": 0.2,
    "max_tokens": 3000,
    "presence_penalty": 1,
    "frequency_penalty": 1.2,
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
        .catch(error => setError(error));
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

  useEffect(()=>{
    
        if(planResponse){
            console.log(planResponse)
            setPlanStep(1)
            
            
           
          }
    

  }, [planResponse])

  function fleurPlan(){
    console.log(sitDescription)
    setAiResponse(false)
    console.log("This is running.")
    setSubmitted(true)
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "model": "text-davinci-003",
    "prompt": `You are a world-class therapist. In a previous session, you helped your client prepare their goal to be developed into an implmentation plan by asking 5 clarifying questions. 
    Using the original goal and the clarifying questions and answers as context, your task is to provide the client with an implementation plan with specific advice on how to best achieve their goal. 
    The Client's goal: Original Goal:${sitDescription},
    Question 1: ${aiQuestions["1"]}
    Client's Answer to Question 1: ${q1}
    Question 2: ${aiQuestions["2"]}
    Client's Answer to Question 2: ${q2}
    Question 3: ${aiQuestions["3"]}
    Client's Answer to Question 3: ${q3}
    Question 4: ${aiQuestions["4"]}
    Client's Answer to Question 4: ${q4}
    Question 5: ${aiQuestions["5"]}
    Client's Answer to Question 5: ${q5}
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
        .then(result => setPlanResponse(result))
        .catch(error => setError(error));
}
  

  function startPlan(){
    setAiSteps(1000)
    
    fleurPlan()
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
    <View style={[tw`flex-1 justify-start pb-40`,{height:height, width:width, opacity:1, position:'absolute'}]}>
         
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
            {pastEntries.length != 0 ? 
            <FlatList
            showsVerticalScrollIndicator={false}
            data={pastEntries}
            contentContainerStyle={tw``}
            renderItem={(itemData) => {
                return(
                    <View style={{width:width/1.2}}>
                        <TouchableOpacity style={[tw`border border-white rounded-xl px-8 py-5 mt-2`, ]} 
                        onPress={()=>
                        navigation.navigate('GoalPlannerReflection', {
                            title: itemData.item.entry.title, 
                            date: itemData.item.entry.date,
                            goal: itemData.item.entry.goal,
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
                            plan: itemData.item.entry.plan.choices[0].text
                        })
                        }
                        >
                          <Text style={tw`text-white mr-3`}>{itemData.item.entry.date}</Text>
                            <Text style={tw`text-white text-xl my-3 text-center`}>{itemData.item.entry.title}</Text>
                            <View style={tw`flex-row`}>
                            
                            <Text style={tw`text-white font-light`}>{itemData.item.entry.goal.substring(0,70)}...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            :
            <Text style={tw`text-white text-2xl font-light px-2`}>No goals yet! Press start new to get started!</Text>
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
    <View style={tw`mt-30`}>
      <TitleEntry title={title} setTitle={setTitle} nextStep={()=> setStep(step+1)} titleName={"Type a title for this goal planning session"}/>
    </View>
    }
    

    {step == 3 &&
    <View style={[tw`mt-30`, {height:height, width:width}]}>
      <TextInputExercise
      title={"Tell Fleur about a general goal you have."}
      emphasis={"See an example"}
      emphasisTitle={"Instructions"}
      emphasisDescription={"These goals don't need to be to specific. General goals work great for this exercise. You just need to have a goal in mind."}
      emphasisExample={"I'd like to exercise more, I'd like to learn how to play guitar etc."}
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
        title={aiQuestions ? aiQuestions["1"] : "Nothing"}
        text={q1}
        setText={setQ1}
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(100) :setAiSteps(aiSteps+1)}
        
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
        nextStepper={()=> questionCount == aiSteps ? setAiSteps(aiSteps+1) :setAiSteps(aiSteps+1)}
        lastStepper={()=> setAiSteps(aiSteps-1)}
        
      />
      </View>
    
    
    }
    {aiSteps == 6 &&
    <View style={[tw`mt-20`, {height:height, width:width}]}>
      <Text style={tw`text-center text-white text-2xl`}>Your Goal Details:</Text>
      <View style={[tw`border border-white py-5 mt-5 mx-5 rounded-2xl`, {height:height/1.6}]}>
      <ScrollView contentContainerStyle={[tw`pb-20`, ]}>
      <Text style={tw`text-white font-bold text-lg mx-5`}>Your Goal:</Text>
      <Text style={tw`text-white text-lg mx-5`}>{sitDescription}</Text>
      
      <Text style={tw`text-white font-bold text-lg mt-3 mx-5`}>{aiQuestions["1"]}</Text>
      <Text style={tw`text-white text-lg mx-5`}>{q1}</Text>
      
      <Text style={tw`text-white font-bold text-lg mt-3 mx-5`}>{aiQuestions["2"]}</Text>
      <Text style={tw`text-white text-lg mx-5`}>{q2}</Text>

      <Text style={tw`text-white font-bold text-lg mt-3 mx-5`}>{aiQuestions["3"]}</Text>
      <Text style={tw`text-white text-lg mx-5`}>{q3}</Text>

      <Text style={tw`text-white font-bold text-lg mt-3 mx-5`}>{aiQuestions["4"]}</Text>
      <Text style={tw`text-white text-lg mx-5`}>{q4}</Text>

      <Text style={tw`text-white font-bold text-lg mt-3 mx-5`}>{aiQuestions["5"]}</Text>
      <Text style={tw`text-white text-lg mx-5`}>{q5}</Text>
      </ScrollView>
      </View>
      <View style={tw` flex-row justify-between mx-5 items-center mt-5`}>
      <TouchableOpacity style={tw`border border-white rounded-2xl px-10 py-5`} onPress={()=> setAiSteps(1)}>
        <Text style={tw`text-white text-xl`}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`border border-white rounded-2xl px-10 py-5`} onPress={()=> startPlan()}>
        <Text style={tw`text-white text-xl`}>Looks Good</Text>
      </TouchableOpacity>
      </View>
    </View>
    }

    {aiSteps == 1000 && planStep == 0 &&
    <MotiView from={{scale:0.7}} animate={{scale:1}} transition={{duration:400, easing:Easing.easing, type:'timing'}} >
    {!planResponse && 
        <View style={tw` rounded-2xl mx-10 p-3 bg-slate-700 bg-opacity-40 mt-50 `}>
        <Text style={tw`text-white text-center text-xl mx-10 mb-3`}>Loading Your Implementation Plan: Please Don't Leave The App Or Exercise</Text>
            <ActivityIndicator size={"large"} color={"white"}/>
        <Text style={tw`text-white text-center font-light text-sm mt-3 mx-5`}>Please be patient. Fleur usually takes 20-30 seconds to respond. Don't leave the app while this is running.</Text>
        </View>
        }
        </MotiView>
    
    } 



    {aiSteps == 1000 && planStep == 1 &&
    <View style={[tw`mt-10`, {width:width, height:height}]}>
        <ScrollView contentContainerStyle={tw`pb-40`}>
        <Text style={tw`text-white mx-5 text-lg`}>{planResponse ? planResponse.choices[0].text : null}</Text>
        <TouchableOpacity onPress={()=> setAiSteps(100)}>
            <Text style={tw`text-center text-xl text-white border border-white mx-30 rounded-2xl py-5 px-10 mt-5`}>Finish</Text>
        </TouchableOpacity>
        </ScrollView>
        
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