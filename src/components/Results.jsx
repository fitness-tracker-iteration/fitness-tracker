import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
	/** useSelector for grabbing state which will get inputted to calcCal func */
	const age = useSelector(state => state.stats.age);
	const height = useSelector(state => state.stats.height);
	const weight = useSelector(state => state.stats.weight);
	const sex = useSelector(state => state.stats.sex);	
	const goal = useSelector(state => state.stats.goal);
	const calories = useSelector(state => state.stats.calories);
	const days = useSelector(state => state.stats.days);
	const activityLevel = useSelector(state => state.stats.activityLevel);
	// console.log(state, age, height, weight, sex, goal, calories, days, activityLevel)

	/** Declare local state to manage dynamic rendering of output values of func */
	const [burnCalories, setBurnCalories] = useState('');
	const [activities, setActivities] = useState([]);

	/** calculateCalories: This function takes in state variables and outputs new local state */
	const calculateCalories = () => {
		const metabolicRate = sex === 'male' ? 
			66.47 + (6.24 * Number(weight)) + (12.7 * Number(height)) - (6.755 * Number(age)) 
			: 655.1 + (4.35 * Number(weight)) + (4.7 * Number(height)) - (4.7 * Number(age));
		const totalWeightLossCalories = (Number(weight) - Number(goal)) * 3500;
		const dailyWeightLossCalories = totalWeightLossCalories / Number(days);
		let activity = 0;
	 
		switch (activityLevel) {
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
		dailyBurnCalories = dailyBurnCalories;
		setBurnCalories(dailyBurnCalories);
	}
    /** NOTE: dependency for useEffect may need to change. */
	useEffect(calculateCalories, []);
	// console.log(burnCalories, activities);

	return (
		<div>
			<div className="conditional-container-1">
				<div className="burn-box">
					<p>You need to burn</p>

					<p>{burnCalories}</p>

					<p>calories per day to reach your target weight</p>
				</div>
				<div className="exercise-box">
					<p>
						That's roughly <p>{activities[0]}</p>
						minutes of daily running
					</p>
					<p>
						<p>{activities[1]}</p>
						minutes of walking, or
					</p>
					<p>
						<p>{activities[2]}</p>
						minutes of bicycling!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Results;
