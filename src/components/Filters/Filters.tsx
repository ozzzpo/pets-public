import {
  HStack,
  InputGroup,
  InputLeftElement,
  Select,
  Input,
  IconButton,
  Box,
} from "@chakra-ui/react";
import "./Filters.scss";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { getAllPets, getPetsByStatus } from "../../store/pets/actions";
import { findPetByName } from "../../store/pets/reducer";
import { useEffect, useState } from "react";

export default function Filters() {
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (select && query) {
      let firstSelect = select;
      if (firstSelect !== select) {
        dispatch(getPetsByStatus(select));
      }
      dispatch(findPetByName(query));
    } else if (select) {
      dispatch(getPetsByStatus(select));
    } else if (query) {
      dispatch(findPetByName(query));
    } else {
      dispatch(getAllPets());
    }
  }, [select, query]);
  return (
    <HStack
      spacing="30px"
      className="filters"
      alignItems="flex-end"
      justifyContent="center"
    >
      <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
        <label htmlFor="select">Сортировка по статусу</label>
        <Select
          placeholder="Искать по статусу"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="available">Доступен</option>
          <option value="pending">Рассматривается</option>
          <option value="sold">Продан</option>
        </Select>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"3px"}>
        <label htmlFor="select">Поиск по имени</label>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Искать по имени"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Box>
      {query || select ? (
        <IconButton
          aria-label="clear filters"
          icon={<CloseIcon />}
          onClick={() => {
            setQuery("");
            setSelect("");
          }}
        />
      ) : (
        ""
      )}
    </HStack>
  );
}
