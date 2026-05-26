import { createContext, useState, useEffect } from "react";
import db from "../assets/data.json";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const storedFavs = localStorage.getItem("@IGDb:favoritos");
    if (storedFavs) {
      return JSON.parse(storedFavs);
    }
    return db.favoritos || [];
  });

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
      id: `u${Date.now()}`,
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

  const toggleFavorito = (jogo) => {
    if (!user) return { success: false, message: "Inicie sessão para adicionar favoritos." };

    const isFavorito = favoritos.some(
      (fav) => fav.usuarioId === user.id && fav.jogoId === jogo.id
    );

    let novosFavoritos;

    if (isFavorito) {
      novosFavoritos = favoritos.filter(
        (fav) => !(fav.usuarioId === user.id && fav.jogoId === jogo.id)
      );
      setFavoritos(novosFavoritos);
      localStorage.setItem("@IGDb:favoritos", JSON.stringify(novosFavoritos));
      return { success: true, isFav: false, message: `"${jogo.titulo}" removido dos favoritos.` };
    } else {
      const novoFavorito = {
        id: "f" + Date.now(),
        usuarioId: user.id,
        jogoId: jogo.id,
      };
      novosFavoritos = [...favoritos, novoFavorito];
      setFavoritos(novosFavoritos);
      localStorage.setItem("@IGDb:favoritos", JSON.stringify(novosFavoritos));
      return { success: true, isFav: true, message: `"${jogo.titulo}" adicionado aos favoritos!` };
    }
  };

  const checkIsFavorito = (jogoId) => {
    if (!user) return false;
    return favoritos.some(
      (fav) => fav.usuarioId === user.id && fav.jogoId === jogoId
    );
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        atualizarPerfil, 
        isAuthenticated: !!user,
        favoritos,
        toggleFavorito, 
        checkIsFavorito 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}