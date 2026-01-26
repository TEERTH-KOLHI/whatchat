import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure DB file exists
function ensureDb() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ whatsapp: null }), 'utf-8');
  }
}

export function getDb() {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { whatsapp: null };
  }
}

export function updateDb(newData) {
  ensureDb();
  const current = getDb();
  const updated = { ...current, ...newData };
  fs.writeFileSync(DB_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}


export function getBots() {
  const db = getDb();
  return db.bots || [];
}

export function addBot(bot) {
  const db = getDb();
  const bots = db.bots || [];
  const newBot = { ...bot, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  bots.push(newBot);
  updateDb({ bots });
  return newBot;
}

export function updateBot(id, updates) {
  const db = getDb();
  const bots = db.bots || [];
  const index = bots.findIndex(b => b.id === id);
  if (index !== -1) {
    bots[index] = { ...bots[index], ...updates, updatedAt: new Date().toISOString() };
    updateDb({ bots });
    return bots[index];
  }
  return null;
}

export function deleteBot(id) {
  const db = getDb();
  const bots = db.bots || [];
  const filtered = bots.filter(b => b.id !== id);
  updateDb({ bots: filtered });
  return true;
}

export function getSubscribers() {
  const db = getDb();
  return db.subscribers || [];
}

export function addSubscriber(sub) {
  const db = getDb();
  const subscribers = db.subscribers || [];
  const newSub = { ...sub, id: crypto.randomUUID(), joined: new Date().toLocaleDateString(), status: 'Active' };
  subscribers.push(newSub);
  updateDb({ subscribers });
  return newSub;
}

export function deleteSubscriber(id) {
  const db = getDb();
  const subscribers = db.subscribers || [];
  const filtered = subscribers.filter(s => s.id !== id);
  updateDb({ subscribers: filtered });
  return true;
}

export function getCampaigns() {
  const db = getDb();
  return db.campaigns || [];
}

export function addCampaign(campaign) {
  const db = getDb();
  const campaigns = db.campaigns || [];
  const newCampaign = {
    ...campaign,
    id: crypto.randomUUID(),
    sentAt: new Date().toLocaleDateString(),
    status: 'Completed',
    stats: { sent: 100, delivered: 98, read: 65 } // Mock stats for demo
  };
  campaigns.push(newCampaign);
  updateDb({ campaigns });
  return newCampaign;
}

export function getConversations() {
  const db = getDb();
  if (!db.conversations) {
    // Seed initial conversations if empty
    const initialConversations = [
      { id: '1', name: "Alice Freeman", msg: "Hey! Can I get a refund?", time: "2m", unread: 2, channel: "whatsapp", avatar: "AF", type: "text" },
      { id: '2', name: "Bob Smith", msg: "Is this item available in red?", time: "15m", unread: 0, channel: "facebook", avatar: "BS", type: "text" },
      { id: '3', name: "Charlie Kim", msg: "Love the new posts!", time: "1h", unread: 1, channel: "instagram", avatar: "CK", type: "text" }
    ];
    // Seed initial messages
    const initialMessages = [
      { id: 'm1', conversationId: '1', sender: 'user', text: "Hi, I have a problem.", time: "10:30 AM" },
      { id: 'm2', conversationId: '1', sender: 'agent', text: "Hello! How can I help?", time: "10:31 AM" },
      { id: 'm3', conversationId: '1', sender: 'user', text: "Hey! Can I get a refund?", time: "10:32 AM" },
      { id: 'm4', conversationId: '2', sender: 'user', text: "Is this available in red?", time: "09:00 AM" }
    ];
    updateDb({ conversations: initialConversations, messages: initialMessages });
    return initialConversations;
  }
  return db.conversations || [];
}

export function getMessages(conversationId) {
  const db = getDb();
  const messages = db.messages || [];
  return messages.filter(m => m.conversationId === conversationId);
}

export function addMessage(conversationId, text, sender = 'agent') {
  const db = getDb();
  const messages = db.messages || [];
  const conversations = db.conversations || [];

  const newMessage = {
    id: crypto.randomUUID(),
    conversationId,
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  messages.push(newMessage);

  // Update conversation last message
  const convIndex = conversations.findIndex(c => c.id === conversationId);
  if (convIndex !== -1) {
    conversations[convIndex].msg = text;
    conversations[convIndex].time = 'Just now';
    conversations[convIndex].unread = sender === 'user' ? (conversations[convIndex].unread + 1) : 0;
    // Move to top
    const conv = conversations.splice(convIndex, 1)[0];
    conversations.unshift(conv);
  }

  updateDb({ messages, conversations });
  return newMessage;
}

export function getAds() {
  const db = getDb();
  return db.ads || [];
}

export function addAd(ad) {
  const db = getDb();
  const ads = db.ads || [];
  const newAd = {
    ...ad,
    id: crypto.randomUUID(),
    status: 'Active',
    stats: { impressions: 0, clicks: 0, spent: 0 }
  };
  ads.push(newAd);
  updateDb({ ads });
  return newAd;
}

export function getWebhooks() {
  const db = getDb();
  return db.webhooks || [];
}

export function addWebhook(webhook) {
  const db = getDb();
  const webhooks = db.webhooks || [];
  const newWorkflow = {
    ...webhook,
    id: crypto.randomUUID(),
    status: 'Running',
    createdAt: new Date().toLocaleDateString(),
    stats: { processed: 0, delivered: 0, failed: 0 }
  };
  webhooks.push(newWorkflow);
  updateDb({ webhooks });
  return newWorkflow;
}

export function triggerWebhookEvent(workflowId) {
  const db = getDb();
  const webhooks = db.webhooks || [];
  const index = webhooks.findIndex(w => w.id === workflowId);
  if (index !== -1) {
    webhooks[index].stats.processed += 1;
    webhooks[index].stats.delivered += 1; // 100% success rate mock
    webhooks[index].lastCalled = new Date().toLocaleString();
    updateDb({ webhooks });
    return webhooks[index];
  }
  return null;
}

export function updateWebhook(id, updates) {
  const db = getDb();
  const webhooks = db.webhooks || [];
  const index = webhooks.findIndex(w => w.id === id);
  if (index !== -1) {
    webhooks[index] = { ...webhooks[index], ...updates };
    updateDb({ webhooks });
    return webhooks[index];
  }
  return null;
}


export function deleteWebhook(id) {
  const db = getDb();
  const webhooks = db.webhooks || [];
  const filtered = webhooks.filter(w => w.id !== id);
  updateDb({ webhooks: filtered });
  return true;
}

// --- eCommerce Catalogs ---

export function getCatalogs() {
  const db = getDb();
  return db.catalogs || [];
}

export function addCatalog(data) {
  const db = getDb();
  const catalogs = db.catalogs || [];
  const newCatalog = {
    ...data,
    id: crypto.randomUUID(),
    isPublic: true,
    updatedAt: new Date().toLocaleDateString()
  };
  catalogs.push(newCatalog);

  // Seed mock orders for this catalog
  const orders = db.orders || [];
  orders.push({
    id: crypto.randomUUID(),
    orderUniqueId: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    catalogId: newCatalog.id,
    catalogName: newCatalog.name,
    buyer: 'Jane Doe',
    phoneNumber: '+1234567890',
    amount: '450.00',
    currency: 'USD',
    status: 'Pending',
    orderedAt: new Date().toLocaleDateString(),
    shippingAddress: '123 Main St, New York, NY'
  });

  updateDb({ catalogs, orders });
  return newCatalog;
}

export function updateCatalog(id, updates) {
  const db = getDb();
  const catalogs = db.catalogs || [];
  const index = catalogs.findIndex(c => c.id === id);
  if (index !== -1) {
    catalogs[index] = { ...catalogs[index], ...updates, updatedAt: new Date().toLocaleDateString() };
    updateDb({ catalogs });
    return catalogs[index];
  }
  return null;
}

export function deleteCatalog(id) {
  const db = getDb();
  const catalogs = db.catalogs || [];
  const filtered = catalogs.filter(c => c.id !== id);
  // Also delete related orders
  const orders = db.orders || [];
  const filteredOrders = orders.filter(o => o.catalogId !== id);

  updateDb({ catalogs: filtered, orders: filteredOrders });
  return true;
}

// --- eCommerce Orders ---

export function getOrders() {
  const db = getDb();
  return db.orders || [];
}


export function updateOrder(id, updates) {
  const db = getDb();
  const orders = db.orders || [];
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    updateDb({ orders });
    return orders[index];
  }
  return null;
}

// --- Appointments ---

export function getAppointmentCampaigns() {
  const db = getDb();
  return db.appointment_campaigns || [];
}

export function addAppointmentCampaign(data) {
  const db = getDb();
  const campaigns = db.appointment_campaigns || [];
  const newCampaign = {
    ...data,
    id: crypto.randomUUID(),
    isPublic: true,
    updatedAt: new Date().toLocaleDateString()
  };
  campaigns.push(newCampaign);

  // Seed mock bookings for this campaign
  const bookings = db.bookings || [];
  const buyerNames = ['John Doe', 'Alice Wonderland', 'Bob Builder'];
  const now = new Date();

  for (let i = 0; i < 3; i++) {
    bookings.push({
      id: crypto.randomUUID(),
      bookingUniqueId: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      campaignId: newCampaign.id,
      campaignName: newCampaign.name,
      buyer: buyerNames[i],
      phoneNumber: '+1234567890',
      amount: '50.00',
      currency: 'USD',
      status: 'Pending',
      scheduleTime: new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000).toLocaleString(), // days later
      bookedAt: now.toLocaleDateString(),
      paymentMethod: 'Credit Card'
    });
  }

  updateDb({ appointment_campaigns: campaigns, bookings });
  return newCampaign;
}

export function updateAppointmentCampaign(id, updates) {
  const db = getDb();
  const campaigns = db.appointment_campaigns || [];
  const index = campaigns.findIndex(c => c.id === id);
  if (index !== -1) {
    campaigns[index] = { ...campaigns[index], ...updates, updatedAt: new Date().toLocaleDateString() };
    updateDb({ appointment_campaigns: campaigns });
    return campaigns[index];
  }
  return null;
}

export function deleteAppointmentCampaign(id) {
  const db = getDb();
  const campaigns = db.appointment_campaigns || [];
  const filtered = campaigns.filter(c => c.id !== id);
  // Delete related bookings
  const bookings = db.bookings || [];
  const filteredBookings = bookings.filter(b => b.campaignId !== id);

  updateDb({ appointment_campaigns: filtered, bookings: filteredBookings });
  return true;
}

export function getBookings() {
  const db = getDb();
  return db.bookings || [];
}


export function updateBooking(id, updates) {
  const db = getDb();
  const bookings = db.bookings || [];
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    updateDb({ bookings });
    return bookings[index];
  }
  return null;
}

