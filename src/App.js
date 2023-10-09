import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/Home.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      {/* We set initialIsOpen to false as we dont want devtools to open by default */}
    </QueryClientProvider>
  )
}

export default App;