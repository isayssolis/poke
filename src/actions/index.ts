
export async function getPokemons(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20',{
        method:'GET'
    })
    return response.json();
}

export async function getExtraData(id:string){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`,{
        method:'GET'
    })
    //console.log("********",response.json())
    return response.json();
}
