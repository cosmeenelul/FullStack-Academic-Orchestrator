import React, { useEffect, useState } from "react";
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
  Link,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { LuExternalLink } from "react-icons/lu";
import DepartamentModal from "@/components/DeapartamentModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import SuccessFeedback from "@/components/SuccessFeedback";
import { CgPathCrop } from "react-icons/cg";
import ErrorFeedback from "@/components/ErrorFeedback";

const Departamente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsModalEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dateFormular, setDateFormular] = useState({
    nume: "",
    telefon: "",
    linkWeb: "",
  });
  const [succesFeedback, setSuccesFeedback] = useState(false);
  const [listaDepartamente, setListaDepartamente] = useState([]);
  const [deleteDepartamente, setDeleteDepartemente] = useState(0);
  const [departamentDeSters, setDepartamentDeSters] = useState(null);
  const [errorFeedback, setErrorFeedback] = useState(false);
  const [mesajErorare, setMesajErorare] = useState("");
  useEffect(() => {
    async function getDepartamente() {
      try {
        const res = await fetch("http://localhost:8080/departamente");
        const departamente = await res.json();
        console.log(departamente);
        setListaDepartamente(departamente);
      } catch {
        throw new Error("A problem has occured");
      } finally {
        console.log("Loading...");
      }
    }
    getDepartamente();
  }, [deleteDepartamente]);

  async function saveNewDepartment() {
    try {
      const res = await fetch("http://localhost:8080/departamente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dateFormular),
      });

      if (res.ok) {
        const noulDept = await res.json();
        setListaDepartamente((prev) => [...prev, noulDept]);
        setIsModalOpen(false);
        setSuccesFeedback(true);
        setDateFormular({ nume: "", telefon: "", linkWeb: "" });
      } else {
        const errorData = await res.json();

        throw new Error(errorData.message || "Eroare necunoscuta de la server");
      }
    } catch (error) {
      console.log("Eroare prinsa:", error.message);

      setMesajErorare(error.message);
      setIsModalOpen(false);
      setDateFormular({ nume: "", telefon: "", linkWeb: "" });
      setErrorFeedback(true);
    }
  }

  async function deleteDepartament(id) {
    try {
      const res = await fetch(`http://localhost:8080/departamente/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteDepartemente((prev) => prev + 1);
        setIsDeleteModalOpen(false);
      }
    } catch {
      throw new Error("Erorare la stergerea elementului");
    }
  }
  return (
    <Box w="100%" minH="100vh" position="relative">
      <Flex justify="space-between" align="center" mb="8">
        <Box>
          <Heading size="xl" color="white" mb="2">
            Gestiune Departamente
          </Heading>
          <Text color="gray.400">Administrează structura academică.</Text>
        </Box>

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
            {listaDepartamente.map((dept) => (
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
                    <Link
                      href={dept.linkWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      colorPalette="blue"
                    >
                      Link
                      <LuExternalLink />
                    </Link>
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
                      onClick={() => {
                        console.log(dept.id);
                        setIsDeleteModalOpen(true);
                        setDepartamentDeSters(dept.id);
                      }}
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
          dateFormular={dateFormular}
          setDateFormular={setDateFormular}
          isOpen={isModalOpen}
          onSave={saveNewDepartment}
          onClose={() => {
            setIsModalOpen(false);
            setDateFormular({
              nume: "",
              telefon: "",
              linkWeb: "",
            });
          }}
          titlu={"Adaugă Departament"}
          descriere={"Aici adaugi datele noului departament"}
        />
      )}
      {succesFeedback && (
        <SuccessFeedback
          onClose={() => setSuccesFeedback(false)}
          message="Departamentul a fost adăugat cu succes!"
        />
      )}
      {errorFeedback && (
        <ErrorFeedback
          message={mesajErorare}
          onClose={() => setErrorFeedback(false)}
          onRetry={() => {
            setErrorFeedback(false);
            setIsModalOpen(true);
          }}
        />
      )}
      {isEditModalOpen && (
        <DepartamentModal
          titlu={"Editează Departament"}
          descriere={"Aici editezi datele unui departament existent"}
          isOpen={isEditModalOpen}
          onClose={() => setIsModalEditOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteDepartament(departamentDeSters)}
          departmentName={"Nume Departament"}
          titlu={"Ștergere Departament"}
          descriere={`Urmeaza sa stergi departamentul ${" Nume departament"}`}
          atentie={
            "Această acțiune va șterge departamentul si inclusiv toți membrii care aparțin doar acestui departament, această acțiune este ireversibila !"
          }
        />
      )}
    </Box>
  );
};

export default Departamente;
