import {
  Text,
  View,
  Button,
  Pressable,
  TextInput,
  AppState,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { AudioModule, setAudioModeAsync, useAudioPlayer } from "expo-audio";
import TrackPlayer, {
  State,
  Capability,
  Event,
} from "react-native-track-player";
import { getPlaybackState } from "react-native-track-player/lib/src/trackPlayer";
import { PlaybackService } from "@/services/playbackService";
TrackPlayer.registerPlaybackService(() => PlaybackService);

export default function Player() {
  const [buttonText, setButtonText] = useState<string>("Play");
  const [urlInput, setURLInput] = useState<string>("");
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([
        {
          id: "1",
          url: require("@/assets/Hello.mp3"),
          artwork: require("@/assets/art.png"),
          title: "Attitude",
          artist: "IVE",
        },
      ]);

      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
      });

      TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
        setButtonText("Pause");
      });
      TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
        setButtonText("Play");
      });
      TrackPlayer.addEventListener(Event.RemoteSeek, (event) =>
        TrackPlayer.seekTo(event.position)
      );
    }

    // async function updateButton() {
    //   const state = (await getPlaybackState()).state;
    //   const sub = AppState.addEventListener("change", (newStatus) => {
    //     if (newStatus === "active") {
    //       console.log("Is active");
    //       if (state === State.Playing) {
    //         setButtonText("Pause");
    //       } else {
    //         setButtonText("Play");
    //       }
    //     }
    //   });
    // }
    //updateButton();
    setup();
  }, []);

  async function playPause() {
    const state = (await getPlaybackState()).state;

    if (state === State.Playing) {
      TrackPlayer.pause();
      //player.play();
      setButtonText("Play");
    } else {
      //player.pause();
      TrackPlayer.play();
      setButtonText("Pause");
    }
  }

  function getURL() {
    console.log(urlInput);
  }

  return (
    <View>
      <Text>Player Page Poop</Text>
      <TextInput
        onChangeText={(text) => setURLInput(text)}
        placeholder="Enter Youtube URL here"
      />
      <Button title="Submit URL" onPress={getURL} />
      <Button title={buttonText} onPress={playPause} />
    </View>
  );
}
