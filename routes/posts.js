import expres from "express";
import Post from "./models/PostSchema.js";
import multer from "multer";

const router = expres.Router();

// GET ALL POST
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// UPLOAD IMAGE
const Storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage:Storage,
    fileFilter: function (req, cb) {
        if (req.file.mimetype != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return cb(new Error('Wrong file type'))
    } cb(null,true)
}
}).single('testImage');

// CREATED POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    const postSaved = await post.save();
    try {
        res.status(200).json({message: "Post has been created successfully", data: postSaved})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// GET SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        const postDelete = await Post.remove({_id: req.params.postId});
        if (postDelete.deletedCount === 0) {
            res.status(404).json({message: "Data not find"})
        }
        res.status(200).json({status: 200, message: "Post deleted successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// UPDATE POST
router.patch('/:postId', async (req, res) => {
    try {
        const postUpdate = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        );
        res.status(200).json(postUpdate);
    } catch (error) {
        res.status(400).json({message: "User not find"});
    }
});


export default router;