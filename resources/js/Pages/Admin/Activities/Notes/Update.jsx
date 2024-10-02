import React, { useState, useEffect } from 'react';
import { Box, Text, Select, InputGroup, Input, Tooltip, InputRightElement, useToast } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import InputForm from '../../Components/InputForm';
import ResponsiveText from '@/Components/ResponsiveText';
import { Inertia } from '@inertiajs/inertia';

function Update({ auth, note, faculties, semester, subject }) {
  const [facultyId, setFacultyId] = useState(note.faculty_id);
  const [semesterId, setSemesterId] = useState(note.semester_id);
  const [subjectId, setSubjectId] = useState(note.subject_id);
  const [name, setName] = useState(note.name);
  const [file, setFile] = useState(null);
  const [semesters, setSemester] = useState([]);
  const [subjects, setSubject] = useState([]);

  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (file != null) {
      formData.append('file', file);
    }
    formData.append('faculty_id', facultyId);
    formData.append('semester_id', semesterId);
    formData.append('subject_id', subjectId);
    formData.append('name', name);
    formData.append('_method', 'PUT');

    // Inertia.patch automatically detects FormData and sets the correct headers
    Inertia.post(route('notes.update', note.id), formData);
  };

  useEffect(() => {
    const data = semester.filter((sem) => sem.faculty_id == facultyId);
    setSemester(data);
  }, [facultyId]);

  useEffect(() => {
    const data = subject.filter((sub) => sub.semester_id == semesterId);
    setSubject(data);
  }, [semesterId]);

  return (
    <Authenticated user={auth.user}>
      <Box className="flex justify-center mt-12">
        <InputForm buttonValue={"Update Note"} className={"p-2"} HandleSubmit={onSubmit}>
          <Text className="text-center font-lg font-extrabold"> Update Note</Text>
          <Box>
            <Box className="grid grid-cols-2 mt-4">
              <ResponsiveText className={"text-center"}>Select Faculty</ResponsiveText>
              <Select value={facultyId} onChange={(e) => setFacultyId(e.target.value)}>
                <option value="">--Select Faculty--</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box className="grid grid-cols-2 mt-4">
              <ResponsiveText className={"text-center"}>Select Semester</ResponsiveText>
              <Select value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
                <option value="">--Select Semester--</option>
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box className="grid grid-cols-2 mt-4">
              <ResponsiveText className={"text-center"}>Select Subject</ResponsiveText>
              <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                <option value="">--Select Subject--</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box className="grid grid-cols-2 mt-4">
              <ResponsiveText className={"text-center"}>Enter Note</ResponsiveText>
              <InputGroup>
                <Input
                  onClick={(e) => {
                    if (name !== "") {
                      e.target.select();
                    }
                  }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Tooltip hasArrow label={file != null ? "Change File" : "Add File"}>
                  <InputRightElement
                    as="label"
                    htmlFor="inputFileNote"
                    className="cursor-pointer"
                    children={<LinkIcon color={file != null ? "green" : ""} />}
                  />
                </Tooltip>
                <Input
                  type="file"
                  display={"none"}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setName(e.target.files[0].name);
                  }}
                  accept=".pdf, .docx"
                  id="inputFileNote"
                  name="noteFile"
                />
              </InputGroup>
            </Box>
          </Box>
        </InputForm>
      </Box>
    </Authenticated>
  );
}

export default Update;
