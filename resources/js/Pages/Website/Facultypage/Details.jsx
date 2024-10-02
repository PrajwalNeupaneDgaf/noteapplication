import { Box, Text } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import React from "react";
import BodyLayout from "../Partials/BodyLayout";
import { Inertia } from "@inertiajs/inertia";
import LayoutFrontend from "../LayoutFrontend";
import Toolpad from "../Partials/Toolpad";

function Details({ semesters, faculties, faculty_short }) {
    return (
        <>
            <Head title="Semesters" />
            <LayoutFrontend faculties={faculties}>
                    <Toolpad dataArray={[
                        {
                            name:"Home",
                            link:"/"
                        },
                        {
                            name:faculty_short,
                        }
                    ]} />
                <BodyLayout>
                    <Box w={'full'} bg={'gray.100'} className=" p-4 flex justify-center items-center flex-col gap-1">
                        <Text bg={'#254ABE'} className="text-xl font-semibold p-2  text-white rounded-none w-full text-center">Semesters</Text>
                        {semesters.map((item, index) => {
                            return (
                                <Box
                                    w={'full'}
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
                </BodyLayout>
            </LayoutFrontend>
        </>
    );
}

export default Details;