// --- Facebook Connect ---

export function getFacebookPages() {
  const db = getDb();
  return db.facebook_pages || [];
}

export function addFacebookPage(page) {
  const db = getDb();
  const pages = db.facebook_pages || [];
  // Prevent duplicate connections (mock logic)
  if (pages.some(p => p.pageId === page.pageId)) {
    return null;
  }
  const newPage = {
    ...page,
    id: crypto.randomUUID(),
    connectedAt: new Date().toLocaleDateString()
  };
  pages.push(newPage);
  updateDb({ facebook_pages: pages });
  return newPage;
}


export function deleteFacebookPage(id) {
  const db = getDb();
  const pages = db.facebook_pages || [];
  const filtered = pages.filter(p => p.id !== id);
  updateDb({ facebook_pages: filtered });
  return true;
}

// --- Facebook Bot Manager ---

export function getFacebookBots() {
  const db = getDb();
  return db.facebook_bots || [];
}

export function addFacebookBot(bot) {
  const db = getDb();
  const bots = db.facebook_bots || [];
  const newBot = {
    ...bot,
    id: crypto.randomUUID(),
    status: 'Active',
    updatedAt: new Date().toLocaleDateString()
  };
  bots.push(newBot);
  updateDb({ facebook_bots: bots });
  return newBot;
}

