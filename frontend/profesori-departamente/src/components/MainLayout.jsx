import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiLayers, FiLogOut } from "react-icons/fi";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Flex h="100vh" overflow="hidden">
      <Box
        w="260px"
        bg="blue.950"
        color="white"
        display="flex"
        flexDirection="column"
      >
        <Box p={8} textAlign="center">
          <Heading size="md" color="blue.200" letterSpacing="wider">
            EDU MANAGER
          </Heading>
          <Text fontSize="xs" color="blue.400" mt={1}>
            University System
          </Text>
        </Box>

        <Stack gap="2" px={4} flex="1">
          <NavItem to="/" icon={FiHome} active={isActive("/")}>
            Dashboard
          </NavItem>
          <NavItem
            to="/departamente"
            icon={FiLayers}
            active={isActive("/departamente")}
          >
            Departamente
          </NavItem>
          <NavItem
            to="/profesori"
            icon={FiUsers}
            active={isActive("/profesori")}
          >
            Profesori
          </NavItem>
        </Stack>

        <Box p={4} borderTopWidth="1px" borderColor="blue.800">
          <Flex
            align="center"
            p={3}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "red.600" }}
          >
            <FiLogOut style={{ marginRight: "12px" }} />
            <Text fontWeight="medium">Ieșire</Text>
          </Flex>
        </Box>
      </Box>

      {/* --- ZONA DE CONȚINUT --- */}
      <Box flex="1" bg="gray.50" display="flex" flexDirection="column">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          px={8}
          py={4}
          bg="white"
          boxShadow="sm"
        >
          <Text fontSize="lg" fontWeight="semibold" color="gray.600">
            {isActive("/")
              ? "Dashboard Overview"
              : isActive("/departamente")
              ? "Gestiune Departamente"
              : "Gestiune Profesori"}
          </Text>

          <Flex align="center" gap="4">
            <Box textAlign="right">
              <Text fontSize="sm" fontWeight="bold" color="gray.700">
                Admin User
              </Text>
              <Text fontSize="xs" color="gray.500">
                System Manager
              </Text>
            </Box>
            {/* Avatar simplificat pentru a evita eroarea 500 */}
            <Box w="10" h="10" bg="blue.500" borderRadius="full" />
          </Flex>
        </Flex>

        <Box flex="1" p={8} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

const NavItem = ({ to, icon, children, active }) => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Flex
        align="center"
        p={3}
        borderRadius="lg"
        bg={active ? "blue.600" : "transparent"}
        color={active ? "white" : "blue.100"}
        _hover={{ bg: active ? "blue.600" : "blue.800", color: "white" }}
      >
        {React.createElement(icon, { style: { marginRight: "12px" } })}
        <Text fontWeight="medium">{children}</Text>
      </Flex>
    </ChakraLink>
  );
};

export default MainLayout;
