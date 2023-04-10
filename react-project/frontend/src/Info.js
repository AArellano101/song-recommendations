import React from "react";

function Info({info}) {
    return (
        <>
            <div className="title">
                <h1>Our Recommendations</h1>
                <h6>by Aaron Arellano</h6>
            </div>
            <ul className="text info list-group flush">
                { info }
            </ul>
        </>
    )
}

export default Info;