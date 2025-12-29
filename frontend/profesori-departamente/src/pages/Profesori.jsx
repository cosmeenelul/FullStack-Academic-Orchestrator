import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  Badge,
  Button,
  Input,
  IconButton,
  Avatar,
  Stack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiPhone,
  FiMail,
  FiMoreHorizontal,
  FiAward,
} from "react-icons/fi";

// Putem importa componentele de Modal create anterior dacă vrei să le refolosești
// import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

const Profesori = () => {
  // Mockup bazat pe ProfesorDTO.java și structura Set<ProfesorDepartamentDTO>
  const profesoriMock = [
    {
      id: 1,
      nume: "Popescu",
      prenume: "Andrei",
      email: "andrei.popescu@upb.ro",
      telefon: "0722 123 456",
      // Simulăm Set-ul de departamente
      departamente: [
        { id: 101, nume: "Ingineria Sistemelor", rol: "Director" },
        { id: 102, nume: "Automatică", rol: "Membru" },
      ],
    },
    {
      id: 2,
      nume: "Ionescu",
      prenume: "Maria",
      email: "maria.ionescu@upb.ro",
      telefon: "0744 987 654",
      departamente: [{ id: 102, nume: "Automatică", rol: "Membru" }],
    },
    {
      id: 3,
      nume: "Vasilescu",
      prenume: "Dan",
      email: "dan.vasilescu@upb.ro",
      telefon: "0755 111 222",
      departamente: [
        { id: 103, nume: "Telecomunicații", rol: "Membru" },
        { id: 104, nume: "Electronică", rol: "Membru Consiliu" },
      ],
    },
    {
      id: 4,
      nume: "Georgescu",
      prenume: "Elena",
      email: "elena.georgescu@upb.ro",
      telefon: "0766 333 444",
      departamente: [{ id: 101, nume: "Ingineria Sistemelor", rol: "Membru" }],
    },
  ];

  return (
    <Box w="100%" minH="100vh" position="relative">
      {/* --- HEADER + SEARCH AREA --- */}
      <Flex justify="space-between" align="flex-end" mb="8" wrap="wrap" gap="4">
        <Box>
          <Heading size="xl" color="white" mb="2">
            Corp Profesoral
          </Heading>
          <Text color="gray.400">
            Gestionează profesorii și afilierile acestora la departamente.
          </Text>
        </Box>

        <Flex gap="4" align="center">
          {/* Search Bar Smecher */}
          <Box position="relative" w="300px">
            <Box position="absolute" left="3" top="3" color="blue.400">
              <FiSearch />
            </Box>
            <Input
              placeholder="Caută după nume sau email..."
              pl="10"
              bg="rgba(13, 16, 30, 0.5)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              borderRadius="xl"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 15px rgba(49, 130, 206, 0.3)",
                bg: "rgba(13, 16, 30, 0.8)",
              }}
            />
          </Box>

          <Button
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            size="lg"
            borderRadius="xl"
            boxShadow="0 0 15px rgba(49, 130, 206, 0.5)"
            leftIcon={<FiPlus />}
          >
            Adaugă Profesor
          </Button>
        </Flex>
      </Flex>

      {/* --- TABELUL DE PROFESORI --- */}
      <Box
        bg="rgba(13, 16, 30, 0.7)"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        p="1" // Padding mic pentru container
        boxShadow="xl"
        overflow="hidden"
      >
        <Table.Root variant="simple" size="md">
          <Table.Header bg="whiteAlpha.50">
            <Table.Row borderColor="whiteAlpha.100">
              <Table.ColumnHeader
                color="blue.300"
                fontWeight="bold"
                py="5"
                pl="6"
              >
                PROFESOR
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold" py="5">
                CONTACT
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold" py="5">
                DEPARTAMENTE & ROLURI
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="right"
                color="blue.300"
                py="5"
                pr="6"
              >
                ACȚIUNI
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {profesoriMock.map((prof) => (
              <Table.Row
                key={prof.id}
                _hover={{ bg: "whiteAlpha.50" }}
                transition="0.2s"
                borderColor="whiteAlpha.50"
              >
                {/* 1. Nume și Avatar */}
                <Table.Cell pl="6" py="4">
                  <HStack gap="4">
                    <Avatar.Root size="md" variant="solid">
                      <Avatar.Fallback
                        bgGradient="to-br"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                        color="white"
                        fontWeight="bold"
                      >
                        {prof.nume[0]}
                        {prof.prenume[0]}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Box>
                      <Text fontWeight="bold" color="white" fontSize="md">
                        {prof.nume} {prof.prenume}
                      </Text>
                      <Text fontSize="xs" color="gray.400" mt="-1">
                        ID: #{prof.id}
                      </Text>
                    </Box>
                  </HStack>
                </Table.Cell>

                {/* 2. Contact (Email & Telefon) */}
                <Table.Cell py="4">
                  <Stack gap="1">
                    <Flex align="center" gap="2" color="gray.300">
                      <Icon as={FiMail} color="blue.400" boxSize="3.5" />
                      <Text fontSize="sm">{prof.email}</Text>
                    </Flex>
                    <Flex align="center" gap="2" color="gray.400">
                      <Icon as={FiPhone} color="green.400" boxSize="3.5" />
                      <Text fontSize="xs">{prof.telefon}</Text>
                    </Flex>
                  </Stack>
                </Table.Cell>

                {/* 3. Departamente (Badge-uri colorate) */}
                <Table.Cell py="4">
                  <Flex wrap="wrap" gap="2" maxW="350px">
                    {prof.departamente.map((dept) => (
                      <Badge
                        key={dept.id}
                        colorPalette={
                          dept.rol === "Director" ? "purple" : "blue"
                        }
                        variant={dept.rol === "Director" ? "solid" : "subtle"}
                        borderRadius="full"
                        px="3"
                        py="1"
                        textTransform="none" // Să nu fie totul uppercase
                        display="flex"
                        alignItems="center"
                        gap="1.5"
                      >
                        {dept.rol === "Director" && <Icon as={FiAward} />}
                        {dept.nume}
                        {/* Afișăm rolul doar dacă e ceva special, altfel aglomerează */}
                        {dept.rol !== "Membru" && (
                          <Text
                            as="span"
                            opacity="0.8"
                            ml="1"
                            fontWeight="normal"
                          >
                            | {dept.rol}
                          </Text>
                        )}
                      </Badge>
                    ))}
                  </Flex>
                </Table.Cell>

                {/* 4. Actiuni */}
                <Table.Cell textAlign="right" pr="6" py="4">
                  <HStack justify="flex-end" gap="1">
                    <IconButton
                      aria-label="More"
                      variant="ghost"
                      color="blue.200"
                      size="sm"
                      _hover={{ bg: "blue.900", color: "white" }}
                    >
                      <FiMoreHorizontal />
                    </IconButton>
                    <IconButton
                      aria-label="Edit"
                      variant="ghost"
                      color="yellow.400"
                      size="sm"
                      _hover={{ bg: "yellow.900", color: "yellow.200" }}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      variant="ghost"
                      color="red.400"
                      size="sm"
                      _hover={{ bg: "red.900", color: "red.200" }}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default Profesori;
