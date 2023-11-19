const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); 
const usermodel = require('../model/usersModel'); 
const { types } = require('pg');



router.post('/user', userController.createUser);
router.get('/users', userController.getAllUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/search', userController.searchUsers);
router.get("/users2", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let type = req.query.type || "All";

        const typeOptions = [
            'School', 'University', 'Institution', 'Park'
        ];

        type === "All"
            ? (type = [...typeOptions])
            : (type = req.query.type.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const users = await usermodel.find({ name: { $regex: search, $options: "i" } })
            .where("type")
            .in([...type])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await usermodel.countDocuments({
            type: { $in: [...type] },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            type: typeOptions,
            users,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

module.exports = router;

