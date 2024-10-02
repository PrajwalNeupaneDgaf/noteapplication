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

function Create({faculties,semesters,subjects,setShowCreate}) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(file != null ? file.name : "");
    const [facultyId, setFacultyId] = useState("");
    const [semesterId, setSemesterId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [year, setYear] = useState("");
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
    
        // Check if the required fields are filled
        if (!name || !facultyId || !semesterId || !subjectId || !year) {
            alert("Please fill in all required fields.");
            return;
        }
    
        // Create FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("faculty_id", facultyId);
        formData.append("semester_id", semesterId);
        formData.append("subject_id", subjectId);
        formData.append("year", year);
    
        if (file) {
            formData.append("file", file);  // Append the file if it's selected
        }
    
        // Send form data via Inertia or fetch (depending on your setup)
        router.post(route('questions.store'), formData, {
            forceFormData: true,  // Important for Inertia to handle FormData properly
            onError: (errors) => {
                console.log("Errors:", errors);  // Handle errors, display them if needed
            },
            onSuccess: () => {
                setShowCreate(false);
                window.location.reload();
                // Close modal on success
            }
        });
    };
    return (
        <>
            <Box className="w-full h-screen fixed inset-0 z-20 backdrop-blur-sm">
                <Box className="flex justify-center  mt-12">
                    <InputForm
                        setIsVisible={setShowCreate}
                        buttonValue={"Add Question"}
                        className={"p-2"}
                        HandleSubmit={onSubmit}
                    >
                        <Text className="text-center font-lg font-extrabold">
                            Add New Questions
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
