import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes
} from "react-router-dom";
// import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

import { NotFoundPage } from "./components/pages/NotFound";
import { SearchResultPage } from "./components/pages/Search";
import { LoginPage } from "./components/pages/Login";
import { RegisterPage } from "./components/pages/Register";
import { BookPage } from "./components/pages/Book";

// Import some styling
import { Landing } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "./styles/theme"
import AppContextProvider from "./state/context";
import { CookiesProvider } from 'react-cookie';

import ProtectedRoutes from "./components/common/ProtectedRoute";
import { ShelfPage } from "./components/pages/Shelf";
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <AppContextProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </AppContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/shelves" element={<ShelfPage />} />
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>
      </>
  );
}
