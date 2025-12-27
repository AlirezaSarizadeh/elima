import React from "react";
import { CreditCard, Description, FlightTakeoff, Person } from "@mui/icons-material";

const docs = [
    { icon: <Description />, title: "شناسنامه", desc: "اسکن صفحه اول", color: "bg-orange-100 text-orange-600" },
    { icon: <CreditCard />, title: "کارت ملی", desc: "اسکن پشت و رو", color: "bg-blue-100 text-blue-600" },
    { icon: <Person />, title: "عکس پرسنلی", desc: "زمینه سفید جدید", color: "bg-green-100 text-green-600" },
    { icon: <FlightTakeoff />, title: "بلیط پرواز", desc: "رفت و برگشت", color: "bg-purple-100 text-purple-600" },
];

export default function VisaDocuments() {
  return (
    <div className="mb-10">
       <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-8 bg-blue-950 rounded-full"></span>
          <h2 className="text-xl font-bold text-gray-800">مدارک الزامی</h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {docs.map((doc, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.color}`}>
                       {doc.icon}
                   </div>
                   <div>
                       <h4 className="font-bold text-gray-800 mb-1">{doc.title}</h4>
                       <span className="text-xs text-gray-500">{doc.desc}</span>
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
}