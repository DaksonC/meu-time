import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState, ChangeEvent } from 'react'

interface Team {
  name: string
  id: number
}

interface League {
  name: string
  id: number
}

interface Country {
  name: string
  id: number
}

interface Player {
  name: string
  age: number
  nationality: string
}

interface TeamsStatistics {
  total: number
  wins: number
  draws: number
  losses: number
}

interface MinuteStatistics {
  total: number
  percentage: string
}

const Home = () => {
  const router = useRouter()
  const { apiKey } = router.query

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [leagues, setLeagues] = useState<League[]>([])
  const [selectedLeague, setSelectedLeague] = useState<string | ''>('')
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string | ''>('')
  const [players, setPlayers] = useState<Player[]>([])
  const [formation, setFormation] = useState('')
  const [teamsStatistics, setTeamsStatistics] = useState<TeamsStatistics>({
    total: 0,
    wins: 0,
    draws: 0,
    losses: 0,
  })
  const [minuteStatistics, setMinuteStatistics] = useState<MinuteStatistics[]>(
    [],
  )

  useEffect(() => {
    // Obter os países
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://v3.football.api-sports.io/countries',
          {
            headers: {
              'x-apisports-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )
        setCountries(response.data.response)
      } catch (error) {
        console.error('Erro ao obter os países:', error)
      }
    }

    fetchCountries()
    if (!apiKey) {
      router.push('/')
    }
  }, [apiKey, router])

  useEffect(() => {
    if (selectedCountry) {
      // Obter as ligas do país selecionado
      axios
        .get(
          `https://v3.football.api-sports.io/leagues?country=${selectedCountry}`,
          {
            headers: {
              'x-apisports-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )
        .then((response) => {
          const leaguesData = response.data.response
          console.log('leaguesData', leaguesData)
          setLeagues(leaguesData)
          setSelectedLeague('')
          setTeams([])
          setSelectedTeam('')
        })
        .catch((error) => {
          console.error('Erro ao obter as ligas:', error)
        })
    }
  }, [selectedCountry, apiKey])

  useEffect(() => {
    if (selectedLeague) {
      // Obter os times da liga selecionada
      axios
        .get(
          `https://v3.football.api-sports.io/teams?league=${selectedLeague}`,
          {
            headers: {
              'x-apisports-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        )
        .then((response) => {
          const teamsData = response.data.response
          console.log('teamsData', teamsData)
          setTeams(teamsData)
          setSelectedTeam('')
        })
        .catch((error) => {
          console.error('Erro ao obter os times:', error)
        })
    }
  }, [selectedLeague, apiKey])

  useEffect(() => {
    if (selectedTeam) {
      // Obter os dados do time selecionado
      axios
        .get(`https://v3.football.api-sports.io/teams?name=${selectedTeam}`, {
          headers: {
            'x-apisports-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        })
        .then((response) => {
          const teamData = response.data.response[0]
          console.log('teamData', teamData)
          setPlayers(teamData.players)
          setFormation(teamData.statistics[0].formation)
          setTeamsStatistics({
            total: teamData.statistics[0].games.total,
            wins: teamData.statistics[0].games.wins,
            draws: teamData.statistics[0].games.draws,
            losses: teamData.statistics[0].games.losses,
          })
          setMinuteStatistics(teamData.statistics[0].goals.minute)
        })
        .catch((error) => {
          console.error('Erro ao obter os dados do time:', error)
        })
    }
  }, [selectedTeam, apiKey])

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(String(event.target.value))
    console.log('selectedCountry', String(event.target.value))
  }

  const handleLeagueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeague(String(event.target.value))
  }

  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(String(event.target.value))
  }

  return (
    <div>
      <h1>Meu Time</h1>

      <div>
        <label htmlFor="country">Selecione um país:</label>
        <select
          id="country"
          value={selectedCountry !== null ? String(selectedCountry) : ''}
          onChange={handleCountryChange}
        >
          <option value="">Selecione</option>
          {countries.map((country, index) => (
            <option key={`${country.id}-${index}`} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry !== null && (
        <div>
          <label htmlFor="league">Selecione uma liga:</label>
          <select
            id="league"
            value={selectedLeague}
            onChange={handleLeagueChange}
          >
            <option value="">Selecione</option>
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLeague !== null && (
        <div>
          <label htmlFor="team">Selecione um time:</label>
          <select id="team" value={selectedTeam} onChange={handleTeamChange}>
            <option value="">Selecione</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTeam !== null && (
        <div>
          <h2>Jogadores:</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                Nome: {player.name}, Idade: {player.age}, Nacionalidade:{' '}
                {player.nationality}
              </li>
            ))}
          </ul>

          <h2>Formação mais utilizada:</h2>
          <p>{formation}</p>

          <h2>Tabela de resultados:</h2>
          <p>Total de jogos: {teamsStatistics.total}</p>
          <p>Total de vitórias: {teamsStatistics.wins}</p>
          <p>Total de derrotas: {teamsStatistics.losses}</p>
          <p>Total de empates: {teamsStatistics.draws}</p>

          <h2>Gráfico de gols marcados por tempo de jogo:</h2>
          <ul>
            {minuteStatistics.map((minute, index) => (
              <li key={index}>
                Minuto: {index}, Total: {minute.total}, Porcentagem:{' '}
                {minute.percentage}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Home
