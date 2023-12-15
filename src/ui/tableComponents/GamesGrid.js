import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { gameStatsColDef } from '../../util/mappingUtil';
import CircularProgress from '@mui/material/CircularProgress';

export const GamesGrid = ({ gameStats, isFetchingGameStats, paginationModel,
  setPaginationModel, dates, selectedTeam }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    setPaginationModel({ page: 0, pageSize: 50 })
  }, [dates, selectedTeam])

  return (
    <Box sx={{ height: '725px', width: '100%' }}>
      {isFetchingGameStats ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={gameStats}
          columns={gameStatsColDef()}
          sx={{
            display: 'flex', flexDirection: 'column-reverse',
            // '.MuiTablePagination-displayedRows': {
            //   display: 'none'
            // }
          }}
          loading={isFetchingGameStats}
          pageSizeOptions={[50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          paginationMode='server'
          rowCount={100000}
          disableRowSelectionOnClick
          ref={gridRef}
        />
      )}
    </Box>
  );
};
