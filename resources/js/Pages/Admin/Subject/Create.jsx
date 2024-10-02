import { Box, Center, Select, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import InputField from "../Components/InputField";
import ResponsiveText from "@/Components/ResponsiveText";
import { Inertia } from "@inertiajs/inertia";
import MultipleInput from "../Components/MultipleInput";

function Create({ data,semester ,setIsVisible }) {
   const [Names, setName] = useState([]);
    const [faculty_id, setFaculty_id] = useState('');
    const [semester_id, setSemester_id] = useState('');
    const [semesterData, setSemester] = useState([]);

    const toast = useToast()

useEffect(()=>{
        const datas = semester.filter((item)=>item.faculty_id==faculty_id)
        setSemester(datas || [])
},[faculty_id])
       

    const handleFacultyChange = (e) => {
        setFaculty_id(Number(e.target.value)); // Convert to number if needed
    };

    const HandeSubmit =(e)=>{
        e.preventDefault()
        if(Names.length<1 || faculty_id==""||semester_id==''){
            toast({
                title: 'Error',
                description: 'Please fill all fields',
                duration:700,
                isClosable:true
            })
        }
        else{
            const data ={
                name:Names,
                faculty_id:faculty_id,
                semester_id:semester_id
            }
            console.log(data)
           Inertia.post(route('subject.store'),data,{
            onSuccess:()=>{
                toast({
                    title: 'Success',
                    description: 'Subject created successfully',
                    duration:700,
                    status:"success",
                })                
            },
            
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                        duration:700,   
                        status:"error",
                        })
            },
            preserveState:true
           })
        }
    }
    return (
        <Box  className='fixed inset-0 w-full bottom-0 top-0 z-10 backdrop-blur-sm'>
            <Box className="flex justify-center align-middle mt-12">
            <InputForm setIsVisible={setIsVisible} buttonValue={"Add Subject"} HandleSubmit={HandeSubmit}>
                <Text className="text-lg font-sans font-extrabold text-center pb-4">
                    Add New Subject
                </Text>
                <Box className="flex flex-col gap-1">
                    <Box className="grid grid-cols-2">
                        <ResponsiveText textAlign={"Center"}>
                            Selct Faculty
                        </ResponsiveText>
                        <Select
                            value={faculty_id}
                            onChange={(e) => {
                                setFaculty_id(e.target.value);
                            }}
                        >
                            <option value="">---Select Faculty---</option>
                            {data.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box className="grid grid-cols-2">
                        <ResponsiveText textAlign={"Center"}>
                            Select Semester
                        </ResponsiveText>
                        <Select onChange={(e)=>{
                            setSemester_id(e.target.value);
                        }}>
                            <option value="">---Select Semester---</option>
                            {semesterData.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <MultipleInput Name={'Subject'} setName={setName} Names={Names}/>
                </Box>
            </InputForm>
            </Box>
        </Box>
    );
}

export default Create;
