import { Spinner } from "@chakra-ui/react";
import { useAppSelector } from "../../store/store";
import { Pet } from "../../types/pet.interfaces";
import PetCard from "../PetCard/PetCard";
import "./PetsTable.scss";
import AddCard from "../AddCard/AddCard";
interface PetsTableProps {
  pets: Pet[] | undefined;
}
export default function PetsTable({ pets }: PetsTableProps) {
  const status = useAppSelector((state) => state.pets.status);
  return (
    <div className="pets-table">
      {status === "loading" ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <AddCard />
          {pets?.map((pet) => (
            <PetCard pet={pet} key={pet.id} />
          ))}
        </>
      )}
    </div>
  );
}
