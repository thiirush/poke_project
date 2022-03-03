import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import { GeneralInfoCardProps } from "./GeneralInfoCard.types";

export function GeneralInfoCard({
  title,
  value,
  bgColor,
}: GeneralInfoCardProps) {
  return (
    <Flex>
      <Box
        padding="8px 18px 8px"
        borderRadius="6px 6px 6px 0px"
        color="#fff"
        bgColor={bgColor}
      >
        <Heading
          position="relative"
          _after={{
            content: "''",
            display: "block",
            height: "2px",
            background: "#fff",
            width: "calc(100% + 36px)",
            position: "absolute",
            bottom: "-10px",
            left: "-18px",
          }}
          fontWeight="400"
          as="h6"
          fontSize="1rem"
        >
          {title}
        </Heading>
        <Text mt="4" align="center" fontWeight="bold">
          {value}
        </Text>
      </Box>
    </Flex>
  );
}
