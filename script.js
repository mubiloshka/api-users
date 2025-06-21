let filteredUsers = users;
let isDarkMode = false;

function renderUsers(usersToRender) {
    const usersGrid = document.getElementById('usersGrid');
    
    if (usersToRender.length === 0) {
        usersGrid.innerHTML = '<div class="no-results">No users found matching your search.</div>';
        return;
    }

    usersGrid.innerHTML = usersToRender.map(user => `
        <div class="user-card">
            <div class="user-header">
                <div class="user-avatar"></div>
                <div class="user-name">${user.name}</div>
            </div>
            <div class="user-info">
                <div class="info-item">
                    <div class="info-icon email-icon"></div>
                    <span>${user.email}</span>
                </div>
                <div class="info-item">
                    <div class="info-icon phone-icon"></div>
                    <span>${user.phone}</span>
                </div>
                <div class="info-item">
                    <div class="info-icon location-icon"></div>
                    <span>${user.address.city}, ${user.address.street}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function searchUsers(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredUsers = users;
    } else {
        filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.toLowerCase().includes(searchTerm) ||
            user.address.city.toLowerCase().includes(searchTerm) ||
            user.address.street.toLowerCase().includes(searchTerm)
        );
    }
    
    renderUsers(filteredUsers);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (isDarkMode) {
        body.classList.add('dark');
        themeToggle.innerHTML = '☀️ Light Mode';
    } else {
        body.classList.remove('dark');
        themeToggle.innerHTML = '🌙 Dark Mode';
    }
}

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchUsers(e.target.value);
    });

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Initial render
    renderUsers(users);
});