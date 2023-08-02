import { configureStore } from "@reduxjs/toolkit";
import { statSlice } from "./reducer";

/** store.js allows us to create multiple slices that handle different states if needed. In our case, we only need one. */
const store = configureStore({
    reducer: {
        stats: statSlice.reducer
    }
});

/** This store is being imported inside index.js and being passed as a property within the Provider component thats
 *  wrapping the App component. This allows all components within App to use the reducers within store.
 */
export default store;