import React, { useState, useEffect, useMemo } from "react";
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
  FiLayers,
  FiChevronDown,
  FiAlertCircle,
} from "react-icons/fi";

const EditProfesorModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  departamente,
  setDepartamente,
}) => {
  const [listaDepartamente, setListaDepatamente] = useState([]);

  const [errors, setErrors] = useState({});

  const [selectedDeptId, setSelectedDeptId] = useState([]);

  const [selectedRole, setSelectedRole] = useState(["Membru"]);

  const departmentsCollection = useMemo(() => {
    return createListCollection({
      items: listaDepartamente.map((dept) => ({
        label: dept.nume,
        value: dept.id,
      })),
    });
  }, [listaDepartamente]);

  const rolesCollection = createListCollection({
    items: [{ label: "Membru", value: "Membru" }],
  });

  useEffect(() => {
    async function getDepartamente() {
      try {
        const res = await fetch("/api/departamente");
        const data = await res.json();
        if (res.ok) {
          setListaDepatamente(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDepartamente();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleAddDepartment = () => {
    const deptIdVal = selectedDeptId[0];
    const roleVal = "Membru";

    if (!deptIdVal) return;

    const deptObj = departmentsCollection.items.find(
      (d) => d.value === deptIdVal,
    );

    const alreadyExists = departamente.find(
      (d) => d.id === parseInt(deptIdVal),
    );

    if (alreadyExists) {
      alert("Profesorul este deja asignat la acest departament!");
      return;
    }

    const newAssignment = {
      id: parseInt(deptObj.value),
      nume: deptObj.label,
      rolDepartament: roleVal,
    };

    setDepartamente([...departamente, newAssignment]);
    setSelectedDeptId([]);
  };

  const handleRemoveDepartment = (idToRemove) => {
    setDepartamente(departamente.filter((d) => d.id !== idToRemove));
  };

  const handleSaveClick = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.prenume?.trim()) {
      newErrors.prenume = true;
      isValid = false;
    }
    if (!formData.nume?.trim()) {
      newErrors.nume = true;
      isValid = false;
    }
    if (!formData.email?.trim()) {
      newErrors.email = true;
      isValid = false;
    }
    if (!formData.telefon?.trim()) {
      newErrors.telefon = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onSave();
    }
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
          borderColor="orange.700"
          boxShadow="2xl"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
          display="flex"
          flexDirection="column"
          animation="slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        >
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

          <Box flex="1" overflowY="auto" p="6">
            <Stack spacing="6">
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
                    bg="whiteAlpha.50"
                    borderColor={errors.prenume ? "red.500" : "whiteAlpha.200"}
                    _focus={{
                      borderColor: errors.prenume ? "red.500" : "orange.400",
                    }}
                  />
                  <Input
                    name="nume"
                    value={formData.nume}
                    onChange={handleChange}
                    placeholder="Nume"
                    color="white"
                    bg="whiteAlpha.50"
                    borderColor={errors.nume ? "red.500" : "whiteAlpha.200"}
                    _focus={{
                      borderColor: errors.nume ? "red.500" : "orange.400",
                    }}
                  />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    color="white"
                    bg="whiteAlpha.50"
                    borderColor={errors.email ? "red.500" : "whiteAlpha.200"}
                    _focus={{
                      borderColor: errors.email ? "red.500" : "orange.400",
                    }}
                  />
                  <Input
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    placeholder="Telefon"
                    color="white"
                    bg="whiteAlpha.50"
                    borderColor={errors.telefon ? "red.500" : "whiteAlpha.200"}
                    _focus={{
                      borderColor: errors.telefon ? "red.500" : "orange.400",
                    }}
                  />
                </Grid>
              </Box>

              <Box h="1px" bg="whiteAlpha.100" />

              <Box>
                <Flex align="center" gap="2" color="orange.300" mb="4">
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
                    <Box>
                      <Text color="gray.400" fontSize="xs" mb="1">
                        DEPARTAMENT
                      </Text>

                      <Select.Root
                        collection={departmentsCollection}
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
                            _hover={{ borderColor: "orange.400" }}
                          >
                            <Select.ValueText placeholder="Alege departament..." />
                            <Icon as={FiChevronDown} color="gray.500" />
                          </Select.Trigger>
                        </Select.Control>

                        <Select.Positioner zIndex={10000}>
                          <Select.Content
                            bg="#1a202c"
                            border="1px solid"
                            borderColor="orange.700"
                            borderRadius="md"
                            p="2"
                            zIndex={10000}
                            w="100%"
                          >
                            {departmentsCollection.items.map((dept) => (
                              <Select.Item
                                key={dept.value}
                                item={dept}
                                _hover={{ bg: "orange.800" }}
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
                        ROL (Fix)
                      </Text>

                      <Select.Root
                        collection={rolesCollection}
                        value={selectedRole}
                        disabled={true}
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
                            color="gray.400"
                            cursor="not-allowed"
                            opacity={0.7}
                          >
                            <Select.ValueText placeholder="Rol..." />
                          </Select.Trigger>
                        </Select.Control>
                      </Select.Root>
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

                <Stack mt="4" spacing="2">
                  {departamente.map((dept, idx) => (
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
                          {dept.rolDepartament}{" "}
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

          <Flex
            p="4"
            bg="blackAlpha.300"
            justify="flex-end"
            gap="3"
            align="center"
          >
            {Object.keys(errors).length > 0 && (
              <Flex align="center" gap="2" color="red.400" mr="auto">
                <Icon as={FiAlertCircle} />
                <Text fontSize="xs" fontWeight="bold">
                  Completează toate câmpurile!
                </Text>
              </Flex>
            )}

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
    </>
  );
};

export default EditProfesorModal;
