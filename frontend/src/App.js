import logo from './logo.svg';
import './App.css';
import FeedBackForm from './components/feed-back-form/feed-back-form';
import TripleTapComponent from './components/triple-tap-component/triple-tap.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerFeedbacks from './components/customer-feefbacks-component/customer-feedback.component';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FeedBackForm />} />
          <Route path='/customerFeedbacks' element={<CustomerFeedbacks />} />
        </Routes>

      </Router>
    </div>


  );
}

export default App;
