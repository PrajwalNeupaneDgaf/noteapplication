import { Box, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import InputForm from "../Admin/Components/InputForm";
import InputField from "../Admin/Components/InputField";
import ResponsiveText from "@/Components/ResponsiveText";
import { router } from "@inertiajs/react";

function Update({ data }) {
    const [name, setName] = useState(data.name);
    const [designation, setDesignation] = useState(data.designation);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("designation", designation);
        
        // Append the image file only if it's selected
        if (image) {
            formData.append("image", image);
        }

        formData.append("_method", "PUT"); // For PUT requests in Inertia
        
        router.post(route("our-team.update", data.id), formData, {
            forceFormData: true, // Ensure proper form data submission
            onSuccess: () => {
                // Add any success logic (toast notification, redirect, etc.)
            },
            onError: () => {
                // Add error handling logic if needed
            },
        });
    };

    return (
        <Box p={5}>
            <Box display="flex" justifyContent="center">
                <InputForm HandleSubmit={handleSubmit} buttonValue="Update Member">
                    <Box mb={4}>
                        <Text textAlign="center" fontSize="lg" fontWeight="bold">
                            Update Team Member
                        </Text>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={4}>
                        <InputField
                            Name="Name"
                            Value={name}
                            setValue={(e) => setName(e.target.value)}
                        />
                        <InputField
                            Name="Designation"
                            Value={designation}
                            setValue={(e) => setDesignation(e.target.value)}
                        />
                        <Box
                            className="grid grid-cols-2 "
                            fontSize={[".7rem", ".9rem", "1.1rem", "1.2rem"]}
                        >
                            <ResponsiveText className="text-center my-auto">
                                Image
                            </ResponsiveText>
                            <Input
                                type="file"
                                placeholder="Select an image..."
                                onChange={(e) => setImage(e.target.files[0])} // Set the selected file
                            />
                        </Box>
                    </Box>
                </InputForm>
            </Box>
        </Box>
    );
}

export default Update;
