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
  
  const [selectedTopic, setSelectedTopic] = useState({
    id: 1,
    name: 'Impact of AI & Tech Automation on General Labor Roles',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    duration: '15 mins',
    participants: 6
  });

  const [userData, setUserData] = useState(null);

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

  // Load and cache user-specific metrics, suggestions, and history logs
  useEffect(() => {
    if (user && user.email) {
      const key = `gdverse_user_${user.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        setUserData(JSON.parse(stored));
      } else {
        const hash = Array.from(user.email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const scoreSeed = (hash % 12) + 80; // 80 - 91
        const initialData = {
          profile: {
            name: user.name || user.email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            college: user.college || (user.email.endsWith('.edu') ? 'Vellore Institute of Technology' : 'National Institute of Technology'),
            email: user.email,
            bio: user.bio || 'Passionate student targeting software engineering and consulting roles. Actively training on placement interview parameters.',
            skills: user.skills || 'Java, React, SQL, Logic structures'
          },
          metrics: {
            overall: scoreSeed,
            grammar: (hash % 10) + 85,
            confidence: (hash % 8) + 82,
            relevance: (hash % 6) + 90,
            vocabulary: (hash % 14) + 72
          },
          history: [
            { date: '2026-07-14', topic: 'Will Generative AI destroy software engineering jobs?', duration: '20m', participants: 6, score: scoreSeed - 2, badge: 'Rising Speaker' },
            { date: '2026-07-10', topic: 'Impact of social media on teenage mental health', duration: '15m', participants: 5, score: scoreSeed - 5, badge: 'Consistent Performer' },
            { date: '2026-07-05', topic: 'The viability of electric vehicles in developing nations', duration: '12m', participants: 8, score: scoreSeed + 3, badge: 'Excellent Communicator' }
          ],
          recommendations: [
            `Decrease frequency of filler words (e.g. "uhm", "basically", "actually") by pausing 1-2 seconds.`,
            `Your topic relevance remains high (${(hash % 6) + 90}%). Keep mapping arguments to structural framework models (PESTLE).`,
            `Enhance vocabulary strength. Substitute standard words with synonyms like "systemic change" or "pivotal shift".`
          ]
        };
        localStorage.setItem(key, JSON.stringify(initialData));
        setUserData(initialData);
      }
    } else {
      setUserData(null);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setProfileDropdownOpen(false);
  };

  const handleUpdateProfile = (updatedProfile) => {
    const updatedData = { ...userData, profile: updatedProfile };
    setUserData(updatedData);
    if (user && user.email) {
      localStorage.setItem(`gdverse_user_${user.email}`, JSON.stringify(updatedData));
    }
  };

  const handleAddHistory = (sessionSummary) => {
    if (!userData) return;
    const newHistory = [sessionSummary, ...userData.history];
    const updatedData = { ...userData, history: newHistory };
    setUserData(updatedData);
    if (user && user.email) {
      localStorage.setItem(`gdverse_user_${user.email}`, JSON.stringify(updatedData));
    }
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
          {view === 'dashboard' && <Dashboard setView={setView} savedTopics={savedTopics} userData={userData} setSelectedTopic={setSelectedTopic} />}
          {view === 'topic_library' && <TopicLibrary savedTopics={savedTopics} toggleSaveTopic={toggleSaveTopic} customTopics={customTopics} setView={setView} setSelectedTopic={setSelectedTopic} />}
          {view === 'create_room' && <CreateRoom setView={setView} addLiveRoom={addLiveRoom} setSelectedTopic={setSelectedTopic} />}
          {view === 'join_room' && <JoinRoom liveRooms={liveRooms} setView={setView} setSelectedTopic={setSelectedTopic} />}
          {view === 'live_room' && <LiveRoom setView={setView} topic={selectedTopic} onAddHistory={handleAddHistory} />}
          {view === 'ai_feedback' && <AiFeedbackPage history={userData ? userData.history[0] : null} />}
          {view === 'history' && <PerformanceHistory userData={userData} />}
          {view === 'leaderboard' && <Leaderboard />}
          {view === 'practice' && <PracticeMode topic={selectedTopic} setSelectedTopic={setSelectedTopic} />}
          {view === 'profile' && <Profile userData={userData} onUpdateProfile={handleUpdateProfile} />}
          {view === 'settings' && <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
          {view === 'admin' && <AdminDashboard onAddTopic={addCustomTopic} />}
        </div>
      </div>
    </div>
  );
}
