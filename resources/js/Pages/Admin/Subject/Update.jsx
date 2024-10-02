import { Box, Center, Select, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import InputField from "../Components/InputField";
import ResponsiveText from "@/Components/ResponsiveText";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";

function Update({ data,auth }) {
    const [name, setName] = useState(data.subject.name);
    const [faculty_id, setFaculty_id] = useState(data.subject.faculty_id);
    const [semester_id, setSemester_id] = useState(data.subject.semester_id);
    const [semesterData, setSemester] = useState([]);

    const toast = useToast()

useEffect(()=>{
        const datas = data.semesters.filter((item)=>item.faculty_id==faculty_id)
        setSemester(datas || [])
},[faculty_id])
       

    const handleFacultyChange = (e) => {
        setFaculty_id(Number(e.target.value)); // Convert to number if needed
    };

    const nameSetter = (e) => {
        setName(e.target.value);
    };

    const HandeSubmit =(e)=>{
        e.preventDefault()
        if(name=='' || faculty_id==""||semester_id==''){
            toast({
                title: 'Error',
                description: 'Please fill all fields',
                duration:700,
                isClosable:true
            })
        }
        else{
            const dataSend ={
                name:name,
                faculty_id:faculty_id,
                semester_id:semester_id
            }
            Inertia.put(route('subject.update',data.subject.id),dataSend)
           
        }
    }
    return (
        <Authenticated user={auth.user}>
            <Box className="flex justify-center">
            <InputForm buttonValue={"Update Subject"} HandleSubmit={HandeSubmit}>
                <Text className="text-xl font-sans font-extrabold text-center p-4">
                    Update Subject
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
                            {data.faculties.map((item, index) => (
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
                        <Select
                        value={semester_id}
                        onChange={(e)=>{
                            setSemester_id(e.target.value);
                        }}
                        >
                            <option value="">---Select Semester---</option>
                            {semesterData.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <InputField
                        Name={"Subject"}
                        Value={name}
                        setValue={nameSetter}
                    />
                </Box>
            </InputForm>
        </Box>
        </Authenticated>
    );
}

export default Update;
