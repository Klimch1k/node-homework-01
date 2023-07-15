const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 *
 * To find all contacts
 */

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

/**
 *
 * To find contact by ID
 */
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact || null;
}
/**
 *
 * To remove contact by ID
 */
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return result;
}

/**
 *
 * To add contact by
 */
async function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: shortid.generate(),
  };
  const allContacts = await listContacts();

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
