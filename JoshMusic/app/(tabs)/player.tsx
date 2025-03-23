import { Text, View, Button, Pressable } from "react-native";
import { Link } from "expo-router";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Sound } from "expo-av/build/Audio";

export default function Player() {
  const [sound, setSound] = useState<Sound>();

  // Audio.setAudioModeAsync({
  //   staysActiveInBackground: true,
  //   playsInSilentModeIOS: true,

  // });

  async function playSound() {
    console.log("Loading Sound");
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Hello.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Text>Player Page</Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}
