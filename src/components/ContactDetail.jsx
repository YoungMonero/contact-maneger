"use client"

import { Mail, Phone, User, Edit, Trash2 } from "./icons"
import "./ContactDetail.css"

export default function ContactDetail({ contact, group, onEdit, onDelete, onClose }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleEdit = () => {
    onEdit(contact)
    onClose()
  }

  const handleDelete = () => {
    onDelete(contact.id)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header" style={{ backgroundColor: group?.color || "#3b82f6" }}>
          <button className="detail-close-button" onClick={onClose}>
            &times;
          </button>

          <div className="detail-profile">
            <div className="detail-avatar">
              {contact.imageUrl ? (
                <img src={contact.imageUrl || "/placeholder.svg"} alt={contact.name} className="detail-avatar-image" />
              ) : (
                <div className="detail-avatar-fallback">{getInitials(contact.name)}</div>
              )}
            </div>
            <h2 className="detail-name">{contact.name}</h2>
            {group && <span className="detail-group">{group.name}</span>}
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3 className="detail-section-title">Contact Information</h3>

            <div className="detail-item">
              <Mail className="detail-icon" />
              <div className="detail-item-content">
                <span className="detail-label">Email</span>
                <span className="detail-value">{contact.email}</span>
              </div>
            </div>

            <div className="detail-item">
              <Phone className="detail-icon" />
              <div className="detail-item-content">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{contact.phone}</span>
              </div>
            </div>

            {contact.company && (
              <div className="detail-item">
                <User className="detail-icon" />
                <div className="detail-item-content">
                  <span className="detail-label">Company</span>
                  <span className="detail-value">{contact.company}</span>
                </div>
              </div>
            )}
          </div>

          <div className="detail-actions">
            <button className="detail-action-button detail-edit-button" onClick={handleEdit}>
              <Edit className="detail-action-icon" />
              Edit
            </button>
            <button className="detail-action-button detail-delete-button" onClick={handleDelete}>
              <Trash2 className="detail-action-icon" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

