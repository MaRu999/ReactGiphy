import * as React from 'react';
import Gif from "../model/Gif";
import {GifComponent} from "./GifComponent";
import {observer} from "mobx-react";
import styled from "styled-components";
import Giphyloader from "../model/Giphyloader";

const SectionHeaderTrending = styled.h1`
    color: blue;
    font-family: "Lucida Console", Monaco, monospace;
`

export const TrendingComponent = observer((props: TrendingProps): JSX.Element => {

    const gifLoader = props.loader;
    if(!gifLoader.currentTrendingPage) {
        gifLoader.newGetTrending(0);
    }

    const reloadTrending = (): void => {
        gifLoader.newGetTrending(0);
        props.resetPageNum();
    }

    return (
        <>
            <SectionHeaderTrending>Trending Gifs</SectionHeaderTrending>
            <>
                <button onClick={(): void => reloadTrending()}>Reload</button>
                {gifLoader.currentTrendingPage && <div>
                    {gifLoader.currentTrendingPage.gifs.map((gif: Gif) => <GifComponent gif={gif} key={gif.id}/>)}
                </div> }
            </>
        </>
    )
})

type TrendingProps = {
    loader: Giphyloader;
    resetPageNum: Function;
}