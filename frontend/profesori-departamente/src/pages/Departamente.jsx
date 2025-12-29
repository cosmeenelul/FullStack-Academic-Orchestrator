import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  Badge,
  Button,
  Stack,
  Input,
  IconButton,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiPhone,
  FiX,
} from "react-icons/fi";
import DepartamentModal from "@/components/DeapartamentModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

const Departamente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsModalEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const departamenteMock = [
    {
      id: 1,
      nume: "Ingineria Sistemelor",
      telefon: "021 402 9100",
      linkWeb: "https://automatica.pub.ro",
    },
    {
      id: 2,
      nume: "Telecomunicații",
      telefon: "021 402 9101",
      linkWeb: "https://etti.pub.ro",
    },
    {
      id: 3,
      nume: "Electronică Aplicată",
      telefon: "021 402 9102",
      linkWeb: "https://electronica.pub.ro",
    },
  ];

  return (
    <Box w="100%" minH="100vh" position="relative">
      {/* --- HEADER --- */}
      <Flex justify="space-between" align="center" mb="8">
        <Box>
          <Heading size="xl" color="white" mb="2">
            Gestiune Departamente
          </Heading>
          <Text color="gray.400">Administrează structura academică.</Text>
        </Box>

        {/* Butonul care deschide modalul manual */}
        <Button
          onClick={() => setIsModalOpen(true)}
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.500", transform: "translateY(-2px)" }}
          transition="all 0.2s"
          size="lg"
          borderRadius="xl"
          boxShadow="0 0 15px rgba(49, 130, 206, 0.5)"
        >
          <Box mr="2">
            <FiPlus />
          </Box>
          Departament Nou
        </Button>
      </Flex>

      <Box
        bg="rgba(13, 16, 30, 0.7)"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        p="6"
        boxShadow="xl"
      >
        <Table.Root variant="simple" size="md">
          <Table.Header>
            <Table.Row borderColor="whiteAlpha.100">
              <Table.ColumnHeader color="blue.300" fontWeight="bold">
                ID
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold">
                NUME DEPARTAMENT
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold">
                CONTACT
              </Table.ColumnHeader>
              <Table.ColumnHeader color="blue.300" fontWeight="bold">
                WEBSITE
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right" color="blue.300">
                ACȚIUNI
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {departamenteMock.map((dept) => (
              <Table.Row
                key={dept.id}
                _hover={{ bg: "whiteAlpha.50" }}
                transition="0.2s"
                borderColor="whiteAlpha.50"
              >
                <Table.Cell>
                  <Badge colorPalette="blue" variant="solid" px="2">
                    {dept.id}
                  </Badge>
                </Table.Cell>
                <Table.Cell fontWeight="bold" color="white">
                  {dept.nume}
                </Table.Cell>
                <Table.Cell color="gray.300">
                  <Flex align="center" gap="2">
                    <FiPhone /> {dept.telefon}
                  </Flex>
                </Table.Cell>
                <Table.Cell color="blue.400">
                  <Flex
                    align="center"
                    gap="2"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    <FiExternalLink /> Link
                  </Flex>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Flex justify="flex-end" gap="2">
                    <IconButton
                      onClick={() => {
                        setIsModalEditOpen(true);
                      }}
                      aria-label="Edit"
                      bg="transparent"
                      color="yellow.400"
                      _hover={{ bg: "whiteAlpha.200" }}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      onClick={() => setIsDeleteModalOpen(true)}
                      aria-label="Delete"
                      bg="transparent"
                      color="red.400"
                      _hover={{ bg: "whiteAlpha.200" }}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      {isModalOpen && (
        <DepartamentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <DepartamentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsModalEditOpen(false)}
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
        />
      )}
    </Box>
  );
};
function DeleteConfirm() {
  console.log("S-A STERS");
}
export default Departamente;
