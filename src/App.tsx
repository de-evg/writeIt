import { useIntegration } from "@telegram-apps/react-router-integration";

import { useEffect, useMemo } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { initNavigator } from "@telegram-apps/sdk";

export const App = () => {
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path={"/"} element={<Main />} />
      </Routes>
    </Router>
  );
};
