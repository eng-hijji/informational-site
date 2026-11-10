import { displayHome } from "./controller.js";

export async function handleRoute(req,res) {
  let url=new URL(req.url ?? '/','http://localhost');
  if(req.method==="GET" && url.pathname==='/'){
    return displayHome(res)
    
  }
}