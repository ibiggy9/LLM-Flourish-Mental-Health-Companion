import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, TouchableOpacity, Easing, TouchableWithoutFeedback, ScrollView, useWindowDimensions, Alert, Image} from 'react-native'
import { KeyboardAvoidingView } from 'react-native';
import BackButton from '../../../Components/BackButton'
import { Motion } from '@legendapp/motion';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ButtonCluster from '../../../Components/ExerciseComponents/ButtonCluster';
import TextInputExercise from '../../../Components/ExerciseComponents/TextInputExercise';
import ConfettiCannon from 'react-native-confetti-cannon';
import ExerciseAssessment from '../../../Components/ExerciseComponents/ExerciseAssessment';
import HorizontalCard from '../../../Components/ExerciseComponents/HorizontalCard';
import EntryOverview from './EntryOverview';
import {ProgressBar} from 'react-native-paper'
import TitleEntry from '../../../Components/ExerciseComponents/TitleEntry';
import { LinearGradient } from 'expo-linear-gradient';

export default function Exercise({navigation}) {
  const [situation, setSituation] = useState(false)
  const [behaviour, setBehaviour] = useState(false)
  const [thoughts, setThoughts] = useState(false)
  const [evidenceFor, setEvidenceFor] = useState(false)
  const [evidenceAgainst, setEvidenceAgainst] = useState(false)
  const [prompting, setPrompting] = useState(false)
  const [reframing, setReframing] = useState(false)
  const [title, setTitle] = useState()
  const [horStep, setHorStep] = useState(0)
  const [step, setStep] = useState(-1)
  const [anxietyDescription, setAnxietyDescription ]=useState()
  const [styleCode, setStyleCode] = useState()
  const [completeAlert, setCompleteAlert] = useState(false)
  const {width, height} = useWindowDimensions()
  


  useEffect(()=>{if(anxietyDescription){setCompleteAlert(false)}}, [anxietyDescription])

  useEffect(()=>{
    navigation.addListener('beforeRemove', (e) =>{
        const action = e.data.action;
        console.log(e.data.action)
        if(e.data.action.type == "NAVIGATE"){
            
            return 
        }
        e.preventDefault()

        Alert.alert(
            'Leave Exercise?',
            "You haven't completed today's entry. All your work will be lost?",
            [{text: "Stay", style:'cancel', onPress: () => {}}, {
                text:'Leave Anyway',
                style:'destructive',
                onPress: () => navigation.dispatch(action),

            },
        ]
        )
    })
}, [navigation])

  function selectStyleNext(styleCode){
    setStyleCode(styleCode)
    setStep(step+1)
  }

 
  function lastStep(){
    setStep(step-1)
  }
  
  function nextStep(textName){
    if(textName){
      setCompleteAlert(false)
      setStep(step+1)
    } else {
      setCompleteAlert(true)
    }
  }

  
  

  function lastStep(){
    setStep(step-1)
  }
  
 


function saveWork(){
  setStep(step+1)
}

//DATA STRUCTS
const selectImages =[
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/Filter.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/Conclusion.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/personal.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/stress.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/binary.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/must.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/disconnected.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/general.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/emo.jpg')} />,
  <Image style={[tw`rounded-2xl`, {height:250, width:width-60}]} source={require('../../../assets/mag.jpg')} />

]

const images = [
  <AntDesign name="filter" size={180} color="white" />,
  <MaterialCommunityIcons name="jump-rope" size={180} color="white" />,
  <Ionicons name="person-add" size={180} color="white" />,
  <MaterialCommunityIcons name="car-emergency" size={180} color="white" />,
  <MaterialCommunityIcons name="thought-bubble-outline" size={180} color="white" />,
  <AntDesign name="exclamationcircle" size={180} color="white" />,
  <MaterialIcons name="label" size={180} color="white" />,
  <Ionicons name="filter" size={180} color="white" />,
  <MaterialCommunityIcons  name="home-floor-negative-1" size={180} color="white" />
]

const mentalFilters = [
  {title:"Mental Filter", definition:'Focusing on a single, usually negative, part of a situation and ignoring the rest. Also seen as “tunnel vision”.', link:'ChallengingThoughts'},
  {title:"Jumping to Conclusions", definition:'Trying to predict the future or make assumptions about what others are thinking.', link:'ChallengingThoughts'},
  {title:"Personalization", definition:'Blaming yourself when things go wrong even when you are partly or not at all responsible.', link:'ChallengingThoughts' },
  {title:"Catastrophising", definition:'Blowing small things out of proportion.', link:'ChallengingThoughts'},
  {title:"Black and White Thinking", definition:'Seeing things as one extreme or another with no in between', link:'ChallengingThoughts'},
  {title:"Shoulding and Musting", definition:'Creating unrealistic expectations, demands or pressure on yourself by using phrases such as “I should…” or “I must…”', link:'ChallengingThoughts'},
  {title:"Labelling", definition:'Assigning labels or yourself or others based on behaviour in a specific situation even though there are many other situations where this label has not been true', link:'ChallengingThoughts'},
  {title:"Overgeneralization", definition:'Imposing one past or present instance on your current or future situation e.g. making statements such as “everyone always…” or “I never…”.', link:'ChallengingThoughts'},
  {title:"Emotional Reasoning", definition:'Perceiving your current situation based on the way you are feeling e.g. feeling anxious so thinking something bad is going to happen', link:'ChallengingThoughts'},
  {title:"Magnification and Minimisation", definition:'Magnifying others’ positive qualities and minimizing your own', link:'ChallengingThoughts'},
]

  const items=[
    {
        title:"Identifying Patterns", 
        image: <MaterialCommunityIcons name="car-shift-pattern" size={50} color="white" />,   
        linkName:"Begin",
        component:"ModuleOne"

    },
    {
        title:"Negative Automatic Thoughts", 
        image: <MaterialIcons name="auto-fix-off" size={45} color="white" />,
        linkName:"Unlock",
        component:"ModuleTwo"
    },
    {
        title:"Reframing", 
        image: <SimpleLineIcons name="frame" size={45} style={tw`mr-2`} color="white" />,
        linkName:'Unlock',
        component:"ModuleThree"
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
    <View style={[tw`flex-1 justify-start `,{height:height, width:width, opacity:1, position:'absolute'}]}>
      {step != 11 && <BackButton navigation={navigation} />}
      

      {step == -1 &&
      <View style={tw`flex-1`}>
        <TitleEntry title={title} setTitle={setTitle} nextStep={()=> setStep(step+1)} titleName={"Write a title for today's entry."}/>
      </View>
      }

      {step == 0 &&
      //7 Day OverView Menu
      
        <EntryOverview completeCount={0} stepper={step}  setStepper={setStep} noBack/>
      
      
      }
      
      {step == 1 &&
      //IDENTIFYING PATTERNS INTRODUCTION CARD
      <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`flex-1 justify-start items-center flex-col`}>
      <Motion.View initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}}>
      <Text style={tw`text-white text-3xl mt-5 mx-10 text-center mb--5`}>Exercise:</Text>
      <Text style={tw`text-white text-3xl mt-5 mx-10 text-center`}>Identifying Patterns</Text>
      </Motion.View>
      <Motion.View style={tw``} initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:1200}}}>
      <Text style={tw`text-white mt-5 text-lg mx-10`}>This exercise helps you identify and increase awareness of unhelpful thought patterns that arise throughout your day. </Text>
      </Motion.View>
      </View>

      
      <Motion.View style={'flex-1 justify-end items-center'} initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:1200}}}>
      <TouchableOpacity style={tw`items-center flex-row mb-15`} onPress={()=> setStep(step+1)} >
        
        <Text style={tw`items-center text-2xl font-bold text-white mt-2 mr--2`}>Begin</Text>
        <MaterialIcons name="navigate-next" size={50} color="white" />
      </TouchableOpacity>
      </Motion.View>
      </View>
      
      }
      {step == 1 &&
      //CHOOSE A SITUATION EXERCISE
      <View>
      
      
      
      <TextInputExercise 
          title={"Describe a recent anxiety-provoking situation and the behaviour you took"} 
          hasProgressBar={true}
          progress={step/15}
          emphasis={"Read Instructions"}
          emphasisTitle={"Describing a Stressful Event"}
          emphasisDescription={"Describe a recent anxiety-provoking situation and the behaviour you took. Describe the situation and your behaviour by asking yourself questions such as: Who was involved, what happened, where were you and when did it happen?"}
          emphasisExample={"I was giving a presentation to my classmates on my university campus today."}
          text={situation} 
          setText={setSituation}
          alert={completeAlert}
          setAlert={setCompleteAlert}
          navigation={navigation}          
          nextStepper={()=>setStep(step +1)}
          lastStepper={()=> setStep(step-1)}
          
          />
      

      
     
       </View>
      
      }
      
      {step == 2 &&
      // DESCRIBE YOUR THOUGHTS
        <View>
        
        

        <TextInputExercise 
            title={"Describe Your Thoughts During This Stressful Experience"} 
            hasProgressBar={true}
            progress={step/15}
            emphasis={"Read Instructions"}
            emphasisTitle={"Remember Thoughts Aren't Feelings"}
            emphasisDescription={"Describe your thoughts during this stressful experience. This could include memories, images, words, or trying to identify what was going through your mind right before you started to feel anxious. You could ask yourself anxiety-specific questions such as “what am I afraid of/is the worst thing that may happen?”.  It’s also important to remember that thoughts are not moods. Moods can often be described in one word (e.g. anxious), whereas thoughts are what was going through your mind prior to and while you were feeling anxious (e.g. everyone will laugh at me)."}
            emphasisExample={"I had the thought that I was going to mess up and everyone would laugh at me."}
            text={thoughts}  
            setText={setThoughts} 
            alert={completeAlert}
            setAlert={setCompleteAlert}
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
        
        
        
        <Motion.View initial={{opacity:0}}  animate={{opacity:1}}  transition={{default: {type:'timing', duration:1200, easing:'backInOut', delay:2000}}}>
        <KeyboardAvoidingView style={tw`flex flex-row justify-center m-auto mt-10`}  enabled>
        
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> lastStep()}>
            <Text style={tw`text-white m-auto text-lg font-bold`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-blue-900 rounded-xl p-3 px-10 mx-12`} onPress={()=> nextStep(thoughts)}>
            <Text style={tw`text-white m-auto text-lg font-bold`}>Next</Text>
        </TouchableOpacity>
        
        </KeyboardAvoidingView>
        </Motion.View>
        </View>
      
      }

      {step == 3 &&
        //Exercise Overview
        <View style={tw`flex flex-col`}>
          <EntryOverview completeCount={1} stepper={step}  setStepper={setStep}/>
      
          
        </View>
        
      }
  

      {step == 4 &&
        <View>
         <FlatList 
         
         ListHeaderComponentStyle={{
           alignContent:'flex-start',
           alignItems:'flex-start',
           justifyContent:'flex-start',
           marginRight:1,
           marginBottom:1,
           
           
         }}
         ListHeaderComponent={()=>{
           return(
             <View style={{marginBottom:30}}>
               <Motion.View initial={{y:280, opacity:0}} animate={{y:0, opacity:1}} transition={{opacity: {type:"timing", duration:1000, easing: Easing.easing}, y:{type:"timing", duration:500, easing: Easing.easing, delay:1000}}} >
               <TouchableOpacity >
             <Text style={tw` mt-3 text-2xl text-white mx-3 text-center`}>For the situation you described, select the Unhelpful Thinking Style that best applies to it.</Text>
             </TouchableOpacity>
             </Motion.View>
           </View>
           )
         }}
         contentContainerStyle={{
           alignItems:'center',
           justifyContent:'start',
           alignContent: 'flex-start',
            paddingBottom:180
           
         }}
         data={mentalFilters}  
         renderItem={(itemData)=> {
         return(
           <Motion.View initial={{opacity:0}} animate={{opacity:1}} transition={{type:'timing', duration:1000, easing:Easing.easing, delay:1500}}>
            
           <TouchableOpacity id="card" onPress={()=> selectStyleNext(itemData.index)} style={[tw`flex-col rounded-xl  mb-3 items-center justify-center border-b border-white`, {width:width-40}]}>
           <View style={tw` items-center mt-1`}>
             {selectImages[itemData.index]}
             </View>
             <View style={tw`flex-row items-center p-3 `}>
               
             <View id="innerCard" style={tw`flex flex-col px-2 pb-4 pt-2 items-start`} >
               <Text style={tw`text-white font-bold text-lg mb-1`}>{itemData.item.title}</Text>
               <View>
               <Text style={tw`pr-10 items-start text-violet-200`}>{itemData.item.definition}</Text>
               </View>
             </View>
             </View>
             </TouchableOpacity>
             </Motion.View>
 
         
             
         )
       }
         
       }/>
             </View>
           
      
      }
      {step==5 &&
  <View style={tw``}>
    <TextInputExercise 
            title={"What evidence supports your thought?"} 
            hasProgressBar={true}
            progress={step/15}
            emphasis={"Read Instructions"}
            emphasisTitle={"Evidence For Analysis"}
            emphasisDescription={"Here we are looking for the evidence and facts that support your thought. It’s important here to stick to the facts and not your interpretation of the situation. For example, a fact would be “her facial expression changed” and an interpretation would be “they are always upset with me”."}
            emphasisExample={"Giving presentations is not something I am comfortable with."}
            text={evidenceFor}  
            setText={setEvidenceFor}         
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
  
  </View>

}

{step==6 &&
  <View style={tw``}>
    
    <TextInputExercise 
            title={"Evidence against your thoughts"} 
            hasProgressBar={true}
            progress={step/15}
            emphasis={"Read Instructions"}
            emphasisTitle={"Evidence Against Analysis"}
            emphasisDescription={"Consider whether any your thoughts were false. Often times, the thoughts that give us the most stress are somewhat true and somewhat false at the same time. The purpose of this exercise is to assess this and come to a more accurate conclusion about the situation to help you respond to what needs to change or improve without blowing it out of proportion."}
            emphasisExample={"I have given presentations in the past that have went well."}
            text={evidenceAgainst}  
            setText={setEvidenceAgainst}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
  
  </View>

}

{step==7 &&
  <View style={tw``}>
    {styleCode== 0 &&
    <TextInputExercise 
            title={`Challenge Your Thought`} 
            hasProgressBar={true}
          progress={step/15}
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Consider the Whole Picture"}
            emphasisDescription={"Consider - Am I taking all the information into consideration? What is going on that I am ignoring?"}
            
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==1 &&
    <TextInputExercise 
            title={`Challenge Your Thought`} 
            hasProgressBar={true}
          progress={step/15}
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Consider the Whole Picture"}
            emphasisDescription={"Consider - Am I taking all the information into consideration? What is going on that I am ignoring?"}
            
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }


{styleCode==2 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            hasProgressBar={true}
            progress={step/15}
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"You know what they say about assuming…"}
            emphasisDescription={"How do I know this? What are some alternative explanations for this? If I was feeling different, would I still think this?"}
            
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==3 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Find all causes"}
            emphasisDescription={"Was this entirely my responsibility? What other factors might have affected the outcome?"}
            hasProgressBar={true}
             progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==4 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Put it in perspective"}
            emphasisDescription={"What are the possible outcomes - best, worst, most likely? Am I jumping ahead of myself? How important is this in the grand scheme of things?"}
            hasProgressBar={true}
            progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==5 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Find the shades of gray..."}
            emphasisDescription={"Am I being extreme or rigid? Is there an in-between where things are not perfect nor a disaster?"}
            hasProgressBar={true}
            progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==6 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Be Flexible"}
            emphasisDescription={"Is this a strict rule, or is it a desire or possibility that didn't work in this instance? Can I replace this with a could or would like to?"}
            hasProgressBar={true}
          progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==7 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Judge the situation, not a person"}
            emphasisDescription={"Does this behaviour or situation reflect how things always are? Are there examples where this label hasn't been true"}
            hasProgressBar={true}
          progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode==8 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Be Specific"}
            emphasisDescription={"Does this apply to all situation or am I overgeneralizating? What are the facts and what are my interpretations of them?"}
            hasProgressBar={true}
          progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }

{styleCode== 9 &&
    <TextInputExercise 
    title={`Challenge Your Thought`} 
            
            emphasis={`Tap For How To Challenge Your Unhelpful Thinking Style: ${mentalFilters[styleCode].title}`}
            emphasisTitle={"Acknowledge the Good"}
            emphasisDescription={"Am I downplaying or ignoring some of the evidence? What are the good things in this situation?"}
            hasProgressBar={true}
          progress={step/15}
            text={prompting}  
            setText={setPrompting}            
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />
      }
  </View>

}

{step ==8 && 
  <View>
  <EntryOverview completeCount={2} stepper={step}  setStepper={setStep}/>
  
  </View>

}






{step==9 &&
  <View style={tw``}>
    
    <TextInputExercise 
            title={"Reframing "} 
            hasProgressBar={true}
          progress={step/15}
            emphasis={"Read Instructions"}
            emphasisTitle={"Remember Thoughts Aren't Feelings"}
            emphasisDescription={"Here we are creating a more balanced or neutral thought. This does not necessarily need to be positive, it is simply an alternative thought about the anxiety-provoking situation based on the evidence determined for and against the thought."}
            emphasisExample={"I am not comfortable giving presentations but this does not mean I will fail."}
            text={reframing}  
            setText={setReframing} 
            navigation={navigation}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            />

  </View>

}

{step == 10 && 
  <View>
  <EntryOverview completeCount={3} stepper={step}  setStepper={setStep}/>
  
  </View>

}


{step == 11 &&

//CONGRATS FOR FINISHING
<View style={tw`flex-1 justify-start mt-20`}>
<ConfettiCannon count={200} autoStartDelay={600} origin={{x: 100, y: 100}} />
  <Motion.View initial={{scale: 0.0, y:50}} animate={{scale: 1, y:0}} transition={{type:'spring', stiffness:100, damping:8}} style={tw`flex flex-row justify-center items-center text-center`}>
<Text style={tw`text-white mx-auto text-3xl font-bold mt-5 p-3`}> <AntDesign name="checkcircle" style={tw`mr-5`} size={40} color="white" /> Congratulations!</Text>
</Motion.View>
<Text style={tw`text-white text-lg mx-10 mt-3`}>You have completed today's exercise. We recommend completing 7 days in a row to get the best results, but its up to you. </Text>
<View style={tw`flex-1 justify-end mb-5`}>
<View style={tw` flex-col justify-end mx-12`}>
<TouchableOpacity style={tw` border border-white rounded-xl p-3 px-10 mb-3 `} onPress={()=> navigation.navigate('Exercises')}>
  <Text style={tw`text-white m-auto text-lg font-bold`}>Finish</Text>
</TouchableOpacity>

</View>
</View>
</View>
}


      
    </View>
    </View>
  )
}
