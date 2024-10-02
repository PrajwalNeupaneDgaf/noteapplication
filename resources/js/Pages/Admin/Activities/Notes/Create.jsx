import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import React from "react";
import InputForm from "../../Components/InputForm";
import ResponsiveText from "@/Components/ResponsiveText";
import { LinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

function Create({semesters,subjects,faculties,setIsVisible}) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(file != null ? file.name : "");
    const [faculty_id, setFacultyId] = useState("");
    const [semester_id, setSemesterId] = useState("");
    const [subject_id, setSubjectId] = useState("");
    const [semester, setSemester] = useState([]);
    const [subject, setSubject] = useState([]);

    useEffect(()=>{
       const data = semesters.filter((semester)=>semester.faculty_id == faculty_id);
       setSemester(data || []);
    },[faculty_id]);

    useEffect(()=>{
        const data = subjects.filter((subject)=>subject.semester_id == semester_id);
        setSubject(data || []);
     },[semester_id]);

    const onSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('notes.store'),{
            name:name,
            faculty_id:faculty_id,
            semester_id:semester_id,
            subject_id:subject_id,
            file:file
        })
    };
    return (
        <>
            <Box className="w-full h-screen fixed inset-0 z-20 backdrop-blur-sm">
                <Box className="flex justify-center  mt-12">
                    <InputForm
                        buttonValue={"Add Note"}
                        className={"p-2"}
                        HandleSubmit={onSubmit}
                        setIsVisible={setIsVisible}
                    >
                        <Text className="text-center font-lg font-extrabold">
                            Add New Note
                        </Text>
                        <Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Select Faculty
                                </ResponsiveText>
                                <Select onChange={(e)=>setFacultyId(e.target.value)}>
                                    <option value="">--Select Faculty--</option>
                                    {faculties.map((faculty)=>(
                                        <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                    ))}
                                </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Select Semester
                                </ResponsiveText>
                                <Select onChange={(e)=>setSemesterId(e.target.value)}>
                                    <option value="">
                                        --Select Semester--
                                    </option>
                                    {semester.map((semester)=>(
                                        <option key={semester.id} value={semester.id}>{semester.name}</option>
                                    ))}
                                </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Select Subject
                                </ResponsiveText>
                                <Select onChange={(e)=>setSubjectId(e.target.value)}>
                                    <option value="">--Select Subject--</option>
                                    {subject.map((subject)=>(
                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                    ))}
                                </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Enter Note
                                </ResponsiveText>
                                <InputGroup>
                                    <Input
                                        onClick={(e) => {
                                            if (name != "") {
                                                e.target.select();
                                            }
                                        }}
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <Tooltip
                                        hasArrow
                                        label={
                                            file != null
                                                ? "Change File"
                                                : "Add File"
                                        }
                                    >
                                        <InputRightElement
                                            as="label"
                                            htmlFor="inputFileNote"
                                            className="cursor-pointer"
                                            children={
                                                <LinkIcon
                                                    color={
                                                        file != null
                                                            ? "green"
                                                            : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Tooltip>
                                    <Input
                                        type="file"
                                        display={"none"}
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                            setName(e.target.files[0].name);
                                        }}
                                        accept=".pdf , .docx"
                                        id="inputFileNote"
                                        required
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </InputForm>
                </Box>
            </Box>
        </>
    );
}

export default Create;
