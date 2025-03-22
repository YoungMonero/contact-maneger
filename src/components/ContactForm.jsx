"use client"

import { useState } from "react"
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
    },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGroupChange = (e) => {
    setFormData({ ...formData, groupId: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal form-modal">
        <div className="modal-header">
          <h2 className="modal-title">{contact ? "Edit Contact" : "Add Contact"}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="group" className="form-label">
                  Group
                </label>
                <select id="group" className="form-select" value={formData.groupId} onChange={handleGroupChange}>
                  <option value="none">None</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

