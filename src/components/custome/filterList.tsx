import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";

interface Props {
  value: string;
  onClick: (data: string) => void;
}
function FilterList({ onClick, value }: Props) {
  return (
    <>
      <Box margin={"10px"} marginTop={"10px"}>
        <Menu>
          <MenuButton
            bg={"#F5F5F5"}
            width={"226px"}
            as={Button}
            boxShadow="3px 3px 3px 3px #B0B0B0"
            sx={{
              _hover: {
                bg: "#219B9D",
              },
            }}
            color={"black"}
            rightIcon={<ChevronDownIcon />}
          >
            {value ? value : "All"}
          </MenuButton>
          <MenuList color={"black"} sx={{ bg: "#F5F5F5" }}>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("")}>All</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("addis abeba")}>Addis Abeba</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("adama")}>Adama</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("bahirdar")}>Bahir Dar</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("dessie")}>Dessie</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("diredewa")}>Dire Dewa</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("gonder")}>Gondar</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("hawasa")}>Hawasa</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("harar")}>Harar</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("lalibela")}>Lalibela</Box>
            </MenuItem>
            <MenuItem bg={"#F5F5F5"}>
              <Box onClick={() => onClick("mekele")}>Mekele</Box>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}

export default FilterList;
