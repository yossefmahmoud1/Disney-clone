import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WatchlistProvider } from "./context/WatchlistContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Originals from "./pages/Originals";
import WatchList from "./pages/WatchList";
import SearchResults from "./pages/SearchResults";
import "./App.css";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <WatchlistProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/originals" element={<Originals />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
          theme="dark"
          limit={3}
          toastStyle={{
            background: "#1E2442",
            color: "white",
            borderRadius: "8px",
            border: "2px solid #e50914",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "13px",
            fontWeight: "500",
            maxWidth: "90vw",
            margin: "8px auto",
          }}
          progressStyle={{
            background: "linear-gradient(90deg, #e50914 0%, #ffd700 100%)",
            height: "3px",
          }}
          closeButton={{
            style: {
              color: "white",
              fontSize: "14px",
            },
          }}
          className="!z-[9999] sm:!top-4 !top-16"
        />
      </WatchlistProvider>
    </UserProvider>
  );
}

export default App;
