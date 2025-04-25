import React from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar, ImageBackground } from "react-native";
import ButtonComponent from "../components/ButtonComponents";
import { colors } from "../theme/color";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { loadTasks } from "../store/taskSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Load tasks from storage when app starts
    dispatch(loadTasks());
  }, [dispatch]);

  const handleGetStarted = () => {
    console.log("Navigating to Tasks screen");
    navigation.replace("Tasks"); // Navigate to the Tasks screen
  };

  return (
    <ImageBackground
      source={require("../assets/images/rembg.jpeg")} // Replace with your background image path
      style={styles.background}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../assets/images/placeholder.jpg")} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Welcome to TaskMaster</Text>
          <Text style={styles.subtitle}>Organize your tasks efficiently and boost your productivity</Text>
        </View>
        <View style={styles.footer}>
          <ButtonComponent title="Get Started" onPress={handleGetStarted} fullWidth />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay for better readability
    padding: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    width: "100%",
    marginTop: 14,
  },
});

export default WelcomeScreen;