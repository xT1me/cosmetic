import api from "../api";


export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

export const verifyEmail = async (id) => {
  try {
    const response = await api.patch(`/users/${id}/verify-email`);
    return response.data;
  } catch (error) {
    console.error(`Error verifying email for user with ID ${id}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

export const addRoleToUser = async (id, role) => {
  try {
    const response = await api.patch(`/users/${id}/add-role`, { role });
    return response.data;
  } catch (error) {
    console.error(`Error adding role "${role}" to user with ID ${id}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};

export const removeRoleFromUser = async (id, role) => {
  try {
    const response = await api.patch(`/users/${id}/remove-role`, { role });
    return response.data;
  } catch (error) {
    console.error(`Error removing role "${role}" from user with ID ${id}:`, error);
    throw error.response ? error.response.data : error.message;
  }
};
