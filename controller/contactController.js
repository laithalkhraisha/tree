const Contact = require('../model/contact.model'); // Adjust the path based on your project structure

async function createContact(req, res) {
  try {
    const { name, email, message } = req.body;
console.log(req.body);
    const newContact = new Contact({ name, email, message });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to get all contact entries
async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    // res.status(200).json(contacts);
    res.status(200).render('app', { contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createContact,
  getAllContacts,
};
