import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    todos : []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo : (state,action) => {
      console.log(action.payload)
        state.todos.push(action.payload)
        console.log(state.todos)
    },
    // editTodo : (state,action) => {},
    // deleteTodo : (state,action) => {},
  },
})

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions

export default todoSlice.reducer