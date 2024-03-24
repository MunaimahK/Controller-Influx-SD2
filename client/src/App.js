import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
import Mainpage from "./Components/mainpage";
import Navbar from "./Components/Navbar";
import Contacts from "./Components/Contacts";
import Events from "./Components/Events";
import Login from "./Components/Login";
import Register from "./Components/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Admin from "./Components/Admin";
import { UserContextProvider } from "./context/userContext";
import CreateEvent from "./Components/CreateEvent";
import Members from "./Components/Members";
import PayDues from "./Components/PayDues";
import CustomQForm from "./Components/CustomQForm";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event/create" element={<CreateEvent />} />
        <Route path="/socials" element={<Contacts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/member/details" element={<Members />} />
        <Route path="/pay/Dues/Stripe" element={<PayDues />} />
        <Route path="/custom/question/form" element={<CustomQForm />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
