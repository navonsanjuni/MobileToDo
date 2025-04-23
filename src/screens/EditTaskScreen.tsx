

import type React from "react"
import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../navigation/AppNavigator"
import InputComponent from "../components/InputComponents"
import ButtonComponent from "../components/ButtonComponents"
import { colors } from "../theme/color"
import useTask from "../hooks/useTask"

type EditTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, "EditTask">
type EditTaskScreenRouteProp = RouteProp<RootStackParamList, "EditTask">

interface EditTaskScreenProps {
  navigation: EditTaskScreenNavigationProp
  route: EditTaskScreenRouteProp
}

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({ navigation, route }) => {
  const { taskId } = route.params
  const { getTaskById, editTask } = useTask()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleError, setTitleError] = useState("")

  useEffect(() => {
    const task = getTaskById(taskId);
    console.log("Fetched task:", task);
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    } else {
      Alert.alert("Error", "Task not found", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
  }, []);

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

  const handleUpdateTask = () => {
    console.log("Saving task:", { title, description });
    if (!title.trim()) {
      Alert.alert("Error", "Task title cannot be empty");
      return;
    }
  
    editTask(taskId, title.trim(), description.trim());
    Alert.alert("Success", "Task updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };
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
          <ButtonComponent title="Update Task" onPress={handleUpdateTask} fullWidth />

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

export default EditTaskScreen
