// const Donor = require('../models/donorModel');

// const donorController = {
//   getDonorProfile: async (req, res) => {
//     try {
//       const donor = await Donor.findById(req.user._id);

//       if (!donor) {
//         return res.status(404).json({ message: 'Donor not found' });
//       }

//       res.status(200).json({
//         personalInfo: donor.personalInfo,
//         donationHistory: donor.donationHistory,
//         favoritePrograms: donor.favoritePrograms,
//         liveUpdates: donor.liveUpdates,
//         settings: donor.settings,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = donorController;



const Donor = require('../model/donorModel');

const donorController = {
  getDonorProfile: async (req, res) => {
    try {
      const donor = await Donor.findById(req.user._id);

      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }

      res.render('donor', { donorData: donor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  createDonor: async (req, res) => {
    try {
      const newDonor = await Donor.create(req.body);
      res.status(201).json({ message: 'Donor created successfully', donor: newDonor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getAllDonors: async (req, res) => {
    try {
      const donors = await Donor.find();
      res.status(200).json({ donors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  updateDonor: async (req, res) => {
    try {
      const updatedDonor = await Donor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated donor
      );

      if (!updatedDonor) {
        return res.status(404).json({ message: 'Donor not found' });
      }

      res.status(200).json({ message: 'Donor updated successfully', donor: updatedDonor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteDonor: async (req, res) => {
    try {
      const deletedDonor = await Donor.findByIdAndDelete(req.params.id);

      if (!deletedDonor) {
        return res.status(404).json({ message: 'Donor not found' });
      }

      res.status(200).json({ message: 'Donor deleted successfully', donor: deletedDonor });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = donorController;
