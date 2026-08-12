import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { withBase } from '../lib/paths';

const emptyForm = { title: '', category: 'Hotel Operations', description: '', imageUrl: '', altText: '', featured: false };
const categories = ['Hotel Operations', 'Project Advisory', 'Food & Beverage', 'People & Culture', 'Events', 'Other'];

export default function DashboardPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('ad_admin_token') || '');
  const [admin, setAdmin] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  async function loadItems() {
    const payload = await apiRequest('/api/gallery');
    setItems(payload.items);
  }

  useEffect(() => {
    if (!token) return;
    apiRequest('/api/admin/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((profile) => setAdmin(profile.admin))
      .catch(() => {
        sessionStorage.removeItem('ad_admin_token');
        setToken('');
        setAdmin(null);
      });

    apiRequest('/api/gallery')
      .then((gallery) => setItems(gallery.items))
      .catch((error) => setMessage({ type: 'error', text: `Signed in successfully. ${error.message}` }));
  }, [token]);

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setMessage({ type: '', text: '' });
    try {
      const payload = await apiRequest('/api/admin/login', { method: 'POST', body: JSON.stringify(credentials) });
      sessionStorage.setItem('ad_admin_token', payload.token);
      setToken(payload.token);
      setAdmin(payload.admin);
      setCredentials({ username: '', password: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    sessionStorage.removeItem('ad_admin_token');
    setToken('');
    setAdmin(null);
    setItems([]);
    setForm(emptyForm);
    setEditingId('');
  }

  function chooseFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 1_500_000) {
      setMessage({ type: 'error', text: 'Choose a JPG, PNG, or WebP image smaller than 1.5 MB.' });
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  }

  async function saveItem(event) {
    event.preventDefault();
    setBusy(true);
    setMessage({ type: '', text: '' });
    try {
      await apiRequest(editingId ? `/api/admin/gallery/${editingId}` : '/api/admin/gallery', {
        method: editingId ? 'PATCH' : 'POST',
        headers: authHeaders,
        body: JSON.stringify(form),
      });
      await loadItems();
      setForm(emptyForm);
      setEditingId('');
      setMessage({ type: 'success', text: editingId ? 'Gallery entry updated.' : 'Gallery entry published.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setBusy(false);
    }
  }

  function editItem(item) {
    setEditingId(item._id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      imageUrl: item.imageUrl,
      altText: item.altText || '',
      featured: Boolean(item.featured),
    });
    setMessage({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteItem(item) {
    if (!window.confirm(`Delete “${item.title}” from the gallery?`)) return;
    setBusy(true);
    try {
      await apiRequest(`/api/admin/gallery/${item._id}`, { method: 'DELETE', headers: authHeaders });
      await loadItems();
      if (editingId === item._id) {
        setEditingId('');
        setForm(emptyForm);
      }
      setMessage({ type: 'success', text: 'Gallery entry deleted.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setBusy(false);
    }
  }

  if (!token || !admin) {
    return (
      <section className="dashboard-login">
        <div className="dashboard-login-card">
          <div className="dashboard-login-brand"><span>AD</span><div><strong>AD Brothers</strong><small>Gallery administration</small></div></div>
          <p className="kicker">Secure access</p>
          <h1>Welcome back.</h1>
          <p>Sign in to publish and manage images shown on the public Gallery page.</p>
          <form onSubmit={login}>
            <label><span>Username</span><input value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} autoComplete="username" required /></label>
            <label><span>Password</span><input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} autoComplete="current-password" required /></label>
            {message.text && <p className={`dashboard-message ${message.type}`}>{message.text}</p>}
            <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}<span>↗</span></button>
          </form>
          <a href={withBase('/')} data-route>← Return to website</a>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-topbar">
        <div><span>AD</span><div><strong>Gallery dashboard</strong><small>Signed in as {admin.username}</small></div></div>
        <div><a href={withBase('/gallery')} data-route>View public gallery ↗</a><button type="button" onClick={logout}>Sign out</button></div>
      </div>

      <div className="dashboard-shell">
        <aside className="dashboard-summary">
          <p className="kicker">Content manager</p>
          <h1>{editingId ? 'Edit gallery entry.' : 'Publish new work.'}</h1>
          <p>Images and details saved here are stored in MongoDB Atlas and appear on the public website.</p>
          <div><strong>{items.length}</strong><span>Published entries</span></div>
        </aside>

        <div className="dashboard-workspace">
          <form className="dashboard-form" onSubmit={saveItem}>
            <div className="dashboard-form-head"><div><span>{editingId ? 'Editing entry' : 'New gallery entry'}</span><h2>{editingId ? form.title : 'Add image and details'}</h2></div>{editingId && <button type="button" onClick={() => { setEditingId(''); setForm(emptyForm); }}>Cancel edit</button>}</div>
            <div className="dashboard-fields">
              <label><span>Title *</span><input maxLength="120" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
              <label><span>Category *</span><select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className="full"><span>Description</span><textarea rows="4" maxLength="500" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
              <label className="full"><span>Image URL</span><input type="url" placeholder="https://example.com/image.jpg" value={form.imageUrl.startsWith('data:') ? '' : form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></label>
              <div className="dashboard-upload full"><span>Or upload image *</span><label><input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseFile} /><b>Choose JPG, PNG or WebP</b><small>Maximum file size: 1.5 MB</small></label></div>
              {form.imageUrl && <div className="dashboard-preview full"><img src={form.imageUrl} alt="Gallery preview" /><button type="button" onClick={() => setForm({ ...form, imageUrl: '' })}>Remove image</button></div>}
              <label className="full"><span>Image description for accessibility</span><input maxLength="180" value={form.altText} onChange={(event) => setForm({ ...form, altText: event.target.value })} placeholder="Describe what is visible in the image" /></label>
              <label className="dashboard-check full"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /><span>Feature this entry at the beginning of the gallery</span></label>
            </div>
            {message.text && <p className={`dashboard-message ${message.type}`}>{message.text}</p>}
            <button className="dashboard-publish" type="submit" disabled={busy || !form.imageUrl}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Publish to gallery'}<span>↗</span></button>
          </form>

          <div className="dashboard-list">
            <div className="dashboard-list-head"><div><span>Published content</span><h2>Gallery entries</h2></div><strong>{items.length}</strong></div>
            {items.length === 0 ? <p className="dashboard-empty">No entries yet. Publish the first gallery image above.</p> : items.map((item) => (
              <article key={item._id}>
                <img src={item.imageUrl} alt="" />
                <div><small>{item.category}{item.featured ? ' · Featured' : ''}</small><strong>{item.title}</strong></div>
                <button type="button" onClick={() => editItem(item)}>Edit</button>
                <button type="button" className="danger" onClick={() => deleteItem(item)}>Delete</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