export function updateFacebookBot(id, updates) {
  const db = getDb();
  const bots = db.facebook_bots || [];
  const index = bots.findIndex(b => b.id === id);
  if (index !== -1) {
    bots[index] = { ...bots[index], ...updates, updatedAt: new Date().toLocaleDateString() };
    updateDb({ facebook_bots: bots });
    return bots[index];
  }
  return null;
}


export function deleteFacebookBot(id) {
  const db = getDb();
  const bots = db.facebook_bots || [];
  const filtered = bots.filter(b => b.id !== id);
  updateDb({ facebook_bots: filtered });
  return true;
}

// --- Facebook Broadcasting ---

export function getFacebookCampaigns() {
  const db = getDb();
  return db.facebook_campaigns || [];
}

export function addFacebookCampaign(campaign) {
  const db = getDb();
  const campaigns = db.facebook_campaigns || [];

  // Mock stats logic
  const recips = Math.floor(500 + Math.random() * 2000);
  const isScheduled = campaign.scheduledFor && new Date(campaign.scheduledFor) > new Date();

  const newCampaign = {
    ...campaign,
    id: crypto.randomUUID(),
    recipients: recips,
    status: isScheduled ? 'Scheduled' : 'Completed',
    stats: {
      sent: isScheduled ? 0 : recips,
      delivered: isScheduled ? 0 : Math.floor(recips * 0.98),
      openRate: isScheduled ? 0 : (Math.floor(70 + Math.random() * 20) + '%')
    },
    createdAt: new Date().toLocaleDateString()
  };

  campaigns.push(newCampaign);
  updateDb({ facebook_campaigns: campaigns });
  return newCampaign;
}

