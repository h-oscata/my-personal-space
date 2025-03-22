import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import ContactsPage from "./pages/ContactsPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { QuotesPage } from "./pages/QuotesPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
