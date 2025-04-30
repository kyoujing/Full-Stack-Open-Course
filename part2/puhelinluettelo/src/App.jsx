import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./notes";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setNewSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((response) => {
      console.log("Data loaded");
      setPersons(response);
    });
  }, []);

  const handleSearch = (e) => {
    setNewSearchText(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook with this number`);
        return;
      }

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setIsError(false);
            setMessage(`${existingPerson.name}'s phone number has changed`);
            setTimeout(() => setMessage(""), 5000);
            console.log("Successfully updated");
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
            setIsError(true);
            setMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setTimeout(() => setMessage(""), 5000);
            console.log("Failed, try again later");
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => setMessage(""), 5000);
      console.log("Successfully added");
    });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setIsError(false);
          setMessage(`Deleted ${name}`);
          setTimeout(() => setMessage(""), 5000);
          console.log("Successfully deleted");
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setIsError(true);
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => setMessage(""), 5000);
          console.log("Failed, try again later");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
