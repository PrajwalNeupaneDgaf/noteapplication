import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import React from "react";
import Navbar from "./Navbar";
import { HamburgerIcon } from "@chakra-ui/icons";

function Header({faculties}) {
    const Image = "https://static.vecteezy.com/system/resources/previews/000/503/997/original/vector-notes-icon-design.jpg";
    const {  isOpen,onClose ,onOpen} = useDisclosure()
    return (
        <Box 
        boxShadow={'0 0 2px gray'}
        className="flex flex-row justify-between p-2 bg-white ">
            <Box className="flex flex-row gap-4">
                <Box
                    onClick={onOpen}
                    display={["flex", "flex", "none", "none"]}
                    className="cursor-pointer justify-center align-middle my-auto"
                >
                    <HamburgerIcon boxSize={7} />
                </Box>
                <Box
                    className="cursor-pointer"
                    onClick={() => {
                        Inertia.visit('/');
                    }}
                >
                    <img
                        className="h-12 "
                        src={Image}
                        alt="E-Note"
                    />
                </Box>
            </Box>
            <Box display={["none", "none", "block", "block"]}>
                <Navbar faculties={faculties} />
                <Box display={["block", "block", "none", "none"]}>
                <Drawer isOpen={isOpen} placement="left"
                onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerCloseButton />
                            <Box
                                className="cursor-pointer"
                                onClick={() => {
                                    Inertia.get("/");
                                }}
                            >
                                <img
                                    className="h-10 "
                                    src={Image}
                                    alt="E-Note"
                                />
                            </Box>
                        </DrawerHeader>
                        <DrawerBody>
                            <Navbar faculties={faculties} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                </Box>
            </Box>
        </Box>
    );
}

export default Header;
