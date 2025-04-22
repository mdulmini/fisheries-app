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
import OrderManagementPage from './pages/OrderManagementPage';
import SalesAnalyticsPage from './pages/SalesAnalyticsPage';
import SalesReportsPage from './pages/SalesReportsPage';
import TraceabilityCompliancePage from './pages/TraceabilityCompliancePage';
import SettingsPage from './pages/SettingsPage';
import BuyerHomePage from './pages/BuyerHomePage';
import BuyerProductsPage from './pages/BuyerProductsPage'; 
import BuyerOrdersPage from './pages/BuyerOrdersPage'; 
import BuyerProfilePage from './pages/BuyerProfilePage';
import BuyerCartPage from './pages/BuyerCartPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import HelpPage from './pages/HelpPage';
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
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="/analytics" element={<SalesAnalyticsPage />} />
        <Route path="/sales-reports" element={<SalesReportsPage />} />
        <Route path="/compliance" element={<TraceabilityCompliancePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/buyer-home" element={<BuyerHomePage />} />
        <Route path="/buyer-products" element={<BuyerProductsPage />} /> 
        <Route path="/buyer-orders" element={<BuyerOrdersPage />} />
        <Route path="/buyer-profile" element={<BuyerProfilePage />}/>
        <Route path="/buyer-cart" element={<BuyerCartPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;

