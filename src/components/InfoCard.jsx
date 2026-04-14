import { Mail, Phone, Landmark, NotebookText, Info } from "lucide-react";

const iconMap = {
  email: { icon: Mail, label: "Email" },
  phone: { icon: Phone, label: "Phone" },
  company: { icon: Landmark, label: "Company" },
  note: { icon: NotebookText, label: "Note" },
  default: { icon: Info, label: "Info" },
};

export default function InfoCard({ type, value }) {
  const config = iconMap[type] || iconMap.default;
  // if type -> "email"
  // iconMap["email"]  -> { icon: Mail, label: "Email" }
  // iconMap.email     -> { icon: Mail, label: "Email" }
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-6">
      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
        <Icon className="text-indigo-600" size={20} />
      </div>
      <div>
        <p className="text-xl font-bold">{config.label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}
