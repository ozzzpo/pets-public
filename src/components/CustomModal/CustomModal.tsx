import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Box,
  Image,
  Flex,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Pet } from "../../types/pet.interfaces";
import "./CustomModal.scss";
import img from "../../assets/images/dog-footprint.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetCurrentPet } from "../../store/pets/reducer";
import { useState } from "react";
import { addPet, getAllPets, updatePet } from "../../store/pets/actions";
import { getRand } from "../../utils/functions/getRandomInt";
interface CustomModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: "edit" | "add";
  currentPet: Pet | undefined;
}
export default function CustomModal({
  isOpen,
  setIsOpen,
  status,
  currentPet,
}: CustomModalProps) {
  const dispatch = useAppDispatch();
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    const newPhoto = data?.imageUrl ? data.imageUrl : currentPet?.photoUrls[0];
    const tags = currentPet ? [...currentPet?.tags] : [];
    if (data.tag) {
      tags.push({
        id: getRand(1, 1000),
        name: data.tag,
      });
    }
    const updatedPet: Pet = {
      id: Number(currentPet?.id),
      category: {
        id: Number(currentPet?.category?.id),
        name: data.category ? data.category : currentPet?.category?.name,
      },
      name: data.name ? data.name : currentPet?.name,
      // @ts-ignore: Unreachable code error
      photoUrls: [newPhoto],
      // @ts-ignore: Unreachable code error
      tags: [...tags],
      status: data?.status ? data.status : currentPet?.status,
    };
    const newPet: Pet = {
      id: getRand(1, 1000),
      category: {
        id: getRand(1, 1000),
        name: data.category ? data.category : "",
      },
      name: data.name ? data.name : "",
      // @ts-ignore: Unreachable code error
      photoUrls: [data.imageUrl ? data.imageUrl : ""],
      // @ts-ignore: Unreachable code error
      tags: [
        {
          id: getRand(1, 1000),
          name: data.tag ? data.tag : "",
        },
      ],
      status: data?.status ? data.status : "available",
    };
    console.log(updatedPet);
    if (status === "edit") {
      dispatch(updatePet(updatedPet));
      dispatch(resetCurrentPet());
      setIsOpen(false);
      setTimeout(() => {
        dispatch(getAllPets());
      }, 1000);
      return;
    }
    if (status === "add") {
      dispatch(addPet(newPet));
      dispatch(resetCurrentPet());
      setIsOpen(false);
      setTimeout(() => {
        dispatch(getAllPets());
      }, 1000);
      return;
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        dispatch(resetCurrentPet());
        setIsAddingTag(false);
      }}
    >
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {status === "add" ? "Добавление" : "Редактирование"} питомца
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="modal-form">
              <Image
                src={
                  currentPet?.photoUrls[0]?.includes("http")
                    ? currentPet.photoUrls[0]
                    : img
                }
                alt="Couldn't get pet's image"
                borderRadius="lg"
                boxSize="100px"
                margin="0 auto"
              />

              <Box className="modal-form__block">
                <label>Имя</label>
                <Input
                  {...register("name")}
                  defaultValue={status === "edit" ? currentPet?.name : ""}
                />
              </Box>
              <Box className="modal-form__block">
                <label>Категория (порода)</label>
                <Input
                  {...register("category")}
                  defaultValue={
                    status === "edit" ? currentPet?.category?.name : ""
                  }
                />
              </Box>
              <Box className="modal-form__block">
                <label>Фото (ссылка)</label>
                <Input
                  {...register("imageUrl")}
                  defaultValue={
                    status === "edit" ? currentPet?.photoUrls[0] : ""
                  }
                />
              </Box>
              <Box className="modal-form__block">
                <label>Статус</label>
                <Select
                  {...register("status")}
                  defaultValue={
                    status === "edit" ? currentPet?.status : "available"
                  }
                >
                  <option value="available">Доступен</option>
                  <option value="pending">Рассматривается</option>
                  <option value="sold">Продан</option>
                </Select>
              </Box>

              <Flex width="100%" flexWrap="wrap" gap={2}>
                {currentPet?.tags.map((tag) => (
                  <Input
                    w={10}
                    h={5}
                    px={1}
                    fontSize={11}
                    backgroundColor={"blue.100"}
                    color={"blue.900"}
                    fontWeight="bold"
                    textTransform="uppercase"
                    focusBorderColor="blue.200"
                    defaultValue={tag?.name}
                    key={tag?.id}
                    {...register(`tag-${tag?.id}`)}
                  />
                ))}

                <Input
                  w={10}
                  h={5}
                  padding={0}
                  fontSize={11}
                  backgroundColor={"blue.100"}
                  color={"blue.900"}
                  fontWeight="bold"
                  textTransform="uppercase"
                  focusBorderColor="blue.200"
                  {...register("tag")}
                />
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Сохранить
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
