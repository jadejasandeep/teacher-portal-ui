import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useAuth } from "../context/AuthContext";
import { createStudent,getIdFromToken,fetchStudents } from "../services/api";

function StudentList({ students, setStudents }) {
  const { token } = useAuth();
  const [newStudent, setNewStudent] = useState({ firstName: "", lastName: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleCreateStudent = async () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const teacherId = getIdFromToken();
      if (!teacherId) {
        alert("Error: Teacher ID is missing.");
        return;
      }

      const studentData = { ...newStudent, teacherId };
      await createStudent(studentData, token);
      const updatedStudents = await fetchStudents();
      setStudents(updatedStudents);
      setNewStudent({ firstName: "", lastName: "", email: "" });
    } catch (error) {
      alert("Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" sx={{ mt: 3 }}>Student List</Typography>
      <Box sx={{ mt: 3, mb: 3 }}>
        <TextField label="First Name" fullWidth margin="normal" value={newStudent.firstName} onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })} />
        <TextField label="Last Name" fullWidth margin="normal" value={newStudent.lastName} onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })} />
        <TextField label="Email" fullWidth margin="normal" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleCreateStudent} disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </Button>
      </Box>
      {students.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>No students found.</Typography>
      ) : (
        students.map((student) => (
          <Card key={student.id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{student.firstName} {student.lastName}</Typography>
              <Typography variant="body2">Email: {student.email}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

StudentList.propTypes = {
  students: PropTypes.array.isRequired,
  setStudents: PropTypes.func.isRequired,
};

export default StudentList;
