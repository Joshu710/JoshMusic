import { Stack, Slot, Tabs } from "expo-router";

export default function testLayout() {
  // return <Stack></Stack>;

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
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
