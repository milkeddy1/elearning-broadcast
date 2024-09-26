export async function POST(request: Request) {
console.log('login post request: ', request);
  // return Response.json({ data: 'good!' })
  const {username, password} = await request.json();



  if(username === 'test@gmail.com' && password === 'test123') {
    return new Response('Login success!', {
      status: 200,
    })
  } 
  
  // return new Response('Login failed!', {
  //   status: 400,
  // })

}