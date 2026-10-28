/* ==========================================================
   EDIT YOUR CONTENT HERE. Leave a value as "" until you have it.
   Empty links are never shown as real links on the site.
   ========================================================== */
window.SITE = {
  name: "Mar Vincent P. Mercado",
  shortName: "mar",
  photo: "profile.jpeg",            // e.g. "assets/profile.jpg"

  // Contact (leave "" until ready)
  email: "",            // e.g. "you@example.com"
  github: "",           // e.g. "https://github.com/your-username"
  linkedin: "",         // e.g. "https://www.linkedin.com/in/your-profile"

  skills: [
    { group: "Networking", icon: "network", items: ["Cisco Networking fundamentals", "Network configuration concepts"] },
    { group: "Cybersecurity", icon: "shield", items: ["Introduction to Cybersecurity", "Basic cybersecurity concepts"] },
    { group: "Operating Systems", icon: "terminal", items: ["Linux fundamentals", "Linux Essentials"] },
    { group: "Software and Systems Development", icon: "code", items: ["Library Management System", "Banking System", "Employee Management System"] }
  ],

  /* Only add features you actually built. Empty arrays show a placeholder. */
  projects: [
    {
      title: "Library Management System", icon: "book",
      desc: "A system designed to organize library records and manage library-related operations.",
      stack: [],        // e.g. ["Java", "MySQL"]
      features: [],     // e.g. ["Book record management", "Borrowing and returning records"]
      repo: "", demo: "", screenshot: ""
    },
    {
      title: "Banking System", icon: "bank",
      desc: "A software project focused on managing banking-related records and transactions.",
      stack: [], features: [], repo: "", demo: "", screenshot: ""
    },
    {
      title: "Employee Management System", icon: "users",
      desc: "A system designed to organize employee information and support employee record management.",
      stack: [], features: [], repo: "", demo: "", screenshot: ""
    }
  ],

  /* Use the exact credential titles shown on your certificates. */
  certs: [
    { title: "Cisco Networking", icon: "network", issuer: "", date: "", image: "", verify: "" },
    { title: "Introduction to Cybersecurity", icon: "shield", issuer: "", date: "", image: "", verify: "" },
    { title: "Linux Essentials", icon: "terminal", issuer: "", date: "", image: "", verify: "" },
    { title: "Introduction to the Internet of Things (IoT)", icon: "chip", issuer: "", date: "", image: "", verify: "" }
  ]
};
