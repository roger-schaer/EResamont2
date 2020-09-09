console.log = jest.fn();
console.error = jest.fn();

import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(),
}));

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
