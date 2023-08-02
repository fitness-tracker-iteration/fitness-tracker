import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Form from './Form';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar';
import Results from './Results';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
	const navigate = useNavigate();

	useEffect(() => {
		fetch('/stats')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAge(data.age);
				setHeight(data.height);
				setWeight(data.weight);
				setSex(data.sex);
				setGoal(data.goal);
				setFirstName(data.firstName);
				setLastName(data.lastName);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const logout = async () => {
		try {
			const response = await fetch('/logout', {
				method: 'DELETE',
			});
			if (response.ok) navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const writeToDB = async () => {
		if (isNaN(Number(weightInput))) return;
		setWeight(Number(weightInput));
		try {
			const response = await fetch('/stats', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ weight: Number(weightInput) }),
			});
			const data = await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const writeToDB2 = async () => {
		if (isNaN(Number(goalInput))) return;
		setGoal(Number(goalInput));
		try {
			const response = await fetch('/stats', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ goal: Number(goalInput) }),
			});
			const data = await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const areFieldsFilled = () => {
		if (!calories || !days || !activityLevel) {
			setDisplayCalculate(false);
		} else {
			calculateCalories();
			setDisplayCalculate(true);

			setFieldsFilled(true);
		}
	};

	const calculateCalories = () => {
		console.log(
			'calculating calories for : ' +
				calories +
				' ' +
				days +
				'days ' +
				activityLevel +
				' activityLevel'
		);
		const metabolicRate =
			sex === 'male'
				? 66.47 +
				  6.24 * Number(weight) +
				  12.7 * Number(height) -
				  6.755 * Number(age)
				: 655.1 +
				  4.35 * Number(weight) +
				  4.7 * Number(height) -
				  4.7 * Number(age);

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
		let dailyBurnCalories = Math.floor(
			dailyWeightLossCalories + Number(calories) - metabolicRate * activity
		);
		if (dailyBurnCalories < 0) {
			dailyBurnCalories = 0;
		}

		const minutes = dailyBurnCalories / ((3.5 * weight * 0.45) / 200);
		setMinutes([
			Math.floor(minutes / 11.5).toLocaleString('en-US'),
			Math.floor(minutes / 2).toLocaleString('en-US'),
			Math.floor(minutes / 8).toLocaleString('en-US'),
		]);
		dailyBurnCalories = dailyBurnCalories.toLocaleString('en-US');
		setCalculate(dailyBurnCalories);
	};

	useEffect(() => {
		areFieldsFilled();
		setAnimate(true);
	}, [days, calories, activityLevel, weight, animate]);

	const toggleState = () => {
		if (updateWeight) writeToDB();
		setUpdateWeight(!updateWeight);
	};

	const toggleStateGoal = () => {
		if (updateWeightGoal) writeToDB2();
		setUpdateWeightGoal(!updateWeightGoal);
	};

	const handleEnterPress = (e) => {
		if (e.key === 'Enter') {
			setAnimate(false);
			toggleState();
		}
	};

	const handleEnterPressGoal = (e) => {
		if (e.key === 'Enter') {
			setAnimate(false);
			toggleStateGoal();
		}
	};

	const getDate = () => {
		let today = new Date();
		let options = { year: 'numeric', month: 'long', day: 'numeric' };
		let formattedDate = today.toLocaleDateString('en-US', options);
		return formattedDate;
	};
	return (
		<div>
			<NavBar />
			<Container
				maxWidth="sm"
				sx={{
					padding: '60px',
				}}
			>
				<Box
					sx={{
						width: '1000px',
						display: 'flex',
						flexDirection: 'row',
						margin: '0 auto 0 auto',
					}}
				>
					<Form />
					<Results />
				</Box>
			</Container>

			{/* <div className="nav-bar">
				<div className="nav-bar-component">{getDate()}</div>
				<button
					className="nav-bar-component"
					id="update-weight-button"
					onClick={() => setUpdateWeight(!updateWeight)}
				>
					UPDATE WEIGHT
				</button>
				{updateWeight && (
					<input
						id="weight-input"
						className="nav-bar-component"
						type="text"
						onKeyDown={handleEnterPress}
						onChange={(e) => {
							setWeightInput(e.target.value);
						}}
						placeholder="Current Weight... "
					></input>
				)}

				<button
					className="nav-bar-component"
					id="update-goal-button"
					onClick={() => setUpdateWeightGoal(!updateWeightGoal)}
				>
					UPDATE GOAL
				</button>
				{updateWeightGoal && (
					<input
						id="goal-input"
						className="nav-bar-component"
						type="text"
						onKeyDown={handleEnterPressGoal}
						onChange={(e) => {
							setGoalInput(e.target.value);
						}}
						placeholder="Current Goal... "
					></input>
				)}
				<div className="nav-bar-component">{`${firstName} ${lastName}`}</div>
				<button
					className="nav-bar-component"
					id="log-out-button"
					onClick={logout}
				>
					Log Out
				</button>
			</div> */}
		</div>
	);
};

export default Dashboard;
