import fs from 'fs/promises';
export async function displayHome(res) {
  res.setHeader('Content-Type','tet/html');
  res.statusCode=200;
  let file=fs.readFile('pages/index.html','utf8')
   res.end(file);
  
}