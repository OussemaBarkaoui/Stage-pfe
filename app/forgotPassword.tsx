import { useRouter } from "expo-router";
import { useState } from "react";
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

export default function ForgotPasswordScreen() {
	const router = useRouter();
	const [email, setEmail] = useState("");

	const handleReset = () => {
		if (!email) {
			Alert.alert("Missing email", "Please enter the email tied to your account.");
			return;
		}

		Alert.alert("Check your inbox", "We sent you reset instructions.");
		router.push("/otpVerification");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Reset your password</Text>
			<Text style={styles.helper}>We will email you a secure link.</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				placeholderTextColor="#666"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
			/>

			<PrimaryButton
				label="Send Link"
				onPress={handleReset}
				style={styles.primary}
				textStyle={styles.primaryText}
			/>

			<TouchableOpacity onPress={() => router.back()}>
				<Text style={styles.secondaryText}>Go back</Text>
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
		color: "#111",
	},
	helper: {
		fontSize: scale(14),
		color: "#444",
		marginBottom: 24,
	},
	input: {
		backgroundColor: "#f0f0f0",
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#dadada",
		marginBottom: 20,
		fontSize: scale(16),
	},
	primary: {
		backgroundColor: "#111",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 16,
	},
	primaryText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: scale(16),
	},
	secondaryText: {
		textAlign: "center",
		fontSize: scale(14),
		color: "#111",
	},
});
