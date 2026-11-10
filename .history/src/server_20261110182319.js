import http from 'node:http';
import { handleRoute } from './router.js';
const server=http.createServer(async (req,res)=>{
try{
  await handleRoute(req,res)
}catch (error) {
    // Global safety net for unexpected crashes
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
})




server.listen(3000, () => {
  console.log('Server is running on port 3000');
});