import { combineReducers } from "@reduxjs/toolkit";
import todoSlice  from "../features/todo/todoSlice";

const rootReducer = combineReducers({
todo : todoSlice
});

export default rootReducer;
