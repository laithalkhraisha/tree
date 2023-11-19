// const Donor = require('../models/usersModel');

// const userController = {
//   getUserProfile: async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({
//         personalInfo: user.personalInfo,
//         currentStatus: user.currentStatus,
//         updatesAndNotifications: user.updatesAndNotifications,
//         serviceDetails: user.serviceDetails,
//         historicalData: user.historicalData,
//         additionalNotes: user.additionalNotes,
//       });
//     } catch (error) {
//       console.error(error);
      // res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = userController;



const User = require('../model/usersModel');

const userController = {

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({ message: 'User created successfully', user: newUser });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users }) 
      // res.status(200).render('login', { users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } 
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  searchUsers :async (req, res) =>{
    try {
      const { keyword } = req.body;
  
     
      const filter = {};
      if (keyword) {
        filter.$or = [
          { name: { $regex: new RegExp(keyword, 'i') } },
          { emailAddress: { $regex: new RegExp(keyword, 'i') } },
        ];
      }
  
      const users = await User.find(filter, 'username emailAddress');
  
      res.status(200).json( users );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = userController;


