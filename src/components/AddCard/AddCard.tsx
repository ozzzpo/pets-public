import { AddIcon } from "@chakra-ui/icons";
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
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";

export default function AddCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Card minW="xs" maxH="md" minH="xs" position="relative">
      <CardBody>
        <IconButton
          aria-label="add card"
          icon={<AddIcon w={39} h={39} />}
          w={50}
          h={50}
          borderRadius="50%"
          position="absolute"
          top="43%"
          left="43%"
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <CustomModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          status={"add"}
          currentPet={undefined}
        />
      </CardBody>
    </Card>
  );
}
