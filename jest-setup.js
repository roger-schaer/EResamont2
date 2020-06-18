console.log = jest.fn();
console.error = jest.fn();

jest.mock("@react-native-community/netinfo", () => ({
  fetch: jest.fn(),
}));
