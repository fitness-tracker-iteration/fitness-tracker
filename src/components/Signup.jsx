import { FormControl, FormLabel } from '@mui/material';
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();

	const handleSignup = () => {
		fetch('/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: document.querySelector('#username').value,
				password: document.querySelector('#password').value,
				firstName: document.querySelector('#firstName').value,
				lastName: document.querySelector('#lastName').value
			}),
		})
		.then(res => res.json())
		.then(data => {
            console.log("resdata", data)
			// if(data.user) {
				navigate('/');
			// } else {
			// 	navigate('/signup');	//need some sort of alert that signup failed
			// }
		})
		.catch(err => console.log('error occured: ', err));
	}

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
							id="firstName"
							type="firstName"
							// value={firstName}
							// onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name..."
						></TextField>
					</FormControl>
					<FormControl>
						<FormLabel>Last Name</FormLabel>
						<TextField
							id="lastName"
							type="text"
							// value={lastName}
							// onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name..."
						></TextField>
					</FormControl>
				</Grid>
				<FormControl>
					<FormLabel>Username</FormLabel>
					<TextField
						id="username"
						type="text"
						// value={username}
						// onChange={(e) => setUsername(e.target.value)}
						placeholder="Username..."
					></TextField>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<TextField
						id="password"
						type="password"
						// value={password}
						// onChange={(e) => setPassword(e.target.value)}
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
