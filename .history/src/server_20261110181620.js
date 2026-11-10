import http from 'node:http';
import { handleRoute } from './router';
const server=http.createServer(async (req,res)=>{
try{
 return await  handleRoute(req,res)
}
catch(error){
  res.setHeader('Content-Type','application/json');
  res.statusCode=500;
  res.end(JSON.stringify({error:"Internal server error"}))
}
})




server.listen(3000, () => {
  console.log('Server is running on port 3000');
});