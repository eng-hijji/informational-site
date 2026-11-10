import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function displayHome(res) {
  res.setHeader('Content-Type','text/html');
  res.statusCode=200;
  let file=await fs.readFile('pages/index.html','utf8')
   res.end(file);
  
}