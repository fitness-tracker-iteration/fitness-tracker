import { createSlice } from '@reduxjs/toolkit';

/** This object is what will be manipulated with Toolkit hooks and reducers. This can be thought of as the 'session database' handling the
 *  data thats being displayed to the user.
 */
const initialState = {
    age: 0,
    height: 0,
    weight: 0,
    sex: '',
    goal: 0,
    //the three properties below should only be held in state and not sent to DB! See note at bottom of file for when DB needs to be updated.
    calories: 0,
    days: 0,
    activityLevel: 0
};

/** The 'export' at the beginning of this const declaration designates it as a 'default' export so we can more easily import our slice
 *  elsewhere when needed. Ex. we are importing this slice to store.js
 *    
 *  NOTE: updateStats is currently the only "necessary" reducer since it is the only function dealing directly with state. Reducers
 *          inside Redux/Toolkit should be pure functions with no side effects. Any additional reducers made should follow this strictly.
 */
export const statSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        /** updateStats should be invoked after Form component inputs are filled out */
        updateStats: (state, action) => {
            //update state with action.payload --> action.payload should contain all keys in initialState that are being updated

        },
    }
});

/** This export allows us to directly call specific reducers within the component we need it in when dispatching actions for state change. */
export const { updateStats } = statSlice.actions;

/** NOTE FOR UPDATING DB WITH STATE: AJAX requests should be contained within the component it is needed. Using useEffect(), with
 *                                      a dependency of a dispatch invocation (or change in state), should be used when updating state 
 *                                      and coordinating an update to DB as well. At the very least, a single AJAX request to the DB 
 *                                      to PATCH should be made before logout or session end. To be safe, DB would be updated everytime 
 *                                      state is.
 */