import { Route, Routes } from "react-router-dom";
import {
  HomeScreen,
  MapScreen,
  OfferListScreen,
  UserDetailScreen,
  OfferDetail,
  LoginScreen,
  RegisterScreen,
  ServiceCreateFormScreen,
  OfferCreateForm,
  ServiceUpdate,
} from "./screens";
import NavBar from "./components/ui/nav-bar/NavBar.jsx";
import BottomNavbar from "./components/ui/bottom-navigation/BottomNavbar";
import UserUpdateScreen from "./screens/users-screens/UserUpdateScreen";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const user = useContext(AuthContext);

  return (
    <>
      <NavBar />

      <div className="container mb-5 pb-2">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/offers" element={<OfferListScreen />} />
          <Route path="/offers/create" element={<OfferCreateForm />} />
          <Route path="/offers/:offerId" element={<OfferDetail />} />
          <Route
            path="/services/create"
            element={<ServiceCreateFormScreen />}
          />
          <Route path="/services/:serviceId" element={<ServiceUpdate />} />
          <Route path="/users/:id" element={<UserDetailScreen />} />
          <Route path="/users/:id/profile" element={<UserUpdateScreen />} />
          <Route path="/map" element={user.user ? <MapScreen /> : <LoginScreen />} />
        </Routes>
      </div>

      <BottomNavbar />
    </>
  );
}

export default App;
