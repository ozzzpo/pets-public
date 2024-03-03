import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
  Badge,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Pet } from "../../types/pet.interfaces";
import img from "../../assets/images/dog-footprint.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deletePet, getPetById } from "../../store/pets/actions";
import CustomModal from "../CustomModal/CustomModal";
const translateStatus = {
  available: "Доступен",
  pending: "Рассматривается",
  sold: "Продан",
};
const statusColors = {
  available: "green",
  pending: "#CC3F0C",
  sold: "red",
};
export default function PetCard({ pet }: { pet: Pet }) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPet = useAppSelector((state) => state.pets.currentPet);
  const handleOpen = (pet: Pet) => {
    setIsOpen(true);
    dispatch(getPetById(pet.id));
  };
  return (
    <Card minW="xs" maxW="xs" maxH="md">
      <CardBody>
        <Image
          src={
            pet.photoUrls
              ? pet?.photoUrls[0]?.includes("http")
                ? pet.photoUrls[0]
                : img
              : img
          }
          alt="Couldn't get pet's image"
          borderRadius="lg"
          boxSize="100px"
          margin="0 auto"
        />
        <Stack mt="6" spacing="3">
          <Heading size="lg" fontFamily="Inter Tight">
            {pet.name ? pet.name : "Без имени"}
          </Heading>
          <Text size="14px" fontWeight="bold">
            {pet.category?.name ? pet.category.name : "Не задана категория"}
          </Text>
          <Flex width="100%" flexWrap="wrap" gap={2}>
            {pet.tags.map((tag) => (
              <Badge
                colorScheme="blue"
                w="fit-content"
                borderRadius={5}
                key={tag?.id}
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
          <Text color={statusColors[pet.status]} fontSize="16px ">
            {translateStatus[pet.status]}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => handleOpen(pet)}
          >
            Редактировать
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => dispatch(deletePet(pet.id))}
          >
            Удалить
          </Button>
        </ButtonGroup>
      </CardFooter>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        status={"edit"}
        currentPet={currentPet}
      />
    </Card>
  );
}
