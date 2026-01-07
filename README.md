## Student Rescheduling System

## Overview
This is a full-stack application designed to be a feature embedded in a Learning Management System (LMS). The dashboard and visual styling are inspired by Contour Education's LMS. This is an independent implementation and recreated based on available UI patterns. Most buttons on the dashboard are for visual purposes only, with the **Reschedule Class** button providing an entry point into the rescheduling feature.

The goal of this project is to develop an intuitive UI for students to temporarily reschedule upcoming classes, and create a robust system to track class capacity, availabilities, and schedules. For larger organisations with a growing number of enrolled students, the volume of reschedule requests also grows, placing higher loads on service staff, especially if these requests are handled over text, phone, or emails from students and parents. This leads to possible errors including overbooking, schedule conflicts or incorrect attendance records. Regarding student experience, there may be inconsistent communication with service staff, or lack of visibility with the status of the requests.

This feature is designed to centralise reschedule requests into one system, reducing service load and errors, and providing accurate data on class capacity and availabilities to students, parents and staff. 


## Tech Stack
- **React** with client and server components
- **Next.js** with App Router pattern
- **Typescript** for type safety
- **Tailwind CSS** and **Framer Motion** for styling and animations
- **Supabase** for database and authentication

## Installation
1. **Clone and install dependencies**
    ```
    git clone https://github.com/qncubed3/student-reschedule.git
    cd student-reschedule
    npm install
    ```
2. **Set up supabase**
   
   Create a new supabase project.

3. **Environment variables**
   
   Create a new .local.env file with the following variables. Replace `your_url` and `your_key` with the url and key of your supabase project.
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key
    ```
4. **Run the development server**
    ```
    npm run dev
    ```
5. **Open the application**
   
   In a web browser, enter the link [http://localhost:3000](http://localhost:3000).

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
