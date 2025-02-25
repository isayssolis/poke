'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import {Suspense} from "react";
import SearchForm from "@/components/Search";

function ExtraData({ id }:{id:string}) {
    // esperar data
    const [ataque, setAtaque] = useState(null)
    const [defensa, setDefensa] = useState(null)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => {
                console.log(data.stats[4].base_stat)
                setAtaque(data.stats[4].base_stat)
                setDefensa(data.stats[3].base_stat)
            })
    })
    return (
        <ul>
            <li key={ataque+1}>Ataque:{ataque}</li>
            <li key={defensa+2}>Defensa:{defensa}</li>
        </ul>

    )
}


export default function Items ({items}) {

    const [list, setList] = useState(items.results);
    const [searchWord, setSearchWord]=useState('');
    const [sortOrder, setSortOrdr]=useState(true);


    const handleSearch = (word) => {
        const lowerCase = word.toLowerCase();
        setSearchWord(lowerCase);
    }


    const onSort = ()=>{
        //SORT alfabetico...
        const reverseOrder = sortOrder ? 1 : -1
        const sorted = list.sort(function (a, b) {
            if (typeof a.name === 'string') {
                return a.name.localeCompare(b.name) * reverseOrder;
            }else{
                return a.name - b.name * reverseOrder
            }
        });
        setList([...sorted])
        setSortOrdr(prevVal => !prevVal)
    }

    const filteredData = list.filter((el) => {
        //TODO: Filtrar AQUI!
        if (searchWord === '') {
            return el;
        } else {
            return el.name.toLowerCase().includes(searchWord)
        }
    })


    const render = filteredData.map((it,i) => {
        return(
            <div className="card" key={it.name}>
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`}
                    alt="pokemon"
                    unoptimized
                    width="100"
                    height="100"
                />
                {it.name}
                <Suspense fallback={<div>Cargando...</div>}>
                    <ExtraData id={i+1} />
                </Suspense>
            </div>
        )
    });

    return (
        <>
            <SearchForm handleSearch={handleSearch} />
            <div className="max-w-md mx-auto">
                <button
                    className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={onSort}>
                    Orden alfabético
                </button>
            </div>
            <br/>
            <div className="container">
                {render}
            </div>
        </>
    );
}

