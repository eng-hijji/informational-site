import fs from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function displayHome(res) {
  const filePath = path.join(__dirname, '../pages/index.html');
  res.setHeader('Content-Type','text/html');
  res.statusCode=200;
  let file=await fs.readFile(filePath,'utf8')
   res.end(file);
  
}