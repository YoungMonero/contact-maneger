"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Trash2, Edit, User, MoreHorizontal } from "./icons"
import "./ContactList.css"

export default function ContactList({ contacts, groups, onEdit, onDelete }) {
  const [deleteId, setDeleteId] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <div key={contact.id} className="card">
          <div className="card-content">
            <div className="card-header">
              <div className="contact-info">
                <div className="avatar">
                  <div className="avatar-fallback">{getInitials(contact.name)}</div>
                </div>
                <div>
                  <h3 className="contact-name">{contact.name}</h3>
                  {contact.groupId && <span className="group-badge">{getGroupName(contact.groupId)}</span>}
                </div>
              </div>
              <div className="dropdown">
                <button className="dropdown-button" onClick={() => toggleMenu(contact.id)}>
                  <MoreHorizontal className="dropdown-icon" />
                  <span className="sr-only">More options</span>
                </button>
                {openMenuId === contact.id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        onEdit(contact)
                        setOpenMenuId(null)
                      }}
                    >
                      <Edit className="menu-icon" />
                      Edit
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleDelete(contact.id)
                        setOpenMenuId(null)
                      }}
                    >
                      <Trash2 className="menu-icon" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="contact-details">
              <div className="detail-item">
                <Mail className="detail-icon" />
                <span>{contact.email}</span>
              </div>
              <div className="detail-item">
                <Phone className="detail-icon" />
                <span>{contact.phone}</span>
              </div>
              {contact.company && (
                <div className="detail-item">
                  <User className="detail-icon" />
                  <span>{contact.company}</span>
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
              <h2 className="modal-title">Are you sure?</h2>
            </div>
            <div className="modal-body">
              <p>This action cannot be undone. This will permanently delete the contact.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

