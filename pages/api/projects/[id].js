import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    
   try {    
    const id = req.query.id;
    const client = await clientPromise;
    const db = client.db("archive");
    const projects = db.collection("projects");
    const project = await projects.findOne({ _id: id});
    if(project){
        res.json(project);
    }else{
        res.status(404).json({message: "Project not found"})
    } 
      } catch (e) {
       console.error(e);
       res.status(500).json({ message: "Internal server error" });  
   }
};