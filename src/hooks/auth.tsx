import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface School {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

interface AuthContexData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  school(credentials: School): Promise<void>;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Barber:token');
    const user = localStorage.getItem('@Barber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Barber:token', token);
    localStorage.setItem('@Barber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Barber:token');
    localStorage.removeItem('@Barber:user');

    setData({} as AuthState);
  }, []);

  const school = useCallback(
    async ({ disciplina, professor, diasemana, periodo, horario }) => {
      const Disciplina = {
        disciplina,
        professor,
        diasemana,
        periodo,
        horario,
      };

      localStorage.setItem('@Disciplinas', JSON.stringify(Disciplina));
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, school }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContexData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
