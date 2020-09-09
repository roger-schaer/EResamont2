import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";

import { LanguageContext } from "../shared/LanguageContext";
import requestPage from "../utils/requestPage";
import { DataContext } from "../shared/DataContext";
import CustomDrawer from "../components/CustomDrawer";
import storage from "../utils/storage";
import { ASGMContext } from "../shared/ASGMContext";

let navigateCalled = false;
let language = 1;
let data = null;
let asgmStatus = false;

let setLanguage = (newLanguage) => {
  language = newLanguage;
};
let setData = (newData) => {
  data = newData;
};
let navigation = {
  closeDrawer: () => {
    console.log("closed drawer");
  },
  toggleDrawer: () => {
    console.log("toggle Drawer called");
  },
  navigate: () => {
    console.log("navigate called");
    navigateCalled = true;
  },
};

jest.mock("../utils/requestPage");
describe("CustomDrawer", () => {
  beforeEach(() => {
    setLanguage(1);
    //reset mocks and counters
    jest.clearAllMocks();
  });

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <DataContext.Provider value={{ data }}>
          <LanguageContext.Provider value={{ language }}>
            <ASGMContext.Provider value={{ asgmStatus }}>
              <CustomDrawer />
            </ASGMContext.Provider>
          </LanguageContext.Provider>
        </DataContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("checkUpdate", () => {
    it("should say up to date if no updates", async () => {
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [];
      });
      const { getByTestId } = render(
        <DataContext.Provider value={{ data }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <ASGMContext.Provider value={{ asgmStatus }}>
              <CustomDrawer navigation={navigation} />
            </ASGMContext.Provider>
          </LanguageContext.Provider>
        </DataContext.Provider>
      );
      const element = getByTestId("cd-button-update");
      await fireEvent.press(element);
    });
    it("should update and say updated", async () => {
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [{ some: "object" }];
      });
      storage.updateStoragePages = jest.fn(() => true);
      const { getByTestId } = render(
        <DataContext.Provider value={{ data, setData }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <ASGMContext.Provider value={{ asgmStatus }}>
              <CustomDrawer navigation={navigation} />
            </ASGMContext.Provider>
          </LanguageContext.Provider>
        </DataContext.Provider>
      );
      const element = getByTestId("cd-button-update");
      await fireEvent.press(element);
      expect(storage.updateStoragePages).toHaveBeenCalledTimes(1);
    });
  });

  it("changes language to english", () => {
    const { getByTestId } = render(
      <DataContext.Provider value={{ data }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ASGMContext.Provider value={{ asgmStatus }}>
            <CustomDrawer navigation={navigation} />
          </ASGMContext.Provider>
        </LanguageContext.Provider>
      </DataContext.Provider>
    );
    const element = getByTestId("button-view-English");
    fireEvent.press(element);
    expect(language).toEqual(3);
  });
  it("changes language to italian", () => {
    const { getByTestId } = render(
      <DataContext.Provider value={{ data }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ASGMContext.Provider value={{ asgmStatus }}>
            <CustomDrawer navigation={navigation} />
          </ASGMContext.Provider>
        </LanguageContext.Provider>
      </DataContext.Provider>
    );
    const element = getByTestId("button-view-Italiano");
    fireEvent.press(element);
    expect(language).toEqual(2);
  });
  it("changes language to french", () => {
    setLanguage(2); //set initial value to non-french
    const { getByTestId } = render(
      <DataContext.Provider value={{ data }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ASGMContext.Provider value={{ asgmStatus }}>
            <CustomDrawer navigation={navigation} />
          </ASGMContext.Provider>
        </LanguageContext.Provider>
      </DataContext.Provider>
    );
    const element = getByTestId("button-view-Français");
    fireEvent.press(element);
    expect(language).toEqual(1);
  });

  it("changes language to german", () => {
    const { getByTestId } = render(
      <DataContext.Provider value={{ data }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ASGMContext.Provider value={{ asgmStatus }}>
            <CustomDrawer navigation={navigation} />
          </ASGMContext.Provider>
        </LanguageContext.Provider>
      </DataContext.Provider>
    );
    const element = getByTestId("button-view-Deutsch");
    fireEvent.press(element);
    expect(language).toEqual(4);
  });

  it("goes to home page after", () => {
    navigateCalled = false;
    const { getByTestId } = render(
      <DataContext.Provider value={{ data }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ASGMContext.Provider value={{ asgmStatus }}>
            <CustomDrawer navigation={navigation} />
          </ASGMContext.Provider>
        </LanguageContext.Provider>
      </DataContext.Provider>
    );
    const element = getByTestId("cd-button-home");
    fireEvent.press(element);
    expect(navigateCalled).toBeTruthy();
  });
});
