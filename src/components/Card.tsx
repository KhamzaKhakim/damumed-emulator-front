// import React from "react";
import Post from "../types/Post"

export default function Card({postFIO, postIIN}: Post){
    return (
        <div>
            <h4>{postFIO}</h4>
            <h6>{postIIN}</h6>
            <hr />
        </div>
    )
}