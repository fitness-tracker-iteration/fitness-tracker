 /** Too much state! Much of this can be deleted since it is being handled by the reducer. Rerenders should be handled with
   *  the use of useSelector where it is needed.
   */
 const [age, setAge] = useState(0);
 const [height, setHeight] = useState(0);
 const [weight, setWeight] = useState(0);
 const [sex, setSex] = useState('');
 //this is the actual weight we need to change
 const [goal, setGoal] = useState(0);
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 //condition for rending the textbox
 const [updateWeight, setUpdateWeight] = useState(false);
 //saves the value in the text box
 const [weightInput, setWeightInput] = useState('');
 const [goalInput, setGoalInput] = useState('');
 const [calories, setCalories] = useState(0);
 const [days, setDays] = useState(0);
 const [activityLevel, setActivityLevel] = useState(0);
 const [calculate, setCalculate] = useState('');
 const [fieldsFilled, setFieldsFilled] = useState(false);
 const [displayCalculate, setDisplayCalculate] = useState(false);
 const [animate, setAnimate] = useState(false);
 const [updateWeightGoal, setUpdateWeightGoal] = useState(false);
 const [minutes, setMinutes] = useState(0);
 const navigate = useNavigate();   //this wont be necessary in the dashboard component anymore since we are not routing elsewhere.

 /** This AJAX request needs to be updated to reflect DB changes. Upon initial render, this AJAX should fetch the relevant saved
  *  data from a user's previous session.
  */
 useEffect(() => {
   fetch('/stats').then(response => response.json()).then(data => {
     console.log(data);
     setAge(data.age);
     setHeight(data.height);
     setWeight(data.weight);
     setSex(data.sex);
     setGoal(data.goal);
     setFirstName(data.firstName);
     setLastName(data.lastName);
   }).catch(error => {
     console.log(error);
   })
 }, []);

 /** This functionality can be refactored and moved to the NavBar component */
 const logout = async () => {
   try {
     const response = await fetch('/logout', {
       method: 'DELETE',

     })
     if (response.ok)
       navigate('/');
   } catch (error) {
     console.log(error);
   }
 }

 /** writeToDB and writeToDB2 will no longer be neccessary. This will be handled by state and given to the DB for storage upon
  *  a single AJAX PATCH request. ** See note at bottom of reducer.js **
  */
 const writeToDB = async () => {
   if (isNaN(Number(weightInput)))
     return;
   setWeight(Number(weightInput));
   try {
     const response = await fetch('/stats', {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ weight: Number(weightInput) })
     })
     const data = await response.json();
   } catch (error) {
     console.log(error);
   }
 }

 const writeToDB2 = async () => {
   if (isNaN(Number(goalInput)))
     return;
   setGoal(Number(goalInput));
   try {
     const response = await fetch('/stats', {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ goal: Number(goalInput) })
     })
     const data = await response.json();
   } catch (error) {
     console.log(error);
   }
 }
/************************************************************************************************************************ */

 /** This seems to be the function handling the state logic associated with showing results vs not showing results depending
  *  on if information is given. This type of functionality can get simplified and refactored inside the Results component.
  */
 const areFieldsFilled = () => {
   if (!calories || !days || !activityLevel) {
     setDisplayCalculate(false);

   }
   else {
     calculateCalories();
     setDisplayCalculate(true);

     setFieldsFilled(true);
   }
 }

 /** calculateCalories
  *    IN: age, height, weight, sex, goal, days, activityLevel --> obtained from state
  *    OUT: numberToString of calories needed to burn daily, a 'minutes' array that calculates approximate number of minutes
  *          of 3 different activities needed to burn that many calories
  *    NOTE: This function can largely stay intact. Much of it can be simplified, reduced down to just returning the numberToString
  *          and array of calculated minutes.
  */
 const calculateCalories = () => {
   console.log("calculating calories for : " + calories + " " + days + "days " + activityLevel + ' activityLevel');
   const metabolicRate = sex === 'male' ? 66.47 + (6.24 * Number(weight)) + (12.7 * Number(height)) - (6.755 * Number(age)) : 655.1 + (4.35 * Number(weight)) + (4.7 * Number(height)) - (4.7 * Number(age));

   const totalWeightLossCalories = (Number(weight) - Number(goal)) * 3500;
   const dailyWeightLossCalories = totalWeightLossCalories / Number(days);
   let activity = 0;

   switch (activityLevel) {
     case 1:
       activity = 1.2;
       break;
     case 2:
       activity = 1.375;
       break;
     case 3:
       activity = 1.55;
       break;
     case 4:
       activity = 1.725;
       break;
     case 5:
       activity = 1.9;
       break;
     default:
       activity = 1.4;
   }
   console.log(activity);
   let dailyBurnCalories = Math.floor(dailyWeightLossCalories + Number(calories) - metabolicRate * activity);
   if (dailyBurnCalories < 0) {
     dailyBurnCalories = 0;
   }


   const minutes = dailyBurnCalories / (3.5 * weight * 0.45 / 200);
   setMinutes([Math.floor(minutes / 11.5).toLocaleString("en-US"), Math.floor(minutes / 2).toLocaleString("en-US"), Math.floor(minutes / 8).toLocaleString("en-US")]);
   dailyBurnCalories = dailyBurnCalories.toLocaleString("en-US");
   setCalculate(dailyBurnCalories);
 }

 /** All the code below seems to be related to the animations set to run when displaying results. Again, this can be simplified and refactored
  *  within the Results component. Much of this is utilizing state in an egregious way, we can clean this up to be one function call (if that).
  */
 useEffect(() => {
   areFieldsFilled();
   setAnimate(true);
 }, [days, calories, activityLevel, weight, animate]);

 const toggleState = () => {
   if (updateWeight)
     writeToDB();
   setUpdateWeight(!updateWeight);

 }

 const toggleStateGoal = () => {
   if (updateWeightGoal)
     writeToDB2();
   setUpdateWeightGoal(!updateWeightGoal);
 }

 const handleEnterPress = (e) => {
   if (e.key === 'Enter') {
     setAnimate(false)
     toggleState();
   }
 }

 const handleEnterPressGoal = (e) => {
   if (e.key === 'Enter') {
     setAnimate(false)
     toggleStateGoal();

   }
 }
/*************************************************************************************************************************************** */

/** This function can stay. Its pure and serves a simple functionality within the UI. Can get rid of if not neccessary. */
 const getDate = () => {
   let today = new Date();
   let options = { year: 'numeric', month: 'long', day: 'numeric' };
   let formattedDate = today.toLocaleDateString('en-US', options);
   return formattedDate;

 }