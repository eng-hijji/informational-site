import fs from 'fs/promises';
import { fileURLToPath } from 'node:url'; // <-- Make sure this line is here!
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const paths={
  '/':'index.html',
  '/index.html':'index.html',
  '/styles.css':'styles.css',
  '/main.js':'main.js',
  '/about.html':'about.html',

'/contact-me.html': 'contact-me.html',

}
const exts={
  '.html':'text/html',
  '.css':'text/css',
  '.js':'text/javascript'
}
export async function display(res,pathName) {
  if(!(pathName in paths)){
    return notFound(res)
  }
  const filePath=path.join(__dirname,`../pages/${paths[pathName]}`);
  const contentType = exts[path.extname(filePath)];
  const file=await fs.readFile(filePath,'utf8');
  res.setHeader('Content-Type',contentType)
  res.statusCode=200;
  res.end(file)
}
async function notFound(res) {
  res.statusCode=404;
res.setHeader('Content-Type','text/html');
  const filePath=path.join(__dirname,`../pages/404.html`);
  const file=await fs.readFile(filePath,'utf8');
  res.end(file)

}
// export async function displayHome(res) {
//   const filePath = path.join(__dirname, '../pages/index.html');
//   // this is because we used type module

//   res.setHeader('Content-Type','text/html');
//   res.statusCode=200;
//   let file=await fs.readFile(filePath,'utf8')
//    res.end(file);
  
// }
// export async function returnCss(res){
//   const filePath=path.join(__dirname, '../pages/styles.css');
//   const file=await fs.readFile(filePath,'utf8');
//   res.setHeader('Content-Type','text/css;charset=utf-8');
//   res.statusCode=200;
//   res.end(file)
// }
// export async function returnJs(res){
//   const path=path.join(__dirname, '../pages/main.js');
//   const file=await fs.readFile(path,'utf8');
//   res.setHeader('Content-Type','text/javascript; charset=utf-8');
//   res.statusCode=200;
//   res.end(file)
// }