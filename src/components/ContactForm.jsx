"use client"

import { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import "./ContactForm.css"

export default function ContactForm({ contact, groups, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    contact || {
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
      company: "",
      groupId: "",
      imageUrl: "",
    },
  )
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGroupChange = (e) => {
    setFormData({ ...formData, groupId: e.target.value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({ ...formData, imageUrl: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2 className="form-title">{contact ? "Edit Contact" : "New Contact"}</h2>
          <button className="form-close-button" onClick={onCancel}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="group" className="form-label">
                  Group
                </label>
                <select id="group" className="form-select" value={formData.groupId} onChange={handleGroupChange}>
                  <option value="">Select a group (optional)</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">
                  Upload Picture
                </label>
                <div className="form-file-input-wrapper">
                  <input
                    ref={fileInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    className="form-file-input"
                    onChange={handleImageUpload}
                  />
                </div>

                {formData.imageUrl && (
                  <div className="form-image-preview">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Profile preview"
                      className="form-preview-image"
                    />
                    <button type="button" className="form-remove-image-button" onClick={handleRemoveImage}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="form-button-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="form-button-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

