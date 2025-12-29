import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { FiX, FiPlus, FiTrash2, FiUser, FiLayers } from "react-icons/fi";

const EditProfesorModal = ({ isOpen, onClose, profesor, onSave }) => {
  // --- 1. DATE HARDCODATE (Sursa de adevăr pentru dropdown) ---
  const availableDepartments = [
    { id: 101, nume: "Ingineria Sistemelor" },
    { id: 102, nume: "Automatică și Calculatoare" },
    { id: 103, nume: "Electronică Aplicată" },
    { id: 104, nume: "Telecomunicații" },
    { id: 105, nume: "Fizică" }, // Am mai adăugat unul de test
  ];

  const fixedRole = "MEMBRU"; // Rolul blocat

  // --- 2. STATE-URI ---
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
  });

  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");

  // --- 3. POPULARE DATE (Când se deschide modalul) ---
  useEffect(() => {
    if (isOpen && profesor) {
      // Punem datele profesorului selectat în form
      setFormData({
        nume: profesor.nume || "",
        prenume: profesor.prenume || "",
        email: profesor.email || "",
        telefon: profesor.telefon || "",
      });
      // Punem departamentele existente ale profesorului
      setAssignedDepartments(profesor.departamente || []);
    }
  }, [isOpen, profesor]);

  // --- 4. HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDepartment = () => {
    if (!selectedDeptId) return;

    // Găsim obiectul departament bazat pe ID-ul selectat
    const deptObj = availableDepartments.find(
      (d) => d.id === parseInt(selectedDeptId)
    );

    // Verificăm duplicatele
    const alreadyExists = assignedDepartments.find(
      (d) => d.id === parseInt(selectedDeptId)
    );

    if (alreadyExists) {
      alert("Profesorul este deja asignat la acest departament!");
      return;
    }

    // Adăugăm departamentul nou cu rolul FORȚAT de MEMBRU
    const newAssignment = {
      id: deptObj.id,
      nume: deptObj.nume,
      rol: fixedRole,
    };

    setAssignedDepartments([...assignedDepartments, newAssignment]);
    setSelectedDeptId(""); // Resetăm dropdown-ul
  };

  const handleRemoveDepartment = (idToRemove) => {
    setAssignedDepartments(
      assignedDepartments.filter((d) => d.id !== idToRemove)
    );
  };

  const handleSaveClick = () => {
    const updatedData = {
      id: profesor?.id, // Păstrăm ID-ul original
      ...formData,
      departamente: assignedDepartments,
    };

    console.log("Saving Edit Data:", updatedData);
    onSave(updatedData); // Trimitem datele la părinte
    onClose();
  };

  // --- 5. RENDER SAFETY CHECK ---
  if (!isOpen) return null;

  // Stiluri CSS inline pentru elementele HTML native (Select)
  const selectStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: "6px",
    padding: "8px",
    width: "100%",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="blackAlpha.800"
      backdropFilter="blur(5px)"
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="#0f172a"
        w="700px"
        maxW="95%"
        maxH="90vh"
        borderRadius="xl"
        border="1px solid"
        borderColor="orange.700" // Culoare diferită (Portocaliu) pentru EDIT
        boxShadow="2xl"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
      >
        {/* HEADER - Portocaliu */}
        <Box
          p="6"
          bgGradient="linear(to-r, orange.900, red.900)"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Heading size="md" color="white" mb="1">
              Editează Profesor
            </Heading>
            <Text color="orange.200" fontSize="sm">
              Modifică datele și afilierile.
            </Text>
          </Box>

          <Button
            onClick={onClose}
            minW="32px"
            h="32px"
            p="0"
            borderRadius="full"
            bg="whiteAlpha.200"
            _hover={{ bg: "red.500" }}
          >
            <Icon as={FiX} color="white" />
          </Button>
        </Box>

        {/* BODY - Scrollable */}
        <Box flex="1" overflowY="auto" p="6">
          <Stack spacing="6">
            {/* ZONA INFO PERSONALE */}
            <Box>
              <Flex align="center" gap="2" color="orange.300" mb="4">
                <Icon as={FiUser} />
                <Text fontWeight="bold" fontSize="sm">
                  DATE DE CONTACT
                </Text>
              </Flex>

              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
                <Input
                  name="prenume"
                  value={formData.prenume}
                  onChange={handleChange}
                  placeholder="Prenume"
                  color="white"
                  borderColor="whiteAlpha.200"
                  bg="whiteAlpha.50"
                />
                <Input
                  name="nume"
                  value={formData.nume}
                  onChange={handleChange}
                  placeholder="Nume"
                  color="white"
                  borderColor="whiteAlpha.200"
                  bg="whiteAlpha.50"
                />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  color="white"
                  borderColor="whiteAlpha.200"
                  bg="whiteAlpha.50"
                />
                <Input
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  placeholder="Telefon"
                  color="white"
                  borderColor="whiteAlpha.200"
                  bg="whiteAlpha.50"
                />
              </Grid>
            </Box>

            <Box h="1px" bg="whiteAlpha.100" />

            {/* ZONA DEPARTAMENTE (Cu Rol Blocat) */}
            <Box>
              <Flex align="center" gap="2" color="orange.300" mb="4">
                <Icon as={FiLayers} />
                <Text fontWeight="bold" fontSize="sm">
                  AFILIERE (Exclusiv Membru)
                </Text>
              </Flex>

              <Box
                bg="whiteAlpha.50"
                p="4"
                borderRadius="lg"
                border="1px dashed"
                borderColor="whiteAlpha.200"
              >
                <Grid
                  templateColumns={{ base: "1fr", md: "2fr 1.5fr auto" }}
                  gap="3"
                  alignItems="end"
                >
                  {/* SELECT 1: Departamente disponibile (Hardcodat) */}
                  <Box>
                    <Text color="gray.400" fontSize="xs" mb="1">
                      DEPARTAMENT
                    </Text>
                    <select
                      style={selectStyle}
                      value={selectedDeptId}
                      onChange={(e) => setSelectedDeptId(e.target.value)}
                    >
                      <option style={{ color: "black" }} value="">
                        Alege...
                      </option>
                      {availableDepartments.map((d) => (
                        <option
                          style={{ color: "black" }}
                          key={d.id}
                          value={d.id}
                        >
                          {d.nume}
                        </option>
                      ))}
                    </select>
                  </Box>

                  {/* SELECT 2: Rol (Blocat visual si functional) */}
                  <Box>
                    <Text color="gray.400" fontSize="xs" mb="1">
                      ROL (Fix)
                    </Text>
                    <select
                      style={{
                        ...selectStyle,
                        opacity: 0.6,
                        cursor: "not-allowed",
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                      value={fixedRole}
                      disabled // Blocăm input-ul HTML
                    >
                      <option style={{ color: "black" }} value="MEMBRU">
                        Membru
                      </option>
                    </select>
                  </Box>

                  <Button
                    onClick={handleAddDepartment}
                    bg="orange.600"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                  >
                    <Flex align="center" gap="2">
                      <Icon as={FiPlus} /> Adaugă
                    </Flex>
                  </Button>
                </Grid>
              </Box>

              {/* Tabel/Lista departamente asignate */}
              <Stack mt="4" spacing="2">
                {assignedDepartments.map((dept, idx) => (
                  <Flex
                    key={dept.id || idx}
                    bg="whiteAlpha.100"
                    p="2"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                    borderLeft="3px solid"
                    borderColor="orange.500"
                  >
                    <Box ml="2">
                      <Text color="white" fontSize="sm" fontWeight="bold">
                        {dept.nume}
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        {dept.rol}
                      </Text>
                    </Box>

                    <Button
                      onClick={() => handleRemoveDepartment(dept.id)}
                      minW="30px"
                      h="30px"
                      p="0"
                      bg="transparent"
                      color="red.400"
                      _hover={{ bg: "whiteAlpha.100" }}
                    >
                      <Icon as={FiTrash2} />
                    </Button>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* FOOTER */}
        <Flex p="4" bg="blackAlpha.300" justify="flex-end" gap="3">
          <Button onClick={onClose} variant="ghost" color="gray.400">
            Anulează
          </Button>
          <Button
            onClick={handleSaveClick}
            bg="orange.600"
            color="white"
            _hover={{ bg: "orange.500" }}
          >
            Salvează Modificări
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default EditProfesorModal;
