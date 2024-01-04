import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import AdminDashboard from "./components/AdminDashboard";
import Attainment from "./components/Attainment/AttainmentPage";
import Assesment from "./components/Assesment/AssesmentPage";
import CurriculumPage from "./components/CurriculumDesgin/CurriculumPage";
import CourseList from "./components/CurriculumDesgin/Course";
import Program_Outcomes from "./components/CurriculumDesgin/Program_Outcomes";
import Curriculum from "./components/CurriculumDesgin/Curriculum";
import Department from "./components/CurriculumDesgin/Department";
import CourseOutcomes from "./components/CurriculumDesgin/Course_Outcome";
import QuestionBank from "./components/Assesment/QuestionBank";
import ExtraCurricular from "./components/Assesment/ExtraCurricular";
import ManageCIA from "./components/Assesment/ManageCIA";
import { ThemeProvider } from "@material-tailwind/react";
import CoAttainment from "./components/Attainment/CoAttainment";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login";
import Organization from "./components/CurriculumDesgin/Organization";
const Root = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route index element={<AdminDashboard />} />
        <Route path="curriculum" element={<CurriculumPage />}>
          <Route path="" element={<Curriculum />} />
          <Route path="course" element={<CourseList />} />
          <Route path="program_outcomes" element={<Program_Outcomes />} />
          <Route path="design" element={<Curriculum />} />
          <Route path="department" element={<Department />} />
          <Route path="course_outcomes" element={<CourseOutcomes />} />
          <Route path="organization" element={<Organization organizationName={"GNDEC2"} />} />
        </Route>

        <Route path="Assesment" element={<Assesment />}>
          <Route path="" element={<QuestionBank />} />
          <Route path="extraCurricular" element={<ExtraCurricular />} />
          <Route path="ManageCIA" element={<ManageCIA />} />
          <Route path="QuestionBank" element={<QuestionBank />} />
        </Route>

        <Route path="attainment" element={<Attainment />}>
          <Route path="" element={<CoAttainment />} />
        </Route>

        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </Routes>
  </Router>
);

const theme = {
  button: {
    defaultProps: {
      variant: "filled",
      size: "md",
      color: "teal",
      fullWidth: false,
      ripple: true,
    },
    colors: {
      extend: {
        cyan: {
          800: "#00838f",
          200: "#b2dfdb",
        },

        gray: {
          100: "#b0bec5",
          300: "#e0e0e0",
        },
      },
    },
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
);
