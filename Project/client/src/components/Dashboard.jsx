'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { campaignService } from '../services/campaignService';
import CampaignList from './CampaignList';
import CreateCampaign from './CreateCampaign';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = authService.getUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        setUser(currentUser);

        const campaignsData = await campaignService.getAllCampaigns();
        setCampaigns(campaignsData);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleCampaignCreated = async (newCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
    setShowCreateForm(false);
  };

  const handleCampaignUpdated = async (updatedCampaign) => {
    setCampaigns(campaigns.map((c) => (c._id === updatedCampaign._id ? updatedCampaign : c)));
  };

  const handleCampaignDeleted = async (campaignId) => {
    setCampaigns(campaigns.filter((c) => c._id !== campaignId));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>SMS Campaign Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          {error && <div className="error-message">{error}</div>}

          <div className="campaigns-section">
            <div className="section-header">
              <h2>Campaigns</h2>
              <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn-primary">
                {showCreateForm ? 'Cancel' : 'New Campaign'}
              </button>
            </div>

            {showCreateForm && (
              <CreateCampaign
                onCampaignCreated={handleCampaignCreated}
                onCancel={() => setShowCreateForm(false)}
              />
            )}

            <CampaignList
              campaigns={campaigns}
              onCampaignUpdated={handleCampaignUpdated}
              onCampaignDeleted={handleCampaignDeleted}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
