import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormTextInput from "./components/FormTextInput";
import PrimaryButton from "./components/PrimaryButton";
import { scale } from "../lib/responsive";

export default function ChangePasswordScreen() {
	const router = useRouter();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [newPasswordVisible, setNewPasswordVisible] = useState(false);

	const handleUpdate = () => {
		if (!newPassword || !confirmPassword) {
			Alert.alert("Hold on", "Please fill in both password fields.");
			return;
		}

		if (newPassword !== confirmPassword) {
			Alert.alert("Mismatch", "Passwords do not match.");
			return;
		}

		Alert.alert("Success", "Your password has been updated.");
		router.replace("/");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose a new password</Text>
			<Text style={styles.helper}>Make sure it is different from previous ones.</Text>

			<View style={styles.passwordField}>
				<FormTextInput
					style={styles.passwordInput}
					placeholder="New password"
					placeholderTextColor="#666"
					secureTextEntry={!newPasswordVisible}
					value={newPassword}
					onChangeText={setNewPassword}
				/>
				<TouchableOpacity
					style={styles.visibilityToggle}
					onPress={() => setNewPasswordVisible((prev) => !prev)}
				>
					<Ionicons
						name={newPasswordVisible ? "eye-off" : "eye"}
						size={scale(18)}
						color="#000"
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.passwordField}>
				<FormTextInput
					style={styles.passwordInput}
					placeholder="Confirm password"
					placeholderTextColor="#666"
					secureTextEntry
					value={confirmPassword}
					onChangeText={setConfirmPassword}
				/>
				
			</View>

			<PrimaryButton
				label="Update Password"
				onPress={handleUpdate}
				style={styles.primary}
				textStyle={styles.primaryText}
			/>

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
		color: "#111",
		textAlign: "center",
	},
	helper: {
		fontSize: scale(14),
		color: "#444",
		textAlign: "center",
		marginBottom: 24,
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
	primary: {
		backgroundColor: "#f9b418",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	primaryText: {
		color: "#9b1917",
		fontSize: 18,
		fontWeight: "700",
		letterSpacing: 1,
	},
	secondaryText: {
		textAlign: "center",
		color: "#111",
		fontSize: scale(14),
		marginTop: 16,
	},
});
