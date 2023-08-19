import { BrowserRouter } from "react-router-dom";
import { Routes, Route, redirect, Navigate } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Components
import Nav from "./components/nav";

// Features
import Home from "./features/home";
import Login from "./features/users/login";
import Profile from "./features/users/profile";
import Register from "./features/users/register";
import Search from "./features/search";
import PublicProfile from "./features/users/public_profile";
import Channel from "./features/channels";

import AuthContext from "./features/users/auth-context";
import ProtectedRoute from "./features/users/protected-route";

import usersReducer from "./features/users/services/users-reducer";
import channelsReducer from "./features/channels/services/channels-reducer";
import reviewsReducer from "./features/reviews/services/reviews-reducer";
const store = configureStore({
  reducer: { user: usersReducer, channels: channelsReducer, reviews: reviewsReducer}
});

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthContext>
          <div>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/search/" element={<Search />} />
              <Route path="/search/:search_name" element={<Search />} />

              <Route path="/profile/:uid" element={<PublicProfile />} />
              <Route path="/channels/:twitch_id" element={<Channel />} />
            </Routes>
          </div>
        </AuthContext>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
