# ✅ Task Master App (React Native CLI)

A simple and efficient task manager mobile application built with **React Native CLI**. This app allows users to create, edit, delete, and manage tasks with completion tracking. It includes navigation between multiple screens, persistent storage using AsyncStorage, and a clean, user-friendly UI.

---

## 🧠 Features

- Add, edit, delete, and view tasks.
- Mark tasks as completed or pending.
- **Filter Tasks**: Filter tasks based on their status (e.g., completed, pending).
- Track total and completed tasks.
- Profile screen with task stats and progress bar.
- AsyncStorage integration for local persistence.
- Custom bottom navigation bar.
- Optimized for Android (works on iOS with additional setup).

---

## 🛠️ Project Setup Instructions

### ⚙️ Environment Setup

Make sure you have the following installed globally:

- **Node.js**
- **Java JDK (11 or 17 recommended)**
- **Android Studio (for Android SDK + Emulator)**
- **React Native CLI**

```bash
npm install -g react-native-cli
```

### 🔧 Clone and Install

```bash
git clone https://github.com/navonsanjuni/MobileToDo.git
 cd mobile_app
npm install
```

---

## 📱 Run the App on Android (Development Mode)

1. Start Metro bundler:
```bash
npx react-native start
```

2. In a new terminal, run the app:
```bash
npx react-native run-android
```

> ✅ Make sure your Android emulator is running OR a device is connected via USB with USB debugging enabled.

---

## 📦 Generate APK for Production

1. Navigate to the `android` directory:
```bash
cd android
```

2. Clean the previous build (optional):
```bash
./gradlew clean
```

3. Generate the release APK:
```bash
./gradlew assembleRelease
```


## 🎨 Figma Design

[Figma UI Design](https://www.figma.com/design/rHRTMg2Jp1XOgm3q6DdjHs/ToDoMobileApp?node-id=0-1&p=f&t=hZt8sdH2fgeToPY9-0) 

---

## 🎥 Demo Video

[Watch Demo]()

---

## 💬 Acknowledgements

Big thanks to everyone who supported this journey ❤️

---

## 📩 Contact

For questions, suggestions, or feedback, feel free to reach out via GitHub or navonsanjuni178@gmail.com
