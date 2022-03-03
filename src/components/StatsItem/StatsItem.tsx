import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { StatsItemProps } from "./StatsItem.types";

export function StatsItem({ name, color, value }: StatsItemProps) {
  function formatStatusText(name) {
    switch (name) {
      case "special-attack":
        return "SP. ATK";

      case "special-defense":
        return "SP. DEF";
      default:
        return name;
    }
  }

  const statusTextFormated = formatStatusText(name);

  const percentBar = Math.round((100 * value) / 200);
  return (
    <Grid alignItems="center" gap={4} templateColumns="85px 30px 1fr">
      <GridItem>
        <Text textTransform="uppercase">{statusTextFormated}</Text>
      </GridItem>

      <GridItem>
        <Text fontWeight="bold">{value}</Text>
      </GridItem>

      <GridItem>
        <Box
          sx={{}}
          height="12px"
          width="100%"
          bgColor={"#fff"}
          borderRadius="6px"
          position="relative"
        >
          <Box
            position="absolute"
            sx={{
              left: "0px",
              top: "0px",
              width: `${percentBar}%`,
              height: "100%",
              background: color ? color : "gray.600",
              borderRadius: "6px",
            }}
          ></Box>
        </Box>
      </GridItem>
    </Grid>
  );
}
