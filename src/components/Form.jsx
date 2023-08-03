import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStats } from '../reducer.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const Form = () => {
	/**================================================= */
	// don't delete these
	const [alignment, setAlignment] = useState('web');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	/**================================================= */
	const dispatch = useDispatch();

	/** Initial GET request for previously saved user data */
	useEffect(() => {
		fetch('/stats')
		.then(res => res.json())
		.then(data => {
			dispatch(updateStats({
				age: data.age,
				height: data.height,
				weight: data.weight,
				sex: data.sex,
				goal: data.goal
			}));
		})
	}, []);

	/** Dispatch action to update state and send PATCH request to update DB */
	const handleCalculate = () => {
		dispatch(updateStats({
			age: document.querySelector('#age').value,
			height: document.querySelector('#height').value,
			weight: document.querySelector('#weight').value,
			sex: document.querySelector('#sex').value,
			goal: document.querySelector('#goal').value,
			calories: document.querySelector('#calories').value,
			days: document.querySelector('#days').value,
			activityLevel: document.querySelector('#activityLevel').value
		}));
	}

	return (
		<div>
			<div> {/** old code */}
			{/* <div className="stats-outer-container">
				<div className="stats-container">
					{' '}
					Your current weight:{' '}
					<span style={{ fontWeight: 'bold' }}>{weight} lbs</span>
				</div>
				<div className="stats-container">
					{' '}
					Your target weight:{' '}
					<span style={{ fontWeight: 'bold' }}>{goal} lbs</span>
				</div>
				<div className="stats-container">
					{' '}
					How many <strong style={{ display: 'inline' }}>calories</strong> do
					you eat a day on average?
					<input
						className="stats-input"
						onChange={(e) => {
							setCalories(Number(e.target.value));
							setAnimate(false);
						}}
					></input>
				</div>
				<div className="stats-container">
					{' '}
					In how many <strong>days</strong> do you want to achieve your goal?
					<input
						className="stats-input"
						onChange={(e) => {
							setDays(Number(e.target.value));
							setAnimate(false);
						}}
					></input>
				</div>
				<div className="stats-container">
					{' '}
					On a scale of <strong>1 - 5</strong> what is your activity level?
					<input
						className="stats-input"
						onChange={(e) => {
							setActivityLevel(Number(e.target.value));
							setAnimate(false);
						}}
					></input>
				</div>
			</div> */}
			</div>
			<Stack
				spacing={3}
				sx={{
					width: '480px',
				}}
			>
				<FormControl>
					<FormLabel>Sex</FormLabel>
					<RadioGroup
						id="sex"
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
					>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel 
							value="male" 
							control={<Radio />} 
							label="Male" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel>I am {age} years old</FormLabel>

					<Slider
						id="age"
						defaultValue={age}
						onChange={(e) => setAge(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>My Height: {height} ft</FormLabel>

					<Slider
						id="height"
						defaultValue={height}
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
						defaultValue={age}
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
						defaultValue={goal}
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
							type="number"
							// value={firstName}
							// onChange={(e) => setFirstName(e.target.value)}
							placeholder="calories"
						></TextField>
					</FormControl>
					<FormControl>
						<FormLabel>Days to achieve goal</FormLabel>
						<TextField
							id="days"
							type="number"
							// value={lastName}
							// onChange={(e) => setLastName(e.target.value)}
							placeholder="Days"
						></TextField>
					</FormControl>
				</Grid>
				<ToggleButtonGroup
					id="activityLevel"
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Activity"
				>
					<ToggleButton value="1">Sedentary</ToggleButton>
					<ToggleButton value="3">Moderate</ToggleButton>
					<ToggleButton value="5">Active</ToggleButton>
				</ToggleButtonGroup>
				<Button variant="contained" onClick={handleCalculate}>Calculate</Button>
			</Stack>
		</div>
	);
};

export default Form;
