// =============================================
// InternHub - Shared Utilities
// =============================================

const API_BASE = 'http://localhost:8080';

function getAuth() {
    return localStorage.getItem('authToken');
}

function getRole() {
    return localStorage.getItem('userRole') || '';
}

function getEmail() {
    return localStorage.getItem('userEmail') || '';
}

function isLoggedIn() {
    return !!getAuth();
}

function logout() {
    localStorage.clear();
    window.location.href = '/login.html';
}

async function apiGet(url) {
    const res = await fetch(API_BASE + url, {
        headers: { 'Authorization': getAuth(), 'Content-Type': 'application/json' }
    });
    if (res.status === 401) { logout(); return null; }
    return res.json();
}

async function apiPost(url, data) {
    const res = await fetch(API_BASE + url, {
        method: 'POST',
        headers: { 'Authorization': getAuth(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return { status: res.status, data: await res.json() };
}

async function apiPut(url, data) {
    const res = await fetch(API_BASE + url, {
        method: 'PUT',
        headers: { 'Authorization': getAuth(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return { status: res.status, data: await res.json() };
}

async function apiDelete(url) {
    const res = await fetch(API_BASE + url, {
        method: 'DELETE',
        headers: { 'Authorization': getAuth() }
    });
    return { status: res.status, data: await res.json() };
}

function showToast(message, type = 'success') {
    const existing = document.getElementById('toastContainer');
    if (existing) existing.remove();
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;';
    const bg = type === 'success' ? '#198754' : type === 'error' ? '#dc3545' : '#0d6efd';
    container.innerHTML = `
        <div style="background:${bg};color:white;padding:14px 22px;border-radius:8px;
            box-shadow:0 4px 20px rgba(0,0,0,0.2);font-size:0.95rem;min-width:250px;
            display:flex;align-items:center;gap:10px;animation:slideIn 0.3s ease;">
            <i class="bi bi-${type==='success'?'check-circle':'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>`;
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 3500);
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusBadge(status) {
    const map = {
        'APPLIED': 'bg-primary',
        'SHORTLISTED': 'bg-warning text-dark',
        'SELECTED': 'bg-success',
        'REJECTED': 'bg-danger',
        'WITHDRAWN': 'bg-secondary',
        'DRAFT': 'bg-secondary',
        'PUBLISHED': 'bg-success',
        'CLOSED': 'bg-dark',
        'PENDING': 'bg-warning text-dark',
        'VERIFIED': 'bg-success',
        'SUSPENDED': 'bg-danger'
    };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${status}</span>`;
}

// Guard pages by role
function requireRole(role) {
    if (!isLoggedIn()) { window.location.href = '/login.html'; return; }
    if (!getRole().includes(role)) { window.location.href = '/login.html'; }
}
