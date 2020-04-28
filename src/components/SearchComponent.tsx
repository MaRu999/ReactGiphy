import * as React from 'react';
import Gif from "../model/Gif";
import {GifComponent} from "./GifComponent";
import {observer} from "mobx-react";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "styled-components";
import Giphyloader from "../model/Giphyloader";

const SectionHeaderSearching = styled.h1`
    color: blue;
    font-family: "Lucida Console", Monaco, monospace;
`

export const SearchComponent = observer((props: SearchProps): JSX.Element => {

    const gifLoader = props.loader;
    const [searchTerm, setSearchTerm] = useState<string>("");


    const submitFunc = (e: FormEvent): void => {
        e.preventDefault();
        gifLoader.newSearch(searchTerm, 0);
        props.resetPageNum();
    }

    return (
        <>
            <SectionHeaderSearching>Search Gifs</SectionHeaderSearching>
            <>
                <form onSubmit={submitFunc}>
                    <input type="text" value={searchTerm}
                           onChange={(e: ChangeEvent): void => setSearchTerm((e.target as HTMLInputElement).value)}/>
                </form>
                {gifLoader.currentSearchPage && <div>
                    {gifLoader.currentSearchPage.gifs.map((gif: Gif) => <GifComponent gif={gif} key={gif.id}/>)}
                </div>}
            </>
        </>
    )
});

type SearchProps = {
    loader: Giphyloader;
    resetPageNum: Function;
}

