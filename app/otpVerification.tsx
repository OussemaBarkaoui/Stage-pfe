import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "./components/PrimaryButton";
import { scale } from "../lib/responsive";

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const code = digits.join("");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleVerify = (candidate = code) => {
    if (candidate.length < OTP_LENGTH) {
      Alert.alert(
        "Invalid code",
        `Enter the 6-digit code we sent to your email.`
      );
      return;
    }

    router.push("/changePassword");
  };

  const handleDigitChange = (value: string, index: number) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    const nextDigits = [...digits];
    nextDigits[index] = sanitized ? sanitized[sanitized.length - 1] : "";
    setDigits(nextDigits);

    if (sanitized && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (index === OTP_LENGTH - 1 && sanitized) {
      handleVerify(nextDigits.join(""));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    Alert.alert("Code sent", "We just sent you another verification code.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check your inbox</Text>
      <Text style={styles.helper}>
        Enter the verification code we sent to your email address.
      </Text>

      <View style={styles.otpRow}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleDigitChange(value, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            returnKeyType="next"
          />
        ))}
      </View>

      <PrimaryButton label="Verify" onPress={() => handleVerify()} />

      <TouchableOpacity style={styles.resend} onPress={handleResend}>
        <Text style={styles.resendText}>Resend code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: scale(26),
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#111",
  },
  helper: {
    fontSize: scale(14),
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ededed",
    textAlign: "center",
    fontSize: scale(20),
    fontWeight: "700",
  },
  resend: {
    marginTop: 16,
    marginBottom: 8,
  },
  resendText: {
    textAlign: "center",
    color: "#9b1917",
    fontWeight: "600",
    fontSize: scale(14),
  },
  secondaryText: {
    textAlign: "center",
    color: "#111",
    fontSize: scale(14),
  },
});
