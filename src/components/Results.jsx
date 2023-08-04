import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../theme';
import { Box } from '@mui/material';


const Results = () => {
	const burnCalories = useSelector(state => state.stats.burnCalories);
	const activities = useSelector(state => state.stats.activities);

	console.log('burnCalories', burnCalories);
	console.log('activities array', activities);

	return (
		<Box sx={{width: 350, height: 500, display: 'flex', flexDirection: 'column'}}>
			<div className="conditional-container-1">
				<div className="burn-box">
					<Typography  sx={{ fontWeight: 'bold'}}>
						You need to burn
					</Typography>

					<Typography sx={{ fontWeight: 'bold' }} color="primary">
						{burnCalories}
					</Typography>

					<Typography sx={{ fontWeight: 'bold'}}>calories per day to reach your target weight</Typography>
				</div>
				<div className="exercise-box">
					<p>
						<Typography sx={{ fontWeight: 'bold'}}>That's roughly... </Typography>
					<Typography sx={{ fontWeight: 'bold' }} color="secondary">
						{activities[0]}
					</Typography>
					<p>minutes of daily running</p>
					</p>
					<p>
					<Typography sx={{ fontWeight: 'bold' }} color="secondary">
						{activities[1]}
					</Typography>
					<p>minutes of walking, or</p>
					</p>
					<p>
					<Typography sx={{ fontWeight: 'bold' }} color="secondary">
						{activities[2]}
					</Typography>
					<p>minutes of bicycling!</p>
					</p>
				</div>
			</div>
		</Box>
	);
};

export default Results;
