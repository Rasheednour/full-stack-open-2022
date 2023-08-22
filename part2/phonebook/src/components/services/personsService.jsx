import React from "react";
import axios from "axios";

const backendUrl = "http://localhost:3001";

const getAllPersons = () => {
  const request = axios.get(`${backendUrl}/persons`);
  return request.then((response) => response.data);
};

const createPerson = (personObject) => {
  const request = axios.post(`${backendUrl}/persons`, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  return axios.delete(`${backendUrl}/persons/${personId}`);
};

const updatePerson = (personObject, id) => {
  return axios.put(`${backendUrl}/persons/${id}`, personObject);
};

export default { getAllPersons, createPerson, deletePerson, updatePerson };
