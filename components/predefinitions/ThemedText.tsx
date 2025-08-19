import { Text, TextProps } from "react-native";

export default function ThemedText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Mozilla-Regular", color: "white" }, props.style]}
    />
  );
}