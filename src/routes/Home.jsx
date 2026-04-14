import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/db";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { randomColor } from "../utils/tools";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayContacts, setDisplayContacts] = useState([]);

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, "contactBook"));
    const contactsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(contactsData);
    const sortedContacts = contactsData.sort((a, b) => {
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    });
    setContacts(sortedContacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const keyword = searchKeyword.toLowerCase();

    if (!keyword) {
      setDisplayContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(keyword);
      });
      setDisplayContacts(filtered);
    }
  }, [contacts, searchKeyword]);

  return (
    <div className="max-w-lg mx-auto w-full flex flex-col gap-4">
      {/* header */}
      <div className="w-full h-16 flex items-center justify-between px-4 border-b border-neutral-300">
        <h1 className="text-3xl font-bold">Contact</h1>
        <Button type="add" onClick={() => navigate("/add")}></Button>
      </div>

      {/* search form */}
      <form>
        <input
          className="px-4 py-2 bg-neutral-200 border border-neutral-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search by name..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </form>

      {/* contact list */}
      <ul className="flex flex-col gap-2">
        {displayContacts.map((contact) => (
          <li key={contact.id} className="p-2 hover:bg-neutral-200 rounded-lg">
            <Link to={`/contact/${contact.id}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-full h-10 w-10 flex justify-center items-center ${randomColor()}`}>
                  {`${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase()}
                </div>
                <div>
                  <p>{`${contact.firstName} ${contact.lastName}`}</p>
                  <p className="text-gray-400">{contact.email}</p>
                </div>
              </div>

              <ChevronRight size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
