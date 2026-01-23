import { Bell, Menu, User } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} color="white" />
                </button>
            </div>

            <div className="navbar-center">
                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">Subscriber</span>
                        <span className="stat-val">0/200</span>
                    </div>
                </div>

                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">Message</span>
                        <span className="stat-val">0/200</span>
                    </div>
                </div>

                <div className="stat-pill">
                    <div className="circle-progress" style={{ '--p': 0 }}>0%</div>
                    <div className="stat-info">
                        <span className="stat-label">AI Token</span>
                        <span className="stat-val">0/1.0K</span>
                    </div>
                </div>
            </div>

            <div className="navbar-right">
                <button className="icon-btn">
                    <Bell size={20} color="#fbbf24" /> {/* Amber color for bell */}
                    <span className="notification-dot">3</span>
                </button>
                <div className="user-avatar">
                    <User size={20} color="#19877b" />
                </div>
            </div>
        </nav>
    );
}
