// "use client";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then(res => res.json())
//       .then(data => setUser(data.user));
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="flex justify-between px-6 py-4 bg-white border-b">
//       <h1 className="font-bold text-[#135bec]">Mentora</h1>

//       <div className="text-right">
//         <p className="text-sm font-bold">{user.name}</p>
//         <p className="text-xs text-gray-500">{user.email}</p>
//       </div>
//     </div>
//   );
// }
