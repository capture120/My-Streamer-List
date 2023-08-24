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
import CreateReview from "./features/reviews/create-review";
import EditReview from "./features/reviews/edit-review";
import ReviewScreen from "./features/reviews/review-screen";
import AdminDashboard from "./features/users/admin-dashboard";

import AuthContext from "./features/users/auth-context";
import ProtectedRoute from "./features/users/protected-route";

import usersReducer from "./features/users/services/users-reducer";
import channelsReducer from "./features/channels/services/channels-reducer";
import reviewsReducer from "./features/reviews/services/reviews-reducer";
import pathsReducer from "./features/users/login/next-path-reducer";
import Review from "./features/reviews";
const store = configureStore({
  reducer: { user: usersReducer, channels: channelsReducer, reviews: reviewsReducer, paths: pathsReducer}
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
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              <Route path="/profile/:user_id" element={<PublicProfile />} />
              <Route path="/channels/:twitch_id" element={<Channel />} />
              <Route path="/channels/:twitch_id/reviews/create" element={<ProtectedRoute> <CreateReview /> </ProtectedRoute>} />
              <Route path="/channels/:twitch_id/reviews/:review_id/edit" element={<ProtectedRoute> <EditReview/> </ProtectedRoute>} />
              <Route path="/channels/:twitch_id/reviews/:review_id" element={<ReviewScreen/>} />
            </Routes>
          </div>
        </AuthContext>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
