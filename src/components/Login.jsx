import { FormControl, FormLabel } from '@mui/material';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const handleLoginClick = () => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: document.querySelector('#username').value, password: document.querySelector('#password').value }),
		})
		.then(res => res.json())
		.then(data => {
			if(data.authenticated) {
				navigate('/main');
			} else {
				navigate('/signup');
			}
		})
		.catch(err => console.log('error occured: ', err));
	}

	const handleSignupClick = () => {
		navigate('/signup');
	};

	return (
		<div>
			<div>
				<Typography variant="h4" gutterBottom>
					Log in to your account
				</Typography>
				<Stack spacing={3}>
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
					<Button onClick={handleLoginClick} variant="contained">
						Log In
					</Button>
					<Typography variant="subtitle1" gutterBottom>
						Already got an account?{' '}
						<Link onClick={handleSignupClick}>Sign up</Link>
					</Typography>
				</Stack>
			</div>
		</div>
	);
};

export default Login;
