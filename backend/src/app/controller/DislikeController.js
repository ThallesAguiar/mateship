const userModel = require('../model/User');

class LikeController {
    async store(req, res){
        const {likeIdUser} = req.params;

        const loggedUser = await userModel.findById(req.userId);
        const targetUser = await userModel.findById(likeIdUser);

        if(!targetUser) return res.status(400).json({error: "This user not exists"});
        
        loggedUser.dislikes.push(targetUser._id);
        await loggedUser.save();
        // await userModel.findByIdAndUpdate(context._id, {$push:{likes:filter._id}})

        return res.json(loggedUser);
    }
}

module.exports = new LikeController();