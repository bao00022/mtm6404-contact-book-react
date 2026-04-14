export default function Input({ label, name, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">{label}</label>
      <input
        name={name}
        className="px-4 py-2 bg-neutral-200 border border-neutral-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
        {...props}
      />
    </div>
  );
}
