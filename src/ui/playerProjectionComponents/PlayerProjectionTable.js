
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_HOST, FETCH_PLAYER_PROJECTION } from '../../constants/propConstants';
import { getDateTimeNow } from '../../util/helperFunctions';
import ProjectionsForSingleStat from './ProjectionsForSingleStat';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';


const PlayerProjectionTable = ({ uploadMessage, handleSubmit }) => {

  const [statSelected, setStatSelected] = useState("");
  const [statProjections, setStatProjections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("uploadMessage: ", uploadMessage)
    async function getPlayerProjection() {
      try {
        setIsLoading(true);
        if (uploadMessage !== 'Failed Upload') {
          let response = await axios.get(LOCAL_HOST + FETCH_PLAYER_PROJECTION);
          setData(response.data);
          let firstStat = Object.keys(response.data.stat_projections)[0]
          setStatSelected(Object.keys(response.data.stat_projections)[0])
          setStatProjections(response.data.stat_projections[firstStat]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getPlayerProjection();
  }, [uploadMessage]); // Include setProjectionLoading as a dependency

  async function fetchPlayerProjection() {
    try {
      let response = await axios.get(LOCAL_HOST + FETCH_PLAYER_PROJECTION);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleStatSelected(key) {
    setStatSelected(key);
    setStatProjections(data.stat_projections[key]);
  }

  const [data, setData] = useState({});

  return (
    <div>
      {isLoading ? <CircularProgress sx={{ textAlign: 'center' }} /> :
        <>
          <div className='stat-name-container'>
            {(data.stat_projections) &&
              <>
                <ButtonGroup
                  variant='contained'
                  aria-label='outlined primary button group'
                  className='stat-button-group'
                >
                  {Object.keys(data.stat_projections).map((key, i) => (
                    <Button
                    key={i}
                      sx={{
                        backgroundColor: `${statSelected === key ? '#0d86ae' : '#b6b6b6'
                          }`,
                        margin: '5px',
                      }}
                      className='stat-button' onClick={() => handleStatSelected(key)}>{key}</Button>
                  ))}
                </ButtonGroup>
                <Button className='stat-button' onClick={() => fetchPlayerProjection()}>{`Projections Last Refreshed ${getDateTimeNow()}`}</Button>
              </>
            }
          </div>
          {statProjections.length > 0 &&
            <ProjectionsForSingleStat statSelected={statSelected} projections={statProjections} />
          }
        </>
        }
    </div>
  );
};

export default PlayerProjectionTable;
