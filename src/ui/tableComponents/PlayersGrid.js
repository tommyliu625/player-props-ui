import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { playerStatsColDef } from '../../util/mappingUtil';
import CircularProgress from '@mui/material/CircularProgress';

export const PlayersGrid = ({ playerStats, isFetchingPlayerStats, paginationModel,
  setPaginationModel, dates, selectedPlayer }) => {
  const gridRef = useRef(null);

  const [rowCountState, setRowCountState] = useState(
    playerStats?.length || 0,
  );
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      playerStats?.length !== undefined
        ? playerStats?.length
        : prevRowCountState,
    );
  }, [playerStats?.length, setRowCountState]);

  useEffect(() => {
    setPaginationModel({page: 0, pageSize: 50})
  }, [dates, selectedPlayer])

  return (
    <Box sx={{ height: '725px', width: '100%' }}>
      {/* {isFetchingPlayerStats ? (
        <CircularProgress />
      ) : ( */}
      <DataGrid
        rows={playerStats}
        columns={playerStatsColDef()}
        sx={{
          display: 'flex', flexDirection: 'column-reverse', 
          // '.MuiTablePagination-displayedRows': {
          //   display: 'none'
          // }
        }}
        loading={isFetchingPlayerStats}
        pageSizeOptions={[50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pagination
        paginationMode='server'
        rowCount={100000}
        disableRowSelectionOnClick
        ref={gridRef}
      />
      {/* )} */}
    </Box>
  );
};
