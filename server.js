const exp = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'user',
  password: 'admin',
  port: 5432,
})

const app = exp();
app.use(cors())
app.use(bodyParser.json())

app.use(exp.static("public"))


app.get("/todos",async(req,res)=>{
    await pool.query(`Select * from todos order by "Priority" asc`)
    .then(result=>{
        res.status(201).json(result.rows);
       
    }).catch(err=>{
       
        res.status(501).json({"no data":1});
    })
   
})

app.post("/postTodo",(req,res)=>{
    const {TaskName,Priority} = req.body;
    pool.query('Insert into todos values ($1,$2)',[TaskName,Priority])
    .then(result=>{
        res.status(201).json(result);
    }).catch(err=>{
        
        res.status(501).json(err);
    })
})

app.delete("/delete",(req,res)=>{
    const TaskName = req.body;
   
    pool.query(`Delete from todos where "TaskName"=$1`,[TaskName])
    .then(result=>{
       
        res.status(201).json({message:"Successfully deleted"});
    }).catch(err=>{
        
        res.status(501).json({message:"Problem in server"});
    })
})


app.put("/update",(req,res)=>{
    const {TaskName,newValue} = req.body;
    pool.query(`update todos set "TaskName"=$1 where "TaskName"=$2`,[newValue,TaskName])
    .then(result=>{
        
        res.status(201).json({message:"success"});
    }).catch(err=>{
        
        res.status(501).json({message:"failed"});
    })
})

app.listen(8000,()=>{
    console.log("Listening on Port 8000");
});
