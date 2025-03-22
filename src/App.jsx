"use client"

import { useState, useEffect } from "react"
import ContactList from "./components/ContactList"
import ContactForm from "./components/ContactForm"
import { PlusCircle, Search } from "./components/icons"
import "./App.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [groups, setGroups] = useState([
    { id: "1", name: "Personal" },
    { id: "2", name: "Work" },
    { id: "3", name: "Family" },
    { id: "4", name: "Friends" },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Initialize with sample contacts if none exist
  useEffect(() => {
    if (contacts.length === 0) {
      const sampleContacts = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "555-123-4567",
          company: "Acme Inc",
          groupId: "2", // Work
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "555-987-6543",
          company: "",
          groupId: "1", // Personal
        },
      ]

      // Only set sample contacts if there are none in localStorage
      if (!localStorage.getItem("contacts")) {
        setContacts(sampleContacts)
        console.log("Initialized with sample contacts")
      }
    }
  }, [contacts.length])

  // Load contacts and groups from localStorage on component mount
  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem("contacts")
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts))
        console.log("Loaded contacts from localStorage:", JSON.parse(savedContacts))
      }

      const savedGroups = localStorage.getItem("groups")
      if (savedGroups) {
        setGroups(JSON.parse(savedGroups))
        console.log("Loaded groups from localStorage:", JSON.parse(savedGroups))
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
      // If there's an error, initialize with empty contacts
      setContacts([])
    }
  }, [])

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts))
      console.log("Saved contacts to localStorage:", contacts)
    } catch (error) {
      console.error("Error saving contacts to localStorage:", error)
    }
  }, [contacts])

  // Save groups to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("groups", JSON.stringify(groups))
      console.log("Saved groups to localStorage:", groups)
    } catch (error) {
      console.error("Error saving groups to localStorage:", error)
    }
  }, [groups])

  const handleAddContact = () => {
    setSelectedContact(null)
    setIsFormOpen(true)
  }

  const handleEditContact = (contact) => {
    setSelectedContact(contact)
    setIsFormOpen(true)
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const handleSaveContact = (contact) => {
    if (selectedContact) {
      // Edit existing contact
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
    } else {
      // Add new contact
      setContacts([...contacts, contact])
    }
    setIsFormOpen(false)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)

    if (activeTab === "all") return matchesSearch
    return matchesSearch && contact.groupId === activeTab
  })

  return (
    <div className="container">
      <div className="app-container">
        <div className="header">
          <h1 className="title">Contact Manager</h1>
          <button onClick={handleAddContact} className="btn btn-primary add-button">
            <PlusCircle className="icon" />
            Add Contact
          </button>
        </div>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tabs">
          <div className="tabs-list">
            <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
              All Contacts
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                className={`tab-button ${activeTab === group.id ? "active" : ""}`}
                onClick={() => setActiveTab(group.id)}
              >
                {group.name}
              </button>
            ))}
          </div>
          <div className="tabs-content">
            {filteredContacts.length > 0 ? (
              <ContactList
                contacts={filteredContacts}
                groups={groups}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            ) : (
              <div className="no-contacts">
                <p>No contacts found</p>
              </div>
            )}
          </div>
        </div>

        {isFormOpen && (
          <ContactForm
            contact={selectedContact}
            groups={groups}
            onSave={handleSaveContact}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  )
}

