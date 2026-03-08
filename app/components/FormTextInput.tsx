import { forwardRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { scale } from "../../lib/responsive";

type FormTextInputProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  ({ style, ...props }, ref) => {
    return <TextInput ref={ref} style={[styles.input, style]} {...props} />;
  }
);

export default FormTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ededed",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    fontSize: scale(16),
  },
});
