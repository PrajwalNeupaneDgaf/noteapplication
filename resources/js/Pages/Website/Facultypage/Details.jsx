import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import React, { useState } from "react"; // Import useState here
import BodyLayout from "../Partials/BodyLayout";
import { Inertia } from "@inertiajs/inertia";
import LayoutFrontend from "../LayoutFrontend";
import Toolpad from "../Partials/Toolpad";

function Details({ semesters, faculties, faculty_short, syllabus }) {
    const [isOpen, setIsOpen] = useState(false); // State for modal visibility
    const [filePath, setFilePath] = useState("");
    const [syllabusHeader, setSyllabusHeader] = useState("");

    return (
        <>
            <Head title="Semesters" />
            <LayoutFrontend faculties={faculties}>
                <Toolpad
                    dataArray={[
                        {
                            name: "Home",
                            link: "/",
                        },
                        {
                            name: faculty_short,
                        },
                    ]}
                />
                <BodyLayout>
                    <Box
                        display={syllabus.length < 1 ? "none" : "flex"}
                        w={"full"}
                        bg={"gray.100"}
                        className="p-4 flex justify-center items-center flex-col gap-1"
                    >
                        <Text
                            bg={"#254ABE"}
                            className="text-xl font-semibold p-2 text-white rounded-none w-full text-center"
                        >
                            Syllabus
                        </Text>
                        <Box
                            w={"full"}
                            className="flex justify-center items-center flex-col gap-1"
                        >
                            {syllabus?.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        p={2}
                                        onClick={() => {
                                            setFilePath(item.file_path);
                                            setSyllabusHeader(item.name);
                                            setIsOpen(true); // Set isOpen to true
                                        }}
                                        className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white text-center"
                                    >
                                        <Text>{item.name}</Text>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box
                        w={"full"}
                        bg={"gray.100"}
                        className="p-4 flex justify-center items-center flex-col gap-1"
                    >
                        <Text
                            bg={"#254ABE"}
                            className="text-xl font-semibold p-2 text-white rounded-none w-full text-center"
                        >
                            Semesters
                        </Text>
                        {semesters.map((item, index) => {
                            return (
                                <Box
                                    w={"full"}
                                    p={2}
                                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center"
                                    onClick={() => {
                                        Inertia.visit(
                                            `faculty=${faculty_short}/semester=${item.name}`
                                        );
                                    }}
                                    key={index}
                                >
                                    <h1>{item.name}</h1>
                                </Box>
                            );
                        })}
                    </Box>
                    <Modal size={'xl'} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{syllabusHeader}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box h={'60vh'} w={'full'}>
                                    <embed
                                        width="100%"
                                        height="100%"
                                        style={{ border: "none" }}
                                        src={`http://localhost:8000/${filePath}`}
                                        type="application/pdf"
                                    />
                                </Box>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </BodyLayout>
            </LayoutFrontend>
        </>
    );
}

export default Details;
