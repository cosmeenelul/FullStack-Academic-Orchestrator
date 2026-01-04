import React, { useEffect, useMemo, useState } from "react";
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
  Select,
  createListCollection,
} from "@chakra-ui/react";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLayers,
  FiChevronDown,
} from "react-icons/fi";

const ProfesorModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  departamente,
  setDepartamente,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState([]);
  const [selectedRole, setSelectedRole] = useState(["Membru"]);
  const [idDepartamente, setIdDepartamente] = useState([]);
  const [listaDepartamente, setListaDepatamente] = useState([]);
  const departmentsCollection = useMemo(() => {
    return createListCollection({
      items: listaDepartamente.map((dept) => ({
        label: dept.nume,
        value: dept.id,
      })),
    });
  }, [listaDepartamente]);

  const rolesCollection = createListCollection({
    items: [
      { label: "Membru", value: "Membru" },
      { label: "Director", value: "Director" },
    ],
  });

  useEffect(() => {
    async function getDepartamente() {
      try {
        const res = await fetch("http://localhost:8080/departamente");
        const data = await res.json();

        if (res.ok) {
          console.log(data);
          setListaDepatamente(data);
        } else
          throw new Error("Problema la fetch departamente in modal profesor");
      } catch (error) {
        console.log(error);
      }
    }
    getDepartamente();
  }, []);

  const handleAddDepartment = () => {
    const deptId = selectedDeptId[0];
    const roleVal = selectedRole[0];

    if (!deptId) return;

    const deptObj = departmentsCollection.items.find((d) => d.value === deptId);

    const alreadyExists = idDepartamente.find((d) => d.id === parseInt(deptId));
    if (alreadyExists) {
      alert("Acest departament este deja adăugat!");
      return;
    }

    const newAssignment = {
      id: parseInt(deptObj.value),
      nume: deptObj.label,
      rol: roleVal,
    };
    const departament = {
      id: newAssignment.id,
      rolDepartament: newAssignment.rol,
    };

    setDepartamente([...departamente, departament]);

    setIdDepartamente([...idDepartamente, newAssignment]);
    setSelectedDeptId([]);
    setSelectedRole(["Membru"]);
  };

  const handleRemoveDepartment = (idToRemove) => {
    setIdDepartamente(idDepartamente.filter((d) => d.id !== idToRemove));
    setDepartamente(departamente.filter((d) => d.id !== idToRemove));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(5px); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
          }
        `}
      </style>
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
          borderColor="blue.900"
          boxShadow="2xl"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
          display="flex"
          flexDirection="column"
          animation="slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        >
          {/* HEADER */}
          <Box
            p="6"
            bgGradient="linear(to-r, blue.900, purple.900)"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading size="md" color="white" mb="1">
                Adaugă Profesor
              </Heading>
              <Text color="blue.200" fontSize="sm">
                Completează detaliile
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

          <Box flex="1" overflowY="auto" p="6">
            <Stack spacing="6">
              <Box>
                <Flex align="center" gap="2" color="blue.300" mb="4">
                  <Icon as={FiUser} />
                  <Text fontWeight="bold" fontSize="sm">
                    INFORMAȚII PERSONALE
                  </Text>
                </Flex>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
                  <Input
                    name="prenume"
                    placeholder="Prenume"
                    onChange={handleChange}
                    color="white"
                    borderColor="whiteAlpha.200"
                    bg="whiteAlpha.50"
                  />
                  <Input
                    name="nume"
                    placeholder="Nume"
                    onChange={handleChange}
                    color="white"
                    borderColor="whiteAlpha.200"
                    bg="whiteAlpha.50"
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    color="white"
                    borderColor="whiteAlpha.200"
                    bg="whiteAlpha.50"
                  />
                  <Input
                    name="telefon"
                    placeholder="Telefon"
                    onChange={handleChange}
                    color="white"
                    borderColor="whiteAlpha.200"
                    bg="whiteAlpha.50"
                  />
                </Grid>
              </Box>

              <Box h="1px" bg="whiteAlpha.100" />

              <Box>
                <Flex align="center" gap="2" color="purple.300" mb="4">
                  <Icon as={FiLayers} />
                  <Text fontWeight="bold" fontSize="sm">
                    AFILIERE
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
                    {/* --- SELECT DEPARTAMENT --- */}
                    <Box>
                      <Text color="gray.400" fontSize="xs" mb="1">
                        DEPARTAMENT
                      </Text>
                      <Select.Root
                        collection={departmentsCollection} // Folosim colectia creata
                        value={selectedDeptId}
                        onValueChange={(e) => setSelectedDeptId(e.value)}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger
                            px="3"
                            py="2"
                            bg="rgba(0,0,0,0.3)"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            borderRadius="md"
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            color="white"
                          >
                            <Select.ValueText placeholder="Alege departament..." />
                            <Icon as={FiChevronDown} color="gray.500" />
                          </Select.Trigger>
                        </Select.Control>

                        <Select.Positioner zIndex={10000}>
                          <Select.Content
                            bg="#1a202c"
                            border="1px solid"
                            borderColor="blue.700"
                            borderRadius="md"
                            p="2"
                            zIndex={10000}
                            w="100%"
                          >
                            {departmentsCollection.items.map((dept) => (
                              <Select.Item
                                key={dept.value}
                                item={dept} // IMPORTANT: pasam obiectul intreg la item
                                _hover={{ bg: "blue.600" }}
                                p="2"
                                borderRadius="sm"
                                cursor="pointer"
                                color="white"
                              >
                                <Select.ItemText>{dept.label}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>

                    <Box>
                      <Text color="gray.400" fontSize="xs" mb="1">
                        ROL
                      </Text>
                      <Select.Root
                        collection={rolesCollection} // Folosim colectia creata
                        value={selectedRole}
                        onValueChange={(e) => setSelectedRole(e.value)}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger
                            px="3"
                            py="2"
                            bg="rgba(0,0,0,0.3)"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            borderRadius="md"
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            color="white"
                          >
                            <Select.ValueText placeholder="Alege rol..." />
                            <Icon as={FiChevronDown} color="gray.500" />
                          </Select.Trigger>
                        </Select.Control>

                        <Select.Positioner zIndex={10000}>
                          <Select.Content
                            bg="#1a202c"
                            border="1px solid"
                            borderColor="blue.700"
                            borderRadius="md"
                            p="2"
                            zIndex={10000}
                            w="100%"
                          >
                            {rolesCollection.items.map((role) => (
                              <Select.Item
                                key={role.value}
                                item={role}
                                _hover={{ bg: "blue.600" }}
                                p="2"
                                borderRadius="sm"
                                cursor="pointer"
                                color="white"
                              >
                                <Select.ItemText>{role.label}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>

                    <Button
                      onClick={handleAddDepartment}
                      bg="purple.600"
                      color="white"
                      _hover={{ bg: "purple.500" }}
                    >
                      <Flex align="center" gap="2">
                        <Icon as={FiPlus} /> Adaugă
                      </Flex>
                    </Button>
                  </Grid>
                </Box>

                {/* LISTA DEPARTAMENTE */}
                <Stack mt="4" spacing="2">
                  {idDepartamente.map((dept) => (
                    <Flex
                      key={dept.id}
                      bg="whiteAlpha.100"
                      p="2"
                      borderRadius="md"
                      justify="space-between"
                      align="center"
                      borderLeft="3px solid"
                      borderColor="blue.400"
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
              onClick={onSave}
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              Salvează
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ProfesorModal;
