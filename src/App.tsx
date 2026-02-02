import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import StudyRecords from "./pages/studyRecords";
import NotFound from "./pages/notFound";
import Setting from "./pages/setting";
import PATHS from "./router/paths";
import { Toaster } from "./components/ui/toaster";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.STUDY_RECORDS} element={<StudyRecords />} />
          <Route path={PATHS.SETTING} element={<Setting />} />
          <Route path={PATHS.NOTFOUND} element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
