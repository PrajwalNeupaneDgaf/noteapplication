import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import InputForm from "../../Components/InputForm";
import ResponsiveText from "@/Components/ResponsiveText";
import { LinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { router } from "@inertiajs/react";

function Update({question, faculties, semesters, subjects}) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(question.name || "");
    const [facultyId, setFacultyId] = useState(question.faculty_id || "");
    const [semesterId, setSemesterId] = useState(question.semester_id || "");
    const [subjectId, setSubjectId] = useState(question.subject_id || "");
    const [year, setYear] = useState(question.year || "");
    const [semesterData, setSemesterData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);

    useEffect(() => {
        if (facultyId) {
            const filteredSemesters = semesters.filter(sem => sem.faculty_id === parseInt(facultyId));
            setSemesterData(filteredSemesters);
        } else {
            setSemesterData([]);
        }
    }, [facultyId]);

    useEffect(() => {
        if (semesterId) {
            const filteredSubjects = subjects.filter(sub => sub.semester_id === parseInt(semesterId));
            setSubjectData(filteredSubjects);
        } else {
            setSubjectData([]);
        }
    }, [semesterId]);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("faculty_id", facultyId);
        formData.append("semester_id", semesterId);
        formData.append("subject_id", subjectId);
        formData.append("year", year);
        formData.append("_method", "PUT");

        if (file) {
            formData.append("file", file);
        }

        router.post(route('questions.update', question.id), formData, {
            forceFormData: true,  // Ensures FormData is sent properly
            onSuccess: () => {
                toast({
                    title: "Question updated successfully!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: "There was an issue submitting the form.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        });
    };

    return (
        <>
            <Box className="w-full h-screen fixed inset-0 z-20 backdrop-blur-sm">
                <Box className="flex justify-center  mt-12">
                    <InputForm
                        buttonValue={"Update Question"}
                        className={"p-2"}
                        HandleSubmit={onSubmit}
                    >
                        <Text className="text-center font-lg font-extrabold">
                            Update Question
                        </Text>
                        <Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Select Faculty
                                </ResponsiveText>
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
                                <ResponsiveText className={"text-center"}>
                                    Select Semester
                                </ResponsiveText>
                                <Select value={semesterId} onChange={(e) => setSemesterId(e.target.value)} >
                                    <option value="">
                                        --Select Semester--
                                    </option>
                                    {semesterData.map((semester) => (
                                        <option key={semester.id} value={semester.id}>
                                            {semester.name}
                                        </option>
                                    ))}
                                    </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Select Subject
                                </ResponsiveText>
                                <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}  >
                                    <option value="">--Select Subject--</option>
                                    {subjectData.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Enter Year
                                </ResponsiveText>
                                <Select dropShadow={"lg"} value={year} onChange={(e) => setYear(e.target.value)}   >
                                    <option value="">--Select Year--</option>
                                    {Array.from({ length: 12 }, (_, index) => {
                                        const year = 2070 + index;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </Box>
                            <Box className="grid grid-cols-2 mt-4">
                                <ResponsiveText className={"text-center"}>
                                    Enter Question
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
                                            htmlFor="inputFileQuestion"
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
                                        id="inputFileQuestion"
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

export default Update;
