import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from "react";
import {SearchComponent} from "./SearchComponent";
import {TrendingComponent} from "./TrendingComponent";
import Giphyloader from "../model/Giphyloader";
import {observer} from "mobx-react";
import styled from "styled-components";

const PaginationDiv = styled.div`
    display:flex; 
    flex-direction:row;
`

const PaginationBtn = styled.button`
    font-size:20px;
`

export const NavigationComponent = observer((props: NavProps): JSX.Element => {

    const gifLoader = props.loader;
    const [navi, setNavi] = useState<string>(props.startPage);

    const convertToPageNum = (num: number): number => {
        return (Math.ceil(num / 25) + 1);
    }

    const [pageInput, setPageInput] = useState<number>(convertToPageNum(gifLoader.getCurrentPageNumber(navi)));

    const resetPageNum = (): void => {
        setPageInput(1);
    }

    const switchTab = (tab: string): void => {
        setNavi(tab);
        setPageInput(convertToPageNum(gifLoader.getCurrentPageNumber(tab)));
    }


    const pageChange = (e: FormEvent): void => {
        e.preventDefault();
        gifLoader.setPageNum(navi, pageInput);
    }

    const toPrevious = (): void => {
        gifLoader.previousPage(navi);
        setPageInput(convertToPageNum(gifLoader.getCurrentPageNumber(navi)));
    }

    const toNext = (): void => {
        gifLoader.nextPage(navi);
        setPageInput(convertToPageNum(gifLoader.getCurrentPageNumber(navi)));
    }

    return (
        <>
            <div>
                <span>Powered By GIPHY</span>
                <br/>
                <button onClick={(): void => switchTab("search")}>Search</button>
                <button onClick={(): void => switchTab("trending")}>Trending</button>
            </div>
            <div>
                {gifLoader.loading && <h2>Loading...</h2>}
            </div>
            {!gifLoader.loading && <div>
                {(navi === "search") &&
                <div>
                    <SearchComponent loader={props.loader} resetPageNum={resetPageNum}/>
                </div>}

                {(navi === "trending") &&
                <div>
                    <TrendingComponent loader={props.loader} resetPageNum={resetPageNum}/>
                </div>}

                <br/>
                <PaginationDiv>
                    <PaginationBtn onClick={(): void => toPrevious()}>prev</PaginationBtn>
                    <form onSubmit={pageChange}>
                        <input type="number" min="1" value={pageInput}
                               onChange={(e: ChangeEvent): void => setPageInput(parseInt((e.target as HTMLInputElement).value))}/>
                    </form>
                    <span>/{convertToPageNum(gifLoader.getMaxPageNumber(navi))}</span>
                    <PaginationBtn onClick={(): void => toNext()}>next</PaginationBtn>
                </PaginationDiv>
            </div>}
        </>
    )
})

type NavProps = {
    loader: Giphyloader;
    startPage: string;
}

// See below for line that would need to be added to the input tag above to prevent inputs for the page that are too big, but is better left out because of Giphy bugs (see README.md)
// max={convertToPageNum(gifLoader.getMaxPageNumber(navi))}