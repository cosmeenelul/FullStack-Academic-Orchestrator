import React, { useEffect, useState } from "react";
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
  Spinner,
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
  FiRefreshCw, // Import iconita noua
} from "react-icons/fi";
import ProfesorDetailsModal from "@/components/ProfesorDetailsProfile";
import ProfesorModal from "@/components/ProfesorModal";
import EditProfesorModal from "@/components/EditProfesorModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import SuccessFeedback from "@/components/SuccessFeedback";
import ErrorFeedback from "@/components/ErrorFeedback";
// 1. IMPORT MODALUL NOU
import ChangeDirectorModal from "@/components/ChangeDirectorModal";

const Profesori = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 2. STATE PENTRU MODALUL NOU
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);

  const [numeProfesorDelete, setNumeProfesorDelete] = useState("");
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
  });

  const [currentEditId, setCurrentEditId] = useState(null);
  const [listaProfesori, setListaProfesori] = useState([]);
  const [currentProfesorDetails, setCurrentProfesorDetails] = useState(null);
  const [depts, setDepts] = useState([]);
  const [successFeedback, setSuccessFeedback] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(false);
  const [totalSaves, setTotalSaves] = useState(0);
  const [mesajEroare, setMesajEroare] = useState("");
  const [tipOperatiune, setTipOperatiune] = useState(null);
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [deleteCounter, setDeleteCounter] = useState(0);

  useEffect(() => {
    async function getProfesori() {
      setSpinnerOpen(true);
      try {
        const res = await fetch("http://localhost:8080/profesori");
        const data = await res.json();
        const profesoriProcesati = data.map((prof) => ({
          id: prof.id,
          nume: prof.nume,
          prenume: prof.prenume,
          email: prof.email,
          telefon: prof.telefon,
          departamente: prof.departamente
            ? prof.departamente.map((d) => ({
                id: d.departament?.id,
                nume: d.departament?.nume || "N/A",
                rolDepartament: d.rolDepartament || "Membru",
              }))
            : [],
        }));

        setListaProfesori(profesoriProcesati);
      } catch (error) {
        console.log(error);
      } finally {
        setSpinnerOpen(false);
      }
    }

    getProfesori();
  }, [totalSaves, deleteCounter]);

  // ... (funcțiile existente getProfesorById, saveProfesor etc. rămân neschimbate) ...
  async function getProfesorById(idProfesor) {
    try {
      const res = await fetch(
        `http://localhost:8080/profesori/profil/${idProfesor}`
      );
      const data = await res.json();
      if (res.ok) console.log(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
      setErrorFeedback(true);
    }
  }

  async function saveProfesor(payload) {
    setTipOperatiune("ADD");
    try {
      const res = await fetch("http://localhost:8080/profesori", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessFeedback(true);
        setTotalSaves((item) => item + 1);
        setFormData({ nume: "", prenume: "", email: "", telefon: "" });
        setDepts([]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorFeedback(true);
      setMesajEroare(error.message);
    }
  }

  async function editProfesor(payload) {
    setTipOperatiune("EDIT");
    try {
      const res = await fetch(
        `http://localhost:8080/profesori/${currentEditId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccessFeedback(true);
        setTotalSaves((item) => item + 1);
        setFormData({ nume: "", prenume: "", email: "", telefon: "" });
        setDepts([]);
        setCurrentEditId(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorFeedback(true);
      setMesajEroare(error.message);
    }
  }

  function handleSave() {
    const departamenteMap = {};
    depts.forEach((dept) => {
      departamenteMap[dept.id] = dept.rolDepartament;
    });
    const payload = { ...formData, departamente: departamenteMap };
    saveProfesor(payload);
    setIsCreateModalOpen(false);
  }

  const handleEditSave = () => {
    const departamenteMap = {};
    depts.forEach((dept) => {
      if (dept.id) {
        if (dept.rolDepartament === "Director") return;
        departamenteMap[dept.id] = dept.rolDepartament;
      }
    });
    const payload = { ...formData, departamente: departamenteMap };
    editProfesor(payload);
    setIsEditModalOpen(false);
  };

  const handleEditClick = (prof) => {
    setCurrentEditId(prof.id);
    setFormData({
      nume: prof.nume,
      prenume: prof.prenume,
      email: prof.email,
      telefon: prof.telefon,
    });
    setDepts(prof.departamente ? [...prof.departamente] : []);
    setIsEditModalOpen(true);
  };

  async function deleteById(id) {
    try {
      const res = await fetch(`http://localhost:8080/profesori/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccessFeedback(true);
        setDeleteCounter((cnt) => cnt + 1);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      setErrorFeedback(true);
      setMesajEroare(error.message);
    }
  }

  async function handleChangeDirector(departamentId, profesorId) {
    try {
      console.log(
        `Schimbare director: Dept ${departamentId}, Prof ${profesorId}`
      );

      // MOCK FETCH - ÎNLOCUIEȘTE URL-UL CU CEL REAL
      const res = await fetch(
        `http://localhost:8080/profesor-departament/${departamentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idMembru: profesorId }),
        }
      );

      if (res.ok) {
        setSuccessFeedback(true);
        setTotalSaves((prev) => prev + 1);
      } else {
        const data = await res.json();
        throw new Error(data.message || "Eroare la schimbarea directorului");
      }
    } catch (error) {
      console.log(error);
      setMesajEroare(error.message);
      setErrorFeedback(true);
    }
  }

  return (
    <Box w="100%" minH="100vh" position="relative">
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

          {/* 4. BUTONUL NOU "SCHIMBĂ DIRECTOR" */}
          <Button
            bg="cyan.600"
            color="white"
            _hover={{
              bg: "cyan.500",
              transform: "translateY(-2px)",
              boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
            }}
            transition="all 0.2s"
            size="lg"
            borderRadius="xl"
            boxShadow="lg"
            leftIcon={<FiRefreshCw />}
            onClick={() => setIsDirectorModalOpen(true)}
          >
            Schimbă Director
          </Button>

          <Button
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            size="lg"
            borderRadius="xl"
            boxShadow="0 0 15px rgba(49, 130, 206, 0.5)"
            leftIcon={<FiPlus />}
            onClick={() => {
              setFormData({ nume: "", prenume: "", email: "", telefon: "" });
              setDepts([]);
              setIsCreateModalOpen(true);
            }}
          >
            Adaugă Profesor
          </Button>
        </Flex>
      </Flex>

      {spinnerOpen ? (
        <Flex justify="center" align="center" minH="400px" w="100%">
          <Stack align="center" gap="4">
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="whiteAlpha.200"
              color="blue.500"
            />
            <Text color="blue.300" fontWeight="medium">
              Loading...
            </Text>
          </Stack>
        </Flex>
      ) : (
        <Box
          bg="rgba(13, 16, 30, 0.7)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          boxShadow="xl"
          p="0"
          overflow="hidden"
        >
          <Table.Root variant="simple" size="md">
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
              {listaProfesori.map((prof, profIdx) => (
                <Table.Row
                  key={prof.id || `prof-${profIdx}`}
                  _hover={{ bg: "whiteAlpha.50" }}
                  transition="0.2s"
                  borderColor="whiteAlpha.50"
                >
                  <Table.Cell pl="8" py="5">
                    <HStack gap="4">
                      <Avatar.Root
                        size="xl"
                        variant="solid"
                        bgGradient="to-br"
                        gradientFrom="blue.500"
                        gradientTo="purple.600"
                      >
                        <Avatar.Fallback color="white" fontWeight="bold">
                          {prof.nume?.[0]}
                          {prof.prenume?.[0]}
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
                      {prof.departamente.map((dept, deptIdx) => (
                        <Badge
                          key={dept.id || `prof-dept-${deptIdx}`}
                          colorPalette={
                            dept.rolDepartament === "Director"
                              ? "purple"
                              : "blue"
                          }
                          variant={
                            dept.rolDepartament === "Director"
                              ? "solid"
                              : "subtle"
                          }
                          borderRadius="full"
                          px="3"
                          py="1"
                          textTransform="none"
                          display="flex"
                          alignItems="center"
                          gap="1.5"
                        >
                          {dept.rolDepartament === "Director" && (
                            <Icon as={FiAward} />
                          )}
                          {dept.nume}
                          <Text
                            as="span"
                            opacity="0.8"
                            ml="1"
                            fontWeight="normal"
                          >
                            | {dept.rolDepartament}
                          </Text>
                        </Badge>
                      ))}
                    </Flex>
                  </Table.Cell>

                  <Table.Cell textAlign="right" pr="8" py="5">
                    <HStack justify="flex-end" gap="1">
                      <IconButton
                        onClick={() => {
                          setIsProfileOpen(true);
                          getProfesorById(prof.id);
                          setCurrentProfesorDetails(prof);
                        }}
                        aria-label="More"
                        variant="ghost"
                        color="blue.200"
                        size="sm"
                        _hover={{ bg: "blue.900", color: "white" }}
                      >
                        <FiMoreHorizontal />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEditClick(prof)}
                        aria-label="Edit"
                        variant="ghost"
                        color="yellow.400"
                        size="sm"
                        _hover={{ bg: "yellow.900", color: "yellow.200" }}
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setIdDelete(prof.id);
                          setNumeProfesorDelete(prof.nume + " " + prof.prenume);
                        }}
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
      )}

      {/* ... Celelalte modale ... */}
      {isProfileOpen && (
        <ProfesorDetailsModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          profesor={currentProfesorDetails}
        />
      )}
      {isCreateModalOpen && (
        <ProfesorModal
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          isOpen={isCreateModalOpen}
          departamente={depts}
          setDepartamente={setDepts}
          onClose={() => {
            setFormData({ nume: "", prenume: "", email: "", telefon: "" });
            setIsCreateModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && (
        <EditProfesorModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setFormData({ nume: "", prenume: "", email: "", telefon: "" });
            setDepts([]);
          }}
          formData={formData}
          setFormData={setFormData}
          onSave={handleEditSave}
          departamente={depts}
          setDepartamente={setDepts}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            deleteById(idDelete);
            setIsDeleteModalOpen(false);
          }}
          departmentName={numeProfesorDelete}
          titlu={"Ștergere Profesor"}
          descriere={`Urmeaza sa stergi profesorul `}
          atentie={
            "Această acțiune va șterge profesorul din baza de date, această acțiune este ireversibila !"
          }
        />
      )}

      {isDirectorModalOpen && (
        <ChangeDirectorModal
          isOpen={isDirectorModalOpen}
          onClose={() => setIsDirectorModalOpen(false)}
          listaProfesori={listaProfesori}
          onSave={handleChangeDirector}
        />
      )}

      {successFeedback && (
        <SuccessFeedback
          onClose={() => setSuccessFeedback(false)}
          message="Modificările au fost realizate cu succes!"
        />
      )}
      {errorFeedback && (
        <ErrorFeedback
          message={mesajEroare}
          onClose={() => setErrorFeedback(false)}
          onRetry={() => {
            setErrorFeedback(false);
            if (tipOperatiune == "ADD") setIsCreateModalOpen(true);
            else setIsEditModalOpen(true);
          }}
        />
      )}
    </Box>
  );
};

export default Profesori;
