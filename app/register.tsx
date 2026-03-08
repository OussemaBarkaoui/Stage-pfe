import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormTextInput from "./components/FormTextInput";
import PrimaryButton from "./components/PrimaryButton";
import { scale } from "../lib/responsive";

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Almost there", "Fill in all fields to continue.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Welcome", "Account created successfully.");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create Account</Text>

        <FormTextInput
          placeholder="First Name"
          placeholderTextColor="#666"
          value={firstName}
          onChangeText={setFirstName}
        />
        <FormTextInput
          placeholder="Last Name"
          placeholderTextColor="#666"
          value={lastName}
          onChangeText={setLastName}
        />
        <FormTextInput
          placeholder="Phone Number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <FormTextInput
          placeholder="Email Address"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordField}>
          <FormTextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={() => setPasswordVisible((prev) => !prev)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={scale(18)}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <FormTextInput
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <PrimaryButton
          label="Sign Up"
          onPress={handleRegister}
          style={styles.loginButton}
          textStyle={styles.loginText}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.ContinueWithGoogleButton}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require("../assets/Logogoogle.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.ContinueWithGoogleText}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.secondaryText}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },
  form: {
    gap: 10,
  },
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
    paddingRight: 60,
  },
  visibilityToggle: {
    position: "absolute",
    right: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: scale(26),
    fontWeight: "700",
    marginBottom: 24,
    color: "#111",
    textAlign: "center",
  },
  secondaryText: {
    textAlign: "center",
    color: "#111",
    fontSize: scale(14),
  },
  loginButton: {
    backgroundColor: "#f9b418",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginText: {
    color: "#9b1917",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  ContinueWithGoogleButton: {
    backgroundColor: "#ededed",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 12,
  },
  ContinueWithGoogleText: {
    color: "#383838",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
});
