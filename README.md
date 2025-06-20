# 🎬 Movie Finder App

A modern React-based movie discovery application that helps users find their favorite movies with powerful search functionality and trending movie recommendations.

---

## ✨ Features

- **Movie Search:** Advanced search functionality with real-time results using TMDB API
- **Trending Movies:** Display popular and trending movies
- **Responsive Design:** Mobile-first design built with Tailwind CSS
- **Search Analytics:** Track search queries using Appwrite backend
- **URL-Safe Search:** Implemented proper search encoding using `encodeURIComponent` for better search accuracy
- **Debounced Search:** Optimized search performance with 500ms debounce delay

---

## 🚀 Live Demo

Visit the live application: [https://dilmith.site/movie-app/](https://dilmith.site/movie-app/)

---

## 🛠️ Built With

- **Frontend:** React 19.1.0
- **Styling:** Tailwind CSS 4.1.10
- **Build Tool:** Vite 6.3.5
- **Movie Data:** The Movie Database (TMDB) API
- **Backend:** Appwrite for database operations
- **Utilities:** react-use for hooks and debouncing
- **Language:** JavaScript (ES6+)

---

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite project setup

---

## ⚙️ Installation

1. **Clone the repository**
   git clone https://github.com/dilmithp/react-demo-movieApp.git
   cd react-demo-movieApp



2. **Install dependencies**
   npm install



3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id



4. **Start the development server**
   npm run dev



5. **Build for production**
   npm run build



---

## 🔧 Configuration

### TMDB API Setup
1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add your API key to the `.env` file

### Appwrite Backend Setup
1. Set up an Appwrite project
2. Configure database collections for search analytics
3. Add your Appwrite credentials to the `.env` file

---

## 🎯 Key Implementation Details

### Advanced Search Functionality
The app implements robust search using `encodeURIComponent` to handle special characters and ensure accurate API requests:

const endpoint = query ?
${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)} :
${API_BASE_URL}/discover/movie?sort_by=popularity.desc;



### Debounced Search
Optimized user experience with debounced search to reduce API calls:

useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);



### Search Analytics
Track popular searches using Appwrite backend for data insights and user behavior analysis.

---

## 📁 Project Structure

src/
├── components/
│ ├── Search.jsx # Search input component
│ ├── Spinner.jsx # Loading spinner
│ └── MovieCard.jsx # Movie display card
├── appwrite.js # Appwrite configuration
├── App.jsx # Main application component
└── main.jsx # Application entry point



---

## 🌟 Features in Detail

- **Real-time Search:** Instant movie search with debounced input
- **Trending Section:** Display popular movies from TMDB
- **Error Handling:** Comprehensive error handling for API failures
- **Loading States:** Smooth loading indicators during data fetching
- **Responsive Design:** Works seamlessly across all device sizes
- **Search History:** Backend integration to track and analyze search patterns

---

## 🚀 Deployment

This application is deployed on cPanel hosting with subdirectory configuration:

1. Build the project: `npm run build`
2. Upload `dist` folder contents to `/movie-app/` directory
3. Configure `.htaccess` for React Router support

Example `.htaccess` for subdirectory routing:

RewriteEngine On
RewriteBase /movie-app/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /movie-app/index.html [L]



---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

**Author:** Dilmith Pathirana  
**GitHub:** [github.com/dilmithp](https://github.com/dilmithp)

Project Link: [https://dilmith.site/movie-app/](https://dilmith.site/movie-app/)

---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [React](https://reactjs.org/) for the frontend framework