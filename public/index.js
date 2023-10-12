function submitData(event){
    event.preventDefault();
    const taskName  = event.target[0].value;
    const priority  = event.target[1].value.checked ? "H" : "L";

    fetch("/postTodo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({"TaskName":taskName,"Priority":priority})
    }).then(res=>{
        console.log(res);
    })
    
}

function deletePost(event){
    event.preventDefault();
    const taskName  = event.target[0].value;
    fetch("/delete",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({"TaskName":taskName})
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
}





async function getTodos(){
    const data = await fetch("/todos",{
        method:"GET"
    }).then(res=>res.json()).catch(err=>console.log(err));
    const ele = document.querySelector(".active-todos");
    let text = ""
    for(let k of data){
        text += k?.TaskName + "-> Priority " + k?.Priority;
        text += "\n";
    }
    ele.innerText = text;
}


function updatePost(event){
    event.preventDefault();
    const taskName  = event.target[0].value;
    const newValue  = event.target[1].value;
    fetch("/update",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({"TaskName":taskName,"newValue":newValue})
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
}

