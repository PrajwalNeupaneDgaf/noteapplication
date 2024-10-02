import {
    Box,
    Text,
    Heading,
    Flex,
    Image,
    VStack,
    Button,
    SimpleGrid,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import React from "react";
import LayoutFrontend from "../LayoutFrontend";
import BodyLayout from "../Partials/BodyLayout";

function Main({ faculties }) {
    const backgroundImage =
        "https://www.onlinecoursehow.com/wp-content/uploads/2019/07/Elearning-1024x512.jpg"; // Placeholder for background
    const homeImage =
        "https://cdn.elearningindustry.com/wp-content/uploads/2022/01/shutterstock_1060195475-768x431.jpg"; // Placeholder for home image
    const teamImage = "https://via.placeholder.com/150"; // Placeholder for team member images

    return (
        <Box>
            <Head title="Welcome to Home Page" />
            <LayoutFrontend faculties={faculties}>
                <BodyLayout>
                    {/* Hero Section */}
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        bgImage={`url(${backgroundImage})`} // Background image
                        bgSize="cover"
                        bgPos="center"
                        h="60vh"
                        color="white"
                        textAlign="center"
                        p={5}
                        position="relative"
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent overlay
                            zIndex: 1,
                        }}
                    >
                        <Heading
                            as="h1"
                            size="2xl"
                            mb={4}
                            position="relative"
                            zIndex={2}
                        >
                            Welcome to e-Notes
                        </Heading>
                        <Text
                            fontSize="xl"
                            mb={8}
                            position="relative"
                            zIndex={2}
                        >
                            "Knowledge is power. Information is liberating.
                            Education is the premise of progress, in every
                            society, in every family."
                        </Text>
                    </Flex>

                    {/* Additional Content Section */}
                    <VStack spacing={5} mt={10}>
                        <Text fontSize="2xl" fontWeight="bold">
                            Our Features
                        </Text>
                        <Text fontSize="lg">
                            Explore our wide range of features designed to
                            enhance your learning experience.
                        </Text>
                        <Image
                            src={homeImage}
                            alt="Home Image"
                            borderRadius="md"
                            boxSize="300px"
                        />
                        <Text fontSize="lg" textAlign="center">
                            Join thousands of students and educators using
                            e-Notes to excel in their studies!
                        </Text>
                    </VStack>

                    {/* Our Team Section */}
                    <VStack spacing={5} mt={20}>
                        <Heading as="h2" size="xl" mb={4}>
                            Meet Our Team
                        </Heading>
                        <Text fontSize="lg" textAlign="center" mb={8}>
                            Our team of passionate educators and technologists
                            work together to bring the best learning experience
                            to you.
                        </Text>

                        {/* Team Members */}
                        <SimpleGrid
                            columns={[1, 2, 3]}
                            spacing={10}
                            alignItems="center"
                        >
                            {/* Team Member 1 */}
                            <VStack>
                                <Image
                                    src={teamImage}
                                    alt="Team Member 1"
                                    borderRadius="full"
                                    boxSize="150px"
                                />
                                <Heading as="h3" size="md">
                                    John Doe
                                </Heading>
                                <Text fontSize="sm">CEO & Founder</Text>
                            </VStack>

                            {/* Team Member 2 */}
                            <VStack>
                                <Image
                                    src={teamImage}
                                    alt="Team Member 2"
                                    borderRadius="full"
                                    boxSize="150px"
                                />
                                <Heading as="h3" size="md">
                                    Jane Smith
                                </Heading>
                                <Text fontSize="sm">
                                    Chief Technology Officer
                                </Text>
                            </VStack>

                            {/* Team Member 3 */}
                            <VStack>
                                <Image
                                    src={teamImage}
                                    alt="Team Member 3"
                                    borderRadius="full"
                                    boxSize="150px"
                                />
                                <Heading as="h3" size="md">
                                    Emily Johnson
                                </Heading>
                                <Text fontSize="sm">Head of Education</Text>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </BodyLayout>
            </LayoutFrontend>
        </Box>
    );
}

export default Main;