import { Route, Routes } from "react-router-dom";
import {
  HomeScreen,
  MapScreen,
  OfferListScreen,
  UserDetailScreen,
  OfferDetail,
  LoginScreen,
  ServiceCreateFormScreen
} from "./screens";
import NavBar from "./components/ui/nav-bar/NavBar.jsx";
import RegisterScreen from "./screens/users-screens/RegisterScreen";
import OfferCreateForm from "./screens/offers-screens/OfferCreateForm";

function App() {
  return (
    <>
      <NavBar />

      <div className="container my-5">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/offers" element={<OfferListScreen />} />
          <Route path="/offers/create" element={<OfferCreateForm />}/>
          <Route path="/offers/:offerId" element={<OfferDetail />} />
          <Route path="/services/create" element={<ServiceCreateFormScreen />}/>
          <Route path="/users/:id" element={<UserDetailScreen />} />
          <Route path="/map" element={<MapScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
