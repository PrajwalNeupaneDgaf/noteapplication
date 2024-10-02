import { Box, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import InputField from '../Components/InputField'
import InputForm from '../Components/InputForm'
import { Inertia } from '@inertiajs/inertia';

function Create({setIsvisible}) {
    const [faculty, setFaculty] = useState('');
    const [short, setShort] = useState();

    const FacultySetter = (e)=>{
        setFaculty(e.target.value)
    }
    const ShortSetter = (e)=>{
        setShort(e.target.value)
    }
    const HandleSubmit = (e)=>{
        e.preventDefault();
        
        Inertia.post(route('faculty.store'), {
            name: faculty,
            short: short,
        })
        .then(() => {
            // Clear form fields on successful submission
            setFaculty('');
            setShort('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
       
    }
  return (
   <Box className='fixed inset-0 w-full bottom-0 top-0 z-10 backdrop-blur-sm'>
    <Box className='flex justify-center align-middle mt-12 '>
    <InputForm setIsVisible={setIsvisible} HandleSubmit={HandleSubmit} buttonValue={'Create Faculty'}>
        <Box>
            <Text className='p-4' align={'center'} fontSize='xl' fontWeight='bold'>Add New Faculty</Text>
            <Box className='flex flex-col gap-3'>
            <InputField Name={'Faculty'} Value={faculty} setValue={FacultySetter}/>
            <InputField Name={'Faculty Short'} Value={short} setValue={ShortSetter}/>
            </Box>
        </Box>
    </InputForm>
    </Box>
   </Box>
  )
}

export default Create