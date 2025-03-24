"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Trash2, Edit, User, MoreHorizontal } from "../components/icons"
import ContactDetail from "./ContactDetail"
import "./ContactList.css"

export default function ContactList({ contacts, groups, onEdit, onDelete }) {
  const [deleteId, setDeleteId] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const [selectedContact, setSelectedContact] = useState(null)

  // Log when contacts are received
  useEffect(() => {
    console.log("ContactList received contacts:", contacts)
  }, [contacts])

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const cancelDelete = () => {
    setDeleteId(null)
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    return group ? group.name : ""
  }

  const getGroupColor = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    return group ? group.color : "#94a3b8"
  }

  const getGroup = (groupId) => {
    return groups.find((g) => g.id === groupId) || null
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleImageError = (contactId) => {
    setImageErrors((prev) => ({
      ...prev,
      [contactId]: true,
    }))
  }

  const openContactDetail = (contact) => {
    setSelectedContact(contact)
  }

  const closeContactDetail = () => {
    setSelectedContact(null)
  }

  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-card">
          <div className="contact-card-content">
            <div
              className="contact-card-header"
              style={{
                "--group-color": getGroupColor(contact.groupId),
              }}
            >
              <div
                className="contact-avatar"
                onClick={() => openContactDetail(contact)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${contact.name}`}
              >
                {contact.imageUrl ? (
                  <img
                    src={contact.imageUrl || "/placeholder.svg"}
                    alt={contact.name}
                    className="contact-avatar-image"
                    onError={() => handleImageError(contact.id)}
                  />
                ) : (
                  <div className="contact-avatar-fallback">{getInitials(contact.name)}</div>
                )}
              </div>
              <div className="contact-info">
                <h3 className="contact-name" onClick={() => openContactDetail(contact)} role="button" tabIndex={0}>
                  {contact.name}
                </h3>
                {contact.groupId && (
                  <span
                    className="contact-group-badge"
                    style={{ backgroundColor: getGroupColor(contact.groupId) + "20" }}
                  >
                    {getGroupName(contact.groupId)}
                  </span>
                )}
              </div>
              <div className="contact-menu">
                <button className="contact-menu-button" onClick={() => toggleMenu(contact.id)}>
                  <MoreHorizontal className="contact-menu-icon" />
                  <span className="sr-only">More options</span>
                </button>
                {openMenuId === contact.id && (
                  <div className="contact-menu-dropdown">
                    <button
                      className="contact-menu-item"
                      onClick={() => {
                        onEdit(contact)
                        setOpenMenuId(null)
                      }}
                    >
                      <Edit className="contact-menu-item-icon" />
                      Edit
                    </button>
                    <button
                      className="contact-menu-item contact-menu-item-danger"
                      onClick={() => {
                        handleDelete(contact.id)
                        setOpenMenuId(null)
                      }}
                    >
                      <Trash2 className="contact-menu-item-icon" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-detail-item">
                <Mail className="contact-detail-icon" />
                <span className="contact-detail-text">{contact.email}</span>
              </div>
              <div className="contact-detail-item">
                <Phone className="contact-detail-icon" />
                <span className="contact-detail-text">{contact.phone}</span>
              </div>
              {contact.company && (
                <div className="contact-detail-item">
                  <User className="contact-detail-icon" />
                  <span className="contact-detail-text">{contact.company}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {deleteId && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Delete Contact</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="modal-button-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedContact && (
        <ContactDetail
          contact={selectedContact}
          group={getGroup(selectedContact.groupId)}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={closeContactDetail}
        />
      )}
    </div>
  )
}