// --- Comments Automation ---

export function getFacebookPosts() {
  const db = getDb();
  if (!db.facebook_posts) {
    const initialPosts = [
      { id: 'p1', description: "Check out our new summer collection! ☀️", likes: 120, comments: 45, thumbnail: null, createdAt: "Oct 10, 2024" },
      { id: 'p2', description: "We are hiring! Join our team today.", likes: 350, comments: 89, thumbnail: null, createdAt: "Oct 12, 2024" },
      { id: 'p3', description: "Flash Sale starts in 1 hour! ⏰", likes: 500, comments: 120, thumbnail: null, createdAt: "Oct 15, 2024" }
    ];
    updateDb({ facebook_posts: initialPosts });
    return initialPosts;
  }

  // Merge with configs
  const posts = db.facebook_posts;
  const configs = db.auto_replies || [];

  return posts.map(p => {
    const config = configs.find(c => c.postId === p.id);
    return { ...p, autoReply: config || { enabled: false, replyText: '' } };
  });
}

export function updateAutoReplyConfig(postId, config) {
  const db = getDb();
  let configs = db.auto_replies || [];
  const index = configs.findIndex(c => c.postId === postId);

  if (index !== -1) {
    configs[index] = { ...configs[index], ...config };
  } else {
    configs.push({ postId, ...config });
  }

  updateDb({ auto_replies: configs });
  return configs.find(c => c.postId === postId);
}

// --- Instagram Connect ---

export function getInstagramAccounts() {
  const db = getDb();
  return db.instagram_accounts || [];
}

export function addInstagramAccount(account) {
  const db = getDb();
  const accounts = db.instagram_accounts || [];
  // Prevent duplicates
  if (accounts.some(a => a.username === account.username)) {
    return null;
  }

  const newAccount = {
    ...account,
    id: crypto.randomUUID(),
    connectedAt: new Date().toLocaleDateString()
  };
  accounts.push(newAccount);
  updateDb({ instagram_accounts: accounts });
  return newAccount;
}


export function deleteInstagramAccount(id) {
  const db = getDb();
  const accounts = db.instagram_accounts || [];
  const filtered = accounts.filter(a => a.id !== id);
  updateDb({ instagram_accounts: filtered });
  return true;
}

// --- Instagram Bot Manager ---

export function getInstagramBots() {
  const db = getDb();
  return db.instagram_bots || [];
}

export function addInstagramBot(bot) {
  const db = getDb();
  const bots = db.instagram_bots || [];
  const newBot = {
    ...bot,
    id: crypto.randomUUID(),
    status: 'Active',
    updatedAt: new Date().toLocaleDateString()
  };
  bots.push(newBot);
  updateDb({ instagram_bots: bots });
  return newBot;
}

