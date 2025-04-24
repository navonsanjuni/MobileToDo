import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../theme/color";
import useTask from "../hooks/useTask";

const ProfileScreen: React.FC = () => {
  const { tasks } = useTask();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require("../assets/images/profile.jpg")} style={styles.profileImage} />
        <Text style={styles.name}>Navon Sanjuni</Text>
        <Text style={styles.email}>navonsanjuni178@gmail.com</Text>
        <Text style={styles.bio}>
          A passionate developer who loves building mobile apps and solving real-world problems.
        </Text>
      </View>

      {/* Task Analysis Section */}
      <View style={styles.taskAnalysisSection}>
        <Text style={styles.taskAnalysisTitle}>Task Analysis</Text>
        <View style={styles.taskStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  taskAnalysisSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskAnalysisTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  taskStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 4,
  },
});

export default ProfileScreen;