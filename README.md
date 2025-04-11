# 🎓 Student Job Tracker

A full-stack web application designed to help students efficiently track their job applications throughout the recruitment process. Users can add, update, and monitor their applications, ensuring they stay organized and informed.

🔗 **Live Demo:** [student-job-tracker-beta.vercel.app](https://student-job-tracker-beta.vercel.app/)

---

## ✨ Features

- **Application Management:** Add and edit job applications with details like company name, position, status, and notes.
- **Status Tracking:** Monitor the progress of each application through various stages such as Applied, Interviewing, Offered, and Rejected.
- **User-Friendly Interface:** Intuitive design for easy navigation and interaction.
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account for database hosting.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Akhil20K/Student-Job-Tracker.git
   cd Student-Job-Tracker
   ```

2. **Set up the backend:**

   ```bash
   cd server
   npm install
   ```

   - Create a `.env` file in the `server` directory with the following content:

     ```env
     MONGO_URI=your_mongodb_connection_string
     ```

3. **Set up the frontend:**

   ```bash
   cd ../client
   npm install
   ```

4. **Run the application:**

   - In the `server` directory:

     ```bash
     node index.js
     ```

   - In the `client` directory:

     ```bash
     npm run dev
     ```

---
