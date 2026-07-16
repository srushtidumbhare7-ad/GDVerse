import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';

// ==========================================
// LANDING PAGE VIEW
// ==========================================
export function LandingPage({ setView }) {
  const [faqOpen, setFaqOpen] = useState({});
  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="badge badge-ai" style={{ marginBottom: '16px', fontSize: '12px', padding: '6px 14px' }}>
          <i className="fa-solid fa-sparkles"></i> AI-Powered Mock GD Platform
        </div>
        <h1 className="landing-title">Practice. Discuss. Improve.</h1>
        <p className="landing-subtitle">
          GDVerse is the ultimate simulated space where students practice mock group discussions, receive instant AI-driven analytics, and master communication skills.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={() => setView('register')}>
            Get Started Free <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button className="btn btn-secondary" onClick={() => setView('login')}>
            Login <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </div>
        
        {/* Mock Graphic Container */}
        <div className="card-glass" style={{ width: '80%', maxHeight: '400px', marginTop: '60px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GDVerse Virtual Room Simulator</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', height: '160px' }}>
            {['AI Moderator', 'Sarah (Speaker)', 'Vikram', 'Priya'].map((name, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-app)', border: idx === 1 ? '2px solid #22c55e' : '1px solid var(--border-color)', borderRadius: '12px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                  {name[0]}
                </div>
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '10px' }}>
                  {name}
                </div>
                {idx === 1 && (
                  <span style={{ position: 'absolute', top: '8px', right: '8px', color: '#22c55e', fontSize: '10px' }}>
                    <i className="fa-solid fa-volume-high"></i>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ padding: '60px 32px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { label: 'Total Discussions Run', val: '24,000+' },
            { label: 'Students Trained', val: '12,500+' },
            { label: 'AI Reports Generated', val: '50,000+' },
            { label: 'Avg Skill Score Lift', val: '38%' }
          ].map((stat, idx) => (
            <div key={idx} className="card-glass">
              <h2 style={{ fontSize: '36px', color: 'var(--primary-color)', fontFamily: 'Outfit' }}>{stat.val}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features List */}
      <section style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', fontFamily: 'Outfit' }}>Powerful Features Designed to Excel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { icon: 'fa-robot', title: 'AI Moderator Panel', desc: 'A real-time feedback assistant monitoring talk-ratios, vocabulary density, grammar flags, and speaking confidence.' },
            { icon: 'fa-video', title: 'WebRTC Room Architecture', desc: 'Lag-free interactive group audio and video with screensharing, speak queues, live polls, and reactions.' },
            { icon: 'fa-graduation-cap', title: 'Practice Mode Sandbox', desc: 'Hone your arguments solo against the AI evaluator, receiving instant grading before joining team discussions.' },
            { icon: 'fa-chart-pie', title: 'Interactive Analytics', desc: 'Track performance trends, vocabulary growth grids, strengths-weaknesses cards, and weekly scores.' },
            { icon: 'fa-medal', title: 'Certification & Achievements', desc: 'Earn badges and certificates signed by AI evaluators to showcase on LinkedIn or in placements.' },
            { icon: 'fa-calendar-days', title: 'Topic Library & Schedules', desc: 'Choose from 12+ categories. Book a room, invite friends, or use the AI to generate custom topics.' }
          ].map((feat, idx) => (
            <div key={idx} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontSize: '20px' }}>
                <i className={`fa-solid ${feat.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '18px' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '60px', fontFamily: 'Outfit' }}>How GDVerse Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
            {[
              { num: '01', title: 'Configure or Join a Room', desc: 'Select a trending topic in current affairs, IT, or startups. Create a private classroom session or join an active matching group.' },
              { num: '02', title: 'Participate under AI Surveillance', desc: 'State your points logically. Raise your hand to enter speaking slots. Watch live moderator cues tracking your pacing and confidence.' },
              { num: '03', title: 'Receive Granular Analytics', desc: 'Gain detailed metrics covering vocabulary accuracy, topic relevance percentages, grammar fixes, and weekly improvement graphs.' }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '24px' }}>
                <div style={{ fontSize: '48px', fontWeight: '800', color: 'var(--primary-color)', fontFamily: 'Outfit', opacity: '0.6' }}>{step.num}</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', fontFamily: 'Outfit' }}>Loved by Speakers & Students</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { name: 'Aditya Sen', role: 'Placed at Deloitte', quote: 'The speaking queue and live confidence metrics helped me overcome my stammering during placements. GDVerse AI feedback is incredibly fast!' },
            { name: 'Megha Sharma', role: 'MBA Student', quote: 'Our study group uses private GD rooms weekly. The custom dashboards are awesome, and the dark theme is beautiful.' },
            { name: 'John Doe', role: 'Engineering Lead', quote: 'I recommend the single-user practice mode to students before job recruitment drives. It sets a very professional testing sandbox.' }
          ].map((test, idx) => (
            <div key={idx} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
              <p style={{ fontStyle: 'italic', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>"{test.quote}"</p>
              <div>
                <h4 style={{ fontSize: '15px' }}>{test.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--primary-color)' }}>{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ accordion */}
      <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', fontFamily: 'Outfit' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'Is the AI feedback based on voice or speech text?', a: 'GDVerse analyzes both! It transcribes audio feeds using local speech APIs, mapping word frequency, grammar, and relevance, and monitors audio pitch levels to gauge speaking confidence.' },
              { q: 'Can I invite classmates to custom rooms?', a: 'Yes! You can create private rooms, configure access passwords, and share the invitation link or password code directly.' },
              { q: 'How does the single-user Practice Mode work?', a: 'In Practice Mode, the AI acts as a chat moderator asking sequential questions. You type or dictate your responses, and the AI evaluates each response instantly.' },
              { q: 'Is there a limit to how many mock GDs I can take?', a: 'The free account covers up to 10 discussions a month. Premium tiers unlock unrestricted mock discussions, detailed summaries, and certified reports.' }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item card-glass ${faqOpen[idx] ? 'open' : ''}`} onClick={() => toggleFaq(idx)} style={{ cursor: 'pointer' }}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${faqOpen[idx] ? 'fa-minus' : 'fa-plus'}`} style={{ color: 'var(--primary-color)' }}></i>
                </div>
                <div className="faq-answer">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Contact Support</a>
        </div>
        <p>© 2026 GDVerse Platform. Practice. Discuss. Improve. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ==========================================
// AUTHENTICATION VIEW
// ==========================================
export function Auth({ view, setView, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '', name: '', confirm: '', otp: '' });
  const [authStep, setAuthStep] = useState(view); // login, register, forgot, reset, verify

  useEffect(() => {
    setAuthStep(view);
  }, [view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authStep === 'login') {
      try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('gdverse_token', data.token);
          onLogin({ 
            email: data.email, 
            name: data.name || data.email.split('@')[0],
            college: data.college,
            bio: data.bio,
            skills: data.skills,
            overallScore: data.overallScore
          });
          return;
        } else {
          const errorMsg = await res.text();
          alert(errorMsg || "Login failed! Please check credentials.");
          return;
        }
      } catch (err) {
        console.warn("Backend auth API down. Falling back to local offline login:", err);
      }
      onLogin({ email: form.email, name: form.email.split('@')[0] });
    } else if (authStep === 'register') {
      try {
        const res = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
        });
        if (res.ok) {
          setAuthStep('verify');
          return;
        } else {
          const errorMsg = await res.text();
          alert(errorMsg || "Registration failed!");
          return;
        }
      } catch (err) {
        console.warn("Backend auth API down. Falling back to local register:", err);
      }
      setAuthStep('verify');
    } else if (authStep === 'verify') {
      try {
        const res = await fetch('http://localhost:8080/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp: form.otp })
        });
        if (res.ok) {
          onLogin({ email: form.email, name: form.name || 'Speaker' });
          return;
        } else {
          alert("Invalid OTP code!");
          return;
        }
      } catch (err) {
        console.warn("Backend verify API down. Falling back to local verification:", err);
      }
      onLogin({ email: form.email, name: form.name || 'Speaker' });
    } else if (authStep === 'forgot') {
      setAuthStep('reset');
    } else if (authStep === 'reset') {
      setAuthStep('login');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 'calc(100vh - 70px)', padding: '32px' }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <i className="fa-solid fa-microphone-lines" style={{ color: 'var(--primary-color)' }}></i> GDVerse
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
            {authStep === 'login' && "Welcome back! Access your speaker lounge."}
            {authStep === 'register' && "Create an account to start practicing."}
            {authStep === 'forgot' && "Enter your email to request recovery."}
            {authStep === 'verify' && "Enter OTP verification code sent to email."}
            {authStep === 'reset' && "Setup your new password access."}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {authStep === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" required onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}

          {authStep !== 'verify' && authStep !== 'reset' && (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="name@college.edu" required onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          )}

          {authStep === 'verify' && (
            <div className="form-group">
              <label className="form-label">One-Time Code (OTP)</label>
              <input type="text" className="form-control" placeholder="123456" maxLength={6} required onChange={e => setForm({ ...form, otp: e.target.value })} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Didn't receive code? <a href="#" style={{ color: 'var(--primary-color)' }} onClick={e => e.preventDefault()}>Resend Code</a></span>
            </div>
          )}

          {(authStep === 'login' || authStep === 'register' || authStep === 'reset') && (
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" required onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
          )}

          {authStep === 'reset' && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="••••••••" required onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
          )}

          {authStep === 'login' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: '12px', color: 'var(--primary-color)' }} onClick={(e) => { e.preventDefault(); setAuthStep('forgot'); }}>
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {authStep === 'login' && "Sign In"}
            {authStep === 'register' && "Register Account"}
            {authStep === 'verify' && "Verify & Join"}
            {authStep === 'forgot' && "Send OTP Code"}
            {authStep === 'reset' && "Update Password"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
          {authStep === 'login' && (
            <span>New speaker? <a href="#" style={{ color: 'var(--primary-color)' }} onClick={(e) => { e.preventDefault(); setAuthStep('register'); }}>Create an account</a></span>
          )}
          {(authStep === 'register' || authStep === 'forgot' || authStep === 'verify' || authStep === 'reset') && (
            <span>Already have an account? <a href="#" style={{ color: 'var(--primary-color)' }} onClick={(e) => { e.preventDefault(); setAuthStep('login'); }}>Sign In</a></span>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DASHBOARD VIEW
// ==========================================
export function Dashboard({ setView, savedTopics = [], userData, setSelectedTopic }) {
  const metrics = userData?.metrics || { overall: 82, grammar: 86, confidence: 79, relevance: 92, vocabulary: 74 };
  const recommendations = userData?.recommendations || [
    "Decrease frequency of filler words (e.g. \"uhm\", \"basically\", \"actually\") by pausing 1-2 seconds.",
    "Your topic relevance remains high (92%). Keep mapping arguments to structural framework models (PESTLE).",
    "Enhance vocabulary strength. Substitute standard words with synonyms like \"systemic change\" or \"pivotal shift\"."
  ];
  const name = userData?.profile?.name || 'Speaker';

  return (
    <div className="view-container">
      {/* Top Banner Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Welcome Card */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Welcome back, {name}!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', maxWidth: '400px' }}>
              Your communication score is in the top 15% this week. Keep up the daily practice streaks to hit outstanding level!
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => setView('create_room')}>
              <i className="fa-solid fa-circle-plus"></i> Host GD Room
            </button>
            <button className="btn btn-secondary" onClick={() => setView('join_room')}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Join Live GD
            </button>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
          <div>
            <div className="badge badge-easy" style={{ marginBottom: '8px' }}>Daily Challenge</div>
            <h3 style={{ fontSize: '16px' }}>Can AI replace Human Emotional Intelligence in Customer Support?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Estimated Duration: 15 mins</p>
          </div>
          <button className="btn btn-accent btn-sm" style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '12px' }} onClick={() => { setSelectedTopic({ name: "Can AI replace Human Emotional Intelligence in Customer Support?", category: "Artificial Intelligence", difficulty: "Medium", duration: "15 mins", participants: 6 }); setView('live_room'); }}>
            Accept Challenge
          </button>
        </div>
      </div>

      {/* Mid Metrics Grid */}
      <div className="grid-dashboard">
        {/* Score Radial */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h3 className="card-title"><i className="fa-solid fa-gauge-high"></i> Overall Score</h3>
          <div className="radial-score">
            <svg width="150" height="150" className="radial-score-svg">
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-color)" />
                  <stop offset="100%" stopColor="var(--primary-color)" />
                </linearGradient>
              </defs>
              <circle cx="75" cy="75" r="60" className="radial-score-bg" />
              <circle cx="75" cy="75" r="60" className="radial-score-fill" />
            </svg>
            <div className="radial-score-text">
              <span className="radial-score-num">{metrics.overall}</span>
              <span className="radial-score-lbl">Excellent</span>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>+3.5 points growth since last week</p>
        </div>

        {/* speaking time list */}
        <div className="card-glass span-2">
          <h3 className="card-title"><i className="fa-solid fa-chart-simple"></i> AI Metrics Breakdown</h3>
          <div className="speaking-timeline" style={{ marginTop: '12px' }}>
            {[
              { skill: 'Grammar Accuracy', score: metrics.grammar, color: '#22c55e' },
              { skill: 'Confidence Index', score: metrics.confidence, color: 'var(--primary-color)' },
              { skill: 'Topic Relevance', score: metrics.relevance, color: 'var(--accent-color)' },
              { skill: 'Vocabulary Density', score: metrics.vocabulary, color: '#f59e0b' }
            ].map((metric, idx) => (
              <div key={idx} className="speaking-member">
                <span className="speaking-member-info" style={{ fontSize: '13px', fontWeight: '500' }}>{metric.skill}</span>
                <div className="speaking-progress-container">
                  <div className="speaking-progress-bar" style={{ width: `${metric.score}%`, backgroundColor: metric.color, backgroundImage: 'none' }}></div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{metric.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Dashboard Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
        {/* Recent Performance Log */}
        <div className="card-glass">
          <h3 className="card-title"><i className="fa-solid fa-history"></i> Upcoming Booked GDs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            {[
              { topic: 'Is cryptocurrency a viable alternative to fiat cash?', time: 'Today, 6:00 PM', category: 'Economy' },
              { topic: 'Impact of social media on teenage mental health', time: 'Tomorrow, 3:30 PM', category: 'Social Issues' }
            ].map((gd, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: idx === 0 ? '1px solid var(--border-color)' : 'none', cursor: 'pointer' }} onClick={() => { setSelectedTopic({ name: gd.topic, category: gd.category, difficulty: 'Medium', duration: '15 mins', participants: 6 }); setView('live_room'); }} title="Click to start room">
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{gd.topic}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}><i className="fa-solid fa-clock"></i> {gd.time} (Click to launch)</span>
                </div>
                <span className="badge badge-economy">{gd.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions Box */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="card-title"><i className="fa-solid fa-brain"></i> AI Improvement Recommendations</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              {recommendations.map((rec, idx) => (
                <li key={idx} style={{ fontSize: '13px', display: 'flex', gap: '10px' }}>
                  <i className={idx === 0 ? "fa-solid fa-circle-exclamation" : idx === 1 ? "fa-solid fa-circle-check" : "fa-solid fa-lightbulb"} style={{ color: idx === 0 ? '#f59e0b' : idx === 1 ? '#22c55e' : 'var(--accent-color)', marginTop: '2px' }}></i>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px', alignSelf: 'flex-start' }} onClick={() => setView('ai_feedback')}>
            View Detailed Reports
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// GD TOPIC LIBRARY VIEW
// ==========================================
export function TopicLibrary({ savedTopics, toggleSaveTopic, customTopics, setView, setSelectedTopic }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Technology', 'Artificial Intelligence', 'Current Affairs', 'Business', 'Economy', 'Environment', 'Healthcare', 'Education', 'politics', 'Social Issues'];

  const initialTopics = [
    // 1. Technology (5 Topics)
    { id: 1, name: 'Quantum Computing: Are we ready to secure our encryption grids?', category: 'Technology', difficulty: 'Hard', duration: '25 mins', participants: 6 },
    { id: 2, name: 'Metaverse vs. Real World: The future of remote corporate collaboration', category: 'Technology', difficulty: 'Medium', duration: '15 mins', participants: 7 },
    { id: 3, name: 'The rise of low-code/no-code platforms: Will traditional developers become obsolete?', category: 'Technology', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 4, name: '5G rollout and the digital divide in emerging countries', category: 'Technology', difficulty: 'Medium', duration: '15 mins', participants: 6 },
    { id: 5, name: 'Web3 and Decentralized Finance (DeFi): Democratic utility or financial bubble?', category: 'Technology', difficulty: 'Hard', duration: '20 mins', participants: 6 },

    // 2. Artificial Intelligence (5 Topics)
    { id: 6, name: 'Will Generative AI destroy software engineering jobs?', category: 'Artificial Intelligence', difficulty: 'Hard', duration: '20 mins', participants: 6 },
    { id: 7, name: 'Ethical implications of Deepfakes and AI voice cloning in media', category: 'Artificial Intelligence', difficulty: 'Hard', duration: '25 mins', participants: 6 },
    { id: 8, name: 'AI in healthcare diagnostics: Can algorithms replace professional oncologists?', category: 'Artificial Intelligence', difficulty: 'Hard', duration: '20 mins', participants: 5 },
    { id: 9, name: 'Autonomous weapons and military defense: Should AI control the battlefield?', category: 'Artificial Intelligence', difficulty: 'Hard', duration: '30 mins', participants: 6 },
    { id: 10, name: 'AI Art and copyright laws: Who owns generative imagery?', category: 'Artificial Intelligence', difficulty: 'Easy', duration: '12 mins', participants: 8 },

    // 3. Current Affairs (5 Topics)
    { id: 11, name: 'The economic fallout of global trade routes disruptions in 2026', category: 'Current Affairs', difficulty: 'Medium', duration: '20 mins', participants: 6 },
    { id: 12, name: 'Universal basic income pilots: Success parameters in modern cities', category: 'Current Affairs', difficulty: 'Medium', duration: '15 mins', participants: 8 },
    { id: 13, name: 'Global space race 2.0: Commercial colonization vs. scientific discovery', category: 'Current Affairs', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 14, name: 'The geopolitics of semiconductor chip supply chains', category: 'Current Affairs', difficulty: 'Hard', duration: '25 mins', participants: 6 },
    { id: 15, name: 'Regulation of private space tourism and orbital debris management', category: 'Current Affairs', difficulty: 'Medium', duration: '15 mins', participants: 7 },

    // 4. Business (5 Topics)
    { id: 16, name: 'Work from home vs. Work from office: The hybrid dilemma', category: 'Business', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 17, name: 'The rise of gig economy: Flexi-work freedom or corporate exploitation?', category: 'Business', difficulty: 'Medium', duration: '15 mins', participants: 7 },
    { id: 18, name: 'Corporate Greenwashing: Real sustainability vs. marketing strategies', category: 'Business', difficulty: 'Medium', duration: '15 mins', participants: 6 },
    { id: 19, name: 'Direct-to-consumer (D2C) brands vs. retail giants in e-commerce', category: 'Business', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 20, name: 'The impact of micro-influencers on modern brand marketing budgets', category: 'Business', difficulty: 'Easy', duration: '10 mins', participants: 8 },

    // 5. Economy (5 Topics)
    { id: 21, name: 'Central Bank Digital Currencies (CBDC): Future of money?', category: 'Economy', difficulty: 'Hard', duration: '20 mins', participants: 6 },
    { id: 22, name: 'Is universal basic income a realistic economic solution?', category: 'Economy', difficulty: 'Hard', duration: '25 mins', participants: 5 },
    { id: 23, name: 'Inflation control measures: Interest rate hikes vs. supply side support', category: 'Economy', difficulty: 'Hard', duration: '20 mins', participants: 6 },
    { id: 24, name: 'The decline of global cash transactions and the rise of unified payment grids', category: 'Economy', difficulty: 'Medium', duration: '15 mins', participants: 7 },
    { id: 25, name: 'Microfinance programs: Empowering rural startups or creating debt traps?', category: 'Economy', difficulty: 'Medium', duration: '18 mins', participants: 6 },

    // 6. Environment (5 Topics)
    { id: 26, name: 'The viability of electric vehicles in developing countries', category: 'Environment', difficulty: 'Medium', duration: '15 mins', participants: 5 },
    { id: 27, name: 'Carbon tax vs. Cap-and-trade: Which is more effective to control carbon spikes?', category: 'Environment', difficulty: 'Hard', duration: '22 mins', participants: 6 },
    { id: 28, name: 'Nuclear energy: The ultimate green transition fuel or ecological hazard?', category: 'Environment', difficulty: 'Hard', duration: '20 mins', participants: 6 },
    { id: 29, name: 'Single-use plastics bans: Policy executions and structural alternatives', category: 'Environment', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 30, name: 'Fast fashion vs. circular economy: Driving consumer behavior shifts', category: 'Environment', difficulty: 'Medium', duration: '15 mins', participants: 7 },

    // 7. Healthcare (5 Topics)
    { id: 31, name: 'Will telemedicine replace physical clinical diagnostics in rural zones?', category: 'Healthcare', difficulty: 'Medium', duration: '18 mins', participants: 6 },
    { id: 32, name: 'Mental health apps vs. physical therapy: Efficacy in young adults', category: 'Healthcare', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 33, name: 'Gene editing (CRISPR) in humans: Scientific breakthrough or designer babies?', category: 'Healthcare', difficulty: 'Hard', duration: '30 mins', participants: 6 },
    { id: 34, name: 'Patenting life-saving drugs: Pharmaceutical research incentive vs. global access', category: 'Healthcare', difficulty: 'Hard', duration: '25 mins', participants: 6 },
    { id: 35, name: 'Universal healthcare models: Feasibility challenges in highly populated nations', category: 'Healthcare', difficulty: 'Hard', duration: '20 mins', participants: 6 },

    // 8. Education (5 Topics)
    { id: 36, name: 'Gamification of secondary classrooms: Constructive learning or active distraction?', category: 'Education', difficulty: 'Easy', duration: '10 mins', participants: 8 },
    { id: 37, name: 'Online degrees vs. traditional campus programs: Impact on recruitment choices', category: 'Education', difficulty: 'Medium', duration: '15 mins', participants: 7 },
    { id: 38, name: 'Should coding be mandatory in primary school curricula?', category: 'Education', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 39, name: 'Standardized tests vs. project-based evaluations in higher education', category: 'Education', difficulty: 'Easy', duration: '10 mins', participants: 8 },
    { id: 40, name: 'The rise of educational technology (EdTech) and its impact on the digital divide', category: 'Education', difficulty: 'Medium', duration: '15 mins', participants: 6 },

    // 9. Politics (5 Topics)
    { id: 41, name: 'Are online e-voting standards secure enough for national democratic systems?', category: 'politics', difficulty: 'Hard', duration: '30 mins', participants: 6 },
    { id: 42, name: 'Social media regulation: Content moderation vs. free speech rights', category: 'politics', difficulty: 'Hard', duration: '20 mins', participants: 7 },
    { id: 43, name: 'Coalition governments: Stability parameters vs. democratic representation', category: 'politics', difficulty: 'Medium', duration: '15 mins', participants: 8 },
    { id: 44, name: 'The influence of political lobbying on environmental policy updates', category: 'politics', difficulty: 'Hard', duration: '22 mins', participants: 6 },
    { id: 45, name: 'Rise of nationalism vs. global integration in regional trade deals', category: 'politics', difficulty: 'Medium', duration: '18 mins', participants: 6 },

    // 10. Social Issues (5 Topics)
    { id: 46, name: 'Impact of cancel culture on corporate diversity and freedom of voice', category: 'Social Issues', difficulty: 'Medium', duration: '15 mins', participants: 7 },
    { id: 47, name: 'The gender pay gap: Structural biases vs. career choice choices', category: 'Social Issues', difficulty: 'Medium', duration: '15 mins', participants: 8 },
    { id: 48, name: 'Immigration policies and cultural integration parameters in metropolitan hubs', category: 'Social Issues', duration: '20 mins', participants: 6, difficulty: 'Medium' },
    { id: 49, name: 'Depicting crime in digital media: Public awareness tool or glorification?', category: 'Social Issues', difficulty: 'Easy', duration: '12 mins', participants: 8 },
    { id: 50, name: 'Aging populations and demographic shifts: Challenges for welfare pensions', category: 'Social Issues', difficulty: 'Hard', duration: '22 mins', participants: 6 }
  ];

  const allTopics = [...initialTopics, ...customTopics];

  const filteredTopics = allTopics.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDiff = selectedDifficulty === 'All' || t.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="view-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>GD Topic Library</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Search and prepare key debate points on modern issues.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setView('admin')}>
          <i className="fa-solid fa-plus"></i> Generate Topic (AI)
        </button>
      </div>

      {/* Filters Area */}
      <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <div className="header-search" style={{ width: '100%' }}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search topic titles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: '40px' }} />
          </div>
          <select className="form-control" style={{ borderRadius: '30px' }} value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}>
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {filteredTopics.map(topic => (
          <div key={topic.id} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-tech">{topic.category}</span>
                <span className={`badge badge-${topic.difficulty.toLowerCase()}`}>{topic.difficulty}</span>
              </div>
              <h3 style={{ fontSize: '16px', lineHeight: '1.4', fontWeight: '600' }}>{topic.name}</h3>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '16px' }}>
                <span><i className="fa-solid fa-clock"></i> {topic.duration}</span>
                <span><i className="fa-solid fa-users"></i> Max {topic.participants} Speakers</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" style={{ flex: 1.2, padding: '10px 4px', fontSize: '12px' }} onClick={() => { if (setSelectedTopic) { setSelectedTopic(topic); } setView('live_room'); }}>
                  Start Room
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }} onClick={() => { if (setSelectedTopic) { setSelectedTopic(topic); } setView('practice'); }}>
                  Practice
                </button>
                <button className="btn btn-secondary" style={{ width: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => toggleSaveTopic(topic.id)}>
                  <i className={savedTopics.includes(topic.id) ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} style={{ color: savedTopics.includes(topic.id) ? 'var(--primary-color)' : 'inherit' }}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// CREATE DISCUSSION ROOM VIEW
// ==========================================
export function CreateRoom({ setView, addLiveRoom, setSelectedTopic }) {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('15');
  const [maxUsers, setMaxUsers] = useState('6');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [aiMod, setAiMod] = useState(true);
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now(),
      topic,
      duration: `${duration} mins`,
      participants: 1,
      maxParticipants: maxUsers,
      aiModerator: aiMod ? 'Active' : 'Off',
      isPublic: isPublic ? 'Public' : 'Private'
    };
    addLiveRoom(newRoom);
    if (setSelectedTopic) {
      setSelectedTopic({
        id: newRoom.id,
        name: topic,
        category: 'Technology',
        difficulty: 'Medium',
        duration: newRoom.duration,
        participants: maxUsers
      });
    }
    setView('live_room');
  };

  return (
    <div className="view-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Create Discussion Room</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Configure credentials for your virtual debate hall.</p>
      </div>

      <div className="card-glass" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Discussion Topic</label>
            <input type="text" className="form-control" placeholder="e.g. Global climate regulations impact on manufacturing" required onChange={e => setTopic(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Duration (Minutes)</label>
              <select className="form-control" value={duration} onChange={e => setDuration(e.target.value)}>
                <option value="10">10 Mins</option>
                <option value="15">15 Mins</option>
                <option value="20">20 Mins</option>
                <option value="30">30 Mins</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Max Participants</label>
              <select className="form-control" value={maxUsers} onChange={e => setMaxUsers(e.target.value)}>
                <option value="4">4 Speakers</option>
                <option value="6">6 Speakers</option>
                <option value="8">8 Speakers</option>
                <option value="10">10 Speakers</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="form-label" style={{ margin: 0 }}>Room Privacy (Public)</span>
              <label className="switch">
                <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="form-label" style={{ margin: 0 }}>AI Moderator Panel</span>
              <label className="switch">
                <input type="checkbox" checked={aiMod} onChange={e => setAiMod(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {!isPublic && (
            <div className="form-group">
              <label className="form-label">Room Access Password</label>
              <input type="password" className="form-control" placeholder="••••••••" required={!isPublic} onChange={e => setPassword(e.target.value)} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="form-label" style={{ margin: 0 }}><i className="fa-solid fa-video" style={{ marginRight: '6px' }}></i> Camera Preview</span>
              <label className="switch">
                <input type="checkbox" checked={cam} onChange={e => setCam(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="form-label" style={{ margin: 0 }}><i className="fa-solid fa-microphone" style={{ marginRight: '6px' }}></i> Mic Input</span>
              <label className="switch">
                <input type="checkbox" checked={mic} onChange={e => setMic(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create & Launch</button>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setView('dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// JOIN DISCUSSION VIEW
// ==========================================
export function JoinRoom({ liveRooms, setView, setSelectedTopic }) {
  const [micState, setMicState] = useState({});
  const [camState, setCamState] = useState({});

  const toggleMic = (roomId) => {
    setMicState(prev => ({ ...prev, [roomId]: !prev[roomId] }));
  };

  const toggleCam = (roomId) => {
    setCamState(prev => ({ ...prev, [roomId]: !prev[roomId] }));
  };

  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Active Discussion Rooms</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Join matching debates and start speaking with real-time feedback.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {liveRooms.length === 0 ? (
          <div className="card-glass" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--text-muted)' }}>No active public rooms available. Build your own room above!</p>
          </div>
        ) : (
          liveRooms.map(room => (
            <div key={room.id} className="card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-ai"><i className="fa-solid fa-robot"></i> AI {room.aiModerator}</span>
                  <span className="badge badge-tech">{room.isPublic}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '600' }}>{room.topic}</h3>
                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '10px' }}>
                  <span><i className="fa-solid fa-clock"></i> {room.duration}</span>
                  <span><i className="fa-solid fa-users"></i> {room.participants} / {room.maxParticipants} Members</span>
                </div>
              </div>
              
              {/* Google Meet style Mic and Cam pre-join toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  className={`btn-ctrl ${micState[room.id] ? 'muted' : ''}`} 
                  style={{ width: '40px', height: '40px', fontSize: '14px' }}
                  onClick={() => toggleMic(room.id)}
                  title={micState[room.id] ? "Mute Microphone" : "Unmute Microphone"}
                >
                  <i className={micState[room.id] ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone"}></i>
                </button>
                <button 
                  className={`btn-ctrl ${camState[room.id] ? 'muted' : ''}`} 
                  style={{ width: '40px', height: '40px', fontSize: '14px' }}
                  onClick={() => toggleCam(room.id)}
                  title={camState[room.id] ? "Turn Camera Off" : "Turn Camera On"}
                >
                  <i className={camState[room.id] ? "fa-solid fa-video-slash" : "fa-solid fa-video"}></i>
                </button>
                <button className="btn btn-primary" onClick={() => {
                  if (setSelectedTopic) {
                    setSelectedTopic({
                      id: room.id,
                      name: room.topic,
                      category: 'Technology',
                      difficulty: 'Medium',
                      duration: room.duration,
                      participants: room.maxParticipants
                    });
                  }
                  setView('live_room');
                }}>
                  Join Room <i className="fa-solid fa-right-to-bracket"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// LIVE DISCUSSION ROOM VIEW
// ==========================================
export function LiveRoom({ setView, topic, onAddHistory }) {
  const topicName = topic?.name || 'Impact of AI & Tech Automation on General Labor Roles';
  const category = topic?.category || 'Technology';
  const difficulty = topic?.difficulty || 'Medium';

  const [seconds, setSeconds] = useState(900); // 15 minutes
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState('Sarah');
  const [queue, setQueue] = useState(['Sarah', 'Vikram', 'Priya']);
  const [poll, setPoll] = useState({ active: true, question: 'Do you agree that tech automation causes net employment loss?', yes: 12, no: 8 });
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('Discussion starting... AI moderator is analyzing the topic framework.');
  
  // Real-time speaking score simulations
  const [speakScore, setSpeakScore] = useState({ participation: 45, confidence: 82, grammar: 88, vocab: 74, relevance: 91 });

  // Set initial messages and poll based on the active topic
  useEffect(() => {
    const isTech = category.toLowerCase().includes('tech') || category.toLowerCase().includes('comput') || category.toLowerCase().includes('artificial');
    const isEcon = category.toLowerCase().includes('econ') || category.toLowerCase().includes('business') || category.toLowerCase().includes('finance');
    const isPol = category.toLowerCase().includes('polit') || category.toLowerCase().includes('govern');
    
    let defaultMsg1 = `Welcome everyone! The topic is active: "${topicName}". Please keep arguments constructive.`;
    let defaultMsg2 = `I think this is a highly relevant issue today with significant societal impacts.`;
    let defaultMsg3 = `How will this affect job security and general training frameworks?`;
    let pollQ = `Do you support stronger regulation regarding this topic?`;

    if (isTech) {
      defaultMsg2 = `Technology shifts always disrupt historical jobs but eventually scale up global efficiency and yield new technical domains.`;
      defaultMsg3 = `I agree, but the speed of transition is what worries me. Transition friction is very high for older labor groups.`;
      pollQ = `Will tech advancements in this domain create more jobs than they eliminate?`;
    } else if (isEcon) {
      defaultMsg2 = `From an economic standpoint, the return on investment (ROI) drives adoption. Capital efficiency will dominate.`;
      defaultMsg3 = `But we must consider the widening wealth gap and how retraining schemes are funded by corporate tax bases.`;
      pollQ = `Should the government subsidize transitional retraining for affected labor?`;
    } else if (isPol) {
      defaultMsg2 = `State policy is lagging behind current developments. Regulatory sandboxes are critical before global rollouts.`;
      defaultMsg3 = `Yes, but over-regulation runs the risk of capital flight. Developers will simply move to friendlier jurisdictions.`;
      pollQ = `Is state intervention necessary to guide this development?`;
    }

    setMessages([
      { sender: 'AI Moderator', text: defaultMsg1, self: false },
      { sender: 'Sarah', text: defaultMsg2, self: false },
      { sender: 'Vikram', text: defaultMsg3, self: false }
    ]);
    
    setPoll({
      active: true,
      question: pollQ,
      yes: 12,
      no: 8
    });

    const initialSeconds = difficulty === 'Hard' ? 1200 : difficulty === 'Easy' ? 600 : 900;
    setSeconds(initialSeconds);
  }, [topicName, category, difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating speaker rotators to give WebRTC dynamic behavior
  useEffect(() => {
    const speakTimer = setInterval(() => {
      const names = ['Sarah', 'Vikram', 'Priya', 'You'];
      const nextSpeaker = names[Math.floor(Math.random() * names.length)];
      if (nextSpeaker === 'You' && isMuted) {
        setActiveSpeaker('Vikram');
        setLiveTranscript(`Vikram: If we look at the historical data, previous shifts resulted in higher aggregate demand.`);
      } else {
        setActiveSpeaker(nextSpeaker);
        if (nextSpeaker === 'You') {
          setLiveTranscript('You are speaking... AI Moderator is calculating speech structure metrics.');
          setSpeakScore(s => ({
            ...s,
            participation: Math.min(s.participation + 2, 100),
            confidence: Math.min(s.confidence + 1, 95)
          }));
        } else {
          const isTech = category.toLowerCase().includes('tech') || category.toLowerCase().includes('comput') || category.toLowerCase().includes('artificial');
          const isEcon = category.toLowerCase().includes('econ') || category.toLowerCase().includes('business') || category.toLowerCase().includes('finance');
          
          let quote = `${nextSpeaker}: The core issue is how we bridge the skills gap during this transition.`;
          if (isTech) {
            quote = `${nextSpeaker}: Algorithmic development is accelerating. Standard encryption or legacy systems will struggle to keep up.`;
          } else if (isEcon) {
            quote = `${nextSpeaker}: Wealth redistribution via taxing automation gains could offset short-term labor dislocation.`;
          }
          setLiveTranscript(quote);
        }
      }
    }, 12000);
    return () => clearInterval(speakTimer);
  }, [isMuted, category]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'You', text: inputValue, self: true }]);
      setInputValue('');
    }
  };

  const handleQueueToggle = () => {
    if (inQueue) {
      setQueue(queue.filter(q => q !== 'You'));
    } else {
      setQueue([...queue, 'You']);
    }
    setInQueue(!inQueue);
  };

  const handleLeaveRoom = () => {
    const finalScore = Math.round((speakScore.confidence + speakScore.grammar + speakScore.relevance + speakScore.vocab) / 4);
    const badge = finalScore > 90 ? 'Excellent Communicator' : finalScore > 80 ? 'Consistent Performer' : 'Rising Speaker';
    
    if (onAddHistory) {
      onAddHistory({
        date: new Date().toISOString().split('T')[0],
        topic: topicName,
        duration: difficulty === 'Hard' ? '20m' : difficulty === 'Easy' ? '10m' : '15m',
        participants: 6,
        score: finalScore,
        badge: badge
      });
    }
    setView('ai_feedback');
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="view-container" style={{ padding: '20px' }}>
      {/* Top Details Panel */}
      <div className="card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px' }}>
        <div>
          <span className="badge badge-medium" style={{ marginBottom: '4px' }}>Live Room</span>
          <h2 style={{ fontSize: '18px' }}>{topicName}</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', fontFamily: 'Outfit', fontWeight: '800', color: '#ef4444' }}>
            <i className="fa-solid fa-stopwatch"></i> {formatTime(seconds)}
          </span>
          <button className="btn btn-danger btn-sm" onClick={handleLeaveRoom}>
            Leave Room
          </button>
        </div>
      </div>

      {/* Main Room Layout Grid */}
      <div className="live-layout">
        {/* Videos and Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="video-grid">
            {/* User Slot */}
            <div className={`video-slot ${activeSpeaker === 'You' ? 'speaking' : ''}`}>
              {isCamOff ? (
                <div className="video-placeholder-avatar">U</div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <i className="fa-solid fa-circle-user" style={{ fontSize: '64px', color: 'var(--primary-color)' }}></i>
                </div>
              )}
              <div className="video-slot-label">
                <span>You (Self)</span>
                {isMuted && <i className="fa-solid fa-microphone-slash" style={{ color: '#ef4444' }}></i>}
              </div>
            </div>

            {/* Simulated Speakers */}
            {[
              { name: 'Sarah', label: 'S' },
              { name: 'Vikram', label: 'V' },
              { name: 'Priya', label: 'P' },
              { name: 'Alex', label: 'A' },
              { name: 'Rahul', label: 'R' }
            ].map(member => (
              <div key={member.name} className={`video-slot ${activeSpeaker === member.name ? 'speaking' : ''}`}>
                <div className="video-placeholder-avatar">{member.label}</div>
                <div className="video-slot-label">
                  <span>{member.name}</span>
                  {activeSpeaker === member.name && (
                    <div className="speaking-indicator-wave">
                      <span className="speaking-wave-bar"></span>
                      <span className="speaking-wave-bar"></span>
                      <span className="speaking-wave-bar"></span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Transcript overlay ticker */}
          <div className="card-glass" style={{ padding: '12px 20px', borderLeft: '4px solid var(--accent-color)' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>Live Speech Ticker</span>
            <p style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '4px' }}>"{liveTranscript}"</p>
          </div>

          {/* Controls Bar */}
          <div className="controls-bar card-glass">
            <button className={`btn-ctrl ${isMuted ? 'muted' : ''}`} onClick={() => setIsMuted(!isMuted)}>
              <i className={isMuted ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone"}></i>
            </button>
            <button className={`btn-ctrl ${isCamOff ? 'muted' : ''}`} onClick={() => setIsCamOff(!isCamOff)}>
              <i className={isCamOff ? "fa-solid fa-video-slash" : "fa-solid fa-video"}></i>
            </button>
            <button className={`btn-ctrl ${inQueue ? 'active' : ''}`} style={{ backgroundColor: inQueue ? 'var(--primary-color)' : '', color: inQueue ? '#fff' : '' }} onClick={handleQueueToggle}>
              <i className="fa-solid fa-hand"></i>
            </button>
            <button className="btn-ctrl" onClick={() => setPoll(p => ({ ...p, yes: p.yes + 1 }))}>
              <i className="fa-solid fa-square-poll-vertical"></i>
            </button>
            <button className="btn-ctrl" onClick={() => setMessages(m => [...m, { sender: 'You', text: '👍 Agreement React Sent', self: true }])}>
              <i className="fa-regular fa-face-smile"></i>
            </button>
          </div>
        </div>

        {/* Sidebar panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Speaking Queue */}
          <div className="card-glass" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}><i className="fa-solid fa-users-viewfinder"></i> Speaking Queue</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {queue.map((name, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{idx + 1}</span>
                  <span style={{ fontWeight: name === 'You' ? 'bold' : 'normal' }}>{name}</span>
                  {activeSpeaker === name && <span className="badge badge-easy" style={{ fontSize: '9px', padding: '2px 6px' }}>Speaking</span>}
                </div>
              ))}
            </div>
          </div>

          {/* AI Moderator Diagnostics panel */}
          <div className="card-glass" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px' }}><i className="fa-solid fa-robot"></i> Live AI Feedback</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Participation:</span>
                <span>{speakScore.participation}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Confidence Index:</span>
                <span>{speakScore.confidence}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Grammar Alerts:</span>
                <span style={{ color: '#22c55e' }}>0 flags</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Topic Relevance:</span>
                <span>{speakScore.relevance}%</span>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="chat-panel card-glass" style={{ height: '240px', padding: '0' }}>
            <div className="chat-panel-header" style={{ fontSize: '13px' }}>
              <span>Discussion Chat</span>
              <span style={{ color: 'var(--text-muted)' }}>{messages.length} lines</span>
            </div>
            <div className="chat-messages" style={{ maxHeight: '140px' }}>
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-bubble ${m.self ? 'self' : ''}`}>
                  <span className="chat-bubble-sender">{m.sender}</span>
                  <p className="chat-bubble-text">{m.text}</p>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input type="text" className="form-control" style={{ padding: '6px 12px', fontSize: '12px' }} placeholder="Message..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} />
              <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handleSendMessage}><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// AI FEEDBACK PAGE VIEW
