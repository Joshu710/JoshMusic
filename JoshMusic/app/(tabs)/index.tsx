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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();

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

  async function getURL() {
    console.log(urlInput);
    const encodedURL = encodeURIComponent(urlInput);
    console.log(encodedURL);
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.0.0.177:8000/api/audio/?url=${encodedURL}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      await TrackPlayer.add([
        {
          url: json.audio_url,
          artwork: json.thumbnail,
          title: json.title,
          artist: json.channel_name,
        },
      ]);
      setLoading(false);
    } catch (error: unknown) {
      console.error("oof");
    }
  }

  return (
    <View>
      {!loading && (
        <View>
          <Text>Player Page Poop</Text>
          <TextInput
            onChangeText={(text) => setURLInput(text)}
            placeholder="Enter Youtube URL here"
          />
          <Button title="Submit URL" onPress={getURL} disabled={loading} />
          <Button title={buttonText} onPress={playPause} disabled={loading} />
        </View>
      )}
    </View>
  );
}
