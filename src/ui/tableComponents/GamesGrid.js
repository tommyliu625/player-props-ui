import React, {useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { gameStatsColDef } from '../../util/mappingUtil';
import CircularProgress from '@mui/material/CircularProgress';

export const GamesGrid = ({ gameStats, isFetchingGameStats }) => {
  const gridRef = useRef(null);
  const handleDataRefresh = () => {
    // code to fetch new data and update `playerStats`
    if (gridRef && gridRef.current) {
      const gridApi = gridRef.current.api;
      gridApi.gotoPage(0);
    }
  };
  // useEffect(() => {
  //   handleDataRefresh();
  // }, [gameStats]);
  return (
    <Box sx={{ height: '725px', width: '100%' }}>
      {isFetchingGameStats ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={gameStats}
          columns={gameStatsColDef()}
          sx={{ display: 'flex', flexDirection: 'column-reverse' }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          // checkboxSelection
          disableRowSelectionOnClick
          ref={gridRef}
        />
      )}
    </Box>
  );
};
