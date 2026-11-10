import fs from 'fs/promises';
import { fileURLToPath } from 'node:url'; // <-- Make sure this line is here!
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
  };
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function displayHome(res) {
  const filePath = path.join(__dirname, '../pages/index.html');
    const type = contentTypes[path.extname(filePath)] ?? 'application/octet-stream';
  res.setHeader('Content-Type',type);
  res.statusCode=200;
  let file=await fs.readFile(filePath,'utf8')
   res.end(file);
  
}
