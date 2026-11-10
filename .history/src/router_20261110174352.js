import http from 'node:http';
const server=http.createServer((req,res)=>{
  let url=new URL(req.url ?? '/','http://localhost');
  
})