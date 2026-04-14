import { useState, useEffect } from "react";
import db from "../utils/db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import InfoCard from "../components/InfoCard";
import Button from "../components/Button";

const Contact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);

  const fetchContact = async () => {
    const docRef = doc(db, "contactBook", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setContact({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contactBook", id));
    navigate("/");
  };

  if (!contact)
    return (
      <div className="max-w-lg w-full mx-auto flex flex-col gap-4 flex-1">
        <div className="text-gray-400 font-bold flex-1 flex justify-center items-center">Loading...</div>
      </div>
    );

  return (
    <div className="max-w-lg w-full mx-auto flex flex-col gap-4">
      {/* header */}
      <div className="w-full h-16 flex items-center justify-between px-4 ">
        <Link className="text-3xl font-bold flex items-center gap-2 cursor-pointer" to="/">
          <ChevronLeft />
        </Link>
        <div className="flex items-center gap-4">
          <Button type="delete" onClick={handleDelete}></Button>
          <Button type="edit" onClick={() => navigate(`/edit/${id}`)}></Button>
        </div>
      </div>

      {/* name */}
      <div className="w-full flex flex-col justify-center items-center border-b border-neutral-300 p-4 gap-4">
        <div
          className={`h-40 w-40 rounded-full flex justify-center items-center bg-indigo-100 text-5xl font-bold`}
        >
          {`${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase()}
        </div>
        <h2 className="font-bold text-2xl">{`${contact.firstName} ${contact.lastName}`}</h2>
        <p className="text-xl">{contact.relationship}</p>
      </div>

      {/* information */}
      <div className="flex flex-col gap-6 p-4">
        <InfoCard type="email" value={contact.email} />
        <InfoCard type="phone" value={contact.phone} />
        <InfoCard type="company" value={contact.company} />
        <InfoCard type="note" value={contact.note} />
      </div>
    </div>
  );
};

export default Contact;
