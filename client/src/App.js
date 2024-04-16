import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
import Mainpage from "./Components/mainpage";
import Navbar from "./Components/Navbar";
import Contacts from "./Components/Contacts";
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
import EventsNew from "./Components/EventsNew";
import Socials from "./Components/ControllerFront/Socials";
import DuesPayingMembers from "./Components/DuesPayingMembers";
import ResetPWD from "./Components/ResetPWD";
import Home from "./Components/ControllerFront/Home";
import About from "./Components/ControllerFront/About";
import AdminSignAndRegister from "./Components/AdminAccount/AdminSignAndRegister";
import ForgotPWD from "./Components/AdminAccount/ForgotPWD";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import MemberDetails from "./Components/AdminDashboard/Pages/MemberDetails";
import CustomQuestionForm from "./Components/AdminDashboard/Pages/CustomQuestionForm";
import Events from "./Components/AdminDashboard/Pages/Events";
import EventPage from "./Components/ControllerFront/EventPage";
import Payment from "./Components/ControllerFront/Payment";

axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = `${process.env.BASE_URL}`;
// axios.defaults.baseURL = `http://localhost:${process.env.SERVER_PORT}`;
console.log("server port", process.env.SERVER_PORT);
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/pay/Dues/Stripe" element={<Payment />} />
        <Route path="/login" element={<AdminSignAndRegister />} />
        <Route path="/forget/password" element={<ForgotPWD />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/member/details" element={<MemberDetails />} />
        <Route path="/custom/question/form" element={<CustomQuestionForm />} />
        <Route path="/events/admin" element={<Events />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
