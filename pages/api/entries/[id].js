import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    
   try {    
    const id = req.query.id;
    const client = await clientPromise;
    const db = client.db("archive");

    const entries = db.collection("entries");
    const result = await entries.find({ project_id: id}).sort({Date: -1}).toArray();
    if(result){
        res.json(result);
    }else{
        res.status(404).json({message: "Entries not found"})
    } 
      } catch (e) {
       console.error(e);
       res.status(500).json({ message: "Internal server error" });  
   }
};