import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Button from "../components/Button";
import Input from "../components/Input";
import db from "../utils/db";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    relationship: "",
    note: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contactBook", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const contactData = docSnap.data();
        setFormData({
          firstName: contactData.firstName ?? "",
          lastName: contactData.lastName ?? "",
          email: contactData.email ?? "",
          phone: contactData.phone ?? "",
          company: contactData.company ?? "",
          relationship: contactData.relationship ?? "",
          note: contactData.note ?? "",
        });
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "contactBook", id);
    await updateDoc(docRef, formData);
    navigate(`/contact/${id}`);
  };

  return (
    <div className="max-w-lg mx-auto w-full min-h-screen flex flex-col">
      <div className="w-full h-16 flex items-center justify-between px-4 border-b border-neutral-300">
        <Link className="text-3xl font-bold flex items-center gap-2 cursor-pointer" to={`/contact/${id}`}>
          <ChevronLeft />
        </Link>
        <div className="flex items-center gap-4">
          <Button type="cancel" onClick={() => navigate(`/contact/${id}`)}></Button>
          <Button type="done" onClick={handleSubmit}></Button>
        </div>
      </div>

      <form className="flex-1 flex flex-col gap-2 p-4">
        <label className="flex flex-col gap-2">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="Company" name="company" value={formData.company} onChange={handleChange} />
          <Input
            label="Relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          />
          <Input label="Note" name="note" value={formData.note} onChange={handleChange} />
        </label>
      </form>
    </div>
  );
}
