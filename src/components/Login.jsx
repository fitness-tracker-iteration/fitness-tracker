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
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [isSuccess, setisSuccess] = useState(true);

	const handleLoginClick = async () => {
		// if (loginSuccess) {
		//   setisSuccess(!isSuccess)

		//   navigate('/main');
		// }
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: username, password: password }),
			});
			const data = await response.json();
			if (data.authenticated) navigate('/main');
		} catch (error) {
			console.log(error);
			setisSuccess(false);
		}
	};

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
