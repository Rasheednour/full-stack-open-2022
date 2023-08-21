import { useEffect, useState } from "react";
import SearchFilter from "./components/searchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./components/services/PersonsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    personsService.getAllPersons().then((personsData) => {
      setPersons(personsData);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPersons =
    searchValue === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase())
        );

  const handleSubmit = (event) => {
    event.preventDefault();
    let nameExists = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`);
        nameExists = true;
        break;
      }
    }
    if (!nameExists) {
      const personObject = { name: newName, number: newNumber };
      personsService.createPerson(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
