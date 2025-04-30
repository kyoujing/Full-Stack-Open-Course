const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            Delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
