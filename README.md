# StudyMate — Collaborative Learning Platform

Live site (client): https://studymate-b37fa.web.app/  
API / Server (deployed): https://study-mate-server-kvw8.onrender.com/

A modern, student-first web app that helps learners find resources, organize study sessions, and track progress. StudyMate is built for collaboration and ease of use — whether you're studying alone or with peers.

## Key features
- Real-time collaboration: create and join study groups, share notes and resources instantly.
- Personalized dashboards: track courses, upcoming tasks, and learning progress at a glance.
- Resource library: save, tag, and search learning materials (notes, links, PDFs).
- Progress tracking & analytics: monitor study time, completion rates, and strengths/weaknesses.
- Secure authentication: user accounts with role-aware access for students and instructors.
- Responsive design: works seamlessly on desktop, tablet, and mobile devices.
- Easy sharing & invite flows: invite peers to sessions or share saved resources with a link.

## Tech stack (deployed)
- Frontend: React (deployed to Firebase Hosting — live site URL above)
- Backend: Node / Express (deployed to Render — server URL above)
- Database & Auth: configured per-project (Firebase / Mongo / PostgreSQL depending on environment)
- Styling & utilities: modern CSS frameworks and build tooling

## Quick start (developer)
1. Clone the repository
   - git clone <repo-url>
2. Client
   - cd client
   - cp .env.example .env
   - Update environment variables (e.g. REACT_APP_API_BASE_URL) to point to: `https://study-mate-server-kvw8.onrender.com/`
   - npm install
   - npm start
3. Server
   - cd server
   - cp .env.example .env
   - Set server-specific environment variables (database URI, auth secrets)
   - npm install
   - npm run dev

Note: Replace .env values with your local or staging credentials. The live client is already configured to use the deployed server above.

## Deployment
- Frontend: build and deploy to Firebase Hosting (or your preferred static host).
- Backend: deploy to Render (or your preferred Node host) with proper environment configuration.
- Ensure CORS and environment variables are set so the client can communicate with the API endpoint.

## Contributing
Contributions are welcome. Please:
- Open an issue to discuss significant changes or feature requests.
- Fork the repo, create a feature branch, and submit a PR with a clear description and tests where applicable.
- Follow the repository's coding style and include documentation for new features.

## License
Specify your license here (e.g., MIT). Update LICENSE file in the repository accordingly.

## Contact
Project maintainer / Contact: nokib-web

Changelog:
- Updated client live site URL to: https://studymate-b37fa.web.app/
- Backend API available at: https://study-mate-server-kvw8.onrender.com/