import * as React from 'react';
import Gif from "../model/Gif";

export const GifComponent = (props: GifProps): JSX.Element => {

    return (
        <>
            <h1>{props.gif.title}</h1>
            <img src={props.gif.url} alt="Gif failed to load"/>
        </>
    )
};

type GifProps = {
    gif: Gif;
}