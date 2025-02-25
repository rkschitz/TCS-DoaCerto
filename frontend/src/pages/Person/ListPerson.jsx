import { useEffect } from "react";
import List from "../../components/List/List";
import { listPersons } from "../../api/person";
import { useState } from "react";

export default function ListPersons() {

    const [persons, setPersons] = useState([]);

    useEffect (() => {
        async function list() {
            const response = await listPersons();
            setPersons(response.data);
        }
        list();
    }, []);

    return (
        <List>
                {persons.map((person) => {
                    return (
                        <li key={person.idPerson}>
                            <div>
                                <span>{person.name}</span>
                                <span>{person.email}</span>
                                <span>{person.role}</span>
                            </div>
                        </li>
                    )
                })}
        </List>
    )
}