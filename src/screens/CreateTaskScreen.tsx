

import type React from "react"
import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import InputComponent from "../components/InputComponents"
import ButtonComponent from "../components/ButtonComponents"
import { colors } from "../theme/color"
import useTask from "../hooks/useTask"

type CreateTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, "CreateTask">

interface CreateTaskScreenProps {
  navigation: CreateTaskScreenNavigationProp
}

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleError, setTitleError] = useState("")
  const { createTask } = useTask()

  const validateForm = () => {
    let isValid = true

    if (!title.trim()) {
      setTitleError("Task title is required")
      isValid = false
    } else {
      setTitleError("")
    }

    return isValid
  }

  const handleCreateTask = () => {
    if (validateForm()) {
      createTask(title.trim(), description.trim())
      Alert.alert("Success", "Task created successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <InputComponent
          label="Task Title"
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          error={titleError}
        />

        <InputComponent
          label="Description (Optional)"
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonContainer}>
          <ButtonComponent title="Create Task" onPress={handleCreateTask} fullWidth />

          <ButtonComponent title="Cancel" onPress={() => navigation.goBack()} type="secondary" fullWidth />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
})

export default CreateTaskScreen
