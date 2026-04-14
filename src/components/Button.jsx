import { Pencil, Trash2, Plus, Check, X } from "lucide-react";

export default function Button({ type, ...props }) {
  const iconMap = {
    add: { icon: Plus, style: "bg-indigo-600 hover:bg-indigo-500" },
    edit: { icon: Pencil, style: "bg-blue-600 hover:bg-blue-500" },
    delete: { icon: Trash2, style: "bg-red-400 hover:bg-red-500" },
    cancel: { icon: X, style: "bg-gray-500 hover:bg-gray-600" },
    done: { icon: Check, style: "bg-green-500 hover:bg-green-600" },
  };

  const Icon = iconMap[type] || iconMap.done;

  return (
    <button className={`p-2 text-white rounded-lg cursor-pointer text-sm ${Icon.style}`} {...props}>
      <Icon.icon size={16} />
    </button>
  );
}
