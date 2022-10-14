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
          <Route path="/offers/create" element={<OfferCreateForm />} />
          <Route path="/offers/:offerId" element={<OfferDetail />} />
          <Route
            path="/services/create"
            element={<ServiceCreateFormScreen />}
          />
          <Route path="/services/:serviceId" element={<ServiceUpdate />} />
          <Route path="/users/:id" element={<UserDetailScreen />} />
          <Route path="/map" element={<MapScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
