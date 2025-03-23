import { Text, View, Button, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  function foo() {
    console.log("Button Pressed");
  }

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    //   <Button
    //     onPress={foo}
    //     title="Press Me"
    //     color="#00ddff"
    //     accessibilityLabel="Starter Button"
    //   />
    // </View>

    <View>
      <Link href="/url" asChild>
        <Pressable>
          <Text>URL Test Josh</Text>
        </Pressable>
      </Link>
      <Link href="/player">Player</Link>
    </View>
  );
}
