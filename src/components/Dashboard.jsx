import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStats } from '../reducer.js';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Form from './Form';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar';
import Results from './Results';

const Dashboard = () => {
  const dispatch = useDispatch();
  /** NOTE: dependency for useEffect may need to change. */
 	/** Initial GET request for previously saved user data */
   useEffect(() => {
		fetch('/stats')
		.then(res => res.json())
		.then(data => {
      if(data.age !== null && data.sex !== null) {
        dispatch(updateStats({
          age: data.age,
          height: data.height,
          weight: data.weight,
          sex: data.sex,
          goal: data.goal
        }));
      }
		})
	}, []);

  /** This will get cleaned up to essentially return our 3 sub-components (NavBar, Form, Results). A lot of the ternary logic within this
   *  will also get refactored since all of them are dependent on the useStates above that are mostly getting deleted. Some of the written
   *  code here could be re-used in the appropriate component, but this is largely dependent on how we are handling MUI.
   */
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
      <div> {/** old code */}
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
		</div>
	);
};

export default Dashboard;