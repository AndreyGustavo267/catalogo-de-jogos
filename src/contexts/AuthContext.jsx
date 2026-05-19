import { createContext, useState, useEffect } from "react";
import db from "../assets/data.json";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("@IGDb:user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (nome, email, senha) => {
    const usuarioExiste = db.usuarios.find((u) => u.email === email);
    if (usuarioExiste) {
      return { success: false, message: "Este e-mail já está em uso." };
    }

    const novoUsuario = {
      id: `u${Date.now()}`, // Cria um ID falso baseado na hora atual
      nome: nome,
      email: email,
      senha: senha,
      papel: "Comum",
      jogosFavoritosIds: []
    };

    db.usuarios.push(novoUsuario);

    const { senha: _, ...userData } = novoUsuario;
    setUser(userData);
    localStorage.setItem("@IGDb:user", JSON.stringify(userData));

    return { success: true };
  };

  const atualizarPerfil = (novosDados) => {
    const usuarioAtualizado = { ...user, ...novosDados };
    setUser(usuarioAtualizado);
    localStorage.setItem("@IGDb:user", JSON.stringify(usuarioAtualizado));
    return { success: true };
  };
  
  const login = (email, senha) => {
    const usuarioEncontrado = db.usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      const { senha, ...userData } = usuarioEncontrado;
      setUser(userData);
      localStorage.setItem("@IGDb:user", JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, message: "E-mail ou senha incorretos." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@IGDb:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, atualizarPerfil, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
