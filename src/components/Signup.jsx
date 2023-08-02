import { FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [isSuccess, setisSuccess] = useState(true);
	const [age, setAge] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [sex, setSex] = useState('');
	const [goal, setGoal] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSignup = async () => {
		console.log(sex);
		if (
			(sex !== 'male' && sex !== 'female') ||
			(isNaN(Number(age)) &&
				isNaN(Number(height)) &&
				isNaN(Number(weight)) &&
				isNaN(Number(goal)))
		) {
			setisSuccess(false);
			return;
		}

		const obj = {
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName,
			age: Number(age),
			sex: sex,
			height: Number(height),
			weight: Number(weight),
			goal: Number(goal),
		};
		console.log(obj);
		try {
			const response = await fetch('/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			});
			const data = await response.json();
			if (response.ok) navigate('/main');
		} catch (error) {
			console.log(error);
		}
		navigate('/main');
		return obj;
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Sign Up
			</Typography>
			<Stack spacing={3}>
				<Grid spacing={2}>
					<FormControl>
						<FormLabel>First Name</FormLabel>
						<TextField
							type="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name..."
						></TextField>
					</FormControl>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<TextField
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name..."
						></TextField>
					</FormControl>
				</Grid>
				<FormControl>
					<FormLabel>Username</FormLabel>
					<TextField
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username..."
					></TextField>
				</FormControl>
				<FormControl>
					<FormLabel>password</FormLabel>
					<TextField
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password..."
					></TextField>
				</FormControl>
				<Button onClick={handleSignup} variant="contained">
					Sign Up
				</Button>
				<Typography variant="subtitle1" gutterBottom>
					Already got an account? Log in
				</Typography>
			</Stack>
		</div>
	);
};

export default Signup;
