import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import ButtonComponent from "../components/ButtonComponents";
import { colors } from "../theme/color";
import useTask from "../hooks/useTask";
import type { Task } from "../store/taskSlice";
import { Calendar, Clock, CheckCircle, Circle } from "react-native-feather";

type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "TaskDetail">;
type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

interface TaskDetailScreenProps {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
}

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ navigation, route }) => {
  const { taskId } = route.params;
  const { getTaskById, toggleComplete, removeTask } = useTask();
  const [task, setTask] = useState<Task | null>(null);

  // Fetch the task when the screen is loaded
  useEffect(() => {
    const taskData = getTaskById(taskId);
    if (taskData) {
      setTask(taskData);
    } else {
      // Navigate back to the TaskScreen if the task is not found
      navigation.navigate("Tasks");
    }
  }, [taskId, getTaskById, navigation]);

  const handleToggleComplete = () => {
    if (task) {
      toggleComplete(task.id);
      setTask({
        ...task,
        completed: !task.completed,
      });
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditTask", { taskId });
  };

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          removeTask(taskId);
          Alert.alert("Success", "Task deleted successfully", [
            { text: "OK", onPress: () => navigation.navigate("Tasks") },
          ]);
        },
        style: "destructive",
      },
    ]);
  };

  if (!task) {
    return null; // Render nothing if the task is not found
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.statusContainer}>
            {task.completed ? (
              <CheckCircle width={20} height={20} color={colors.success} />
            ) : (
              <Circle width={20} height={20} color={colors.warning} />
            )}
            <Text style={[styles.statusText, task.completed ? styles.completedText : styles.pendingText]}>
              {task.completed ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description || "No description provided"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailRow}>
            <Calendar width={18} height={18} color={colors.darkGray} />
            <Text style={styles.detailText}>Created: {formatDate(task.createdAt)}</Text>
          </View>

          {task.updatedAt && (
            <View style={styles.detailRow}>
              <Clock width={18} height={18} color={colors.darkGray} />
              <Text style={styles.detailText}>Last Updated: {formatDate(task.updatedAt)}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={task.completed ? "Mark as Pending" : "Mark as Completed"}
            onPress={handleToggleComplete}
            type={task.completed ? "secondary" : "primary"}
            fullWidth
          />

          <ButtonComponent title="Edit Task" onPress={handleEdit} type="secondary" fullWidth />

          <ButtonComponent title="Delete Task" onPress={handleDelete} type="danger" fullWidth />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  completedText: {
    color: colors.success,
  },
  pendingText: {
    color: colors.warning,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkGray,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.darkGray,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
});

export default TaskDetailScreen;