import { Button, Form, ListGroup } from "react-bootstrap";
import { useState } from "react";

export default function findSs() {

    const [files, setfiles] = useState([]);
    const [data, setdata] = useState([]);
    const [check, setcheck] = useState(false);
    

    let userId = "008";
    let screenshots = [];

    const finduser = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        };
        fetch('http://localhost:3000/api/findSsByUserId', requestOptions)
            .then(response => response.json())
            .then(data => {
                setfiles(data.file);
            });
    }

    const Delete = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ss: screenshots, id: id })
        };
        fetch('http://localhost:3000/api/deleteSsByUserId', requestOptions)
            .then(response => response.json());
    }

    const DeleteSs = (ss,event) => {
        if(event.target.checked===true){
            screenshots.push(ss);
        }else if(event.target.checked===false){
            for(let i = 0; i<screenshots.length;i++){
                if(screenshots[i]==ss){
                    screenshots.splice(i, 1);
                }
            }
        }
        console.log(screenshots)
    }

    return (
        <div>
            <Button variant="warning" onClick={() => finduser(userId)}>Show ss</Button>

            {files.length != 0 ?
                <div>
                    <Form.Check
                        inline
                        label={userId}
                        name="group1"
                        type="checkbox"
                    />
                {files.map(c => (
                    <ListGroup.Item>
                        <Form.Check
                            inline
                            name="group1"
                            type="checkbox"
                            id={c}
                            onChange={(event) => DeleteSs(c,event)}
                        /><img key={c} src={`/assetsonline/${userId}/${c}`} alt={`/assetsonline/${userId}/${c}`} />
                    </ListGroup.Item>
                    ))}
            <Button variant="warning" onClick={() => Delete(userId)}>Delete</Button>
                </div> : ""
            }
        </div>
    )
}
