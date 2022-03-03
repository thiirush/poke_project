import { Flex, Spinner } from "@chakra-ui/react";

export function Loader() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <Spinner size="xl" color="#fff" />
    </Flex>
  );
}
