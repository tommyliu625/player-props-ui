
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LOCAL_HOST, FETCH_PRIZE_PICKS_PROJECTION } from '../../../constants/propConstants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ProjectionsForSingleStat from './PrizePicksSingleStat';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import ProjectionsFilterAutoComplete from '../../autocompleteComponents/ProjectionsFilterAutoComplete';
import { ThreeP } from '@mui/icons-material';
import ThreeGameAvgPercentFilterForm from '../../autocompleteComponents/ThreeGameAvgPercentFilterForm';
import StreaksFilterForm from '../../autocompleteComponents/StreaksFilterForm';


const PrizePicksProjectionTable = ({ uploadMessage, handleSubmit }) => {

  const [statSelected, setStatSelected] = useState("");
  const [statProjections, setStatProjections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [percentFilter, setPercentFilter] = useState(0);
  const [streaksFilter, setStreaksFilter] = useState(0);
  const [data, setData] = useState({});

  const statButtonSyle = (key) => ({
    backgroundColor: `${statSelected === key ? '#0d86ae' : '#b6b6b6'
      }`,

  })


  useEffect(() => {
    console.log("uploadMessage: ", uploadMessage)
    async function getPlayerProjection() {
      try {
        setIsLoading(true);
        if (uploadMessage !== 'Failed Upload') {
          let response = await axios.get(LOCAL_HOST + FETCH_PRIZE_PICKS_PROJECTION);
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

  function handleStatSelected(key) {
    setStatSelected(key);
    setStatProjections(data.stat_projections[key]);
  }

  function filterProjections(projections) {
    let copyProjections = [...projections];
    if (selectedTeams.length > 0) {
      copyProjections = copyProjections.filter(projection => selectedTeams.includes(projection.teamAbbreviation))
    }
    if (selectedPlayer.length > 0) {
      copyProjections = copyProjections.filter(projection => selectedPlayer.includes(projection.fullName))
    }
    if (percentFilter > 0) {      
      copyProjections = copyProjections.filter(projection => Math.abs( projection.avglast3LineScorePercentage) >= percentFilter)
    }
    if (streaksFilter > 0) {
      copyProjections = copyProjections.filter(projection => projection.overStreak === streaksFilter || projection.underStreak === streaksFilter)
    }
    return copyProjections;
  }

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
                      sx={statButtonSyle(key)}
                      className='stat-button' onClick={() => handleStatSelected(key)}>{key}</Button>
                  ))}
                  <p className='projection-refresh-text'>Projections Last Refreshed {`${data.lastUpdated}`}</p>
                </ButtonGroup>
              </>
            }
          </div>
          <div className='auto-complete-container'>
            <ProjectionsFilterAutoComplete autoCompleteValues={[...new Set(statProjections.map(x => x.teamAbbreviation))].sort()} setter={setSelectedTeams} filter='Teams'/>
            <ProjectionsFilterAutoComplete autoCompleteValues={[...new Set(statProjections.map(x => x.fullName))].sort()} setter={setSelectedPlayer} filter='Player'/>
            <ThreeGameAvgPercentFilterForm percentFilter={percentFilter} setter={setPercentFilter} />
            <StreaksFilterForm filter={streaksFilter} setter={setStreaksFilter} />
          </div>
          {statProjections.length > 0 &&
            <ProjectionsForSingleStat statSelected={statSelected} projections={filterProjections(statProjections)} />
          }
        </>
      }
    </div>
  );
};

const cardStyle = {
  marginLeft: '50px',
  paddingBottom: '0px'
}

export default PrizePicksProjectionTable;
