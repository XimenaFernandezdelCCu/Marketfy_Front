import { useEffect, useContext, useState } from "react";
import { HomeContext } from "../../context/homeContext";
import axios, { all } from "axios";
import { paginationArray } from "../../utils/utils";
//components
import Searchbar from "../reusable/searchbar";
import Pagination from "../reusable/pagination";
import BrowseCard from "../reusable/browseCard";

export default function Browse(){
    console.log("browse")
    const {data, setData, page, setFound}= useContext(HomeContext);
    const [dbData, setDbData]= useState([]);
    const url = "http://localhost:8080/products";

    useEffect(() => {
        axios.get(url)
        .then( response => {
                console.log("Response Data: ", response.data);
                setDbData(response.data);
                setFound(response.data.length);
                setData(paginationArray(response.data.sort(()=>Math.random()-.5)))
        })
    }, []);

    /*because this is a small app, i will fetch all products data 
    and filter in the front. But if the data was extensive, i would 
    make requests depending on the search params. */
    function getData(input) {
        let search = input.searchText.toLowerCase().replace(/\s+/g, '');
        const data = dbData;
        let filtered;
        switch (input.searchBy) {
            case 'author':
                filtered = data.filter((item) => {
                    return item.author.toLowerCase().replace(/\s+/g, '').includes(search);
                })
                break;
            case 'price':
                search = search.replace(/\D/g, "");
                filtered = data.filter((item) => {
                    return item.price < search;
                })

                break;
            default: 
                filtered = data.filter((item) => {
                    return item.title.toLowerCase().replace(/\s+/g, '').includes(search);
                })
        }
        if (filtered.length < 1) {
            setFound([0]);
        } else {
            setFound([filtered.length]);
        }
        setData(paginationArray(filtered));
    }
    console.log("---data", data)
    return (
        <>
            <Searchbar returnThis={getData}></Searchbar>

            <Pagination></Pagination>

            <div style={{
            borderStyle: "solid", 
            display: "flex", 
            flexWrap: "wrap"}}>

            {data[0] ?
                data[page].map((book, index)=>
                <BrowseCard book={book} key={index}></BrowseCard>
                )
                :
                <div>
                    <h2>Uh oh!</h2>
                    <h4>Your search didn't match any items.<br /> Please try again. </h4>
                </div>
            }
            </div>


        </>
    )
}