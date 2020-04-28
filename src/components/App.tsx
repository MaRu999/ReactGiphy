import * as React from 'react';
import Giphyloader from "../model/Giphyloader";
import {NavigationComponent} from "./NavigationComponent";
import {observer} from "mobx-react";

export const App = observer((props: LoaderProps): JSX.Element => {

    const gifLoader = props.loader;

    return (
        <>
          <NavigationComponent loader={gifLoader} startPage={"search"}/>
        </>
    )

});

export type LoaderProps = {
    loader: Giphyloader;
}

