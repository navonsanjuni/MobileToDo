"use client"

import { useDispatch, useSelector } from "react-redux"
import {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  selectAllTasks,
  selectTaskById,
} from "../store/taskSlice"
import type { Task } from "../store/taskSlice"
import type { AppDispatch, RootState } from "../store/store"
import { useCallback } from "react"

export const useTask = () => {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector(selectAllTasks)

  const getTaskById = useCallback((id: string) => {
    return useSelector((state: RootState) => selectTaskById(state, id))
  }, [])

  const taskByIdSelector = useCallback((id: string) => {
    return (state: RootState) => selectTaskById(state, id)
  }, [])

  const getTask = useCallback(
    (id: string) => {
      return useSelector(taskByIdSelector(id))
    },
    [taskByIdSelector],
  )

  const createTask = useCallback(
    (title: string, description?: string) => {
      const newTask: Omit<Task, "id"> = {
        title,
        description: description || "",
        completed: false,
        createdAt: new Date().toISOString(),
      }

      dispatch(addTask(newTask))
    },
    [dispatch],
  )

  const editTask = useCallback(
    (id: string, title: string, description?: string) => {
      dispatch(
        updateTask({
          id,
          changes: {
            title,
            description: description || "",
            updatedAt: new Date().toISOString(),
          },
        }),
      )
    },
    [dispatch],
  )

  const removeTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id))
    },
    [dispatch],
  )

  const toggleComplete = useCallback(
    (id: string) => {
      dispatch(toggleTaskCompletion(id))
    },
    [dispatch],
  )

  const getCompletedTasks = useCallback(() => {
    return tasks.filter((task) => task.completed)
  }, [tasks])

  const getPendingTasks = useCallback(() => {
    return tasks.filter((task) => !task.completed)
  }, [tasks])

  return {
    tasks,
    getTaskById: getTask,
    createTask,
    editTask,
    removeTask,
    toggleComplete,
    getCompletedTasks,
    getPendingTasks,
  }
}

export default useTask
