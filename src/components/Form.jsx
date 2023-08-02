import React, { useState } from 'react';

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
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const [age, setAge] = useState(21); // using this to read the age value and display to user
	const [height, setHeight] = useState(6.1);
	const [weight, setWeight] = useState(120);
	const [sex, setSex] = useState('');
	//this is the actual weight we need to change
	const [goal, setGoal] = useState(120);
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
	const navigate = useNavigate();

	// don't delete these
	const [alignment, setAlignment] = useState('web');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<div>
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
			<Stack
				spacing={3}
				sx={{
					width: '480px',
				}}
			>
				<FormControl>
					<FormLabel>Gender</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
					>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel value="male" control={<Radio />} label="Male" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel>I am {age} years old</FormLabel>

					<Slider
						defaultValue={age}
						onChange={(e) => setAge(e.target.value)}
						aria-label="Default"
						valueLabelDisplay="auto"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>My Height: {height} ft</FormLabel>

					<Slider
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
							id="calorie"
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
				<Button variant="contained">Calculate</Button>
			</Stack>
		</div>
	);
};

export default Form;
