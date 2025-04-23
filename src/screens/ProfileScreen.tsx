import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../theme/color";

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/profile.jpg")} style={styles.profileImage} />
      <Text style={styles.name}>Navon Sanjuni</Text>
      <Text style={styles.email}>navonsanjuni178@gmail.com</Text>
      <Text style={styles.bio}>
        A passionate developer who loves building mobile apps and solving real-world problems.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 16,
  },
  bio: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ProfileScreen;