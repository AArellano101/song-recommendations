import React, { useState } from "react";
import Axios from "axios";

const PORT = 3000;

function Form() {
    const [path, setPath] = useState("");

    async function postPath(event) {
        event.preventDefault();

        document.getElementById("info-link").hidden = false;  

        try {
            await Axios.post(`http://localhost:${PORT}/post`, 
            {
                path
            })
        } catch (error) {
            console.log(error);
        }      
    }

    return (
        <div className="text">
            <form onSubmit={postPath}>
                <input type="text" className="text-input form-control" value={ path } placeholder="Pathname of MyData Spotify folder" 
                onChange={
                    (event) => setPath(event.target.value)
                } 
                accept=".json" required/>
                <input className="btn btn-primary button" type="submit" value="Submit" />
            </form>
            <a href="/info" id="info-link" hidden>See info</a>
        </div>
    );
}

export default Form;