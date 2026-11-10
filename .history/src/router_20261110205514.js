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
  else{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.setHeader('Content-Type','text/html');
    res.statusCode=404;
      const filePath=path.join(__dirname,`../pages/404.html`);
      const file=await readFile(filePath,'utf8')
    res.end(file)
  }
}
