"use client"

import { useState, useEffect } from "react"
import ContactList from "./components/ContactList"
import ContactForm from "./components/ContactForm"
import { PlusCircle, Search, Users } from "./components/icons"
import "./App.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [groups, setGroups] = useState([
    { id: "1", name: "Personal", color: "#3b82f6" },
    { id: "2", name: "Work", color: "#10b981" },
    { id: "3", name: "Family", color: "#f59e0b" },
    { id: "4", name: "Friends", color: "#8b5cf6" },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [darkMode, setDarkMode] = useState(false)

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
          imageUrl: "", // Empty string for no image
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "555-987-6543",
          company: "",
          groupId: "1", // Personal
          imageUrl: "", // Empty string for no image
        },
      ]

      // Only set sample contacts if there are none in localStorage
      if (!localStorage.getItem("contacts")) {
        setContacts(sampleContacts)
        console.log("Initialized with sample contacts")
      }
    }
  }, [contacts.length])

  // Check for dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

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
    const isDuplicate = contacts.some((c) => {
      if (selectedContact && c.id === contact.id) {
        return false
      }
      
      const emailMatch = c.email.toLowerCase().trim() === contact.email.toLowerCase().trim()
      const phoneMatch = c.phone.replace(/\D/g, "") === contact.phone.replace(/\D/g, "")

      return emailMatch || phoneMatch
    })

    if (isDuplicate) {
      alert("A contact with this email or phone number already exists.")
      return 
    }

    if (selectedContact) {
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
    } else {
      setContacts([...contacts, contact])
    }
    setIsFormOpen(false)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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
    <div className="app-wrapper">
      <div className="app-container">
        <div className="app-header">
          <div className="app-title-section">
            <div className="app-logo">
              <Users className="app-logo-icon" />
            </div>
            <h1 className="app-title">Contacts</h1>
          </div>

          <div className="app-actions">
            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={handleAddContact} className="add-button">
              <PlusCircle className="add-icon" />
              <span>New Contact</span>
            </button>
          </div>
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

        <div className="tabs-container">
          <div className="tabs-list">
            <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
              All Contacts
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                className={`tab-button ${activeTab === group.id ? "active" : ""}`}
                onClick={() => setActiveTab(group.id)}
                style={{
                  "--group-color": group.color,
                }}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>

        <div className="contacts-section">
          {filteredContacts.length > 0 ? (
            <ContactList
              contacts={filteredContacts}
              groups={groups}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
          ) : (
            <div className="no-contacts">
              <div className="no-contacts-icon">👥</div>
              <p>No contacts found</p>
              <button onClick={handleAddContact} className="no-contacts-add-button">
                Add your first contact
              </button>
            </div>
          )}
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

