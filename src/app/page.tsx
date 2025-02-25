import {getPokemons} from '../actions/index'
import Items from "@/components/Items";



export default async function Home() {

   const pokemones = await getPokemons();

   // console.log(pokemons)


  return (
      <div>
          <br/>
          <div>
              <Items items={pokemones} />
          </div>
      </div>

  );
}
