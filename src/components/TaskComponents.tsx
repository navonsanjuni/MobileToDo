import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { colors } from "../theme/color"
import { CheckCircle, Circle, Edit2, Trash2 } from "react-native-feather"

interface TaskProps {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  onToggleComplete: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onPress: (id: string) => void
}

const TaskComponent: React.FC<TaskProps> = ({
  id,
  title,
  description,
  completed,
  createdAt,
  onToggleComplete,
  onEdit,
  onDelete,
  onPress,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <TouchableOpacity
      style={[styles.container, completed && styles.completedContainer]}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => onToggleComplete(id)}>
        {completed ? (
          <CheckCircle width={24} height={24} color={colors.primary} />
        ) : (
          <Circle width={24} height={24} color={colors.primary} />
        )}
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, completed && styles.completedText]} numberOfLines={1}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.description, completed && styles.completedText]} numberOfLines={2}>
            {description}
          </Text>
        )}
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(id)}>
          <Edit2 width={18} height={18} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(id)}>
          <Trash2 width={18} height={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: colors.lightGray,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.gray,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.gray,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
})

export default TaskComponent
