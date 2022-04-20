import { createSignal, onMount, For } from "solid-js";
import getkitties from "./PaintSwap_hidratation"


import './stylah.css';
import {catData} from './catDatabase'

function DataFetcher() {
  const [cats, setCats] = createSignal([]);

  onMount(async () => {
    setCats(await getkitties);
    
  });
   


  return <>
    <h1>Solidjs {">"} React</h1>
    {}
    
    
    <div class="photos">
    
      <For each={cats()} fallback={<p>Loading...</p>}>{ photo =>
      <a className="link" target="_blank" href={"https://paintswap.finance/marketplace/"+photo.id}>
      <div className="catContainer">
        
        
         
        <figure>
          <img className="ima" src={"https://media-nft.paintswap.finance/250_0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9_"+photo.tokenId+".png"} alt={photo.id} />
          <figcaption className="idtext">{"ID: "+photo.tokenId}</figcaption>
        </figure>
        <div className="catInfo">
          <div>
              {(photo.price/1000000000000000000).toFixed(1)} FTM
          </div>
          <div>
            {

             (catData[photo.tokenId].score/(photo.price/1000000000000000000)).toFixed(2)
              
            } MP/FTM
          </div>
          
        </div>
         
      </div>
      </a> 
      }</For>
    </div>
    

  </>;
}

export default DataFetcher;

