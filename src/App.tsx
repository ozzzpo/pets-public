import { useSelector } from "react-redux";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { deletePet, getAllPets } from "./store/pets/actions";
import PetsTable from "./components/PetsTable/PetsTable";
import { getRand } from "./utils/functions/getRandomInt";

function App() {
  const dispatch = useAppDispatch();
  const filteredPets = useAppSelector((state) => state.pets.filteredPets);
  const pets = useAppSelector((state) => state.pets.pets);
  // pets?.forEach((pet) => dispatch(deletePet(BigInt(pet.id))));
  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Filters />
      <PetsTable pets={filteredPets} />
    </div>
  );
}

export default App;
