/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-success" element={<VerifySuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </Router>
   
  );
}

export default App;*/



/*import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';
import InventoryManagementPage from './pages/InventoryManagementPage'; 
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import MarketPriceTrackingPage from './pages/MarketPriceTrackingPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/verify-success" element={<VerifySuccessPage />} />
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/inventory" element={<InventoryManagementPage />}/>
          <Route path="/market-price" element={<MarketPriceTrackingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />}/>
        </Routes>
      </Router>
   
  );
}

export default App;*/


/*import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import ReportsPage from './pages/ReportsPage';
import MarketPriceTrackingPage from './pages/MarketPriceTrackingPage';
import BuyerSellerMatchingPage from './pages/BuyerSellerMatchingPage'; 


function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-success" element={<VerifySuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryManagementPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/market-prices" element={<MarketPriceTrackingPage />} />
        <Route path="/buyers" element={<BuyerSellerMatchingPage />} />
      </Routes>
    </Router>
   
  );
}

export default App;*/




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import ReportsPage from './pages/ReportsPage';
import MarketPriceTrackingPage from './pages/MarketPriceTrackingPage';
import BuyerSellerMatchingPage from './pages/BuyerSellerMatchingPage';
import MatchConfirmationPage from './pages/MatchConfirmationPage';
import ChatPage from './pages/ChatPage';
import PreferencesPage from './pages/PreferencesPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-success" element={<VerifySuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryManagementPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/market-prices" element={<MarketPriceTrackingPage />} />
        <Route path="/buyers" element={<BuyerSellerMatchingPage />} />
        <Route path="/match-confirmation" element={<MatchConfirmationPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

