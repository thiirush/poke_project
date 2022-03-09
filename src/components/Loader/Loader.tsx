import { Flex, Spinner } from "@chakra-ui/react";
import { LoaderProps } from "./Loader.types";

export function Loader({ isLoading }: LoaderProps) {
  const loaderShow = isLoading ? "flex" : "none";
  return (
    <Flex
      display={loaderShow}
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
