import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"
import { colors } from "../theme/color"

interface ButtonProps {
  title: string
  onPress: () => void
  type?: "primary" | "secondary" | "danger"
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case "secondary":
        return styles.secondaryButton
      case "danger":
        return styles.dangerButton
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = () => {
    switch (type) {
      case "secondary":
        return styles.secondaryText
      default:
        return styles.buttonText
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabledButton, fullWidth && styles.fullWidth]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === "secondary" ? colors.primary : colors.white} />
      ) : (
        <Text style={[getTextStyle(), disabled && styles.disabledText]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  disabledText: {
    color: colors.gray,
  },
  fullWidth: {
    width: "100%",
  },
})

export default ButtonComponent
