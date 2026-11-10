import { displayHome, returnCss, returnJs } from "./controller.js";

export async function handleRoute(req,res) {
  let url=new URL(req.url ?? '/','http://localhost');
  if(req.method==="GET" && url.pathname==='/'){
    return displayHome(res)
    
  }
  else if(req.method==='GET' && url.pathname==='style.css'){
    return await returnCss()
  }
  else if(req.method==='GET'&&url.pathname==='main.js'){
    return await returnJs()
  }
}
