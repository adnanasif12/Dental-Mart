// Shared user data store for authentication
// In production, this should be replaced with a real database

let registeredUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@dentalmart.com',
    password: 'admin123'
  }
];

let nextUserId = 2;

export const UserStore = {
  findUserByEmail(email) {
    return registeredUsers.find(u => u.email === email);
  },

  findUserById(id) {
    return registeredUsers.find(u => u.id === id);
  },

  createUser(userData) {
    const newUser = {
      id: nextUserId++,
      name: userData.name,
      email: userData.email,
      password: userData.password // In production, hash this!
    };
    registeredUsers.push(newUser);
    return newUser;
  },

  getAllUsers() {
    return registeredUsers;
  },

  authenticateUser(email, password) {
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    return user;
  }
};

export default UserStore;
