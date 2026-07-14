'use client';

import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Calendar, Users, ImagePlus, Loader2, Trash2, Image as ImageIcon, MessageSquare, Edit2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

// Hardcoded users from request
const ADMIN_USERS = [
  { email: 'flyggoagency@gmail.com', pass: 'Flyggo@8' },
  { email: 'akg3sva@gmail.com', pass: 'Flexjwss@24' }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Tabs: 'bookings' | 'events' | 'gallery' | 'stories'
  const [activeTab, setActiveTab] = useState<'bookings' | 'events' | 'gallery' | 'stories'>('bookings');

  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [eventForm, setEventForm] = useState({ image: '', date: '', description: '', posterPlace: '', contact: '' });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isUploadingEventImage, setIsUploadingEventImage] = useState(false);

  const [storyForm, setStoryForm] = useState({ name: '', rating: 5, text: '' });
  const [isSubmittingStory, setIsSubmittingStory] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);

  const [galleryTitle, setGalleryTitle] = useState('');
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'bookings') fetchBookings();
      if (activeTab === 'events') fetchEvents();
      if (activeTab === 'gallery') fetchGallery();
      if (activeTab === 'stories') fetchStories();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = ADMIN_USERS.some(u => u.email === loginForm.email && u.pass === loginForm.password);
    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
      fetchBookings();
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // --- FETCHING LOGIC ---
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
    setIsLoading(false);
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching events", error);
    }
    setIsLoading(false);
  };

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching gallery", error);
    }
    setIsLoading(false);
  };

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, getDocs, query, orderBy, addDoc, serverTimestamp } = await import('firebase/firestore');
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        const defaults = [
          { name: "Rahul S.", rating: 5, text: "The Glass House is surreal! Best weekend getaway we've had in years. The views at sunrise are incredible." },
          { name: "Priya M.", rating: 5, text: "Incredibly peaceful. The staff is so welcoming and the food is just amazing authentic South Indian." },
          { name: "Arun K.", rating: 4, text: "Loved the family tent experience. Kids had a great time around the campfire and the morning trek." }
        ];
        for (const story of defaults) {
          await addDoc(collection(db, 'testimonials'), { ...story, createdAt: serverTimestamp() });
        }
        const newSnapshot = await getDocs(q);
        setStories(newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error("Error fetching stories", error);
    }
    setIsLoading(false);
  };

  const deleteDocItem = async (collectionName: string, id: string, fetchFn: () => void) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      const { db } = await import('@/lib/firebase');
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(db, collectionName, id));
      fetchFn();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  // --- CLOUDINARY UPLOAD LOGIC ---
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'woodside_events'); // Using the unsigned preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/bali5bin/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      alert('Image upload failed. Ensure you have created the "woodside_events" unsigned upload preset in Cloudinary settings.');
      return null;
    }
  };

  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingEventImage(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      setEventForm(prev => ({ ...prev, image: url }));
    }
    setIsUploadingEventImage(false);
  };

  const submitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'events'), { ...eventForm, createdAt: serverTimestamp() });
      alert('Event added successfully!');
      setEventForm({ image: '', date: '', description: '', posterPlace: '', contact: '' });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event", error);
      alert('Failed to add event');
    }
    setIsSubmittingEvent(false);
  };

  const submitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingStory(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      
      if (editingStoryId) {
        await updateDoc(doc(db, 'testimonials', editingStoryId), { ...storyForm });
        alert('Story updated successfully!');
      } else {
        await addDoc(collection(db, 'testimonials'), { ...storyForm, createdAt: serverTimestamp() });
        alert('Story added successfully!');
      }
      
      setStoryForm({ name: '', rating: 5, text: '' });
      setEditingStoryId(null);
      fetchStories();
    } catch (error) {
      console.error("Error saving story", error);
      alert('Failed to save story');
    }
    setIsSubmittingStory(false);
  };


  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingGallery(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      try {
        const { db } = await import('@/lib/firebase');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'gallery'), {
          src: url,
          title: galleryTitle || 'Gallery Image',
          colSpan: 'col-span-1',
          rowSpan: 'row-span-1',
          createdAt: serverTimestamp()
        });
        setGalleryTitle('');
        fetchGallery();
      } catch (error) {
        console.error("Error saving gallery image to Firebase", error);
        alert('Failed to save to database');
      }
    }
    setIsUploadingGallery(false);
    // Reset file input
    e.target.value = '';
  };

  if (!isClient) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-woodside-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-woodside-800/20 via-woodside-950/80 to-woodside-950"></div>
        <div className="bg-woodside-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-woodside-800/50 p-4 rounded-full">
              <Lock className="w-8 h-8 text-woodside-200" />
            </div>
          </div>
          <h1 className="text-2xl font-serif text-white text-center mb-2">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4 mt-8">
            <div>
              <input type="email" placeholder="Admin Email" required value={loginForm.email} onChange={e => setLoginForm(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" />
            </div>
            <div>
              <input type="password" placeholder="Password" required value={loginForm.password} onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" />
            </div>
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-white text-woodside-950 font-bold rounded-xl py-3 mt-4 hover:bg-woodside-100 transition-colors">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-woodside-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-woodside-900/40 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-serif font-bold tracking-widest uppercase">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-woodside-800 text-white shadow-lg' : 'text-woodside-300 hover:bg-woodside-800/50 hover:text-white'}`}>
            <Users className="w-5 h-5" /> Bookings
          </button>
          <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'events' ? 'bg-woodside-800 text-white shadow-lg' : 'text-woodside-300 hover:bg-woodside-800/50 hover:text-white'}`}>
            <Calendar className="w-5 h-5" /> Events
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'gallery' ? 'bg-woodside-800 text-white shadow-lg' : 'text-woodside-300 hover:bg-woodside-800/50 hover:text-white'}`}>
            <ImageIcon className="w-5 h-5" /> Gallery
          </button>
          <button onClick={() => setActiveTab('stories')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stories' ? 'bg-woodside-800 text-white shadow-lg' : 'text-woodside-300 hover:bg-woodside-800/50 hover:text-white'}`}>
            <MessageSquare className="w-5 h-5" /> Stories
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-serif mb-2">Booking Requests</h2>
                  <p className="text-woodside-300 text-sm">View all inquiries submitted through the website.</p>
                </div>
                <button onClick={fetchBookings} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">Refresh</button>
              </div>

              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-woodside-400" /></div>
              ) : bookings.length === 0 ? (
                <div className="bg-woodside-900/30 border border-white/5 rounded-2xl p-12 text-center text-woodside-300">No bookings found.</div>
              ) : (
                <div className="bg-woodside-900/30 border border-white/5 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-woodside-800/50 uppercase tracking-wider text-xs text-woodside-300">
                      <tr>
                        <th className="px-6 py-4 font-medium">Date Created</th>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Stay Type</th>
                        <th className="px-6 py-4 font-medium">Dates</th>
                        <th className="px-6 py-4 font-medium">Guests</th>
                        <th className="px-6 py-4 font-medium">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-woodside-300">{b.createdAt?.toDate ? b.createdAt.toDate().toLocaleDateString() : 'Just now'}</td>
                          <td className="px-6 py-4 font-medium text-white">{b.name}</td>
                          <td className="px-6 py-4"><span className="bg-woodside-800 px-3 py-1 rounded-full text-xs border border-white/10">{b.stayType}</span></td>
                          <td className="px-6 py-4 text-woodside-200">{b.checkIn} to {b.checkOut}</td>
                          <td className="px-6 py-4">{b.guests}</td>
                          <td className="px-6 py-4 text-woodside-300"><div>{b.phone}</div><div className="text-xs text-woodside-400">{b.email}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif mb-2">Manage Events</h2>
              <p className="text-woodside-300 text-sm mb-8">Add new upcoming events to display on the public Events page.</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <form onSubmit={submitEvent} className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6 space-y-4 sticky top-10">
                    <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-4">Add New Event</h3>
                    
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-woodside-300 mb-2">Event Image</label>
                      {eventForm.image ? (
                        <div className="relative rounded-xl overflow-hidden h-40 border border-white/10 mb-2">
                          <img src={eventForm.image} alt="Upload preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setEventForm(prev => ({...prev, image: ''}))} className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <label className="w-full h-24 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-woodside-300 hover:text-white hover:border-white/40 transition-colors bg-white/5 cursor-pointer">
                          {isUploadingEventImage ? (
                            <Loader2 className="w-6 h-6 mb-2 animate-spin" />
                          ) : (
                            <ImagePlus className="w-6 h-6 mb-2" />
                          )}
                          <span className="text-xs">{isUploadingEventImage ? 'Uploading...' : 'Upload Image'}</span>
                          <input type="file" accept="image/*" onChange={handleEventImageUpload} className="hidden" disabled={isUploadingEventImage} />
                        </label>
                      )}
                    </div>

                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Event Date</label><input type="text" placeholder="e.g. 24th Dec, 2026" value={eventForm.date} onChange={e => setEventForm(prev => ({...prev, date: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" /></div>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Description</label><textarea placeholder="Event details..." rows={3} value={eventForm.description} onChange={e => setEventForm(prev => ({...prev, description: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500 resize-none"></textarea></div>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Poster / Place</label><input type="text" placeholder="e.g. Woodside Serene Farm" value={eventForm.posterPlace} onChange={e => setEventForm(prev => ({...prev, posterPlace: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" /></div>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Contact</label><input type="text" placeholder="e.g. +91 98407 41075" value={eventForm.contact} onChange={e => setEventForm(prev => ({...prev, contact: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" /></div>

                    <button disabled={isSubmittingEvent} type="submit" className="w-full bg-white text-woodside-950 font-bold py-3 rounded-xl hover:bg-woodside-100 transition-colors flex items-center justify-center disabled:opacity-50 mt-4">
                      {isSubmittingEvent ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Event'}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6">
                    <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-4 flex justify-between items-center">Published Events <button onClick={fetchEvents} className="text-sm font-sans bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Refresh</button></h3>
                    {isLoading ? <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-woodside-400" /></div> : events.length === 0 ? <div className="text-center p-8 text-woodside-400 text-sm">No events published yet.</div> : (
                      <div className="space-y-4">
                        {events.map(event => (
                          <div key={event.id} className="flex flex-col sm:flex-row gap-4 bg-woodside-950/50 p-4 rounded-xl border border-white/5">
                            {event.image ? <img src={event.image} alt="Event" className="w-full sm:w-32 h-24 object-cover rounded-lg" /> : <div className="w-full sm:w-32 h-24 bg-woodside-800 rounded-lg flex items-center justify-center text-woodside-400"><ImagePlus className="w-6 h-6" /></div>}
                            <div className="flex-1">
                              <div className="flex justify-between items-start"><h4 className="font-bold text-white mb-1">{event.date || 'No Date'}</h4><button onClick={() => deleteDocItem('events', event.id, fetchEvents)} className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button></div>
                              <p className="text-sm text-woodside-300 mb-2 line-clamp-2">{event.description || 'No description'}</p>
                              <div className="flex gap-4 text-xs text-woodside-400">{event.posterPlace && <span>📍 {event.posterPlace}</span>}{event.contact && <span>📞 {event.contact}</span>}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif mb-2">Manage Gallery</h2>
              <p className="text-woodside-300 text-sm mb-8">Add new images to your website gallery. Existing hardcoded images will not be affected.</p>

              <div className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs uppercase tracking-widest text-woodside-300 mb-2">Optional Title</label>
                  <input type="text" placeholder="e.g. Beautiful Morning at the Farm" value={galleryTitle} onChange={e => setGalleryTitle(e.target.value)} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" />
                </div>
                <div className="w-full md:w-auto">
                  <label className={`w-full md:w-64 h-12 rounded-xl flex items-center justify-center text-woodside-950 font-bold transition-colors cursor-pointer ${isUploadingGallery ? 'bg-woodside-300' : 'bg-white hover:bg-woodside-100'}`}>
                    {isUploadingGallery ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
                    ) : (
                      <><ImagePlus className="w-5 h-5 mr-2" /> Select Image to Add</>
                    )}
                    <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" disabled={isUploadingGallery} />
                  </label>
                </div>
              </div>

              <div className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6">
                <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-6 flex justify-between items-center">
                  Newly Added Gallery Images
                  <button onClick={fetchGallery} className="text-sm font-sans bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Refresh</button>
                </h3>
                
                {isLoading ? (
                  <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-woodside-400" /></div>
                ) : gallery.length === 0 ? (
                  <div className="text-center p-12 bg-woodside-950/50 rounded-xl border border-white/5 text-woodside-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No custom images added yet.</p>
                    <p className="text-sm mt-1">The 58 original images are still visible on the website.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map(img => (
                      <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10">
                        <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-woodside-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-sm font-bold text-white mb-3 truncate w-full">{img.title}</p>
                          <button onClick={() => deleteDocItem('gallery', img.id, fetchGallery)} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STORIES TAB */}
          {activeTab === 'stories' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif mb-2">Guest Stories</h2>
              <p className="text-woodside-300 text-sm mb-8">Add or remove guest testimonials shown on the homepage.</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <form onSubmit={submitStory} className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6 space-y-4 sticky top-10">
                    <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-4">Add New Story</h3>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Guest Name</label><input type="text" required placeholder="e.g. Rahul S." value={storyForm.name} onChange={e => setStoryForm(prev => ({...prev, name: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" /></div>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Rating (1 to 5)</label><input type="number" min="1" max="5" required value={storyForm.rating} onChange={e => setStoryForm(prev => ({...prev, rating: parseInt(e.target.value)}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500" /></div>
                    <div><label className="block text-xs uppercase tracking-widest text-woodside-300 mb-1">Review Text</label><textarea required placeholder="Their review..." rows={4} value={storyForm.text} onChange={e => setStoryForm(prev => ({...prev, text: e.target.value}))} className="w-full bg-woodside-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-woodside-500 resize-none"></textarea></div>

                    <button disabled={isSubmittingStory} type="submit" className="w-full bg-white text-woodside-950 font-bold py-3 rounded-xl hover:bg-woodside-100 transition-colors flex items-center justify-center disabled:opacity-50 mt-4">
                      {isSubmittingStory ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingStoryId ? 'Update Story' : 'Publish Story')}
                    </button>
                    {editingStoryId && (
                      <button type="button" onClick={() => { setStoryForm({ name: '', rating: 5, text: '' }); setEditingStoryId(null); }} className="w-full bg-woodside-800 text-white font-bold py-3 rounded-xl hover:bg-woodside-700 transition-colors mt-2 text-sm">
                        Cancel Edit
                      </button>
                    )}
                  </form>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-woodside-900/30 border border-white/5 rounded-2xl p-6">
                    <h3 className="font-serif text-xl border-b border-white/5 pb-4 mb-4 flex justify-between items-center">Published Stories <button onClick={fetchStories} className="text-sm font-sans bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">Refresh</button></h3>
                    {isLoading ? <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-woodside-400" /></div> : stories.length === 0 ? (
                      <div className="text-center p-8 text-woodside-400 text-sm flex flex-col items-center">
                        <p className="mb-4">No stories added yet. Published stories will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {stories.map(story => (
                          <div key={story.id} className="bg-woodside-950/50 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-white font-serif">{story.name}</h4>
                                <div className="text-yellow-500 text-xs">{'★'.repeat(story.rating || 5)}</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => { setStoryForm({ name: story.name, rating: story.rating, text: story.text }); setEditingStoryId(story.id); window.scrollTo(0, 0); }} className="text-blue-400 hover:text-blue-300 p-1.5 bg-blue-400/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => deleteDocItem('testimonials', story.id, fetchStories)} className="text-red-400 hover:text-red-300 p-1.5 bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                            <p className="text-sm text-woodside-300 italic">"{story.text}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
