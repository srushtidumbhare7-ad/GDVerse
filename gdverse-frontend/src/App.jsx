import React, { useState, useEffect } from 'react';
import {
  LandingPage,
  Auth,
  Dashboard,
  TopicLibrary,
  CreateRoom,
  JoinRoom,
  LiveRoom,
  AiFeedbackPage,
  PerformanceHistory,
  Leaderboard,
  PracticeMode,
  Profile,
  Settings,
  AdminDashboard
} from './views.jsx';

export default function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [savedTopics, setSavedTopics] = useState([1, 3]);
  const [customTopics, setCustomTopics] = useState([]);
  const [liveRooms, setLiveRooms] = useState([
    { id: 101, topic: 'Is cryptocurrency a viable alternative to fiat cash?', duration: '15 mins', participants: 5, maxParticipants: 6, aiModerator: 'Active', isPublic: 'Public' },
    { id: 102, topic: 'Impact of social media on teenage mental health', duration: '20 mins', participants: 3, maxParticipants: 8, aiModerator: 'Active', isPublic: 'Public' }
  ]);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Vikram Mehta invited you to GD Room #401', time: '5m ago' },
    { id: 2, text: 'Your speech report on EV Viability is ready', time: '1h ago' }
  ]);
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync Dark/Light Mode with HTML body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }
  }, [isDarkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setProfileDropdownOpen(false);
  };

  const toggleSaveTopic = (id) => {
    if (savedTopics.includes(id)) {
      setSavedTopics(savedTopics.filter(t => t !== id));
    } else {
      setSavedTopics([...savedTopics, id]);
    }
  };

  const addCustomTopic = (topicObj) => {
    setCustomTopics([...customTopics, topicObj]);
  };

  const addLiveRoom = (roomObj) => {
    setLiveRooms([roomObj, ...liveRooms]);
  };

  // Sidebar link items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
    { id: 'practice', label: 'Practice Mode', icon: 'fa-graduation-cap' },
    { id: 'topic_library', label: 'GD Topic Library', icon: 'fa-book-open' },
    { id: 'create_room', label: 'Start Discussion', icon: 'fa-circle-plus' },
    { id: 'join_room', label: 'Join Discussion', icon: 'fa-arrow-right-to-bracket' },
    { id: 'ai_feedback', label: 'AI Feedback', icon: 'fa-chart-pie' },
    { id: 'history', label: 'History & Reports', icon: 'fa-history' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'fa-medal' },
    { id: 'profile', label: 'Speaker Profile', icon: 'fa-circle-user' },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders' }
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR - Shown only when logged in */}
      {user && (
        <aside className="sidebar">
          <div className="sidebar-logo">
            <i className="fa-solid fa-microphone-lines"></i>
            <span>GDVerse</span>
          </div>
          <ul className="sidebar-menu">
            {menuItems.map(item => (
              <li key={item.id} className="sidebar-item">
                <a
                  className={`sidebar-link ${view === item.id ? 'active' : ''}`}
                  onClick={() => setView(item.id)}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            
            {/* Admin Bypass tab link */}
            <li className="sidebar-divider"></li>
            <li className="sidebar-item">
              <a className={`sidebar-link ${view === 'admin' ? 'active' : ''}`} onClick={() => setView('admin')}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <span>Admin Console</span>
              </a>
            </li>

            <li className="sidebar-item" style={{ marginTop: '20px' }}>
              <a className="sidebar-link" onClick={handleLogout} style={{ color: '#ef4444' }}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </aside>
      )}

      {/* MAIN VIEW AREA CONTAINER */}
      <div className="main-content">
        {/* TOP HEADER */}
        <header className="header">
          {/* Logo/Brand trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setView('landing')}>
                <i className="fa-solid fa-microphone-lines" style={{ fontSize: '20px', color: 'var(--primary-color)' }}></i>
                <span style={{ fontSize: '20px', fontFamily: 'Outfit', fontWeight: '800' }}>GDVerse</span>
              </div>
            )}
            {user && (
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Practice. Discuss. Improve.
              </span>
            )}
          </div>

          {/* Search/Actions Bar */}
          <div className="header-actions">
            {/* Search query box (Only when logged in) */}
            {user && (
              <div className="header-search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search rooms, files, peers..." />
              </div>
            )}

            {/* Dark Mode toggle button */}
            <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              <i className={isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>

            {/* Notifications and Profile triggers (Only logged in) */}
            {user ? (
              <>
                {/* Notification Dropdown Container */}
                <div style={{ position: 'relative' }}>
                  <button className="notification-trigger" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileDropdownOpen(false); }}>
                    <i className="fa-regular fa-bell"></i>
                    {notifications.length > 0 && <span className="notification-badge"></span>}
                  </button>

                  <div className={`notifications-panel ${notificationsOpen ? 'open' : ''}`}>
                    <div className="notifications-header">
                      <span>Notifications</span>
                      <a href="#" style={{ fontSize: '11px', color: 'var(--primary-color)' }} onClick={(e) => { e.preventDefault(); setNotifications([]); }}>Clear All</a>
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>No new updates</p>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className="notification-item">
                          <div>
                            <p style={{ margin: 0 }}>{notif.text}</p>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{notif.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Profile menu dropdown */}
                <div className="profile-dropdown-container">
                  <div className="profile-trigger" onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setNotificationsOpen(false); }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', color: 'var(--text-muted)' }}></i>
                  </div>

                  <div className={`profile-dropdown ${profileDropdownOpen ? 'open' : ''}`}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-color)', fontSize: '13px' }}>
                      <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name || 'User'}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                    </div>
                    <div className="dropdown-item" onClick={() => { setView('profile'); setProfileDropdownOpen(false); }}>
                      <i className="fa-solid fa-circle-user"></i> My Profile
                    </div>
                    <div className="dropdown-item" onClick={() => { setView('settings'); setProfileDropdownOpen(false); }}>
                      <i className="fa-solid fa-sliders"></i> Settings
                    </div>
                    <div className="dropdown-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                      <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Navigation buttons for guests on landing page
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }} onClick={() => setView('login')}>
                  Sign In
                </button>
                <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }} onClick={() => setView('register')}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </header>

        {/* DYNAMIC SUBVIEWS ROUTER */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {view === 'landing' && <LandingPage setView={setView} />}
          {(view === 'login' || view === 'register') && <Auth view={view} setView={setView} onLogin={handleLogin} />}
          {view === 'dashboard' && <Dashboard setView={setView} savedTopics={savedTopics} />}
          {view === 'topic_library' && <TopicLibrary savedTopics={savedTopics} toggleSaveTopic={toggleSaveTopic} customTopics={customTopics} setView={setView} />}
          {view === 'create_room' && <CreateRoom setView={setView} addLiveRoom={addLiveRoom} />}
          {view === 'join_room' && <JoinRoom liveRooms={liveRooms} setView={setView} />}
          {view === 'live_room' && <LiveRoom setView={setView} />}
          {view === 'ai_feedback' && <AiFeedbackPage />}
          {view === 'history' && <PerformanceHistory />}
          {view === 'leaderboard' && <Leaderboard />}
          {view === 'practice' && <PracticeMode />}
          {view === 'profile' && <Profile />}
          {view === 'settings' && <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          {view === 'admin' && <AdminDashboard onAddTopic={addCustomTopic} />}
        </div>
      </div>
    </div>
  );
}
