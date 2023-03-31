import React, {useState, useMemo} from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tabs from './Components/Tabs'
import Exercise from './Screens/AnxietyPrograms/ModerateTermAnxietyReduction/Exercise'
import Quiz from './Screens/AnxietyPrograms/Quiz'
import ExercisePreview from './Screens/ExercisePreview'
import ModuleOverView from './Screens/AnxietyPrograms/ModuleOverView'
import ReminderScreen from './Components/ExerciseComponents/ReminderScreen'
import IntroQuick from './Screens/AnxietyPrograms/QuickProgram/IntroQuick'
import EntryOverview from './Screens/AnxietyPrograms/ModerateTermAnxietyReduction/EntryOverview'
import ExercisesNew from './Screens/ExercisesNew'
import BreathingExercise from './Screens/AnxietyPrograms/QuickProgram/BreathingExercise'
import PhysiologicalBreath from './Screens/AnxietyPrograms/QuickProgram/PhysiologicalBreath'
import { HapticsProvider } from 'react-native-custom-haptics';
import Staging from './Screens/Staging'
import Zone2 from './Screens/AnxietyPrograms/QuickProgram/Zone2'
import WhiteNoise from './Screens/AnxietyPrograms/QuickProgram/WhiteNoise'
import Binural from './Screens/AnxietyPrograms/QuickProgram/Binural'
import StressTest from './Screens/Tools/StressTest'
import DailyJournal from './Screens/Tools/DailyJournal'
import ForgingStaging from './Screens/FutureForging/ForgingStaging'
import FreeWriting from './Screens/Tools/FreeWriting'
import Paywall from './Screens/Paywall'
import Meditation from './Screens/Tools/Meditation'
import UpdateGoals from './Screens/FutureForging/UpdateGoals'
import EditVision from './Screens/FutureForging/EditVision'
import UpdateVision from './Screens/FutureForging/UpdateVision'
import { useEffect } from 'react'
import PastFreeWriting from './Components/ExerciseComponents/PastFreeWriting'
import PastDailyJournals from './Components/ExerciseComponents/PastDailyJournals'
import PastCBTReview from './Screens/AnxietyPrograms/ModerateTermAnxietyReduction/PastCBTReview'
import MhContQuiz from './Screens/Tools/MhContQuiz'
import Login from './Screens/Login'
import { AuthProvider } from './Context/AuthContext'
import AiTab from './Screens/AI/AiTab'
import ContentScreen from './Components/ContentScreen'
import ReflectAIPast from './Components/Reflections/ReflectAIPast'
import GoalPlannerReflection from './Components/Reflections/GoalPlannerReflection'
import DailyJournalReflection from './Components/Reflections/DailyJournalReflection'
import FreeWritingReflection from './Components/Reflections/FreeWritingReflection'
import CogCoachReflection from './Components/Reflections/CogCoachReflection'
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
} from 'firebase/auth'
import app from './firebaseConfig'
import StructuredReflection from './Screens/AI/StructuredReflection'
import GoalPlanner from './Screens/AI/GoalPlanner/GoalPlanner'
import CbtAi from './Screens/AI/Cbt/CbtAi'
import Fleur from './Screens/AI/ChatBot/Fleur'
import ViewWorkScreen from './Components/ViewWork/ViewWorkScreen'
import OnBoarding from './Screens/OnBoarding/OnBoarding'
import useRevHook from './Components/useRevHook'
import analytics from '@react-native-firebase/analytics'
import Welcome from './Screens/Welcome'

 

export const AppContext = React.createContext()


