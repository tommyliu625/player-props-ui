import React, {useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { playerStatsColDef } from '../../util/mappingUtil';

export const GamesGrid = ({playerStats}) => {
  const gridRef = useRef(null);
  const handleDataRefresh = () => {
      // code to fetch new data and update `playerStats`
      if (gridRef && gridRef.current) {
        const gridApi = gridRef.current.api;
        gridApi.gotoPage(0);
      }
  }
  // useEffect(() => {
  //   handleDataRefresh();
  // }, [playerStats])

  return (
    <Box sx={{ height: '850px', width: '100%' }}>
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
    </Box>
  );
};
