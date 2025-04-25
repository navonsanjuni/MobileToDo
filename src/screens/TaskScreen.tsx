import React, { useState, useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert, Image } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import TaskComponent from "../components/TaskComponents";
import { colors } from "../theme/color";
import useTask from "../hooks/useTask";
import { Plus, Filter } from "react-native-feather";

type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, "Tasks">;

interface TaskScreenProps {
  navigation: TaskScreenNavigationProp;
}

type FilterType = "all" | "completed" | "pending";

const TaskScreen: React.FC<TaskScreenProps> = ({ navigation }) => {
  const { tasks, toggleComplete, removeTask, getCompletedTasks, getPendingTasks } = useTask();
  const [filterType, setFilterType] = useState<FilterType>("all");

  // Add profile icon to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileIcon}>
          <Image source={require("../assets/icons/profile.jpg")} style={styles.profileImage} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleAddTask = () => {
    navigation.navigate("CreateTask");
  };

  const handleEditTask = (id: string) => {
    navigation.navigate("EditTask", { taskId: id });
  };

  const handleViewTask = (id: string) => {
    navigation.navigate("TaskDetail", { taskId: id });
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => removeTask(id),
        style: "destructive",
      },
    ]);
  };

  const getFilteredTasks = () => {
    switch (filterType) {
      case "completed":
        return getCompletedTasks();
      case "pending":
        return getPendingTasks();
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filterType === "all" && styles.activeFilter]}
            onPress={() => setFilterType("all")}
          >
            <Text style={[styles.filterText, filterType === "all" && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === "pending" && styles.activeFilter]}
            onPress={() => setFilterType("pending")}
          >
            <Text style={[styles.filterText, filterType === "pending" && styles.activeFilterText]}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === "completed" && styles.activeFilter]}
            onPress={() => setFilterType("completed")}
          >
            <Text style={[styles.filterText, filterType === "completed" && styles.activeFilterText]}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Filter width={60} height={60} color={colors.lightGray} />
          <Text style={styles.emptyText}>No tasks found</Text>
          <Text style={styles.emptySubtext}>
            {filterType === "all" ? "Add a new task to get started" : `No ${filterType} tasks available`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskComponent
              id={item.id}
              title={item.title}
              description={item.description}
              completed={item.completed}
              createdAt={item.createdAt}
              onToggleComplete={toggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onPress={handleViewTask}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
        <Plus width={24} height={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  profileIcon: {
    marginRight: 16,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkGray,
    marginRight: 12,
  },
  filterButtons: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: colors.lightGray,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkGray,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default TaskScreen;
