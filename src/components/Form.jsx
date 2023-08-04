import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStats } from '../reducer.js';
// import { useForm, Controller} from 'react-hook-form'; 


import {Box, Button, FormControl, FormControlLabel, FormLabel, Grid , Radio, RadioGroup, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';


/** NOTE: document.querySelector is not grabing values of sliders, buttons, or radioGroup within MUI.
 *  		Consider using local state to manage this.
 */
const Form = () => {

	//Implementing React-Hook-Form
	// const {register, handleSubmit, watch, formState: {errors} } = useForm();
	
	// const onSubmit = (data) => {
	// 	console.log(data); 
	// } 

	//

	const dispatch = useDispatch();

	/** useSelector for grabbing previous/default values */
	const ageDefault = useSelector(state => state.stats.age);
	const heightDefault = useSelector(state => state.stats.height);
	const weightDefault = useSelector(state => state.stats.weight);
	const sexDefault = useSelector(state => state.stats.sex);	
	const goalDefault = useSelector(state => state.stats.goal);
	console.log(ageDefault, heightDefault, weightDefault, sexDefault, goalDefault);

	/** Declare local state to manage dynamic rendering of values */
	const [age, setAge] = useState(ageDefault);
	const [height, setHeight] = useState(heightDefault);
	const [weight, setWeight] = useState(weightDefault);
	const [goal, setGoal] = useState(goalDefault);
	const [sex, setSex] = useState(sexDefault); 
	const [calories, setCalories] = useState(0); 
	const [days, setDays] = useState(0); 
	const [burnCalories, setBurnCalories] = useState(0);
	const [activities, setActivities] = useState([]);
	const [alignment, setAlignment] = useState(1);


	const calculateCalories = () => {
		const metabolicRate = sex === 'male' ? 
			66.47 + (6.24 * Number(weight)) + (12.7 * Number(height)) - (6.755 * Number(age)) 
			: 655.1 + (4.35 * Number(weight)) + (4.7 * Number(height)) - (4.7 * Number(age));
		const totalWeightLossCalories = (Number(weight) - Number(goal)) * 3500;
		const dailyWeightLossCalories = totalWeightLossCalories / Number(days);
		let activity = 0;
	 
		switch (alignment) {
		  case 1:
			activity = 1.2;
			break;
		  case 3:
			activity = 1.55;
			break;
		  case 5:
			activity = 1.9;
			break;
		  default:
			activity = 1.4;
		}

		let dailyBurnCalories = Math.floor(dailyWeightLossCalories + Number(calories) - metabolicRate * activity);
		if (dailyBurnCalories < 0) {
			dailyBurnCalories = 0;
		}
		
		const minutes = dailyBurnCalories / (3.5 * weight * 0.45 / 200);
		setActivities([Math.floor(minutes / 11.5), Math.floor(minutes / 2), Math.floor(minutes / 8)]);
		// dailyBurnCalories = dailyBurnCalories;
		setBurnCalories(dailyBurnCalories);
	}

	useEffect(() => {
		calculateCalories();
	}, [age, height, weight, sex, goal, days, calories, alignment]); 
	/** Dispatch action to update state and send PATCH request to update DB */
	const handleCalculate = () => {
		/** NOTE: updateStats needs to change to reflect data being passed to backend */
	
		const stats = {age: age, 
		height: height,
		weight: weight,
		sex: sex,
		goal: goal,
		calories: calories,
		days: days,
		activityLevel: activityLevel,
		burnCalories: burnCalories, 
		activities: activities}
		console.log("stats", stats); 
		
		dispatch(updateStats({
			age: age, 
			height: height,
			weight: weight,
			sex: sex,
			goal: goal,
			calories: calories,
			days: days,
			activityLevel: activityLevel,
			burnCalories: burnCalories, 
			activities: activities 
		}));

		fetch('/stats', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				age: age,
				height: height,
				weight: weight,
				sex: sex,
				goal: goal,
			}),
		})
		.catch((err) => console.log('error occured: ', err));
	}

	/**================================================= */
	// don't delete these


  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
	/**================================================= */
	return (
		<Box sx={{ border: '3px solid #000', padding: '35px', borderRadius: '10px', width: 350, 
		height: 500}}>
		{/* <form onSubmit = {handleSubmit(onSubmit)} > */}
			<Stack
				spacing={3}
			>
				<FormControl>
					<FormLabel>Sex</FormLabel>
					<RadioGroup
						defaultValue={sexDefault}
						id="sex"
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						onChange = {(e) => setSex(e.target.value)}
					>
						<FormControlLabel
							value= 'female'
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel 
							value='male'
							control={<Radio />} 
							label="Male" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel>I am {age} years old</FormLabel>

					<Slider
						id="age"
						defaultValue={ageDefault}
						onChange={(e) => setAge(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>My Height: {height} ft</FormLabel>

					<Slider
						id="height"
						defaultValue={heightDefault}
						step={0.1}
						min={3}
						max={10}
						onChange={(e) => setHeight(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Current Weight {weight} lbs</FormLabel>

					<Slider
						id="weight"
						defaultValue={weightDefault}
						onChange={(e) => setWeight(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
						min={40}
						max={500}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Target Weight: {goal} lbs</FormLabel>
					<Slider
						id="goal"
						defaultValue={goalDefault}
						onChange={(e) => setGoal(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
						min={40}
						max={500}
					/>
				</FormControl>
				<Grid spacing={2}>
					<FormControl>
						<FormLabel>Daily calorie intake</FormLabel>
						<TextField
							id="calories"
							label="calories"
							type="number"
							onChange = {(e) => setCalories(e.target.value)}
							// {...register("calories")}
							// value={firstName}
							// onChange={(e) => setFirstName(e.target.value)}
							placeholder="calories"
						></TextField>
					</FormControl>
					<FormControl>
						<FormLabel>Days to achieve goal</FormLabel>
						<TextField
							id="days"
							label="days"
							onChange = {(e) => setDays(e.target.value)}
							type="number"
							// {...register('days')}
							// value={lastName}
							// onChange={(e) => setLastName(e.target.value)}
							placeholder="Days"
						></TextField>
					</FormControl>
				</Grid>
				<ToggleButtonGroup
					id="activityLevel"
					label="activityLevel"
					onChange = {handleChange}
					color="primary"
					value={alignment}
					exclusive
					aria-label="Activity"
					// {...register('activityLevel')}
				>
					<ToggleButton value="1">Sedentary</ToggleButton>
					<ToggleButton value="3">Moderate</ToggleButton>
					<ToggleButton value="5">Active</ToggleButton>
				</ToggleButtonGroup>
				<Button variant="contained" onClick={handleCalculate}>Calculate</Button>
			</Stack>
		{/* </form> */}
		</Box>
	);
};

export default Form;
