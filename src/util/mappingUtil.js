

export function mapPlayerInfo(data) {
  return data.map(info => {
    const {player_id, first_name, last_name, position, team_id} = info
    return {
      label: `${first_name} ${last_name}`,
      player_id,
      first_name,
      last_name,
      position,
      team_id
    }
  }).sort((a,b) => a.label.localeCompare(b.label));
}

export function mapTeamInfo(data) {
  return data
    .map((info) => {
      return {
        label: info.full_name,
        ...info
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function mapGameStats(data) {
  return data.map((info) => {
    return {
      id: info.game_id,
      ...info,
    };
  });
}

export function gameStatsColDef() {
  const colDefs = [
    {field: 'game_id', headerName: 'ID', width: 150, editable: false},
    {field: 'date', headerName: 'Date', width: 150, editable: false},
    {field: 'ht_full_name', headerName: 'Home Team', width: 150, editable: false},
    {field: 'ht_score', headerName: 'Home Team Score', width: 150, editable: false},
    {field: 'at_full_name', headerName: 'Away Team', width: 150, editable: false},
    {field: 'at_score', headerName: 'Away Team Score', width: 150, editable: false},
    {field: 'postseason', headerName: 'Postseason', width: 150, editable: false},
    {field: 'season', headerName: 'Season', width: 150, editable: false},
  ];
  return colDefs;
}

export function mapPlayerStats(data) {
  return data
    .map((info) => {
      return {
        id: info.player_game_id,
        ...info
      }
    })
}

export function playerStatsColDef() {
    const colDefs = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'date', headerName: 'Date', width: 100, editable: false },
      {
        field: 'first_name',
        headerName: 'First Name',
        width: 120,
        editable: false,
      },
      {
        field: 'last_name',
        headerName: 'Last Name',
        width: 120,
        editable: false,
      },
      { field: 'position', headerName: 'Position', width: 80, editable: false },
      {
        field: 'full_name',
        headerName: 'Team Name',
        width: 200,
        editable: false,
      },
      { field: 'pts', headerName: 'Points', width: 85, editable: false },
      { field: 'rbs', headerName: 'Rebounds', width: 85, editable: false },
      { field: 'asts', headerName: 'Assists', width: 85, editable: false },
      { field: 'fg3m', headerName: '3s Made', width: 85, editable: false },
      { field: 'blks', headerName: 'Blocks', width: 85, editable: false },
      { field: 'stls', headerName: 'Steals', width: 85, editable: false },
      { field: 'tos', headerName: 'Turnovers', width: 85, editable: false },
      {
        field: 'opposing_team_full_name',
        headerName: 'Opposing Team',
        width: 200,
        editable: false,
      },
      {
        field: 'postseason',
        headerName: 'Postseason Game',
        width: 150,
        editable: false,
      },
    ];

  return colDefs;
}

export const gordonData = [
  {
    id: "177", player_id: "177", date: '2023-03-20', first_name: 'Aaron',
    last_name: 'Nesmith', position: 'G-F', full_name: 'Indiana Pacers', pts: 4, rbs: 2, asts: 2, fg3m: 0, blks: 1, stls: 1, tos: 3, postseason: false,
  }
];

export function createRequestBody() {
  return {
    where: {},
    orderBy: {
      date: 'desc',
    },
  };
}
