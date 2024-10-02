import React, { useState } from 'react';
import NQSContextCreate from './NQSContextCreate';
import { Box, useToast } from '@chakra-ui/react';
import { Inertia } from '@inertiajs/inertia';



function NQSContext({ children }) {

  const toast = useToast()

  const [faculty_id, setFaculty] = useState('');
  const [subject_id, setSubject] = useState('');
  const [semester_id, setSemester] = useState('');
  const [syllabusData, setSyllabusData] = useState([{ name: '', file: null }]);
  const [noteData, setNoteData] = useState([{ title:'', file: null }]); 
  const [questionData, setQuestionData] = useState([{ name:'', year: '', file: null }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(faculty_id!=''){
      // Combine all data into a single FormData object

      

    const formData = new FormData();

    if(semester_id==''||subject_id==''){

      if(noteData[0].title!="" || noteData[0].file!=null){
        toast({
          title:'error',
          description:"Required semester and subject for Notes",
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
        return
      }
      else if(questionData[0].name!='' || questionData[0].year!=''||questionData.file!=null){
        toast({
          title:'error',
          description:"Required semester and subject for Questions",
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
        return
      }
      if(syllabusData[0].file==null || syllabusData.name==''){
        toast({
          title:'error',
          description:"AtLeast Fill The Syllabus ",
          status: 'error',
          duration: 700,
          isClosable: true,
        })
        return;
      }

    }

    // Append faculty_id, subject_id, and semester_id
    formData.append('faculty_id', faculty_id);
    formData.append('subject_id', subject_id);
    formData.append('semester_id', semester_id);

    // Append syllabus data
    syllabusData.forEach((item, index) => {
      if(item.name!=''&& item.file!=null){
      formData.append(`syllabus_name[${index}]`, item.name);
      formData.append(`syllabus_file[${index}]`, item.file);
      }
    });
      questionData.forEach((item, index) => {
        if(item.name!='' && item.file!=null && item.year!=''){
        formData.append(`question_name[${index}]`, item.name);
        formData.append(`question_year[${index}]`, item.year);
        formData.append(`question_file[${index}]`, item.file);
        }
      });
  
      // Append note data
      noteData.forEach((item, index) => {
        if(item.name!=''&& item.file!=null){
          formData.append(`note_title[${index}]`, item.title);
          formData.append(`note_file[${index}]`, item.file);
        }
      });
    

    // Send the data to the backend using Inertia
    Inertia.post(route('activities.store'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    }
    else{
      toast({
        title: 'Error',
        duration:700,
        description: 'Please select a faculty.',
        position: 'top',
        status:'error',
        isClosable:true
      })
    }
    
  };

  return (
    <NQSContextCreate.Provider
      value={{
        faculty_id,
        setFaculty,
        subject_id,
        setSubject,
        semester_id,
        setSemester,
        syllabusData,
        setSyllabusData,
        noteData,
        setNoteData,
        questionData,
        setQuestionData,
        handleSubmit,
      }}>
      <Box >
        {children}
      </Box>
    </NQSContextCreate.Provider>
  );
}

export default NQSContext;
