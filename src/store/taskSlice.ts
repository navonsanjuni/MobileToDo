import { createSlice, createEntityAdapter, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { loadTasksFromStorage, saveTasksToStorage } from "../utils/storage"

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt?: string
}

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
})

export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const tasks = await loadTasksFromStorage()
  return tasks
})

const initialState = tasksAdapter.getInitialState()

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        tasksAdapter.addOne(state, action.payload)
        saveTasksToStorage(Object.values(state.entities).filter(Boolean) as Task[])
      },
      prepare: (task: Omit<Task, "id">) => {
        const id = Date.now().toString()
        return { payload: { ...task, id } }
      },
    },
    updateTask: (state, action) => {
      tasksAdapter.updateOne(state, action.payload)
      saveTasksToStorage(Object.values(state.entities).filter(Boolean) as Task[])
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      tasksAdapter.removeOne(state, action.payload)
      saveTasksToStorage(Object.values(state.entities).filter(Boolean) as Task[])
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.entities[action.payload]
      if (task) {
        tasksAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            completed: !task.completed,
            updatedAt: new Date().toISOString(),
          },
        })
        saveTasksToStorage(Object.values(state.entities).filter(Boolean) as Task[])
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload)
    })
  },
})

export const { addTask, updateTask, deleteTask, toggleTaskCompletion } = taskSlice.actions

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors<RootState>((state) => state.tasks)

export default taskSlice.reducer
