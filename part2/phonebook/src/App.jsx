import { useState } from "react";
import SearchFilter from "./components/searchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
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
