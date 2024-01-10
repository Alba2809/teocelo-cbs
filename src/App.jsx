import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/navbar/NavBar";
import HistoryPage from "./pages/HistoryPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import CoatArmsPage from "./pages/CoatArmsPage";
import HistoricalEventsPage from "./pages/HistoricalEventsPage";
import MissionVisionPage from "./pages/MissionVisionPage";
import HCabildo from "./pages/HCabildo";
import MunicipalDirectoryPage from "./pages/MunicipalDirectoryPage";
import CircumstantialActPage from "./pages/CircumstantialActPage";
import CodesEthicsPage from "./pages/CodesEthicsPage";
import CodesConductPage from "./pages/CodesConductPage";
import DECLARANETPage from "./pages/DECLARANETPage";
import PrivacyNoticesPage from "./pages/PrivacyNoticesPage";
import PMDTeoceloPage from "./pages/PMDTeoceloPage";
import PAETeoceloPage from "./pages/PAETeoceloPage";
import FISMEvaluationPage from "./pages/FISMEvaluationPage";
import FORTAMUNEvaluationPage from "./pages/FORTAMUNEvaluationPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import NewPost from "./pages/employee.sc/NewPost";
import ProtectedRolRoute from "./components/auth/ProtectedRolRoute";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import PostsEditPage from "./pages/employee.sc/PostsEditPage";
import EditPost from "./pages/employee.sc/EditPost";
import DeletePost from "./pages/employee.sc/DeletePost";
import SLRequestsPage from "./pages/employee.sl/SLRequestsPage";
import SLReportsPage from "./pages/employee.sl/SLReportsPage";
import LampFormsPage from "./pages/citizen/LampFormsPage";
import PerfilePage from "./pages/citizen/PerfilePage";
import WaterFormsPage from "./pages/citizen/WaterFormsPage";
import DWRequestsPage from "./pages/employee.dw/DWRequestsPage";
import DWReportsPage from "./pages/employee.dw/DWReportsPage";
import NatureFormsPage from "./pages/citizen/NatureFormsPage";
import ESRequestsPage from "./pages/employee.es/ESRequestsPage";
import ComplaintFormPage from "./pages/citizen/ComplaintFormPage";
import CSComplaintsPage from "./pages/employee.cs/CSComplaintsPage";
import TourismPage from "./pages/TourismPage";
import PServicesPage from "./pages/PServicesPage";
import GarbageRoutesPage from "./pages/GarbageRoutesPage";
import OPRequestsPage from "./pages/employee.op/OPRequestsPage";
import OfficialFormPage from "./pages/citizen/OfficialFormPage";
import SPSoccerTeamsPage from "./pages/employee.sp/SPSoccerTeamsPage";
import SoccerTeamsPage from "./pages/SoccerTeamsPage";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/coat-of-arms" element={<CoatArmsPage />} />
          <Route path="/historical-events" element={<HistoricalEventsPage />} />
          <Route path="/mission-and-vision" element={<MissionVisionPage />} />
          <Route path="/h-cabildo" element={<HCabildo />} />
          <Route path="/codes-ethics" element={<CodesEthicsPage />} />
          <Route path="/codes-conduct" element={<CodesConductPage />} />
          <Route
            path="/municipal-directory"
            element={<MunicipalDirectoryPage />}
          />
          <Route
            path="/circumstantial-act"
            element={<CircumstantialActPage />}
          />
          <Route path="/declaranet-convention" element={<DECLARANETPage />} />
          <Route path="/privacy-notices" element={<PrivacyNoticesPage />} />
          <Route path="/pmd-teocelo" element={<PMDTeoceloPage />} />
          <Route path="/pae-teocelo" element={<PAETeoceloPage />} />
          <Route path="/fism-evaluation" element={<FISMEvaluationPage />} />
          <Route
            path="/fortamun-evaluation"
            element={<FORTAMUNEvaluationPage />}
          />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/procedures-and-services" element={<PServicesPage />} />
          <Route
            path="/garbage-collection-routes"
            element={<GarbageRoutesPage />}
          />
          <Route path="/soccer-teams" element={<SoccerTeamsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedRolRoute rolRoute="employee.sc" />}>
              <Route path="/add-post" element={<NewPost />} />
              <Route path="/posts/edit" element={<PostsEditPage />} />
              <Route path="/posts/edit/:title" element={<EditPost />} />
              <Route path="/posts/delete" element={<DeletePost />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.sl" />}>
              <Route path="/sl-requests" element={<SLRequestsPage />} />
              <Route path="/sl-reports" element={<SLReportsPage />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.dw" />}>
              <Route path="/dw-requests" element={<DWRequestsPage />} />
              <Route path="/dw-reports" element={<DWReportsPage />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.es" />}>
              <Route
                path="/es-cattle"
                element={<ESRequestsPage type="cattle" />}
              />
              <Route
                path="/es-agricultural"
                element={<ESRequestsPage type="agricultural" />}
              />
              <Route
                path="/es-bamboo"
                element={<ESRequestsPage type="bamboo" />}
              />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.cs" />}>
              <Route path="/cs-complaints" element={<CSComplaintsPage />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.op" />}>
              <Route path="/op-requests" element={<OPRequestsPage />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="employee.sp" />}>
              <Route path="/sp-soccerteams" element={<SPSoccerTeamsPage />} />
            </Route>

            <Route element={<ProtectedRolRoute rolRoute="citizen" />}>
              <Route
                path="/lamp-request"
                element={<LampFormsPage type="request" />}
              />
              <Route
                path="/lamp-report"
                element={<LampFormsPage type="report" />}
              />
              <Route
                path="/water-request"
                element={<WaterFormsPage type="request" />}
              />
              <Route
                path="/water-report"
                element={<WaterFormsPage type="report" />}
              />
              <Route
                path="/nature-cattle"
                element={<NatureFormsPage type="cattle" />}
              />
              <Route
                path="/nature-agricultural"
                element={<NatureFormsPage type="agricultural" />}
              />
              <Route
                path="/nature-bamboo"
                element={<NatureFormsPage type="bamboo" />}
              />
              <Route path="/complaints" element={<ComplaintFormPage />} />
              <Route path="/official-request" element={<OfficialFormPage />} />
              <Route path="/perfile" element={<PerfilePage />} />
            </Route>
          </Route>

          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:title" element={<PostPage />} />
        </Route>
        <Route path="/loginregister" element={<LoginRegisterPage />} />
        <Route path="*" element={<h1>Not found.</h1>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
