const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodoverride = require("method-override")
const Listing = require("./model/listing.js")
const ejsMate = require("ejs-mate")

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json())
app.set("views",path.join(__dirname,"/views"))
app.set("public",path.join(__dirname,"/public"))
app.set("model",path.join(__dirname,"/model"))
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"))

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    .then(() => {
        console.log('Connected!');
    }).catch((err) => {
        console.log(err);
    });

app.listen(8080,()=>{
    console.log("Server is listening from port 8080")
})

//show route
app.get("/",async(req,res)=>{
    let listings = await Listing.find()
    res.render("listings/show.ejs",{listings})
})

//create route
app.get("/listings/create",(req,res)=>{
    res.render("listings/new.ejs")
})

//new route
app.post("/listings",async (req,res)=>{
    let {title , description , image : image, price , location , country} = req.body
    let newlisting = new Listing ({title , description , image : image, price , location , country})
    console.log(newlisting)
    await newlisting.save()
    res.redirect("/")
})

//show details
app.get("/listings/:id",async(req,res)=>{
    let id = req.params.id  
    let listing = await Listing.findById(id)
    res.render("listings/details.ejs",{listing})
})

//edit route
app.get("/listings/edit/:id",async(req,res)=>{
    let id = req.params.id
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})

//update
app.patch("/listings/update/:id",async (req,res)=>{
    let id = req.params.id
    let {title , description , image , price , location , country} = req.body
    await Listing.findByIdAndUpdate(id,{title : title, description : description, image : image, price : price, location : location, country : country})
    res.redirect(`http://localhost:8080/listings/${id}`)
})

//destroy 
app.delete("/listings/delete/:id",async(req,res)=>{
    let id = req.params.id
    await Listing.findByIdAndDelete(id)
    res.redirect("/")
})

//about us
app.get("/aboutus",(req,res)=>{
    res.render("listings/aboutus.ejs")
})

//privacy
app.get("/privacy",(req,res)=>{
    res.render("listings/privacy.ejs")
})

//terms
app.get("/terms",(req,res)=>{
    res.render("listings/terms.ejs")
})