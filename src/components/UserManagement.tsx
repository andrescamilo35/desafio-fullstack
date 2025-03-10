import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserManagement.css";

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  rut: number;
  dv: string;
  fechaNacimiento: string;
  correoElectronico: string;
  contrasena: string;
}

const API_URL = "http://localhost:8080/api/usuarios";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    nombres: "",
    apellidos: "",
    rut: 0,
    dv: "",
    fechaNacimiento: "",
    correoElectronico: "",
    contrasena: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(API_URL, newUser);
      fetchUsers();
      setNewUser({
        nombres: "",
        apellidos: "",
        rut: 0,
        dv: "",
        fechaNacimiento: "",
        correoElectronico: "",
        contrasena: "",
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await axios.put(`${API_URL}/${editingUser.id}`, editingUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Gestión de Usuarios</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nombres"
          value={editingUser ? editingUser.nombres : newUser.nombres}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, nombres: e.target.value })
              : setNewUser({ ...newUser, nombres: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Apellidos"
          value={editingUser ? editingUser.apellidos : newUser.apellidos}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, apellidos: e.target.value })
              : setNewUser({ ...newUser, apellidos: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="RUT"
          value={editingUser ? editingUser.rut : newUser.rut}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, rut: Number(e.target.value) })
              : setNewUser({ ...newUser, rut: Number(e.target.value) });
          }}
        />
        <input
          type="text"
          placeholder="DV"
          value={editingUser ? editingUser.dv : newUser.dv}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, dv: e.target.value })
              : setNewUser({ ...newUser, dv: e.target.value });
          }}
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={editingUser ? editingUser.fechaNacimiento : newUser.fechaNacimiento}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, fechaNacimiento: e.target.value })
              : setNewUser({ ...newUser, fechaNacimiento: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={editingUser ? editingUser.correoElectronico : newUser.correoElectronico}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, correoElectronico: e.target.value })
              : setNewUser({ ...newUser, correoElectronico: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={editingUser ? editingUser.contrasena : newUser.contrasena}
          onChange={(e) => {
            editingUser
              ? setEditingUser({ ...editingUser, contrasena: e.target.value })
              : setNewUser({ ...newUser, contrasena: e.target.value });
          }}
        />
        {editingUser ? (
          <button className="update-btn" onClick={handleUpdateUser}>Actualizar Usuario</button>
        ) : (
          <button className="add-btn" onClick={handleCreateUser}>Agregar Usuario</button>
        )}
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span>{user.nombres} {user.apellidos} - {user.correoElectronico}</span>
            <button className="edit-btn" onClick={() => handleEditUser(user)}>Editar</button>
            <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;