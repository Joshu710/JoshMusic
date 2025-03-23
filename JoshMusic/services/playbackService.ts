import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  State,
} from "react-native-track-player";
import { getPlaybackState } from "react-native-track-player/lib/src/trackPlayer";

export const PlaybackService = async function () {
  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
  // TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  // TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  // TrackPlayer.addEventListener(Event.RemoteSeek, (event) =>
  //   TrackPlayer.seekTo(event.position)
  // );
};
