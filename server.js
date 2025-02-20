const express=require('express');
const app=express();

app.use(express.json())
PORT=8080
userData=[]

app.get('/',(req,res)=>{
    try{
        return res.send("<h1>Welcome to backend</h1>")
    }catch(Er){
        return res.status(500).send({message:"Internal server error",error: Er.message})
    }
})

app.get('/get-users',(req,res)=>{
    try{
        const data=userData;
        return res.status(200).send({message:"Users fetched", data:data})
    }catch(er){
        return res.status(500).send({message:"Internal server error", error:er.message})
    }
})

app.post('/create-user',(req,res)=>{
    try{

        const {email, password}=req.body;
        if(!email){
        return res.status(401).send({message:"Email cannot be empty"})
    }
    if(!password){
        return res.status(401).send({message:"Password cannot be empty"})
    }
    if(!email.includes("@")||!email.includes(".")){
        return res.status(401).send({message:"Invalid email"})
    }
    if(!password.length>8){
        return res.status(401).send({message:"Password should be atleast 8 characters long"})
    }
    
    userData.push({
        email: email,
        password:password,
    })
    
    return res.status(201).send({message:"User added successfully"})
}catch(er){
    return res.status(500).send({message:"Internal server error", error:er.message})
}
})

//login
app.post('/login',(req,res)=>{
    
    try{

        const {email,password}= req.body;
        
    if(!email){
        return res.status(401).send({message:"Email cannot be empty"})
    }
    if(!password){
        return res.status(401).send({message:"Password cannot be empty"})
    }
    
    const user=userData.find((u)=>u.email===email);
    if (!user){
        return res.status(404).send({message:"User doesn't exist"})
    }
    
    const verifyPassword=user.password;
    if(password===verifyPassword){
        return res.status(200).send({message:"User logged in successfully"})
    }else{
        return res.status(401).send({message:"Invalid password"})
    }
}catch(Er){
    return res.status(500).send({message:"Internal server error", error:Er.message})
}
    
    
})


app.listen(PORT, ()=>{
    console.log("App is running on http://localhost:8080")
})
