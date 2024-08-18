import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PresentationPreview from "./pages/PresentationPreview";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/presentation/:id" element={<PresentationPreview />} />
      </Routes>
    </Router>
  );
};

export default App;
