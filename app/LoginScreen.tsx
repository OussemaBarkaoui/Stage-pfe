import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.baseContainer}>
        <Image
          source={require("../assets/tarajistore.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>Sign In</Text>

        <FormTextInput
          placeholder="Email"
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
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#666"
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

        <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <PrimaryButton
          label="Login"
          onPress={handleLogin}
          style={styles.loginButton}
          textStyle={styles.loginText}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.ContinueWithGoogleButton}
        ><View style={styles.buttonContent}>
        <Image
          source={require("../assets/Logogoogle.png")} 
          style={styles.googleIcon}
        />
        <Text style={styles.ContinueWithGoogleText}>
          Continue with Google
        </Text>
      </View>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New here? <Link href="/register">Create an account</Link>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  baseContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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

  forgotPasswordText: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#1b1b1b",
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: "#f9b418",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  loginText: {
    color: "#9b1917",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
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
  image: {
    alignSelf: "center",
    marginBottom: scale(24),
  },
  title: {
    fontSize: scale(28),
    fontWeight: "700",
    marginBottom: scale(60),
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    fontSize: scale(20),
    textAlign: "center",
    color: "#111",
    marginBottom: scale(40),
  },

  footerText: {
    marginTop: 24,
    fontSize: scale(14),
    color: "#111",
    textAlign: "center",
  },
});