// ==========================================
export function AiFeedbackPage() {
  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>AI Performance Report</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Deep analytical review generated by the GDVerse evaluation engine.</p>
      </div>

      {/* Top summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card-glass" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className="card-title" style={{ justifyContent: 'center' }}><i className="fa-solid fa-trophy"></i> Discussion Grade</h3>
          <h2 style={{ fontSize: '64px', color: 'var(--primary-color)', fontFamily: 'Outfit', margin: '10px 0' }}>A-</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Outstanding vocabulary. Slightly restricted overall speaking duration.</p>
        </div>

        <div className="card-glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignContent: 'center' }}>
          {[
            { label: 'Grammar Grade', val: '92%', icon: 'fa-spell-check', desc: 'No active tense flags' },
            { label: 'Fluency Index', val: '86%', icon: 'fa-feather', desc: 'Pacing at 140 WPM' },
            { label: 'Topic Relevance', val: '95%', icon: 'fa-bullseye', desc: 'PESTLE framework aligned' }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--accent-color)', fontSize: '24px' }}></i>
              <h3 style={{ fontSize: '18px', margin: '8px 0 4px' }}>{item.val}</h3>
              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.label}</p>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Analytical SVG Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Speaking time chart */}
        <div className="card-glass">
          <h3 className="card-title"><i className="fa-solid fa-clock"></i> Member Speaking Distribution</h3>
          <div className="chart-container">
            {[
              { label: 'Sarah', val: '24%', h: 120 },
              { label: 'Vikram', val: '18%', h: 90 },
              { label: 'Priya', val: '22%', h: 110 },
              { label: 'Rahul', val: '14%', h: 70 },
              { label: 'You', val: '22%', h: 110 }
            ].map((bar, idx) => (
              <div key={idx} className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: `${bar.h}px` }}>
                  <span className="chart-bar-value">{bar.val}</span>
                </div>
                <span className="chart-label">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend Score */}
        <div className="card-glass">
          <h3 className="card-title"><i className="fa-solid fa-chart-line"></i> Weekly Progress Trend</h3>
          <div className="chart-container" style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            {/* Custom line chart mock grid */}
            {[
              { label: 'Mon', score: 72, h: 90 },
              { label: 'Tue', score: 75, h: 105 },
              { label: 'Wed', score: 78, h: 115 },
              { label: 'Thu', score: 80, h: 125 },
              { label: 'Fri', score: 82, h: 140 }
            ].map((point, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', marginBottom: '8px', transform: `translateY(-${point.h}px)` }}>
                  <span style={{ position: 'absolute', transform: 'translate(-12px, -18px)', fontSize: '10px', fontWeight: 'bold' }}>{point.score}</span>
                </div>
                <span className="chart-label" style={{ marginTop: 'auto' }}>{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed evaluation bullet points */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card-glass">
          <h3 className="card-title" style={{ color: '#22c55e' }}><i className="fa-solid fa-circle-check"></i> Key Strengths</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><i className="fa-solid fa-plus-circle" style={{ color: '#22c55e', marginRight: '8px' }}></i> Addressed macroeconomic trends accurately.</li>
            <li><i className="fa-solid fa-plus-circle" style={{ color: '#22c55e', marginRight: '8px' }}></i> Avoided direct conflicts, framing arguments as collaborative.</li>
            <li><i className="fa-solid fa-plus-circle" style={{ color: '#22c55e', marginRight: '8px' }}></i> Excellent articulation pacing (no speed peaks).</li>
          </ul>
        </div>
        <div className="card-glass">
          <h3 className="card-title" style={{ color: '#ef4444' }}><i className="fa-solid fa-circle-xmark"></i> Key Areas to Refine</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><i className="fa-solid fa-minus-circle" style={{ color: '#ef4444', marginRight: '8px' }}></i> Reduce dependency on the word "basically" (flagged 4 times).</li>
            <li><i className="fa-solid fa-minus-circle" style={{ color: '#ef4444', marginRight: '8px' }}></i> Encourage others more proactively in initial sections.</li>
            <li><i className="fa-solid fa-minus-circle" style={{ color: '#ef4444', marginRight: '8px' }}></i> Support core sentences with precise database figures.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PERFORMANCE HISTORY VIEW
// ==========================================
export function PerformanceHistory() {
  const history = [
    { date: '2026-07-14', topic: 'Will Generative AI destroy software engineering jobs?', duration: '20m', participants: 6, score: 82, badge: 'Rising Speaker' },
    { date: '2026-07-10', topic: 'Impact of social media on teenage mental health', duration: '15m', participants: 5, score: 79, badge: 'Consistent Performer' },
    { date: '2026-07-05', topic: 'The viability of electric vehicles in developing nations', duration: '12m', participants: 8, score: 85, badge: 'Excellent Communicator' },
    { date: '2026-06-28', topic: 'Is cryptocurrency a viable alternative to fiat cash?', duration: '25m', participants: 6, score: 75, badge: 'Rising Speaker' }
  ];

  const downloadReportFile = (row) => {
    const doc = new jsPDF();
    
    // Add border & header styling
    doc.setDrawColor(99, 102, 241); // Indigo border
    doc.setLineWidth(1.5);
    doc.rect(5, 5, 200, 287);
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text("GDVerse Performance Scorecard", 15, 25);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 241);
    doc.text("Practice. Discuss. Improve.", 15, 30);
    
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(15, 34, 195, 34);
    
    // Performance Summary Table
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("Session Metadata", 15, 43);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    
    doc.text(`Date: ${row.date}`, 15, 50);
    doc.text(`Topic: ${row.topic}`, 15, 56);
    doc.text(`Duration: ${row.duration}`, 15, 62);
    doc.text(`Speakers Count: ${row.participants}`, 15, 68);
    
    // Score Badge Card (with light grey outline)
    doc.setFillColor(248, 250, 252);
    doc.rect(130, 40, 65, 32, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(130, 40, 65, 32);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(99, 102, 241);
    doc.text("Overall Grade", 135, 48);
    
    doc.setFontSize(28);
    doc.setTextColor(15, 23, 42);
    doc.text(`${row.score}%`, 135, 62);
    
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(row.badge, 135, 68);
    
    // AI Metrics section
    doc.line(15, 78, 195, 78);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("AI Speech Diagnostics Breakdown", 15, 87);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    
    doc.text("• Grammar Accuracy:  92%  (0 grammatical tense flags caught)", 15, 95);
    doc.text("• Fluency Index:            86%  (Vocal pacing mapped at 140 WPM)", 15, 101);
    doc.text("• Topic Relevance:        95%  (High correlation to logical frameworks)", 15, 107);
    doc.text("• Vocabulary Index:       74%  (Satisfactory synonyms frequency)", 15, 113);
    
    // Strengths & Weaknesses
    doc.line(15, 122, 195, 122);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(22, 163, 74); // Green
    doc.text("Key Strengths Identified", 15, 131);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text("1. Maintained structural framework models (PESTLE, SWOT) throughout.", 15, 138);
    doc.text("2. Framed arguments in a collaborative tone, encouraging other panel speakers.", 15, 144);
    doc.text("3. Perfect volume control and natural, steady articulation ratios.", 15, 150);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(220, 38, 38); // Red
    doc.text("Areas to Refine & Actionable Tips", 15, 162);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text("1. Reduce frequency of basic filler terms (basically, actually, like). Try taking a 1-second pause.", 15, 169);
    doc.text("2. Substitute elementary words with strong synonyms (e.g. use 'pivotal' instead of 'important').", 15, 175);
    doc.text("3. Back up assertions with relevant database stats to improve credibility indices.", 15, 181);
    
    // Footer validation seal
    doc.line(15, 230, 195, 230);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("GDVerse AI Evaluation Engine Verified", 15, 240);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("This document constitutes a certified placement-readiness credential record.", 15, 246);
    
    // Save report
    doc.save(`GDVerse_Report_${row.date}.pdf`);
  };

  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Performance History</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Access your logs, past score sheets, and certified reports.</p>
      </div>

      <div className="card-glass" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Date</th>
                <th>Topic</th>
                <th>Duration</th>
                <th>Speakers</th>
                <th>Score</th>
                <th>Award Badge</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.date}</td>
                  <td style={{ fontWeight: '600' }}>{row.topic}</td>
                  <td>{row.duration}</td>
                  <td>{row.participants}</td>
                  <td><span className="badge badge-easy" style={{ fontSize: '12px' }}>{row.score}%</span></td>
                  <td><span className="badge badge-ai" style={{ fontSize: '10px' }}>{row.badge}</span></td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => downloadReportFile(row)}>
                      <i className="fa-solid fa-download" style={{ color: 'var(--primary-color)' }}></i> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// LEADERBOARD VIEW
// ==========================================
export function Leaderboard() {
  const [boardType, setBoardType] = useState('Weekly');
  const members = [
    { rank: 1, name: 'Ananya Roy', score: 96, discussions: 42, badge: 'Top Debater', medal: '🥇' },
    { rank: 2, name: 'Vikram Mehta', score: 91, discussions: 38, badge: 'Consistent Performer', medal: '🥈' },
    { rank: 3, name: 'Sarah Connor', score: 89, discussions: 31, badge: 'AI Expert', medal: '🥉' },
    { rank: 4, name: 'You (Speaker)', score: 82, discussions: 24, badge: 'Rising Speaker', medal: '' },
    { rank: 5, name: 'Rahul Singhal', score: 79, discussions: 19, badge: 'Team Player', medal: '' }
  ];

  return (
    <div className="view-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Speaker Leaderboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>See where you rank against global candidates.</p>
        </div>
        <div className="categories-grid" style={{ background: 'var(--bg-input)', padding: '4px', borderRadius: '30px' }}>
          {['Weekly', 'Monthly', 'All-Time'].map(tab => (
            <span
              key={tab}
              className={`category-pill ${boardType === tab ? 'active' : ''}`}
              style={{ fontSize: '12px', padding: '6px 16px', borderRadius: '20px' }}
              onClick={() => setBoardType(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="card-glass" style={{ padding: '0' }}>
        <table className="table-custom">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Overall Score</th>
              <th>Total GDs</th>
              <th>Badges Earned</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.rank} style={{ backgroundColor: member.name.includes('You') ? 'rgba(99,102,241,0.06)' : '' }}>
                <td>
                  <span style={{ fontWeight: '800', marginRight: '6px' }}>{member.rank}</span>
                  {member.medal}
                </td>
                <td style={{ fontWeight: member.name.includes('You') ? '800' : '500' }}>{member.name}</td>
                <td><span className="badge badge-easy" style={{ fontSize: '12px' }}>{member.score} pts</span></td>
                <td>{member.discussions}</td>
                <td><span className="badge badge-ai" style={{ fontSize: '10px' }}>{member.badge}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// PRACTICE MODE VIEW
// ==========================================
export function PracticeMode({ topic }) {
  const topicName = topic?.name || 'Impact of GenAI on white-collar jobs';
  
  const [chat, setChat] = useState([
    { sender: 'AI Evaluator', text: `Hello! Welcome to Practice Sandbox. We'll examine '${topicName}'. To start, what is your view on this topic and its key challenges?`, scores: null }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { sender: 'You', text: userInput, scores: null };
    setChat(prev => [...prev, userMsg]);
    setUserInput('');
    setIsEvaluating(true);

    try {
      const historyLog = chat.map(m => `${m.sender}: ${m.text}`).join('\n');
      const res = await fetch('http://localhost:8080/api/feedback/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicName, speechText: userMsg.text, history: historyLog })
      });
      if (res.ok) {
        const data = await res.json();
        setChat(prev => [
          ...prev,
          {
            sender: 'AI Evaluator',
            text: data.text,
            scores: {
              overall: data.overallScore,
              grammar: data.metrics?.grammar || 80,
              vocabulary: data.metrics?.vocabulary || 80,
              relevance: data.metrics?.relevance || 80,
              correction: data.corrections || 'No major issues flagged.'
            }
          }
        ]);
        setIsEvaluating(false);
        return;
      }
    } catch (err) {
      console.warn("Backend evaluation API down. Falling back to local offline simulation:", err);
    }

    // Client-side fallback if backend is offline
    setTimeout(() => {
      const cleanedInput = userMsg.text.trim().toLowerCase();
      let grammar = 90;
      let correction = "No major spelling or grammatical errors flagged.";

      const hasFillers = cleanedInput.includes("basically") || cleanedInput.includes("actually") 
              || cleanedInput.includes("like") || cleanedInput.includes("uh") || cleanedInput.includes("um");
      if (hasFillers) {
        grammar = 78;
        correction = "Grammar focus: Minimize usage of filler phrases ('basically', 'actually', 'like'). Try inserting short pauses instead.";
      }

      let vocabulary = Math.min(95, Math.max(65, 70 + Math.floor(cleanedInput.length / 20)));
      if (cleanedInput.includes("pivotal") || cleanedInput.includes("paradigm") || cleanedInput.includes("fundamental") || cleanedInput.includes("infrastructure")) {
        vocabulary = Math.min(98, vocabulary + 5);
      }

      let relevance = 85;
      const keywords = topicName.toLowerCase().split(/\s+/);
      let matches = 0;
      keywords.forEach(word => {
        if (word.length > 3 && cleanedInput.toLowerCase().includes(word)) {
          matches++;
        }
      });
      relevance = Math.min(100, Math.max(70, 75 + (matches * 6)));
      const overall = Math.round((grammar + vocabulary + relevance + 85) / 4);

      let replyText;
      if (cleanedInput.includes("?") || cleanedInput.includes("how") || cleanedInput.includes("why") || cleanedInput.includes("what is")) {
        replyText = `That's a very perceptive question regarding the details of '${topicName}'. From an analytical perspective, addressing this requires structured framework planning. For instance, we must consider the trade-offs between speed of implementation and safety guidelines. To keep our discussion progressing, how do you think we can incentivize institutions to manage these risks?`;
      } else {
        let keyPhrase = "your point";
        for (let word of keywords) {
          if (word.length > 4 && cleanedInput.includes(word)) {
            keyPhrase = `your focus on "${word}"`;
            break;
          }
        }
        replyText = `Excellent input regarding ${keyPhrase}. It highlights the necessity of balancing innovation against the socio-economic impacts. Building on this perspective, how should educational hubs and corporate developers prepare for this paradigm shift?`;
      }

      setChat(prev => [
        ...prev,
        {
          sender: 'AI Evaluator',
          text: replyText,
          scores: { overall, grammar, vocabulary, relevance, correction }
        }
      ]);
      setIsEvaluating(false);
    }, 1500);
  };

  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Practice Sandbox</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Draft arguments against the AI evaluator and receive instant phrase correction scores.</p>
      </div>

      <div className="practice-container card-glass" style={{ display: 'flex', flexDirection: 'column', height: '550px' }}>
        {/* Chat Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}><i className="fa-solid fa-robot"></i> AI Practice Session</span>
          <span className="badge badge-medium" style={{ fontSize: '10px' }}>Topic: {topicName}</span>
        </div>

        {/* Chat messages stream */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {chat.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start' }}>{msg.sender}</span>
              <div style={{
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: msg.sender === 'You' ? 'var(--primary-color)' : 'rgba(255,255,255,0.03)',
                border: msg.sender === 'You' ? 'none' : '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
              
              {/* If message has active evaluation scores attached */}
              {msg.scores && (
                <div className="card-glass" style={{ marginTop: '10px', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '11px', background: 'rgba(99,102,241,0.06)' }}>
                  <div><strong>Overall:</strong> {msg.scores.overall}%</div>
                  <div><strong>Grammar:</strong> {msg.scores.grammar}%</div>
                  <div><strong>Vocab:</strong> {msg.scores.vocabulary}%</div>
                  <div><strong>Relevance:</strong> {msg.scores.relevance}%</div>
                  <div style={{ gridColumn: 'span 4', borderTop: '1px solid var(--border-color)', paddingTop: '6px', color: 'var(--accent-color)' }}>
                    <strong>Phrase Correction:</strong> {msg.scores.correction}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isEvaluating && <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}><i className="fa-solid fa-spinner fa-spin"></i> AI Evaluator is formulating speech feedback...</div>}
        </div>

        {/* Input panel */}
        <form onSubmit={handleSubmit} style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Type your structured debate points here..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            disabled={isEvaluating}
          />
          <button type="submit" className="btn btn-primary" disabled={isEvaluating}>
            Submit <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// PROFILE VIEW
// ==========================================
export function Profile({ userData, onUpdateProfile }) {
  const [profile, setProfile] = useState({
    name: userData?.profile?.name || 'You (Speaker)',
    college: userData?.profile?.college || 'Vellore Institute of Technology',
    email: userData?.profile?.email || 'speaker@vit.edu',
    bio: userData?.profile?.bio || 'Passionate computer science student targeting software engineering and consulting roles. Actively training on placement interview parameters.',
    skills: userData?.profile?.skills || 'Java, React, SQL, Logic structures'
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userData?.profile) {
      setProfile(userData.profile);
    }
  }, [userData]);

  const handleToggleEdit = () => {
    if (editMode) {
      onUpdateProfile(profile);
    }
    setEditMode(!editMode);
  };

  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>User Profile</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage speaker details, achievement badges, and digital certificates.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Profile Card Summary */}
        <div className="card-glass" style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 16px' }}>
            {profile.name ? profile.name[0].toUpperCase() : 'Y'}
          </div>
          <h2 style={{ fontSize: '20px' }}>{profile.name}</h2>
          <p style={{ color: 'var(--primary-color)', fontSize: '13px', marginTop: '4px' }}>{profile.college}</p>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>{profile.email}</span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
            <span className="badge badge-tech">Rising Speaker</span>
            <span className="badge badge-ai">Consistent Performer</span>
          </div>
        </div>

        {/* Edit fields / certificates details */}
        <div className="card-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px' }}>Speaker Information</h3>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px 16px', fontSize: '12px' }} onClick={handleToggleEdit}>
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {editMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">College/University</label>
                <input type="text" className="form-control" value={profile.college} onChange={e => setProfile({ ...profile, college: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Bio Description</label>
                <textarea className="form-control" rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Skills List</label>
                <input type="text" className="form-control" value={profile.skills} onChange={e => setProfile({ ...profile, skills: e.target.value })} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span className="form-label">Bio</span>
                <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{profile.bio}</p>
              </div>
              <div>
                <span className="form-label">Key Skills Evaluated</span>
                <p style={{ fontSize: '14px' }}>{profile.skills}</p>
              </div>

              <div>
                <span className="form-label">Verifiable Certificates</span>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <div className="card-glass" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed', textAlign: 'center' }}>
                    <i className="fa-solid fa-certificate" style={{ color: 'var(--primary-color)', fontSize: '24px' }}></i>
                    <h4 style={{ fontSize: '13px', marginTop: '6px' }}>GD Level A Certification</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ID: GDV-771822</span>
                  </div>
                  <div className="card-glass" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed', textAlign: 'center' }}>
                    <i className="fa-solid fa-certificate" style={{ color: 'var(--primary-color)', fontSize: '24px' }}></i>
                    <h4 style={{ fontSize: '13px', marginTop: '6px' }}>Excellent Communicator</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ID: GDV-322109</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SETTINGS VIEW
// ==========================================
export function Settings({ isDarkMode, setIsDarkMode }) {
  const [notify, setNotify] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  return (
    <div className="view-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Tune layout themes, permissions, and security parameters.</p>
      </div>

      <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px' }}>Application Theme (Dark Mode)</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Toggle default background dark theme structure.</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={e => setIsDarkMode(e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px' }}>Email Notification Center</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Receive email reports after discussion updates.</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px' }}>Public Profile Visibility</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Allow college peers to search and match your ranks.</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Update Account Password</label>
            <input type="password" className="form-control" placeholder="New Password" />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => alert('Settings Saved')}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ADMIN DASHBOARD VIEW
// ==========================================
export function AdminDashboard({ onAddTopic }) {
  const [topicName, setTopicName] = useState('');
  const [category, setCategory] = useState('Technology');
  const [difficulty, setDifficulty] = useState('Medium');
  const [genAiInput, setGenAiInput] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    onAddTopic({
      id: Date.now(),
      name: topicName,
      category,
      difficulty,
      duration: '15 mins',
      participants: 6
    });

    setTopicName('');
    alert('New Topic successfully published to Topic Library!');
  };

  const handleAiGenerate = () => {
    if (!genAiInput.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setTopicName(`AI-Generated: ${genAiInput} and its long-term socio-economic implications`);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="view-container">
      <div>
        <h1 style={{ fontSize: '28px', fontFamily: 'Outfit' }}>Admin Control Center</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Inject database topics, monitor active servers, and check AI token costs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Topic creation panel */}
        <div className="card-glass">
          <h3 className="card-title"><i className="fa-solid fa-plus-circle"></i> Publish New Debate Topic</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Topic Title</label>
              <input type="text" className="form-control" placeholder="e.g. Will fusion power replace fission grids in 10 years?" value={topicName} required onChange={e => setTopicName(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Technology">Technology</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Business">Business</option>
                  <option value="Economy">Economy</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-control" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '10px' }}>
              <input type="text" className="form-control" style={{ flex: 1 }} placeholder="Ask Gemini AI to generate custom title... (e.g. quantum computing)" value={genAiInput} onChange={e => setGenAiInput(e.target.value)} />
              <button type="button" className="btn btn-accent" style={{ padding: '10px 16px' }} disabled={generating} onClick={handleAiGenerate}>
                {generating ? 'Generating...' : 'Gemini AI'}
              </button>
            </div>

            <button type="submit" className="btn btn-primary">Publish to Catalog</button>
          </form>
        </div>

        {/* Server & Usage Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card-glass">
            <h3 className="card-title"><i className="fa-solid fa-server"></i> System Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Active WebRTC Channels:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>14 channels online</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Active WebSocket Broker Connections:</span>
                <span style={{ fontWeight: 'bold', color: '#22c55e' }}>212 users</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>MySQL Pool Latency:</span>
                <span style={{ fontWeight: 'bold' }}>14ms (Optimal)</span>
              </div>
            </div>
          </div>

          <div className="card-glass">
            <h3 className="card-title"><i className="fa-solid fa-microchip"></i> AI Provider Costs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>API Tokens Used (Today):</span>
                <span>1.4 Million Tokens</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Avg Processing Latency:</span>
                <span>1.2s per summary block</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Gemini API State:</span>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}><i className="fa-solid fa-circle"></i> Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