export function updateInstagramBot(id, updates) {
  const db = getDb();
  const bots = db.instagram_bots || [];
  const index = bots.findIndex(b => b.id === id);
  if (index !== -1) {
    bots[index] = { ...bots[index], ...updates, updatedAt: new Date().toLocaleDateString() };
    updateDb({ instagram_bots: bots });
    return bots[index];
  }
  return null;
}


export function deleteInstagramBot(id) {
  const db = getDb();
  const bots = db.instagram_bots || [];
  const filtered = bots.filter(b => b.id !== id);
  updateDb({ instagram_bots: filtered });
  return true;
}

// --- Instagram Automation ---

export function getInstagramPosts() {
  const db = getDb();
  if (!db.instagram_posts) {
    const initialPosts = [
      { id: 'ip1', description: "Loving this new vibe! 📸 #summer", likes: 520, comments: 34, thumbnail: null, createdAt: "Oct 12, 2024" },
      { id: 'ip2', description: "New product drop tomorrow! Stay tuned.", likes: 890, comments: 112, thumbnail: null, createdAt: "Oct 14, 2024" },
      { id: 'ip3', description: "Behind the scenes at the office.", likes: 210, comments: 15, thumbnail: null, createdAt: "Oct 18, 2024" }
    ];
    updateDb({ instagram_posts: initialPosts });
    return initialPosts;
  }

  // Merge with configs
  const posts = db.instagram_posts;
  const configs = db.auto_replies || [];

  return posts.map(p => {
    const config = configs.find(c => c.postId === p.id);
    return { ...p, autoReply: config || { enabled: false, replyText: '' } };
  });
}

// --- Settings ---

export function getUserProfile() {
  const db = getDb();
  if (!db.user_profile) {
    const initialProfile = {
      name: "Gelo doy",
      email: "gelodoy360@drenar.com",
      phone: "",
      address: "",
      timezone: "kolkata",
      language: "english",
      translationLanguage: "abkhazian",
      twoFactorEnabled: false
    };
    updateDb({ user_profile: initialProfile });
    return initialProfile;
  }
  return db.user_profile;
}

export function updateUserProfile(updates) {
  const db = getDb();
  const current = getUserProfile();
  const updated = { ...current, ...updates };
  updateDb({ user_profile: updated });
  return updated;
}

export function getUsageStats() {
  // Mock usage stats
  return [
    { id: 1, module: "Connect Account", limit: "3", used: "1" },
    { id: 2, module: "Message Credit", limit: "200", used: "45" },
    { id: 3, module: "Bot Typing On Display", limit: "No Limit Applicable", used: "-" },
    { id: 4, module: "Subscribers", limit: "200", used: "12" },
    { id: 5, module: "Bot Message Insight", limit: "No Limit Applicable", used: "-" },
    { id: 6, module: "Bot Conditional Reply", limit: "No Limit Applicable", used: "-" },
    { id: 7, module: "Bot AI Token", limit: "1000", used: "150" },
    { id: 8, module: "Input Flow Campaign", limit: "No Limit Applicable", used: "-" },
  ];
}

// --- Permissions ---

export function getRolePermissions() {
  const db = getDb();
  if (!db.role_permissions) {
    const initialPermissions = [
      { module: "Dashboard", admin: true, agent: true, viewer: true },
      { module: "Conversations", admin: true, agent: true, viewer: false },
      { module: "Customers", admin: true, agent: true, viewer: true },
      { module: "Bot Manager", admin: true, agent: false, viewer: false },
      { module: "Broadcasting", admin: true, agent: false, viewer: false },
      { module: "Settings", admin: true, agent: false, viewer: false },
    ];
    updateDb({ role_permissions: initialPermissions });
    return initialPermissions;
  }
  return db.role_permissions;
}

export function updateRolePermissions(newPermissions) {
  updateDb({ role_permissions: newPermissions });
  return newPermissions;
}

// --- User Manager ---

