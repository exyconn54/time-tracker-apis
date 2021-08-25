import { Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export default function findSs() {
    
    const [data, setdata] = useState("");
    const [Ssname, setSsname] = useState("");

    let userId = "008";

    const DeleteSs = (ss, id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: ss, id: id })
        };
        fetch('http://localhost:3000/api/deleteSsByUserId', requestOptions)
            .then(response => response.json());
    }

    return (
        <div>
            <Button variant="warning" onClick={() => DeleteLast(userId)}>Delete last ss</Button>
            <Button variant="warning" onClick={() => DeleteAll(userId)}>Delete All Screenshots</Button>
            <Button variant="warning" onClick={() => DeleteSs(userId)}>Delete This Screenshots</Button>
        </div>
    )
}
