import { Route, Routes } from "react-router-dom";
import {
  HomeScreen,
  MapScreen,
  OfferListScreen,
  UserDetailScreen,
  OfferDetail,
  LoginScreen,
} from "./screens";
import NavBar from "./components/ui/nav-bar/NavBar.jsx";



function App() {
  return (
    <>
      <NavBar />

      <div className="container my-5">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/offers" element={<OfferListScreen />} />
          <Route path="/users/:id" element={<UserDetailScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/offers/:id" element={<OfferDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
