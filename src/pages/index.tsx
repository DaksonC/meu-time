import axios from 'axios'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { Container } from './styles'

interface LoginData {
  apiKey: string
  error: string
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    apiKey: '',
    error: '',
  })
  const router = useRouter()

  const { apiKey, error } = loginData

  const login = async (e: FormEvent) => {
    e.preventDefault()

    if (!apiKey) {
      setLoginData({ ...loginData, error: 'Por favor, insira a API Key.' })
      return
    }

    try {
      const response = await axios.get(
        'https://v3.football.api-sports.io/leagues',
        {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      )

      // Verifique a resposta para determinar se a API Key é válida ou não
      if (response.data) {
        // Armazene a API Key em um estado global, como o Redux ou Context API
        // Exemplo: dispatch(setApiKey(apiKey));

        // Redirecione o usuário para a página inicial
        router.push({
          pathname: '/home',
          query: { apiKey },
        })
      } else {
        setLoginData({ ...loginData, error: 'API Key inválida.' })
      }
    } catch (error) {
      console.error('Erro ao verificar a API Key:', error)
      setLoginData({
        ...loginData,
        error: 'Ocorreu um erro ao verificar a API Key.',
      })
    }
  }

  return (
    <Container>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={login}>
        <label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) =>
              setLoginData({ ...loginData, apiKey: e.target.value })
            }
            placeholder="Insira sua API Key"
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </Container>
  )
}

export default LoginPage
