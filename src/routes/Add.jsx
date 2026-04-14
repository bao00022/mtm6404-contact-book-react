import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import Button from "../components/Button";
import Input from "../components/Input";
import db from "../utils/db";

export default function Add() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    relationship: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "contactBook"), formData);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto w-full min-h-screen flex flex-col">
      {/* header */}
      <div className="w-full h-16 flex items-center justify-between px-4 border-b border-neutral-300">
        <Link to="/" className="text-3xl font-bold flex items-center gap-2 cursor-pointer">
          <ChevronLeft />
        </Link>
        <div className="flex items-center gap-4">
          <Button type="cancel" onClick={() => navigate("/")}></Button>
          <Button type="done" onClick={handleSubmit}></Button>
        </div>
      </div>

      {/* form */}
      <form className="flex-1 flex flex-col gap-2 p-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="e.g. Jessica"
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="e.g. Taylor"
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. jessica@google.com"
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. +1 (613) 123-4567"
        />
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Algonquin College"
        />
        <Input
          label="Relationship"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          placeholder="e.g. Friend"
        />
        <Input
          label="Note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a note about this contact"
        />
      </form>
    </div>
  );
}
