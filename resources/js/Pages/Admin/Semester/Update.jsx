import { Box, Select, Text, useToast } from '@chakra-ui/react'
import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'
import InputForm from '../Components/InputForm'
import InputField from '../Components/InputField'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import ResponsiveText from '@/Components/ResponsiveText'

function Update({setdata,facultyData , auth}) {
    const [semester,setSemester]=useState(setdata.name)
    const [faculty ,setFaculty] = useState(setdata.faculty_id)
    const toast = useToast()

    const HandleSubmit = (e)=>{
        e.preventDefault();
       if(faculty!=''&&semester!=''){
        const data = {
            name:semester,
            faculty_id:faculty
        }
       Inertia.put(route('semester.update',setdata.id),data)
    }
    }
    const SemesterSetter =(e)=>{
        setSemester(e.target.value)
    }
    const SetValue = (e)=>{
        setFaculty(e.target.value);
    }
  return (
   <Authenticated user={auth.user}>
     <Box className='flex justify-center'>
     <InputForm HandleSubmit={HandleSubmit} buttonValue={'Update Semester'}>
        <Box>
            <Text className='p-4' align={'center'} fontSize='xl' fontWeight='bold'>Update Semester</Text>
            <Box className='flex flex-col gap-3'>
            <Box className='grid grid-cols-2 ' fontSize={['.7rem','.9rem','1.1rem','1.2rem']}>
        <ResponsiveText  className='text-center'>Select Faculty</ResponsiveText>
        <Select value={faculty} onChange={SetValue}
        required
        >
            <option>--Select Faculty--</option>
            {
                facultyData.map((item,index)=>{
                    return (
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                })
            }
        </Select>
    </Box>
                <InputField  Name={'Semester'} Value={semester} setValue={SemesterSetter}/>
            </Box>
        </Box>
    </InputForm>
     </Box>
   </Authenticated>
  )
}

export default Update