import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const newPerson = personObj => {
    return axios.post(baseUrl, personObj)
}

const removePerson = (personId) => {
    const personResource = `${baseUrl}/${personId}`
    return axios.delete(personResource)
}

const putPerson = (personObj, personId) => {
    const personResource = `${baseUrl}/${personId}`
    return axios.put(personResource, personObj)
}

export default {
    getAllPersons: getAllPersons,
    newPerson: newPerson,
    removePerson: removePerson,
    putPerson: putPerson
}