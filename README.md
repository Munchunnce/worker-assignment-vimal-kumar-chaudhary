
```markdown
# Workers Booking App 🚀

**A modern worker booking application built with Next.js and Redux Toolkit.**  

This app allows users to browse, filter, sort, and book workers for daily services like welding, painting, and carpentry. Booked workers can be managed and canceled directly from the Booked Workers page.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Demo
![Workers Booking App Screenshot](https://raw.githubusercontent.com/Munchunnce/worker-assignment-vimal-kumar-chaudhary/main/public/worker-page.png)
![Booked Workers Screenshot](https://raw.githubusercontent.com/Munchunnce/worker-assignment-vimal-kumar-chaudhary/main/public/booked-worker.png)


---

## Features
- Browse a list of workers with images, names, services, and pricing.
- Search workers by name.
- Filter workers by service type (Welder, Painter, Carpenter, etc.).
- Sort workers by name or price (ascending/descending).
- Book workers directly from the workers list.
- Booked workers are stored globally using **Redux Toolkit**.
- View booked workers in a dedicated **Booked Workers** page.
- Cancel or clear all booked workers.
- Responsive design for mobile, tablet, and desktop.
- Interactive UI with hover effects and smooth transitions.

---

## Technologies Used
- **Frontend:** [Next.js 13](https://nextjs.org/) (App Router, Server Components, Client Components)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** Tailwind CSS
- **Data:** Static JSON file (`workers.json`) in `/public`
- **Image Optimization:** Next.js `Image` component


---

## Project Structure
```

src/
├─ app/
│  ├─ workers/page.tsx       # Workers listing page
│  ├─ booked/page.tsx        # Booked Workers page
│  ├─ navbar.tsx             # Navbar with live booking count
│  ├─ layout.tsx             # Root layout wrapping ReduxProvider
│  └─ ReduxProvider.tsx      # Redux provider setup
├─ storeBook/
│  ├─ store.ts               # Redux store
│  └─ bookingsSlice.ts       # Booked workers slice
├─ types/
│  └─ workers.ts             # Worker type definition
public/
├─ workers.json              # Static workers data


````

---

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/workers-booking-app.git
cd workers-booking-app
````

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open the app:**

```
http://localhost:3000
```

5. **Build for production:**

```bash
npm run build
npm start
```

---

## Usage

* Navigate to `/workers` to see the list of workers.
* Use the **search**, **filter**, and **sort** options to find workers easily.
* Click **Book** to add a worker to your booked list.
* Navigate to `/booked` to view all booked workers.
* Cancel individual bookings or clear all bookings with one click.
* The **Navbar** shows the live count of booked workers.

---

## Future Improvements

* Add authentication and user accounts.
* Integrate with a backend database for persistent storage.
* Add real-time notifications on booking.
* Enable booking for multiple days with pricing calculation.
* Enhance UI with animations and rating system for workers.

---

## Author

**Vimal Kumar Chaudhary**

* GitHub: [https://github.com/yourusername](https://github.com/Munchunnce)
* LinkedIn: [https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/vimal-kumar-chaudhary-7890961a6/)

---

**Project Purpose:**
This project demonstrates building a real-world, interactive **worker booking application** using modern **React + Next.js** stack with global state management using **Redux Toolkit**. Users can efficiently search, filter, sort, book, and manage workers all in a responsive, user-friendly interface. Perfect for showcasing **frontend skills**, **state management expertise**, and **Next.js features**.

---

⭐ If you like this project, give it a star!

