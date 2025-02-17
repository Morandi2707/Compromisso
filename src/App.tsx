import React, { useState, useEffect } from 'react';
import { PartyPopper, Calendar, Users, MapPin, Lock } from 'lucide-react';

interface Guest {
  name: string;
  email: string;
  guests: number;
  confirmationDate: Date;
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Inicializa a lista de convidados a partir do localStorage ou como vazia
  const [guestList, setGuestList] = useState<Guest[]>(() => {
    const savedGuests = localStorage.getItem('guestList');
    if (savedGuests) {
      try {
        const parsed = JSON.parse(savedGuests);
        return parsed.map((guest: any) => ({
          ...guest,
          confirmationDate: new Date(guest.confirmationDate),
        }));
      } catch (error) {
        console.error('Erro ao ler os convidados do localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Atualiza o localStorage sempre que a lista de convidados mudar
  useEffect(() => {
    localStorage.setItem('guestList', JSON.stringify(guestList));
  }, [guestList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuest: Guest = {
      name,
      email,
      guests,
      confirmationDate: new Date(),
    };
    setGuestList((prevList) => [...prevList, newGuest]);
    setConfirmed(true);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') { // Em uma aplicação real, utilize autenticação adequada
      setIsAdmin(true);
    }
  };

  const getTotalGuests = () => {
    return guestList.reduce((total, guest) => total + guest.guests, 0);
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
            <button
              onClick={() => setIsAdmin(false)}
              className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800"
            >
              Voltar ao Formulário
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de Confirmações</h3>
              <p className="text-3xl font-bold text-purple-600">{guestList.length}</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de Convidados</h3>
              <p className="text-3xl font-bold text-indigo-600">{getTotalGuests()}</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Média de Convidados</h3>
              <p className="text-3xl font-bold text-pink-600">
                {guestList.length > 0 ? (getTotalGuests() / guestList.length).toFixed(1) : 0}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Convidados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Confirmação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guestList.map((guest, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{guest.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guest.guests}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {guest.confirmationDate.toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (showAdminLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h2>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <PartyPopper className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Presença Confirmada!</h2>
          <p className="text-gray-600 mb-8">
            Obrigado, {name}! Estamos ansiosos para celebrar com você.
          </p>
          <button
            onClick={() => setShowAdminLogin(true)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Acesso Administrativo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Confirmação de Presença
        </h1>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>15 de Junho de 2024</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5 text-purple-600" />
            <span>Salão de Festas Elegance</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5 text-purple-600" />
            <span>19:00h</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Convidados
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'pessoa' : 'pessoas'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Confirmar Presença
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAdminLogin(true)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Acesso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
