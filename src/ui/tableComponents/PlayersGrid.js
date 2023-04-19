import React, {useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { playerStatsColDef } from '../../util/mappingUtil';
import CircularProgress from '@mui/material/CircularProgress';

export const PlayersGrid = ({ playerStats, isFetchingPlayerStats }) => {
  const gridRef = useRef(null);

  // useEffect(() => {
  //   handleDataRefresh();
  // }, [playerStats])

  return (
    <Box sx={{ height: '850px', width: '100%' }}>
      {isFetchingPlayerStats ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={playerStats}
          columns={playerStatsColDef()}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          // checkboxSelection
          disableRowSelectionOnClick
          ref={gridRef}
        />
      )}
    </Box>
  );
};
