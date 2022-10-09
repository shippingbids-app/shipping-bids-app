import { Route, Routes } from "react-router-dom";
import { HomeScreen,
  MapScreen, 
  OfferListScreen, 
  UserDetailScreen,
  OfferDetail
} from "./screens";
import NavBar from "./components/ui/nav-bar/NavBar.jsx"

function App() {
  return (
    <>

    <NavBar />

    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/offers" element={<OfferListScreen />}/>
      <Route path="/user" element={<UserDetailScreen />}/>
      <Route path="/map" element={<MapScreen />}/>
      <Route path="/offers/:id" element={<OfferDetail />}/>
    </Routes>
    </>
  );
}

export default App;
