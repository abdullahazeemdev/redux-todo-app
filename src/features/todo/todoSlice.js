import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    todos : []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo : (state,action) => {
        state.todos.push(action.payload)       
    },

    updateTodo : (state , action) => {
     const filterTodo = state.todos.find((todo) => todo.id == action.payload.id)

     if(filterTodo){
      filterTodo.title = action.payload.title
     }
    },
    deleteTodo : (state , action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },

    doneTodo : (state , action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)

      if(todo){
         todo.completed = !todo.completed
      }
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addTodo , updateTodo,deleteTodo,doneTodo } = todoSlice.actions

export default todoSlice.reducer