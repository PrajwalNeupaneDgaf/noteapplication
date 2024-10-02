import { Box, Select, Text, Grid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import NQSContextCreate from '../NQSContextCreate'

function FSSSelect({ semester, faculty, subject }) {
  const [semesterData, setSemesterData] = useState([])
  const [subjectData, setSubjectData] = useState([])

  const { faculty_id, setFaculty, subject_id, setSubject, semester_id, setSemester } = useContext(NQSContextCreate)

  useEffect(() => {
    if (faculty_id !== '') {
      const data = semester.filter((item) => item.faculty_id == faculty_id)
      setSemesterData(data)
    } else {
      setSemesterData([])
    }
  }, [faculty_id, semester])

  useEffect(() => {
    if (semester_id !== '') {
      const data = subject.filter((item) => item.semester_id == semester_id)
      setSubjectData(data)
    } else {
      setSubjectData([])
    }
  }, [semester_id, subject])

  return (
    <Box p={4} rounded="md" m={2}>
      <Box className='flex flex-row justify-between p-2'>
      <Text className='my-auto' fontSize='lg' fontWeight='bold'>Select Details</Text>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={4}
        justifyContent="space-between"
        p={3}
        rounded="lg"
        bg="white"
      >
        <Grid templateColumns="1fr 1fr" gap={2} minW="200px" flex="1">
          <Text my="auto" textAlign="center">
            Faculty:
          </Text>
          <Select
            value={faculty_id}
            onChange={(e) => {
              setFaculty(e.target.value)
            }}
          >
            <option value="">--Select Faculty--</option>
            {faculty.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>

        <Grid templateColumns="1fr 1fr" gap={2} minW="200px" flex="1">
          <Text my="auto" textAlign="center">
            Semesters:
          </Text>
          <Select
            value={semester_id}
            onChange={(e) => {
              setSemester(e.target.value)
            }}
          >
            <option value="">--Select Semester--</option>
            {semesterData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>

        <Grid templateColumns="1fr 1fr" gap={2} minW="200px" flex="1">
          <Text my="auto" textAlign="center">
            Subject:
          </Text>
          <Select
            value={subject_id}
            onChange={(e) => {
              setSubject(e.target.value)
            }}
          >
            <option value="">--Select Subject--</option>
            {subjectData.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
      </Box>
    </Box>
  )
}

export default FSSSelect
