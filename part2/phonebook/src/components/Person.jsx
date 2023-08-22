import React from "react";

const Person = ({ person, handlePersonDelete }) => {
  return (
    <div>
      <span>
        {person.name} {person.number}{" "}
      </span>
      <button
        onClick={() => {
          handlePersonDelete(person.id, person.name);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Person;