export default function App({navigation}) {
  const Stack = createNativeStackNavigator()
  const auth = getAuth(app)
  const [user, setUser] = useState()
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  const {isProMember ,customerInfo, membershipLevel} = useRevHook()
  
  
const appContextValue = useMemo(
  () => ({
    isSignedIn,
    setIsSignedIn,
  }),
  [isSignedIn]
)

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)  
      setIsSignedIn(true)
  })
  
  return () =>{
      unsubscribe()
      
  }
}, [auth.currentUser])
  
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }
 return (
    <AppContext.Provider value={appContextValue}>
    <AuthProvider>
    <HapticsProvider>
    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerShown:false,
          
          }}
          
          initialRouteName="Login"
      >
        {!auth.currentUser ? (

            <Stack.Screen name="Login" component={Login} />
            ):(
              <>
              {isProMember ?
              <>

            <Stack.Screen name="home" component={Tabs} />
            <Stack.Group screenOptions={{presentation:'card'}}>
            
            </Stack.Group>
            
            <Stack.Screen name="PhysiologicalBreath" component={PhysiologicalBreath}  options={{gestureEnabled:false}} />
            
            <Stack.Screen name="GoalPlanner" component={GoalPlanner} />
            <Stack.Screen name="CbtAi" component={CbtAi} />
            <Stack.Screen name="Quiz" component={Quiz} options={{gestureEnabled:false}}  />
            <Stack.Screen name="ModuleOverView" component={ModuleOverView} options={{gestureEnabled:false}} />
            <Stack.Screen name="StructuredReflection" component={StructuredReflection} />
            
  
            <Stack.Screen name="IntroQuick" component={IntroQuick} />
            
            <Stack.Screen name="Zone2" component={Zone2} />
            <Stack.Screen name="ContentScreen" component={ContentScreen} />
            <Stack.Screen name="EntryOverview" component={EntryOverview} />
            <Stack.Screen name="Staging" component={Staging} />
            <Stack.Screen name="ModExercise" component={Exercise} options={{gestureEnabled:false}} />
            <Stack.Screen name="BreathingExercise" component={BreathingExercise}  options={{gestureEnabled:false}} />
            <Stack.Screen name="Binural" component={Binural} />
            <Stack.Screen name="WhiteNoise" component={WhiteNoise} />
            <Stack.Screen name="StressTest" component={StressTest} />
            <Stack.Screen name="FreeWriting" component={FreeWriting} />
            <Stack.Screen name="DailyJournal" component={DailyJournal} />
            
            <Stack.Screen name="Meditation" component={Meditation} />
            <Stack.Screen name="UpdateGoals" component={UpdateGoals} />
            <Stack.Screen name="UpdateVision" component={UpdateVision} />
            <Stack.Screen name='ExercisesNew' component={ExercisesNew} />
            <Stack.Screen name="ForgingStaging" component={ForgingStaging} />
            <Stack.Screen name="AiTab" component={AiTab} />
            <Stack.Screen name="EditVision" component={EditVision} />
            <Stack.Screen name="MhContQuiz" component={MhContQuiz}  options={{gestureEnabled:false}}  />
            <Stack.Screen name="Fleur" component={Fleur} />
            <Stack.Screen name="ViewWorkScreen" component={ViewWorkScreen} />
            
            
            <Stack.Group screenOptions={{presentation:"modal"}}>
               <Stack.Screen name="ExercisePreview" component={ExercisePreview} />   
               <Stack.Screen name="ReflectAIPast" component={ReflectAIPast} />
               <Stack.Screen name="DailyJournalReflection" component={DailyJournalReflection} />
               <Stack.Screen name="CogCoachReflection" component={CogCoachReflection} />
               <Stack.Screen name="FreeWritingReflection" component={FreeWritingReflection} />
               <Stack.Screen name="GoalPlannerReflection" component={GoalPlannerReflection} />
               <Stack.Screen name="Welcome" component={Welcome} />
               <Stack.Screen name="Reminder" component={ReminderScreen} />
               <Stack.Screen name="PastFreeWriting" component={PastFreeWriting} />
               <Stack.Screen name="PastDailyJournals" component={PastDailyJournals} />
               <Stack.Screen name="PastCBTReview" component={PastCBTReview} />
            </Stack.Group>
              </>
              :
              <>
              
            <Stack.Screen name='Onboarding' component={OnBoarding} />
            <Stack.Group screenOptions={{presentation:'modal'}}>
            <Stack.Screen name="Paywall" component={Paywall} />
            </Stack.Group>
            <Stack.Screen name="Reminder" component={ReminderScreen} />
            </>
              }
            </>




           ) }

        </Stack.Navigator>
    </NavigationContainer>
    </HapticsProvider>
    </AuthProvider>
    </AppContext.Provider>
    
  );
}

