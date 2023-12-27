import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { playerStatsColDef } from '../../util/mappingUtil';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const PlayersGrid = ({ playerStats, isFetchingPlayerStats, paginationModel,
  setPaginationModel, dates, selectedPlayer }) => {
  const gridRef = useRef(null);

  const [rowCountState, setRowCountState] = useState(
    playerStats?.length || 0,
  );

  const [columnDef, setColumnDef] = useState(playerStatsColDef());

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      playerStats?.length !== undefined
        ? playerStats?.length
        : prevRowCountState,
    );
  }, [playerStats?.length, setRowCountState]);

  useEffect(() => {
    setPaginationModel({ page: 0, pageSize: 50 })
  }, [dates, selectedPlayer])

  const handleColumnClick = (col, index) => {
    const newColumnDef = [...columnDef];
    newColumnDef[index].selected = !newColumnDef[index].selected;
    setColumnDef(newColumnDef);
  }

  return (

    <Box sx={{ height: '725px', width: '100%' }}>
      <ButtonGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} variant="outlined" aria-label="outlined button group">
        {columnDef.map((col, index) => {
          return (
            <Button sx={{ margin: '10px' }} variant={col.selected ? 'contained' : 'outlined'} key={col.field} onClick={() => {
              handleColumnClick(col, index)
            }}>{col.headerName}</Button>
          )
        })}
      </ButtonGroup>
      {/* {isFetchingPlayerStats ? (
        <CircularProgress />
      ) : ( */}
      <DataGrid
        rows={playerStats}
        columns={columnDef.filter(col => col.selected)}
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
