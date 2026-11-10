import { display } from "./controller.js";

export async function handleRoute(req,res) {
  let url=new URL(req.url ?? '/','http://localhost');
  // if(req.method==="GET" && url.pathname==='/'){
  //   return displayHome(res)
    
  // }
  // else if(req.method==='GET' && url.pathname==='/styles.css'){
  //   return await returnCss(res)
  // }
  // else if(req.method==='GET'&&url.pathname==='/main.js'){
  //   return await returnJs(res)
  // }
  if(req.method==='GET'){
    return await display(res,url.pathname)
  }

}
