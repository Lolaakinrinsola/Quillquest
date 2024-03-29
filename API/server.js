const mongoose=require('mongoose')
const dotenv=require('dotenv')


process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION! shutting down')
    console.log(err.name,err.message,err)
    process.exit(1)
  })
  dotenv.config({path:'./config.env'})
  const app=require('./index')

  const DB=process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
  }).then(con=>{
    console.log(con.connections);
    console.log('DB connection successful')
  })
  
  const port =process.env.PORT || 8000;
const server=app.listen(port, () => {
console.log(__dirname, 'the directory pathway')

  console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection',err=>{
  console.log(err.name,err.message);
  server.close(()=>{
    process.exit(1)
  })
})