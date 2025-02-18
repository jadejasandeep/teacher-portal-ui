import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeacherList from "./pages/TeacherList";
import StudentList from "./pages/StudentList";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { fetchTeachers, fetchStudents } from "./services/api";
import { useEffect, useState } from "react";

const theme = createTheme();

function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (token === undefined) {
    return null; // Wait until token state initializes
  }

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const { token, user } = useAuth();
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchTeachers().then(setTeachers).catch((error) => {
        console.error("Failed to fetch teachers:", error);
        setTeachers([]);
      });
    }
  }, [token]);

  useEffect(() => {
    if (token ) {
      
      fetchStudents().then(setStudents).catch((error) => {
        console.error("Failed to fetch students:", error);
        setStudents([]);
      });
    }
  }, [token, user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
      <Router>
      <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard setTeacherId={setTeacherId} /></PrivateRoute>} />
          <Route path="/teachers" element={<PrivateRoute><TeacherList teachers={teachers} /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute><StudentList students={students} /></PrivateRoute>} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
