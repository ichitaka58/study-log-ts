import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PATHS from "./router/paths";
import { Toaster } from "./components/ui/toaster";
import { lazy, Suspense } from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Home = lazy(() => import("./pages/home"));
const StudyRecords = lazy(() => import("./pages/studyRecords"));
const Setting = lazy(() => import("./pages/setting"));
const NotFound = lazy(() => import("./pages/notFound"));


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={
          <Center minH="100vh" aria-label="loading">
            <Spinner />
          </Center>
        }>
          <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.STUDY_RECORDS} element={<StudyRecords />} />
            <Route path={PATHS.SETTING} element={<Setting />} />
            <Route path={PATHS.NOTFOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
