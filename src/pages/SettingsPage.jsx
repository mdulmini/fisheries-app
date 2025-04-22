import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaTimes, FaCheckCircle, FaSort, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import styles from '../styles/SettingsPage.module.css';
import logo from '../assets/logo.png';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    profilePicture: 'src/assets/p-bg.avif',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: false,
  });
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      role: 'Fisher',
      status: 'Active',
      profilePicture: 'src/assets/ravi.jpg',
    },
    {
      id: 2,
      name: 'Michael Fernando',
      email: 'michael.fernando@example.com',
      role: 'Editor',
      status: 'Active',
      profilePicture: 'src/assets/michael.jpg',
    },
  ]);
  const [integrations, setIntegrations] = useState({
    paypal: true,
    twilio: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Editor',
    status: 'Active',
    profilePicture: 'src/assets/p-bg.avif',
  });


  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  console.log('Active Section:', activeSection);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfile({ ...profile, profilePicture: 'src/assets/p-bg.avif' });
    setSuccessMessage('Profile picture deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveProfile = () => {
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.phone) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    setSuccessMessage('Changes saved successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNotificationToggle = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
    setSuccessMessage(
      `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${
        !notifications[type] ? 'enabled' : 'disabled'
      }`
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleIntegrationToggle = (type) => {
    setIntegrations({ ...integrations, [type]: !integrations[type] });
    setSuccessMessage(
      integrations[type]
        ? `${type.charAt(0).toUpperCase() + type.slice(1)} disconnected successfully`
        : `${type.charAt(0).toUpperCase() + type.slice(1)} connected successfully`
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSync = () => {
    setSuccessMessage('Data synced successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };


  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

 
  const handleNewUserPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({ ...newUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleSaveNewUser = () => {
    if (!newUser.name || !newUser.email) {
      setSuccessMessage('Please fill in all required fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    const userToAdd = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      profilePicture: newUser.profilePicture,
    };

    setUsers([...users, userToAdd]);
    setSuccessMessage('User added successfully');
    setTimeout(() => setSuccessMessage(''), 3000);

    
    setNewUser({
      name: '',
      email: '',
      role: 'Editor',
      status: 'Active',
      profilePicture: 'src/assets/p-bg.avif',
    });
    setShowAddUserModal(false);
  };


  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'Editor',
      status: 'Active',
      profilePicture: 'src/assets/p-bg.avif',
    });
  };


  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditUser({ ...userToEdit });
    setShowEditUserModal(true);
  };

 
  const handleEditUserChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditUserPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser({ ...editUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleSaveEditedUser = () => {
    if (!editUser.name || !editUser.email) {
      setSuccessMessage('Please fill in all required fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === editUser.id ? { ...editUser } : user
      )
    );
    setSuccessMessage('User updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);

  
    setShowEditUserModal(false);
    setEditUser(null);
  };

 
  const handleCloseEditModal = () => {
    setShowEditUserModal(false);
    setEditUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (key === 'role') {
        return direction === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      }
      if (key === 'status') {
        return direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
      setSuccessMessage('User deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.settingsPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <div className={styles.headerRight}>
          <button
            className={styles.backBtn}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
          <button className={styles.syncedBtn} onClick={handleSync}>
            <FaCheckCircle /> Synced
          </button>
          <div className={styles.user}>
            <img src={profile.profilePicture} alt="User" className={styles.userImg} />
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <button
            className={`${styles.sidebarBtn} ${
              activeSection === 'profile' ? styles.sidebarBtnActive : ''
            }`}
            onClick={() => {
              setActiveSection('profile');
              console.log('Profile Settings clicked');
            }}
          >
            Profile Settings
          </button>
          <button
            className={`${styles.sidebarBtn} ${
              activeSection === 'notifications' ? styles.sidebarBtnActive : ''
            }`}
            onClick={() => {
              setActiveSection('notifications');
              console.log('Notifications clicked');
            }}
          >
            Notifications
          </button>
          <button
            className={`${styles.sidebarBtn} ${
              activeSection === 'users' ? styles.sidebarBtnActive : ''
            }`}
            onClick={() => {
              setActiveSection('users');
              console.log('User Management clicked');
            }}
          >
            User Management
          </button>
          <button
            className={`${styles.sidebarBtn} ${
              activeSection === 'integrations' ? styles.sidebarBtnActive : ''
            }`}
            onClick={() => {
              setActiveSection('integrations');
              console.log('Integrations clicked');
            }}
          >
            Integrations
          </button>
        </nav>
        <main className={styles.content}>
          <section className={styles.section}>
            <h2>Settings</h2>
            <p>Update your personal information and account settings.</p>

            {activeSection === 'profile' && (
              <div className={styles.profileCard}>
                <h3>Profile Settings</h3>
                <div className={styles.profileHeader}>
                  <div className={styles.profileImgContainer}>
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className={styles.profileImg}
                    />
                    <label className={styles.cameraIcon}>
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      className={styles.deleteImgBtn}
                      onClick={handleDeleteProfilePicture}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div>
                    <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
                    <p>Fisher</p>
                  </div>
                </div>
                <div className={styles.profileForm}>
                  <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className={styles.saveBtnContainer}>
                  <button className={styles.saveBtn} onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className={styles.notificationsCard}>
                <h3>Notification Preferences</h3>
                <p>Choose how you want to receive notifications.</p>
                <div className={styles.notifications}>
                  <div className={styles.notificationItem}>
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your account activity.</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationToggle('email')}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div className={styles.notificationItem}>
                    <div>
                      <h4>SMS Notifications</h4>
                      <p>Get important alerts via text message.</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationToggle('sms')}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div className={styles.notificationItem}>
                    <div>
                      <h4>Push Notifications</h4>
                      <p>Receive push notifications on your device.</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationToggle('push')}
                      />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'users' && (
              <div className={styles.usersCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h3>User Management</h3>
                    <p>Manage team members and their access levels.</p>
                  </div>
                  <button className={styles.addUserBtn} onClick={handleAddUser}>
                    <FaUserPlus /> Add User
                  </button>
                </div>
                <div className={styles.searchBar}>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <table className={styles.usersTable}>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('name')}>
                        User <FaSort />
                      </th>
                      <th onClick={() => handleSort('role')}>
                        Role <FaSort />
                      </th>
                      <th onClick={() => handleSort('status')}>
                        Status <FaSort />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className={styles.userInfo}>
                              <img
                                src={u.profilePicture}
                                alt="User"
                                className={styles.userImgSmall}
                              />
                              <div>
                                <p>{u.name}</p>
                                <p>{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`${styles.role} ${
                                u.role.toLowerCase() === 'fisher'
                                  ? styles.roleFisher
                                  : styles.roleEditor
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td>
                            <span className={`${styles.status} ${styles.statusActive}`}>
                              {u.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className={styles.actionBtn}
                              onClick={() => handleEditUser(u.id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.actionDelete}`}
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className={styles.pagination}>
                  <button
                    className={styles.paginationBtn}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    className={styles.paginationBtn}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className={styles.integrationsCard}>
                <h3>Integrations</h3>
                <p>Connect your account with other services.</p>
                <div className={styles.integrations}>
                  <div className={styles.integrationItem}>
                    <div className={styles.integrationInfo}>
                      <img
                        src="src/assets/paypal-logo.jpg"
                        alt="Paypal"
                        className={styles.integrationIcon}
                      />
                      <div>
                        <h4>Paypal</h4>
                        <p>Payment processing</p>
                      </div>
                    </div>
                    <button
                      className={`${styles.integrationBtn} ${
                        integrations.paypal ? styles.integrationBtnConnected : ''
                      }`}
                      onClick={() => handleIntegrationToggle('paypal')}
                    >
                      {integrations.paypal ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  <div className={styles.integrationItem}>
                    <div className={styles.integrationInfo}>
                      <img
                        src="src/assets/chat.jpg"
                        alt="Twilio"
                        className={styles.integrationIcon}
                      />
                      <div>
                        <h4>Twilio</h4>
                        <p>SMS notifications</p>
                      </div>
                    </div>
                    <button
                      className={`${styles.integrationBtn} ${
                        integrations.twilio ? styles.integrationBtnConnected : ''
                      }`}
                      onClick={() => handleIntegrationToggle('twilio')}
                    >
                      {integrations.twilio ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add New User</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.profileImgContainer}>
                <img
                  src={newUser.profilePicture}
                  alt="Profile"
                  className={styles.profileImg}
                />
                <label className={styles.cameraIcon}>
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewUserPictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleNewUserChange}
                  placeholder="Enter name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  placeholder="Enter email"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                >
                  <option value="Fisher">Fisher</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleNewUserChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleSaveNewUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && editUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Edit User</h3>
              <button className={styles.closeBtn} onClick={handleCloseEditModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.profileImgContainer}>
                <img
                  src={editUser.profilePicture}
                  alt="Profile"
                  className={styles.profileImg}
                />
                <label className={styles.cameraIcon}>
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditUserPictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditUserChange}
                  placeholder="Enter name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditUserChange}
                  placeholder="Enter email"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleEditUserChange}
                >
                  <option value="Fisher">Fisher</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleEditUserChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleSaveEditedUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className={styles.successMessage}>
          <FaCheckCircle /> {successMessage}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;