import sql from "../config/db.js";


export const getCreations = async (req, res) => {

    try {
        const {userId} = await req.auth()


        const creations = await sql ` SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC `

        res.status(200).json({success:true, creations})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:error.message})
        
    }

}


export const getPublishedCreations = async (req, res) => {

    try {

        const creations = await sql ` SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC `

        res.status(200).json({success:true, creations})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:error.message})
        
    }

}


export const likeCreations = async (req, res) => {

    try {
       const {userId} = await req.auth()
       const {id} = req.body

       const [creations] = await sql `SELECT * FROM creations WHERE id = ${id}`

        const currentLikes = creations.likes
        const userIdStr = String(userId)
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter((user) => user !== userIdStr)
            message = "Creation Unliked"
        }else{
          updatedLikes = [...currentLikes, userIdStr]
          message = "Creation Liked"
        }

        const formattedArray = `{${updatedLikes.join(',')}}`

        await sql `UPDATE creations SET likes = ${formattedArray}::text[] where id = ${id} `

        res.status(200).json({success:true, message})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message:error.message})
        
    }

}