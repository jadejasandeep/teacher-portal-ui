import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";

const TeacherList = ({ teachers = [] }) => {  // ✅ Default to empty array
  if (!Array.isArray(teachers)) {
    console.error("Invalid teachers data received:", teachers);
    return <Typography variant="h6" align="center">Error loading teachers.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" sx={{ mt: 3 }}>Teachers List</Typography>
      {teachers.length === 0 ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      ) : (
        teachers.map((teacher) => (
          <Card key={teacher.id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">{teacher.name}</Typography>
              <Typography variant="body2">Email: {teacher.email}</Typography>
              <Typography variant="body2">Username: {teacher.username}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default TeacherList;
