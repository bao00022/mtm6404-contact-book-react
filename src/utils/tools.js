export function randomColor() {
  const colors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-indigo-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
