import { Stack, Slot, Tabs } from "expo-router";

export default function testLayout() {
  // return <Stack></Stack>;

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Index",
            href: null,
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            title: "Player",
          }}
        />
        <Tabs.Screen
          name="url"
          options={{
            title: "URL",
          }}
        />
      </Tabs>
    </>
  );
}
