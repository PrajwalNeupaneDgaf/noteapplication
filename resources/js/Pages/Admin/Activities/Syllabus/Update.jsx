import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputForm from "../../Components/InputForm";
import ResponsiveText from "@/Components/ResponsiveText";
import { LinkIcon } from "@chakra-ui/icons";
import FilePreview from "../../Components/FilePrivew";
import { router } from "@inertiajs/react";

function Update({ data, syllabus, auth }) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(file ? file.name : syllabus.name);
    const [faculty_id, setFaculty_id] = useState(syllabus.faculty_id);

    const toast = useToast();

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (!name || !faculty_id) {
            toast({
                title: "Error",
                description: "Please fill all fields",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("faculty_id", faculty_id);
        formData.append("_method", "PUT");  
        formData.append("file", file);  // Attach file to form data
      
    
        // Debugging: Log FormData entries
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);  // Make sure the file is here
        }
    
        // Send the request using Inertia
        router.post(route("syllabus.update", syllabus.id), formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            },
            forceFormData: true, // Inertia should handle form-data properly
            onError: (errors) => {
                console.log("Errors:", errors);  // Handle and display errors
            }
        }); 
    };
    
    return (
        <>
            <Authenticated user={auth.user}>
                <Box>
                    <Box className="flex justify-center mt-12">
                        <InputForm
                            buttonValue="Update Syllabus"
                            className="p-2"
                            HandleSubmit={onSubmit}
                        >
                            <Text className="text-center font-lg font-extrabold">
                                Update Syllabus
                            </Text>
                            <Box>
                                {/* Faculty Selection */}
                                <Box className="grid grid-cols-2 mt-4">
                                    <ResponsiveText className="text-center">
                                        Select Faculty
                                    </ResponsiveText>
                                    <Select
                                        name="faculty_id"
                                        value={faculty_id}
                                        onChange={(e) =>
                                            setFaculty_id(e.target.value)
                                        }
                                        placeholder="--Select Faculty--"
                                    >
                                        {data.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>

                                {/* File and Syllabus Name */}
                                <Box className="grid grid-cols-2 mt-4">
                                    <ResponsiveText className="text-center">
                                        Enter Syllabus
                                    </ResponsiveText>
                                    <InputGroup>
                                        <Input
                                            name="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            onClick={(e) =>
                                                name && e.target.select()
                                            } // Auto-select content on click if not empty
                                        />
                                        <Tooltip
                                            hasArrow
                                            label={
                                                file
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
                                                            file ? "green" : ""
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
                                                console.log(e.target.files[0])
                                                setName(e.target.files[0].name);
                                            }}
                                            accept=".pdf , .docx"
                                            id="inputFileNote"
                                        />
                                    </InputGroup>
                                </Box>
                            </Box>
                        </InputForm>
                    </Box>
                </Box>
            </Authenticated>
        </>
    );
}

export default Update;