export function getManagedUsers() {
  const db = getDb();
  if (!db.managed_users) {
    const initialUsers = [
      { id: 'u1', name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", package: "Pro", expiry: "2026-01-01", created: "2025-01-01", lastLogin: "2m ago" },
      { id: 'u2', name: "Jane Smith", email: "jane@example.com", role: "Agent", status: "Active", package: "Basic", expiry: "2025-06-01", created: "2025-02-15", lastLogin: "1d ago" }
    ];
    updateDb({ managed_users: initialUsers });
    return initialUsers;
  }
  return db.managed_users;
}

export function createManagedUser(user) {
  const db = getDb();
  const users = db.managed_users || [];
  const newUser = {
    ...user,
    id: 'u' + Date.now(),
    created: new Date().toLocaleDateString(),
    lastLogin: 'Never'
  };
  updateDb({ managed_users: [...users, newUser] });
  return newUser;
}

export function deleteManagedUser(id) {
  const db = getDb();
  const users = db.managed_users || [];
  updateDb({ managed_users: users.filter(u => u.id !== id) });
  return true;
}

// --- Addon Manager ---

export function getAddons() {
  const db = getDb();
  if (!db.addons) {
    const initialAddons = [
      { id: 1, name: "Facebook Poster", desc: "Auto-post text, image, link, video to Facebook Pages & Groups.", price: "$19/mo", icon: "Facebook", color: "#1877f2", status: "active", version: "2.1.0" },
      { id: 2, name: "Instagram Auto Reply", desc: "Automatically reply to comments and mentions on Instagram.", price: "$25/mo", icon: "Instagram", color: "#E1306C", status: "available", version: "1.5.3" },
      { id: 3, name: "Sms Broadcasting", desc: "Send bulk SMS to your subscribers via Twilio/Nexmo.", price: "Free", icon: "MessageCircle", color: "#10b981", status: "installed", version: "3.0.1" },
      { id: 4, name: "WooCommerce Connection", desc: "Sync products and recover abandoned carts automatically.", price: "$39/mo", icon: "ShoppingCart", color: "#965df4", status: "available", version: "4.2.0" },
      { id: 5, name: "Stripe Payments", desc: "Collect payments directly within WhatsApp chat flow.", price: "$29/mo", icon: "CreditCard", color: "#635bff", status: "active", version: "2.0.0" },
      { id: 6, name: "Advanced Analytics", desc: "Detailed reports on subscriber growth and message delivery.", price: "$15/mo", icon: "BarChart3", color: "#f59e0b", status: "available", version: "1.2.0" },
      { id: 7, name: "AI Content Generator", desc: "Generate reply templates using OpenAI GPT-4.", price: "$49/mo", icon: "Zap", color: "#ef4444", status: "available", version: "1.0.0" },
      { id: 8, name: "Bot Template Manager", desc: "Import/Export bot flows and manage templates.", price: "Free", icon: "Bot", color: "#3b82f6", status: "installed", version: "1.1.5" }
    ];
    updateDb({ addons: initialAddons });
    return initialAddons;
  }
  return db.addons;
}

export function updateAddonStatus(id, status) {
  const db = getDb();
  const addons = db.addons || [];
  const updated = addons.map(addon =>
    addon.id === id ? { ...addon, status } : addon
  );
  updateDb({ addons: updated });
  return updated.find(a => a.id === id);
}

// --- Notifications ---

export function getNotifications() {
  const db = getDb();
  if (!db.notifications) {
    const initialNotifications = [
      { id: 'n1', title: "Welcome to WhatChat", message: "Thanks for joining! Set up your first bot now.", time: "2m ago", read: false, type: 'success' },
      { id: 'n2', title: "System Update", message: "New features added to Bot Manager.", time: "1h ago", read: false, type: 'info' },
      { id: 'n3', title: "Subscription Expiring", message: "Your trial expires in 7 days.", time: "1d ago", read: true, type: 'warning' }
    ];
    updateDb({ notifications: initialNotifications });
    return initialNotifications;
  }
  return db.notifications;
}

export function markNotificationRead(id) {
  const db = getDb();
  const notifications = db.notifications || [];
  const updated = notifications.map(n =>
    n.id === id ? { ...n, read: true } : n
  );
  updateDb({ notifications: updated });
  return true;
}

export function markAllNotificationsRead() {
  const db = getDb();
  const notifications = db.notifications || [];
  const updated = notifications.map(n => ({ ...n, read: true }));
  updateDb({ notifications: updated });
  return true;
}
