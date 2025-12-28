"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function Provider(props) {
  return (
    <ChakraProvider value={createSystem(defaultConfig)}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
