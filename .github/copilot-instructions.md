# KrishiSetu AI Agent Instructions

## Project Overview
KrishiSetu is a comprehensive agricultural platform with a React frontend and Express.js backend. The platform connects farmers, buyers, and agricultural service providers while providing crucial information about farming technologies, market trends, and weather conditions.

## Architecture

### Backend (`/backend`)
- Express.js server with MongoDB database
- RESTful API structure with modular routes in `/routes`
- Domain models defined in `/models`
- Environment variables via `.env` (required: `MONGODB_URI`, `PORT`)

### Frontend (`/frontend`)
- React application with React Router for navigation
- i18n internationalization support
- Component-based architecture in `/src/components`
- Page components in `/src/pages`

## Key Development Patterns

### API Routes
- All routes are prefixed with `/api/`
- Route modules follow the pattern: `routes/<domain>.js`
- Example route structure:
```javascript
// routes/buyer.js
router.get('/', getAllBuyers);
router.post('/', createBuyer);
router.get('/:id', getBuyerById);
```

### Models
- Mongoose schemas in `/backend/models`
- Follow singular naming convention (e.g., `Buyer.js`, not `Buyers.js`)
- Include timestamps by default

### Frontend Pages
- Each feature has its own page component in `/frontend/src/pages`
- CSS modules pattern: `<Component>.css` alongside `<Component>.js`
- i18n translations used for all user-facing text

## Development Workflow

### Setup
1. Backend:
```bash
cd backend
npm install
npm run dev  # Starts server with nodemon
```

2. Frontend:
```bash
cd frontend
npm install
npm start    # Runs on port 3000
```

### Environment Configuration
Required `.env` variables in backend:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (defaults to 5001)

## Common Tasks

### Adding a New Feature
1. Create model in `/backend/models`
2. Add routes in `/backend/routes`
3. Create page component in `/frontend/src/pages`
4. Add route to React Router in `App.js`
5. Update API integration in frontend

### Database Operations
- All MongoDB operations go through Mongoose models
- Use async/await pattern for database operations
- Always include error handling for database operations

## Integration Points
- Frontend communicates with backend via Axios HTTP client
- API base URL should match backend port (default: `http://localhost:5001`)
- Cross-origin requests handled by CORS middleware

## Go-Live Checklist
Before deploying to production, ensure:

### Backend
- [ ] MongoDB connection string updated for production database
- [ ] Environment variables configured (MONGODB_URI, PORT, etc.)
- [ ] CORS origins configured for production domain
- [ ] All API endpoints tested and returning data
- [ ] Error handling implemented for all routes
- [ ] Database indexes optimized for performance
- [ ] File upload limits configured appropriately

### Frontend
- [ ] Build process optimized (`npm run build`)
- [ ] API base URL updated for production backend
- [ ] All routes properly configured in React Router
- [ ] i18n translations complete for all languages
- [ ] Responsive design tested across devices
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Browser compatibility verified

### Deployment
- [ ] Backend deployed to production server (Heroku, AWS, etc.)
- [ ] Frontend deployed to static hosting (Netlify, Vercel, etc.)
- [ ] Domain configured and SSL certificates installed
- [ ] Environment variables set in production
- [ ] Database backup and migration scripts ready
- [ ] Monitoring and logging configured

### Testing
- [ ] End-to-end testing completed
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified
- [ ] API integration tested in production environment
- [ ] Performance benchmarks met

Remember to maintain consistent error handling patterns and follow the established module structure when adding new features.
