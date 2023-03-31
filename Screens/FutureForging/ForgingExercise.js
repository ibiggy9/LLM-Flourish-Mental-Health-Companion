import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Alert, useWindowDimensions} from 'react-native'
import { Easing } from 'react-native-reanimated'
import tw from 'twrnc'
import BackButton from '../../Components/BackButton'
import TextInputExercise from '../../Components/ExerciseComponents/TextInputExercise'
import { Motion } from '@legendapp/motion'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import Stepper from './Stepper'
import {ProgressBar} from 'react-native-paper'
import SmallInputExercise from '../../Components/ExerciseComponents/SmallInputExercise'
import GoalPrioritization from '../../Components/ExerciseComponents/GoalPrioritization'
import { LinearGradient } from 'expo-linear-gradient'

export default function ForgingExercise({navigation}) {
    const {width, height} = useWindowDimensions()
    const [step, setStep] = useState(-1)
    const [completeAlert, setCompleteAlert] = useState(false)
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
    const [q5, setQ5] = useState(false)
    const [q6, setQ6] = useState(false)
    const [q7, setQ7] = useState(false)
    const [q8, setQ8] = useState(false)
    const [q9a, setQ9a] = useState(false)
    const [q9b, setQ9b] = useState(false)
    const [q9c, setQ9c] = useState(false)
    const [q10a, setQ10a] = useState(false)
    const [q10b, setQ10b] = useState(false)
    const [q10c, setQ10c] = useState(false)
    const [q11a, setQ11a] = useState(false)
    const [q11b, setQ11b] = useState(false)
    const [q11c, setQ11c] = useState(false)
    const [q12a, setQ12a] = useState(false)
    const [q12b, setQ12b] = useState(false)
    const [q12c, setQ12c] = useState(false)
    const [q13a, setQ13a] = useState(false)
    const [q13b, setQ13b] = useState(false)
    const [q13c, setQ13c] = useState(false)
    const [q14a, setQ14a] = useState(false)
    const [q14b, setQ14b] = useState(false)
    const [q14c, setQ14c] = useState(false)
    const [q15a, setQ15a] = useState(false)
    const [q15b, setQ15b] = useState(false)
    const [q15c, setQ15c] = useState(false)
    const [q16a, setQ16a] = useState(false)
    const [q16b, setQ16b] = useState(false)
    const [q16c, setQ16c] = useState(false)
    const [q17a, setQ17a] = useState(false)
    const [q17b, setQ17b] = useState(false)
    const [q17c, setQ17c] = useState(false)
     const [q18a, setQ18a] = useState(false)
    const [q18b, setQ18b] = useState(false)
    const [q18c, setQ18c] = useState(false)
    const [goalObject, setGoalObject] = useState([])

    useEffect(()=>{
      console.log(goalObject)
      setGoalObject([
     
      
        {name:q14a, key:16},
        {name:q14b, key:17},
        {name:q14c, key:18},
        {name:q15a, key:19},
        {name:q15b, key:20},
        {name:q15c, key:21},
        {name:q16a, key:22},
        {name:q16b, key:23},
        {name:q16c, key:24},
        {name:q17a, key:25},
        {name:q17b, key:26},
        {name:q17c, key:27},
        {name:q18a, key:28},
        {name:q18b, key:29},
        {name:q18c, key:30},
      ])

    }, [q18c, step])

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
              [{text: "Save Work", style:'cancel', onPress: () => {navigation.dispatch(action)}}, 
              {
                  text:'Do Not Save Work',
                  style:'destructive',
                  onPress: () => navigation.dispatch(action)},
                  {
                    text:'Stay',
                    style:'cancel',
                    onPress: () => {}
                  }
  
              ,
          ]
          )
      })
  }, [navigation])

  const prompts=[
    {title:'What are 1-3 things you would ideally like to improve about yourself?',
    label:"It is important that what you choose are things within your control.",
      description:
      <View>
      <Text style={tw`text-white text-lg`}> 
      Creating a high-level vision for your personal development is a powerful tool to help you focus your efforts and guide your growth. Here are some steps to help you get started:
      </Text>
      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      1. Take time to reflect:
      </Text>
      <Text style={tw`text-white text-lg`}> 
       Set aside some quiet time to reflect on who you are and who you want to become. Think about what is important to you and what kind of person you want to be.
      </Text>
      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      2. Explore your values and beliefs: 
      </Text>
      <Text style={tw`text-white text-lg`}> 
      Consider what values and beliefs drive your decisions and actions. This will help you understand what you stand for and what kind of life you want to live.
      </Text>

      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      3. Imagine your ideal self: 
      </Text>

      <Text style={tw`text-white text-lg`}> 
        Close your eyes and visualize yourself in the future, when you have reached your full potential. What does that person look like? What do they do? How do they interact with others?
        </Text>


        <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      4. Write down your vision:
      </Text>

      <Text style={tw`text-white text-lg`}> 
      Write down your vision in positive, present tense language. Use words that evoke emotion and describe the ideal you have just visualized.
      </Text>

      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      5.Write down or sketch out your vision, making sure to include both the tangible and intangible aspects of your ideal health and fitness journey.
      </Text>

      <Text style={tw`text-white text-lg`}> 
      Make sure your vision reflects your values, beliefs, and aspirations. It should be something that inspires you and motivates you to take action.
      </Text>

      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
      6. Keep it simple: 
      </Text>
      <Text style={tw`text-white text-lg`}>
      Your vision should be simple and easy to understand. Focus on the most important aspects of your personal development and avoid getting bogged down in details.
      </Text>
      
      <Text style={tw`text-white text-lg mt-3`}> 
      By following these steps, you can create a high-level vision for your personal development that will inspire and motivate you on your journey towards growth and self-discovery.',
      </Text>
      </View>
      ,

      emphasisTitle:'Personal Development Instructions',
      emphasisExample:'In five years, I see myself as a confident, self-aware individual with a strong sense of purpose. I approach life with a positive mindset, and handle challenges and setbacks with resilience. I am able to communicate effectively with others and prioritize self-care by maintaining a healthy lifestyle that includes regular exercise and a balanced diet. I am a lifelong learner and constantly seek out new experiences and opportunities for growth. This vision of my future self represents my ideal for personal development and provides a roadmap for the changes and growth I want to see in my life. I am motivated by this vision and stay focused on my goals and aspirations, with a clear sense of direction and purpose. I know that I have the power to make this vision a reality.'
      
      ,

    },
    {title:'Describe your ideal career. What industry is it in?',
    label:"If you can, name what job you would like and why it would be good for you.",
    description:
    <View>
    <Text style={tw`text-white text-lg`}> 
    Creating a vision for your ideal career is an important step in understanding what you truly want from your professional life. Here are the steps you can follow to create your vision:
    </Text>

    <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    1. Start with self-reflection:
    </Text>
    <Text style={tw`text-white text-lg`}> 
     Take some time to think about what is important to you in a career, what your values are, and what drives you.
    </Text>
    <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    2. Define your purpose:
    </Text>
    <Text style={tw`text-white text-lg`}> 
     What do you want to achieve in your career? What impact do you want to have in your industry or the world?
    </Text>

    <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    3. Imagine your ideal work environment: 
    </Text>

    <Text style={tw`text-white text-lg`}> 
     What kind of culture do you want to work in? What kind of team do you want to be a part of?
      </Text>


      <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    4. Think about what success means to you:
    </Text>

    <Text style={tw`text-white text-lg`}> 
     What does success look like in your ideal career? How will you know you have reached your goals?
    </Text>

    <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    5. Create a picture in your mind: 
    </Text>

    <Text style={tw`text-white text-lg`}> 
    Imagine yourself in your ideal career, what does your day-to-day look like? What kind of projects are you working on?
    </Text>

    <Text style={tw`text-white text-lg mt-2 font-bold`}> 
    5. Keep it simple: 
    </Text>
    <Text style={tw`text-white text-lg`}>
    Your vision should be simple and easy to understand. Focus on the most important aspects of your personal development and avoid getting bogged down in details.
    </Text>
    
    <Text style={tw`text-white text-lg mt-3`}> 
    By following these steps, you can start to create a clear vision for your ideal career that can guide your future career decisions and actions. Remember, this vision is meant to be a high level one, so don't worry about the details at this stage. Just focus on the big picture and let your imagination run free.
    </Text>
    </View>
    
    ,
    emphasisTitle:'Ideal Career',
    emphasisExample:"As a driven and motivated individual, I envision my ideal career as one that challenges and inspires me to constantly grow and evolve. I see myself working in a dynamic and innovative environment, surrounded by colleagues who are passionate about what they do and who value collaboration and teamwork. In this role, I am making a tangible impact on the world, using my skills and expertise to solve complex problems and drive progress in my field. I feel a deep sense of fulfillment and satisfaction from my work, knowing that I am making a difference and contributing to something greater than myself. At the same time, I value work-life balance and prioritize my personal well-being. I have the flexibility to pursue my passions and interests outside of work, and I am able to take care of my health and wellness without sacrificing my professional growth. Overall, my ideal career is one that is both fulfilling and enjoyable, where I am able to challenge myself, make a positive impact, and live a well-rounded and fulfilling life.",
    },
    {title: 'Describe your ideal relationship with health and fitness',
    label:"Frequency, intensity, type, and reason why this would be good for you.",
      description: 
      <View>
    <Text style={tw`text-white text-lg`}> 
    Creating a high-level vision for your health and fitness ideals can be a powerful tool for guiding and motivating your fitness journey. Here are some steps to help you do that:
    </Text>

    <Text style={tw`text-white text-lg mt-2 `}> 
    1. Reflect on what you value most in your health and fitness journey. What are the key qualities or experiences that you would like to cultivate in your journey?:
    </Text>
 
    <Text style={tw`text-white text-lg mt-2 `}> 
    2. Imagine your ideal self in terms of health and fitness. How would you look, feel, and move? What would your daily habits and routines be like?
    </Text>
   

    <Text style={tw`text-white text-lg mt-2 `}> 
    3. Think about the key aspects of your life that are most important to you, such as your relationships, career, and personal interests. How do you want your health and fitness to support and enhance these areas of your life?
    </Text>

  

      <Text style={tw`text-white text-lg mt-2 `}> 
    4. Close your eyes and visualize yourself in this ideal state, experiencing your health and fitness in a way that is fulfilling and meaningful to you.
    </Text>

    

    <Text style={tw`text-white text-lg mt-2 `}> 
    5. Write down or sketch out your vision, making sure to include both the tangible and intangible aspects of your ideal health and fitness journey. 
    </Text>


    
    <Text style={tw`text-white text-lg mt-3`}> 
    By following these steps, you can start to create a clear vision for your ideal career that can guide your future career decisions and actions. Remember, this vision is meant to be a high level one, so don't worry about the details at this stage. Just focus on the big picture and let your imagination run free.
    </Text>
    </View>
      
      ,
      emphasisTitle:'Health and Fitness',
      emphasisExample:
      <View>
        <Text style={tw`text-white text-lg mt-3`}>
        As a person who values their health and wellness, I see myself as a fit and active individual in the future. I wake up each morning feeling refreshed and ready to take on the day, with a healthy breakfast fueling me. Throughout the day, I engage in physical activity, whether it be a yoga class, a hike, or a gym workout. I find joy in movement and the challenge it brings.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}>
        I am mindful of the food I consume and make sure to nourish my body with wholesome, nutritious meals that provide me with the energy I need. I no longer crave junk food and instead, have a strong desire for fresh fruits and vegetables.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}>
        In my free time, I enjoy outdoor activities such as biking, kayaking, and gardening. I have a strong connection to nature and find peace and balance in being surrounded by it. I am able to maintain a healthy work-life balance and prioritize self-care, ensuring that I am not only physically fit but also mentally and emotionally well.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}>
        I am proud of my physical and mental transformation and feel confident in my ability to maintain a healthy lifestyle for the rest of my life. I am an example to others of what is possible with dedication, discipline, and a positive attitude towards health and fitness.
        </Text>

      </View>,
      },
    {title:'What does your ideal family life look like',
    label:"Thinking of yourself 10-20 years in the future, what does an ideal family life look like to you?",
      
      emphasisTitle: "Family Ideals",
      description:
      <View>
        <Text style={tw`text-white text-lg mt-3`}>
        To create a high-level vision for your family life ideals, try to imagine your ideal family situation in the future. Think about what kind of relationships you would like to have with your spouse, children, and other family members. Consider the values and principles you want to guide your family life, such as communication, love, respect, and support.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}>
        Think about the environment and circumstances in which you would like your family to live, including your home, neighborhood, and community. Consider the kind of activities and experiences you would like to share with your family, such as traveling, spending time together, and creating memories.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}> 
        Remember, this is just an exercise to help you visualize your ideal family life, so don't worry about being realistic or limiting yourself in any way. Just let your imagination run free and create a vision that brings you joy and inspiration.
        </Text>
      </View>
      ,
      
      emphasisExample:
      <View>
      <Text style={tw`text-white text-lg mt-3`}>
      As a family-oriented individual, my vision for my family life in the future is one filled with love, happiness, and meaningful experiences. I see myself as a patient, supportive, and nurturing partner to my spouse and a proud and involved parent to my children.
      </Text>

      <Text style={tw`text-white text-lg mt-3`}>
      My spouse and I share a strong bond and work together to provide a stable and loving home for our children. We make time for each other and prioritize our relationship, ensuring that we never lose sight of what brought us together in the first place.
      </Text>

      <Text style={tw`text-white text-lg mt-3`}>
      Our children are confident, well-rounded individuals who are encouraged to pursue their passions and interests. We foster their creativity and independence, while also teaching them important values such as empathy, kindness, and responsibility.
      </Text>

      <Text style={tw`text-white text-lg mt-3`}>
      As a family, we enjoy traveling and discovering new places together, as well as creating lasting memories through shared experiences such as family dinners, movie nights, and game nights. Our home is a warm and welcoming place that our children look forward to coming back to after a long day.
      </Text>

      <Text style={tw`text-white text-lg mt-3`}>
      I am grateful for my loving family and feel fulfilled by the strong bonds we share. I see us growing older together, creating new memories, and continuing to support each other through all of life's ups and downs. My vision for my family life is one of love, joy, and endless adventures.
      </Text>






    </View>
      },
    {title:'What Does Your Ideal Social Life Look Like?',
    label:"What would a social life that is good for you look like?",
      description:
      <View>
           <Text style={tw`text-white text-lg`}> 
           Creating a vision for your social life ideals can help you clarify what you want from your relationships and social experiences. Here are some steps to help you create a high level vision for your social life:
    </Text>

    <Text style={tw`text-white text-lg mt-2 `}> 
    1. Reflect on your current social experiences: Think about what you like and don't like about your current social life.
    </Text>
 
    <Text style={tw`text-white text-lg mt-2 `}> 
    2. Imagine your ideal social life: Close your eyes and visualize what your ideal social life would look like. What kind of people would you be spending time with? What kind of activities would you be doing?
    </Text>
   

    <Text style={tw`text-white text-lg mt-2 `}> 
    3. Consider your values: Think about the values that are important to you in your relationships and social experiences. For example, authenticity, compassion, or adventure.
    </Text>

  

      <Text style={tw`text-white text-lg mt-2 `}> 
    4. Write down your vision: Write down your vision in a sentence or two, capturing the essence of what you want your social life to look like.
    </Text>

    

    <Text style={tw`text-white text-lg mt-2 `}> 
    5. Revisit your vision regularly: Revisit your vision regularly and reflect on how you're doing in terms of achieving it. This can help you make any necessary adjustments to your vision and keep you on track.
    </Text>


    
    <Text style={tw`text-white text-lg mt-3`}> 
    Remember, this is just a high level vision, so don't worry about the specifics of how you'll achieve it. Just focus on imagining your ideal social life and let the rest follow.
    </Text>
      </View>
      ,
      emphasisTitle:'Social Life',
      emphasisExample:
        <View>
            <Text style={tw`text-white text-lg mt-3`}> 
            As a social person, I see myself in the future surrounded by a diverse group of friends and loved ones who bring joy and positivity into my life. I am actively involved in my community and make meaningful connections with those around me.
            </Text>

            <Text style={tw`text-white text-lg mt-3`}> 
            I prioritize my relationships and make time for regular catch-ups and gatherings with my friends, whether it be through game nights, dinner parties, or outdoor adventures. I am always open to meeting new people and expanding my social circle, as I believe that diverse relationships bring growth and fulfillment to one's life.
            </Text>


            <Text style={tw`text-white text-lg mt-3`}> 
            I am confident in myself and my ability to engage in social situations, whether it be in a large group setting or one-on-one conversations. I am known for being a good listener and someone who is always willing to lend a helping hand to those in need.
            </Text>

            <Text style={tw`text-white text-lg mt-3`}> 
            I also have a strong passion for giving back to my community and using my social connections to make a positive impact in the world. Whether it be through volunteering, participating in community events, or simply spreading kindness and positivity, I am dedicated to making a difference in the lives of those around me.
            </Text>

            <Text style={tw`text-white text-lg mt-3`}> 
            Overall, my vision for my social life is one of genuine connections, meaningful relationships, and a positive impact on those around me. I am grateful for the people in my life and look forward to the adventures and experiences we will share in the future.
            </Text>


        </View>
      ,
      },
    {title:'What Does Your Ideal Leisure Time Look Like?',
    label:"What would a productive and enjoyable use of your free time look like?",
      description:
        <View>
          <Text style={tw`text-white text-lg mt-3`}>
            To create a high level vision for your leisure life ideals, follow these steps:
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          1. Set aside some quiet time to reflect and imagine your ideal leisure life.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          2. Think about what leisure activities and pastimes bring you joy and fulfillment.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          3. Consider what you would like to achieve in your leisure time and what impact you would like to have.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          4. Consider what kind of environment you would like to be in, who you would like to spend your leisure time with, and what your ideal balance is between social activities and solo pursuits.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          5. Close your eyes and visualize yourself living your ideal leisure life. What does it look like? What are you doing? Who are you with? How do you feel?
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          6. Write down your thoughts, feelings, and visualizations about your ideal leisure life, being as specific and detailed as possible.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          7. Review your notes and reflect on your vision. What themes or patterns emerge?
          </Text>

          <Text style={tw`text-white text-lg mt-3`}>
          8. Keep your vision in mind as you move forward, and use it as a guiding light for your leisure life choices and decisions.
          </Text>

        </View>
      ,
      emphasisTitle:'Leisure Life',
      
      emphasisExample:
      <View>
        <Text style={tw`text-white text-lg mt-3`}> 
        In my ideal leisure life, I see myself as someone who is well-rounded, curious, and always seeking new experiences. I am able to balance work and play and make time for the things that bring me joy and relaxation.
        </Text>

        <Text style={tw`text-white text-lg mt-3`}>
        I have a passion for travel and exploring new destinations, cultures, and cuisines. Whether it be a trip to a foreign country or a weekend getaway, I am always seeking new adventures and opportunities to broaden my horizons.
          </Text>

          <Text style={tw`text-white text-lg mt-3`}> 
          In my free time, I engage in a variety of hobbies and interests, such as photography, cooking, reading, and gardening. I am a creative person who enjoys expressing myself through different mediums and am always seeking new ways to learn and grow.
          </Text> 

          <Text style={tw`text-white text-lg mt-3`}> 
          I also prioritize my health and wellness, incorporating activities such as yoga, meditation, and outdoor exercise into my leisure routine. I find joy in taking care of my body and mind, and feel rejuvenated after each session.
          </Text> 

          <Text style={tw`text-white text-lg mt-3`}> 
          My leisure life is filled with balance and variety, with something for every mood and interest. I am surrounded by people and activities that bring me joy and fulfillment, and I look forward to each new experience that awaits me. My vision for my leisure life is one of growth, adventure, and rejuvenation.
          </Text> 

      </View>
      ,
      },
    {title:'Constructing Your Ideal Future: Complete Summary',
    label:"Combine all your previous thoughts into one coherent vision.",
      description:"You've written a lot so far and that's great, well done. However, this can create difficulty in pulling it all together. Complexity is the enemy of execution as the saying goes. Thus, the purpose of this step is to generate a simple way to remember the visions you want to create in your life. Think about whether there are any themes across all you have written and identify those. It is essential that it is memorable to you so when you are planning out your days and weeks you can remember in a quick word what you're trying to do in your life.",
      emphasisTitle:'Your Ideal Future',
      
      emphasisExample:'Improve cardio, spend more time with kids and parents, reconnect with friends from college, and figure out how to change industries.',
      },
    {title:'A Future to Avoid: Complete Summary',
    label:"If you didn't execute against the visions you articulated, what would happen to you?",
      description:"Often we underestimate the risk of inaction. However, as time goes on, circumstances can change and we find ourselves in a place we don't want. The purpose of this section is to identify a negative vision for what will happen to you, who you are, what you're like and how you'll develop across time if you don't do the things you've identified so far in this exercise. This anti-visioning can be a powerful motivational tool.",
      emphasisTitle:'Your Future to Avoid',
      emphasisExample:'I would likely become resentful o',
      },

  ]

  const strategies = [
    {title:'Personal Development Strategy',
    label:'List 3 steps you could take to realize your personal development vision',
    description:'Stuff',
    emphasisTitle:'Personal Development Strategy'

  },
    {title:'Career Strategy',
    label:'List 3 steps you could take to realize your career vision',
    description:'Stuff',
    emphasisTitle:'Career Development Strategy'

  },
    {title:'Health & Fitness Strategy',
    label:'List 3 steps you could take to realize your health and fitness vision',
    description:'Stuff',
    emphasisTitle:'Health & Fitness Strategy'

    },
    {title:'Family Strategy',
    label:'List 3 steps you could take to realize your family vision',
    description:'Stuff',
    emphasisTitle:'Family Strategy',
    

    },
    {title:'Friends Strategy',
    label:'List 3 steps you could take to realize your friends vision',
    description:'Stuff',
    emphasisTitle:'Friends Strategy',
    

    },

    {title:'Personal Development Goal Setting',
    label:'List up to 3 steps you need to take to accomplish the first pillar of your strategy',
    pillar:{q9a},
    description:'Stuff',
    emphasisTitle:'Prioritization'
  
  
  }, 
  {title:'Career Goal Setting',
    label:'List up to 3 steps you need to take to accomplish the first pillar of your strategy',
    pillar:{q10a},
    description:'Stuff',
    emphasisTitle:'Prioritization'
  
  
  },
  {title:'Health and Fitness Goal Setting',
    label:'List up to 3 steps you need to take to accomplish the first pillar of your strategy',
    pillar:{q11a},
    description:'Stuff',
    emphasisTitle:'Prioritization'
  
  
  },
  {title:'Family Goal Setting',
  label:'List up to 3 steps you need to take to accomplish the first pillar of your strategy',
  pillar:{q12a},
  description:'Stuff',
  emphasisTitle:'Prioritization'


},
{title:'Social Life Goal Setting',
    label:'List up to 3 steps you need to take to accomplish the first pillar of your strategy',
    pillar:{q13a},
    description:'Stuff',
    emphasisTitle:'Prioritization'
  
  
  },
  
  {title:'Select timeline for accomplishment',
  label:'',
  description:'Stuff',
  emphasisTitle:'Prioritization'


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
    <View style={[tw`flex-1 justify-start`,{height:height, width:width, opacity:1, position:'absolute'}]}>
        
           {step != 22 && <BackButton navigation={navigation} />}
           

   

        
        
        {step == -1 &&
        <View>

          <Stepper stepper={step} setStepper={setStep} completeCount={0} />
        </View>
        
        }



        {step == 0 &&
        <View style={tw``}>
            <TextInputExercise 
              title={prompts[step].title}  
              hasProgressBar={true}
              progress={step/25}
              label={prompts[step].label} 
              text={q1} 
              setText={setQ1} 
              navigation={navigation}
              emphasis={"Further Instructions"}
              emphasisTitle={prompts[step].emphasisTitle}
              emphasisDescription={prompts[step].description}
              emphasisExample={prompts[step].emphasisExample}
              nextStepper={()=>setStep(step +1)}
              lastStepper={()=> setStep(step-1)}
                />

          </View>
        }

        

        {step == 1 &&
        <View style={tw``}>
            <TextInputExercise 
            hasProgressBar={true}
            progress={step/25}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            title={prompts[step].title}  
            navigation={navigation}
            label={prompts[step].label} 
            text={q2} 
            setText={setQ2} 
            />

          </View>
        }
        {step == 2 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            label={prompts[step].label} 
            hasProgressBar={true}
          progress={step/25}
            text={q3} 
            setText={setQ3} 
            nextStepper={()=>setStep(step +1)}
            navigation={navigation}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            
            />

          </View>
        }
        {step == 3 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            label={prompts[step].label} 
            text={q4} 
            setText={setQ4} 
            hasProgressBar={true}
            progress={step/25}
            nextStepper={()=>setStep(step +1)}
            navigation={navigation}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            
            />

          </View>
        }
        {step == 4 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            hasProgressBar={true}
          progress={step/25}
            label={prompts[step].label}
            text={q5} setText={setQ5} 
            nextStepper={()=>setStep(step +1)}
            navigation={navigation}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            />
            

          </View>
        }
        {step == 5 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            hasProgressBar={true}
          progress={step/25}
            label={prompts[step].label} 
            text={q6} setText={setQ6} 
            nextStepper={()=>setStep(step +1)}
            navigation={navigation}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            
            />

          </View>
        }
        {step == 6 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            hasProgressBar={true}
          progress={step/25}
            label={prompts[step].label} 
            text={q7} 
            setText={setQ7}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            navigation={navigation}
            emphasisTitle={prompts[step].emphasisTitle}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            
            />
 
          </View>
        }
        {step == 7 &&
        <View style={tw``}>
            <TextInputExercise 
            title={prompts[step].title}  
            label={prompts[step].label} 
            text={q8} setText={setQ8} 
            hasProgressBar={true}
          progress={step/25}
            nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
            emphasis={"Further Instructions"}
            emphasisTitle={prompts[step].emphasisTitle}
            navigation={navigation}
            emphasisDescription={prompts[step].description}
            emphasisExample={prompts[step].emphasisExample}
            
            />
           
          </View>
        }

        {step == 8 &&

        <View>
          <Stepper setStepper={setStep} stepper={step} completeCount={1}/>
        </View>

        }

        {step == 9 &&
           <View style={tw``}>
           <SmallInputExercise
           title={strategies[0].title}
           hasProgressBar={true}
          progress={step/25}
           label={strategies[0].label}
           text={q9a}
           setText={setQ9a}
           text1={q9b}
           setText1={setQ9b}
           text2={q9c}
           setText2={setQ9c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
           
         </View>
        }
        
        {step == 10 &&
        <View style={tw``}>
        <SmallInputExercise
           title={strategies[1].title}
           hasProgressBar={true}
          progress={step/25}
           label={strategies[1].label}
           text={q10a}
           setText={setQ10a}
           text1={q10b}
           setText1={setQ10b}
           text2={q10c}
           setText2={setQ10c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
        
      </View>
        
        }

        {step == 11 &&
        <View style={tw``}>
        <SmallInputExercise
           title={strategies[2].title}
           hasProgressBar={true}
          progress={step/25}
           label={strategies[2].label}
           text={q11a}
           setText={setQ11a}
           text1={q11b}
           setText1={setQ11b}
           text2={q11c}
           setText2={setQ11c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
        
      </View>
        
        }

        {step == 12 && 
        <View style={tw``}>
        <SmallInputExercise
           title={strategies[3].title}
           label={strategies[3].label}
           hasProgressBar={true}
          progress={step/25}
           text={q12a}
           setText={setQ12a}
           text1={q12b}
           setText1={setQ12b}
           text2={q12c}
           setText2={setQ12c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
        
      </View>
        }

      {step == 13 && 
        <View style={tw``}>
        <SmallInputExercise
           title={strategies[4].title}
           label={strategies[4].label}
           hasProgressBar={true}
          progress={step/25}
           text={q13a}
           setText={setQ13a}
           text1={q13b}
           setText1={setQ13b}
           text2={q13c}
           setText2={setQ13c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
        
      </View>
        }

      {step == 14 &&
      <View>

      <Stepper stepper={step} setStepper={setStep} completeCount={2} />
      </View>
      }

      {step == 15 && 
      <View style={tw``}>
      <SmallInputExercise
           title={strategies[5].title}
           label={strategies[5].label}
           hasProgressBar={true}
          progress={step/25}
           emphasis={"See Your First Pillar"}
           emphasisTitle={"First Pillar"}
           emphasisDescription={q9a}
           
           text={q14a}
           setText={setQ14a}
           text1={q14b}
           setText1={setQ14b}
           text2={q14c}
           setText2={setQ14c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
      
    </View>
        
      
      }


{step == 16 && 
      <View style={tw``}>
      <SmallInputExercise
           title={strategies[6].title}
           label={strategies[6].label}
           hasProgressBar={true}
          progress={step/25}
           emphasis={"See Your First Pillar"}
           emphasisTitle={"First Pillar"}
           emphasisDescription={q10a}
           
           text={q15a}
           setText={setQ15a}
           text1={q15b}
           setText1={setQ15b}
           text2={q15c}
           setText2={setQ15c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
      
    </View>
        
      
      }
      {step == 17 && 
      <View style={tw``}>
      <SmallInputExercise
           title={strategies[7].title}
           label={strategies[7].label}
           emphasis={"See Your First Pillar"}
           emphasisTitle={"First Pillar"}
           emphasisDescription={q11a}
           hasProgressBar={true}
          progress={step/25}
           
           text={q16a}
           setText={setQ16a}
           text1={q16b}
           setText1={setQ16b}
           text2={q16c}
           setText2={setQ16c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
      
    </View>
        
      
      }
      {step == 18 && 
      <View style={tw``}>
      <SmallInputExercise
           title={strategies[8].title}
           label={strategies[8].label}
           hasProgressBar={true}
          progress={step/25}
           emphasis={"See Your First Pillar"}
           emphasisTitle={"First Pillar"}
           emphasisDescription={q12a}
           
           text={q17a}
           setText={setQ17a}
           text1={q17b}
           setText1={setQ17b}
           text2={q17c}
           setText2={setQ17c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
      
    </View>
        
      
      }
       {step == 19 && 
      <View style={tw``}>
      <SmallInputExercise
           title={strategies[9].title}
           label={strategies[9].label}
           hasProgressBar={true}
          progress={step/25}
           emphasis={"See Your First Pillar"}
           emphasisTitle={"First Pillar"}
           emphasisDescription={q18a}
           
           text={q18a}
           setText={setQ18a}
           text1={q18b}
           setText1={setQ18b}
           text2={q18c}
           setText2={setQ18c}
           navigation={navigation}
           nextStepper={()=>setStep(step +1)}
            lastStepper={()=> setStep(step-1)}
           />
      
    </View>
        
      
      }
      {step == 20 && 
      <View style={tw``}>
        
      <GoalPrioritization goalObject={goalObject}  />
      <View style={tw`flex-row justify-between mx-15 mt-4`}>
        <View style={tw``}>
        <TouchableOpacity onPress={()=> setStep(step-1)}>
            <Text style={tw`text-white text-2xl`}>Back</Text>
        </TouchableOpacity>
        </View>
        <View style={tw``}>
        <TouchableOpacity onPress={()=> setStep(step+1)}>
        <Text style={tw`text-white text-2xl`}>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
    </View>
        
      
      }

      {step == 21 &&
       <View>

          <Stepper stepper={step} setStepper={setStep} completeCount={3} />
        </View>
      }


        {step == 22 &&
       <View style={[tw`justify-start mt-20`, {height:height, width:width}]}>
       <ConfettiCannon count={200} autoStartDelay={600} origin={{x: 0, y: 0}} />
         <Motion.View initial={{scale: 0.0, y:50}} animate={{scale: 1, y:0}} transition={{type:'spring', stiffness:100, damping:8}} style={tw`flex-row justify-center items-center text-center`}>
       <Text style={tw`text-white mx-auto text-3xl font-bold 5 p-3`}> <AntDesign name="checkcircle" style={tw`mr-5`} size={40} color="white" /> Congratulations!</Text>
       </Motion.View>
       <Text style={tw`text-white text-start text-lg mx-5`}>You have completed the exercise. Return to it often to ensure you are staying on track with your vision.  </Text>
       <View style={tw`flex-1 justify-end  mb-30`}>
       
       <TouchableOpacity style={tw` rounded-xl p-3 px-10 mb-3`} onPress={()=> navigation.navigate('Exercises')}>
         <Text style={tw`text-white text-lg border border-white py-5 rounded-xl text-center font-bold`}>Finish</Text>
       </TouchableOpacity>
       
       
       </View>
       </View>
        }
        </View>
        </View>
    
  )
}
