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
import ProfesorDetailsModal from "@/components/ProfesorDetailsProfile";
import ProfesorModal from "@/components/ProfesorModal";
import EditProfesorModal from "@/components/EditProfesorModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
// Putem importa componentele de Modal create anterior dacă vrei să le refolosești
// import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

const Profesori = () => {
  // Mockup bazat pe ProfesorDTO.java și structura Set<ProfesorDepartamentDTO>
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
            onClick={() => setIsCreateProfileModalOpen(true)}
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
        boxShadow="xl"
        // MODIFICĂRILE CHEIE SUNT AICI:
        p="0" // 1. Eliminăm spațiul interior ca tabelul să atingă marginile
        overflow="hidden" // 2. Tăiem colțurile tabelului ca să se potrivească cu borderRadius-ul containerului
      >
        <Table.Root variant="simple" size="md">
          {/* Header-ul va avea acum fundalul lipit de margini */}
          <Table.Header bg="rgba(0, 0, 0, 0.3)">
            <Table.Row borderColor="whiteAlpha.100">
              <Table.ColumnHeader
                color="blue.300"
                fontWeight="bold"
                py="6"
                pl="8"
              >
                PROFESOR
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold" py="6">
                CONTACT
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold" py="6">
                DEPARTAMENTE & ROLURI
              </Table.ColumnHeader>
              <Table.ColumnHeader
                textAlign="right"
                color="blue.300"
                py="6"
                pr="8"
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
                {/* 1. Nume și Avatar - Ajustăm padding-ul celulelor (pl="8") ca să nu fie textul lipit de margine */}
                <Table.Cell pl="8" py="5">
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

                <Table.Cell py="5">
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

                <Table.Cell py="5">
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
                        textTransform="none"
                        display="flex"
                        alignItems="center"
                        gap="1.5"
                      >
                        {dept.rol === "Director" && <Icon as={FiAward} />}
                        {dept.nume}
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

                {/* Ajustăm padding-ul la ultima celulă (pr="8") */}
                <Table.Cell textAlign="right" pr="8" py="5">
                  <HStack justify="flex-end" gap="1">
                    <IconButton
                      onClick={() => setIsProfileOpen(true)}
                      aria-label="More"
                      variant="ghost"
                      color="blue.200"
                      size="sm"
                      _hover={{ bg: "blue.900", color: "white" }}
                    >
                      <FiMoreHorizontal />
                    </IconButton>
                    <IconButton
                      onClick={() => setIsEditModalOpen(true)}
                      aria-label="Edit"
                      variant="ghost"
                      color="yellow.400"
                      size="sm"
                      _hover={{ bg: "yellow.900", color: "yellow.200" }}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      onClick={() => setIsDeleteModalOpen(true)}
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
      {isProfileOpen && (
        <ProfesorDetailsModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      {isCreateModalOpen && (
        <ProfesorModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateProfileModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditProfesorModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            DeleteConfirm();
            setIsDeleteModalOpen(false);
          }}
          departmentName={"Nume Profesor"}
          titlu={"Ștergere Profesor"}
          descriere={`Urmeaza sa stergi profesorul`}
          atentie={
            "Această acțiune va șterge profesorul din baza de date, această acțiune este ireversibila !"
          }
        />
      )}
    </Box>
  );
  function DeleteConfirm() {
    console.log("Sters profesor");
  }
};

export default Profesori;
