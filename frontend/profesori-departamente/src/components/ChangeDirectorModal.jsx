import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
  Select,
  createListCollection,
  Avatar,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import {
  FiX,
  FiRefreshCw,
  FiChevronDown,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

const ChangeDirectorModal = ({ isOpen, onClose, onSave }) => {
  const [listaDepartamente, setListaDepartamente] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedProfId, setSelectedProfId] = useState(null);
  const [profesoriInDept, setProfesoriInDept] = useState([]);
  const [isLoadingProfs, setIsLoadingProfs] = useState(false);

  const isDirector = (prof, deptId) => {
    if (!prof || !prof.departamente) return false;

    return prof.departamente.some(
      (d) => d.id === deptId && d.rolDepartament === "Director",
    );
  };

  useEffect(() => {
    async function getDepartamente() {
      try {
        const res = await fetch("http://localhost:8080/departamente");
        const data = await res.json();
        if (res.ok) setListaDepartamente(data);
      } catch (error) {
        console.error("Eroare la incarcare departamente:", error);
      }
    }
    if (isOpen) getDepartamente();
  }, [isOpen]);

  useEffect(() => {
    if (!selectedDeptId) {
      setProfesoriInDept([]);
      return;
    }

    const deptIdInt = parseInt(selectedDeptId);

    const fetchProfesoriByDept = async () => {
      setIsLoadingProfs(true);
      try {
        const url = `http://localhost:8080/profesori/departamente?departamentId=${deptIdInt}`;

        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json(); 

         
          const sorted = data.sort((a, b) => {
            const aIsDirector = isDirector(a, deptIdInt);
            const bIsDirector = isDirector(b, deptIdInt);

          
            if (aIsDirector) return -1;
            if (bIsDirector) return 1;

           
            const numeA = a.nume || "";
            const numeB = b.nume || "";
            return numeA.localeCompare(numeB);
          });

          setProfesoriInDept(sorted);
        } else {
          console.error("Eroare server:", res.status);
        }
      } catch (error) {
        console.error("Eroare fetch profesori:", error);
      } finally {
        setIsLoadingProfs(false);
      }
    };

    fetchProfesoriByDept();
    setSelectedProfId(null); 
  }, [selectedDeptId]); 

  const departmentsCollection = useMemo(() => {
    return createListCollection({
      items: listaDepartamente.map((dept) => ({
        label: dept.nume,
        value: dept.id.toString(),
      })),
    });
  }, [listaDepartamente]);

  const handleSaveClick = () => {
    if (selectedDeptId && selectedProfId) {
      onSave(parseInt(selectedDeptId), selectedProfId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
        `}
      </style>

      
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.800"
        backdropFilter="blur(8px)"
        zIndex="9999"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animation="fadeIn 0.2s ease-out"
        onClick={onClose}
      >
        
        <Box
          bg="#0f172a"
          w="800px"
          maxW="95%"
          maxH="85vh"
          borderRadius="2xl"
          border="1px solid"
          borderColor="cyan.800"
          boxShadow="0 0 40px rgba(6, 182, 212, 0.2)"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          onClick={(e) => e.stopPropagation()}
          animation="slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          
          <Flex
            p="6"
            bgGradient="linear(to-r, cyan.900, blue.900)"
            justify="space-between"
            align="center"
          >
            <Box>
              <Flex align="center" gap="3">
                <Box p="2" bg="cyan.500" borderRadius="lg" color="white">
                  <Icon as={FiRefreshCw} boxSize="6" />
                </Box>
                <Box>
                  <Heading size="md" color="white">
                    Schimbă Director
                  </Heading>
                  <Text color="cyan.100" fontSize="sm">
                    Actualizează conducerea departamentelor
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              color="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
              borderRadius="full"
            >
              <Icon as={FiX} boxSize="5" />
            </Button>
          </Flex>

         
          <Flex direction="column" flex="1" overflow="hidden" p="6" gap="6">
           
            <Box>
              <Text
                color="cyan.400"
                fontSize="xs"
                fontWeight="bold"
                mb="2"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Pasul 1: Alege Departamentul
              </Text>
              <Select.Root
                collection={departmentsCollection}
                value={[selectedDeptId]}
                onValueChange={(e) => setSelectedDeptId(e.value[0])}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger
                    px="4"
                    py="3"
                    bg="whiteAlpha.50"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="xl"
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    color="white"
                    _hover={{ borderColor: "cyan.500", bg: "whiteAlpha.100" }}
                    transition="all 0.2s"
                  >
                    <Select.ValueText placeholder="Selectează un departament..." />
                    <Icon as={FiChevronDown} color="gray.400" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner zIndex={10001}>
                  <Select.Content
                    bg="#1e293b"
                    borderColor="cyan.700"
                    color="white"
                  >
                    {departmentsCollection.items.map((dept) => (
                      <Select.Item
                        key={dept.value}
                        item={dept}
                        _hover={{ bg: "cyan.800" }}
                        cursor="pointer"
                      >
                        {dept.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Box>

          
            <Box
              flex="1"
              overflowY="hidden"
              display="flex"
              flexDirection="column"
            >
              <Text
                color={selectedDeptId ? "cyan.400" : "gray.600"}
                fontSize="xs"
                fontWeight="bold"
                mb="3"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Pasul 2: Desemnează Noul Director
              </Text>

              {!selectedDeptId ? (
                <Flex
                  flex="1"
                  align="center"
                  justify="center"
                  border="2px dashed"
                  borderColor="whiteAlpha.100"
                  borderRadius="xl"
                  color="gray.500"
                >
                  <Text>Selectează întâi un departament</Text>
                </Flex>
              ) : isLoadingProfs ? (
                <Flex
                  flex="1"
                  align="center"
                  justify="center"
                  color="cyan.400"
                  flexDirection="column"
                  gap="3"
                >
                  <Spinner size="xl" />
                  <Text fontSize="sm">Se încarcă profesorii...</Text>
                </Flex>
              ) : (
                <Box
                  overflowY="auto"
                  className="custom-scrollbar"
                  pr="2"
                  pb="2"
                >
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                    gap="4"
                  >
                    {profesoriInDept.map((prof) => {
                      const isActive = selectedProfId === prof.id;
                      const isCurrentDirector = isDirector(
                        prof,
                        parseInt(selectedDeptId),
                      );

                      return (
                        <Box
                          key={prof.id}
                          onClick={() =>
                            !isCurrentDirector && setSelectedProfId(prof.id)
                          }
                          cursor={isCurrentDirector ? "default" : "pointer"}
                          position="relative"
                          bg={
                            isActive
                              ? "cyan.900"
                              : isCurrentDirector
                                ? "whiteAlpha.100"
                                : "whiteAlpha.50"
                          }
                          border="1px solid"
                          borderColor={
                            isActive
                              ? "cyan.400"
                              : isCurrentDirector
                                ? "purple.500"
                                : "whiteAlpha.100"
                          }
                          borderRadius="xl"
                          p="4"
                          transition="all 0.2s"
                          _hover={
                            !isCurrentDirector && {
                              transform: "translateY(-2px)",
                              borderColor: "cyan.500",
                              boxShadow: "0 4px 20px rgba(6, 182, 212, 0.15)",
                            }
                          }
                          opacity={isCurrentDirector ? 0.8 : 1}
                        >
                          <Flex align="center" gap="3">
                            <Avatar.Root
                              size="md"
                              borderWidth="2px"
                              borderColor={
                                isActive
                                  ? "cyan.400"
                                  : isCurrentDirector
                                    ? "purple.400"
                                    : "transparent"
                              }
                            >
                              <Avatar.Fallback
                                bg={
                                  isCurrentDirector ? "purple.600" : "gray.600"
                                }
                                color="white"
                              >
                                {prof.nume?.[0]}
                                {prof.prenume?.[0]}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <Box>
                              <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="sm"
                                lineHeight="shorter"
                              >
                                {prof.nume} {prof.prenume}
                              </Text>
                              <Text color="gray.400" fontSize="xs">
                                {prof.email}
                              </Text>
                            </Box>
                          </Flex>

                          
                          <Box mt="3">
                            {isCurrentDirector ? (
                              <Badge
                                colorPalette="purple"
                                variant="solid"
                                w="100%"
                                justifyContent="center"
                                py="1"
                              >
                                <Icon as={FiAward} mr="1" /> Director Actual
                              </Badge>
                            ) : isActive ? (
                              <Badge
                                bg="cyan.500"
                                color="white"
                                w="100%"
                                justifyContent="center"
                                py="1"
                              >
                                <Icon as={FiCheckCircle} mr="1" /> Selectat
                              </Badge>
                            ) : (
                              <Badge
                                colorPalette="gray"
                                variant="surface"
                                w="100%"
                                justifyContent="center"
                                py="1"
                                opacity="0.5"
                              >
                                Membru
                              </Badge>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Grid>
                  {profesoriInDept.length === 0 && (
                    <Text color="gray.400" textAlign="center" mt="10">
                      Nu există profesori în acest departament.
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          </Flex>

          <Flex
            p="4"
            bg="blackAlpha.300"
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            justify="flex-end"
            gap="3"
          >
            <Button onClick={onClose} variant="ghost" color="gray.400">
              Anulează
            </Button>
            <Button
              onClick={handleSaveClick}
              bgGradient="to-r"
              gradientFrom="cyan.600"
              gradientTo="blue.600"
              color="white"
              disabled={!selectedDeptId || !selectedProfId}
              opacity={!selectedDeptId || !selectedProfId ? 0.5 : 1}
              _hover={{
                opacity: 0.9,
                transform: "scale(1.02)",
                boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
              }}
              transition="all 0.2s"
              px="8"
            >
              Salvează Modificarea
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ChangeDirectorModal;
