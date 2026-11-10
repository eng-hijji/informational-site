import { displayHome } from "./controller.js";
import { fileURLToPath } from 'node:url';

export async function handleRoute(req,res) {
  let url=new URL(req.url ?? '/','http//localhost');
  if(req.method==="GET" && url.pathname==='/'){
    return displayHome(res)
    
  }
}