import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Task } from "../store/taskSlice"

const TASKS_STORAGE_KEY = "@TaskMaster:tasks"

export const saveTasksToStorage = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks)
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue)
  } catch (error) {
    console.error("Error saving tasks to storage:", error)
  }
}

export const loadTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : []
  } catch (error) {
    console.error("Error loading tasks from storage:", error)
    return []
  }
}

export const clearTasksFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing tasks from storage:", error)
  }
}
