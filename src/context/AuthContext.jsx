import { createContext, useContext, useState } from 'react';

import { borrar, guardar, leer } from '../data/almacenamiento';
import { autenticarUsuario, registrarUsuario } from '../data/usuarios';

export const AuthContext = createContext(null);

// La sesión activa vive en sessionStorage, como en la Sumativa 1
const CLAVE_SESION = 'usuarioActivo';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer(CLAVE_SESION, null, window.sessionStorage));

  const registrar = (datos) => registrarUsuario(datos);

  const login = (email, password) => {
    const resultado = autenticarUsuario(email, password);
    if (resultado.ok) {
      guardar(CLAVE_SESION, resultado.usuario, window.sessionStorage);
      setUsuario(resultado.usuario);
    }
    return resultado;
  };

  const logout = () => {
    borrar(CLAVE_SESION, window.sessionStorage);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, registrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
