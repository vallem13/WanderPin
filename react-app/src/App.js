import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./components/HomePage"
import SinglePinDetails from "./components/SinglePinDetails";
import CreateSinglePin from "./components/Pins/CreateSinglePin";
import SingleBoardDetails from "./components/SingleBoardDetails";
import UserProfile from "./components/UserProfilePage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/home">
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          </Route>
          <Route path="/user">
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Route>
          <Route path="/pins/new-pin">
            <ProtectedRoute>
              <CreateSinglePin />
            </ProtectedRoute>
          </Route>
          <Route path="/pins/:pinId">
            <ProtectedRoute>
              <SinglePinDetails />
            </ProtectedRoute>
          </Route>
          <Route path="/boards/:boardId">
            <ProtectedRoute>
              <SingleBoardDetails />
            </ProtectedRoute>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
