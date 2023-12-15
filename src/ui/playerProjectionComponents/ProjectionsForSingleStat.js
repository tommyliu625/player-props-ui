import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ResponsiveChartContainer, useYScale, ChartsTooltip } from '@mui/x-charts';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { LinePlot } from '@mui/x-charts/LineChart';
import { Tooltip } from '@material-ui/core';
import { addMinFilter, addSelectedPlayer, addOpposingTeam, addPagination, createRequestBody } from '../../util/mappingUtil';
import { ABBREVIATION_TO_TEAM_ID, LOCAL_HOST, PLAYER_PROPS_AGAINST_OPPONENT_API, PLAYER_PROPS_API } from '../../constants/propConstants';

import axios from 'axios';

const ProjectionsForSingleStat = ({ projections }) => {
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({})
  const [againstOpponentStats, setAgainstOpponentStats] = useState([])

  useEffect(() => {
    async function fetchStatsAgainstOpponent() {      
      if (open && !modalInfo.statType.includes('Combo')) {
        let request = createRequestBody();
        addSelectedPlayer(request, modalInfo.playerId)
        addOpposingTeam(request, ABBREVIATION_TO_TEAM_ID[modalInfo.opposingTeam])
        addPagination(request, { page: 0, pageSize: 10 })
        addMinFilter(request, 0)
        let response = await axios.post(LOCAL_HOST + PLAYER_PROPS_AGAINST_OPPONENT_API,
          request,
          { params: { statType: modalInfo.statType, lineScore: modalInfo.lineScore } }
        )
        setAgainstOpponentStats(response.data);
      }
    }
    fetchStatsAgainstOpponent()
  }, [modalInfo, open])

  const handleModal = (isOpen, playerInfo) => {  
    console.log('playerInfo: ', playerInfo)  
    if (isOpen) {
      setModalInfo(playerInfo);
    } else {
      setModalInfo({})
    }
    setOpen(isOpen)
  }

  const PlayerBarElement = (props) => {
    const yAxisScale = useYScale('props_axis_id')
    return returnRect(props, yAxisScale)
  }

  const OpponentBarElement = (props) => {
    const yAxisScale = useYScale('against_opponent_axis_id')
    return returnRect(props, yAxisScale)
  }

  const returnRect = (props, yAxisScale) => {
    const yAxisValue = yAxisScale.invert(props.style.y.animation.to)
    const isBelowBar = yAxisValue < modalInfo.lineScore
    let color = isBelowBar ? '#ff0000' : '#00ff00'
    if (yAxisValue === modalInfo.lineScore) {
      color = '#FFFFFF'
    }

    // work around export of BarElement
    return <rect
      fill={color}
      height={props.style.height.animation.to}
      width={props.style.width.animation.to}
      x={props.style.x.animation.to}
      y={props.style.y.animation.to}
    />
  }  

  return (
    <div className='player-projection-container'>
      {projections.length > 0 && projections.map(({ playerId, statType, fullName, lineScore, overStreak,
        overLast3, overLast5, overLast10, underStreak, underLast3, underLast5, underLast10,
        avgLast10, avgLast5, avgLast3, trendingUp, trendingDown, lineHistory, opposingTeam, gameDate }) => (
        <Card key={`${fullName}${statType}${playerId}`} className='player-projection-card'>
          <CardContent>
            <Typography sx={{ fontSize: '11px' }} variant="body1">vs {opposingTeam} {gameDate}</Typography>
            <Typography variant="body1">{fullName}</Typography>
            <Typography variant="body1">{statType}: {lineScore}</Typography>
            <br />
            <Typography variant="body1">Average Last 3 Games: {avgLast3}</Typography>
            <Typography variant="body1">Average Last 5 Games: {avgLast5}</Typography>
            <Typography variant="body1">Average Last 10 Games: {avgLast10}</Typography>
            {trendingUp && <Typography className='trending' variant="body1">Trending Up</Typography>}
            {trendingDown && <Typography className='trending' variant="body1">Trending Down</Typography>}
            <br />
            <Typography className={overStreak >= 3 && 'hot-streak'} variant="body1">Over Streak: {overStreak}</Typography>
            <Typography variant="body1">Over Last 3 Games: {overLast3}</Typography>
            <Typography variant="body1">Over Last 5 Games: {overLast5}</Typography>
            <Typography className={overLast10 >= 7 && 'hot-streak'} variant="body1">Over Last 10 Games: {overLast10}</Typography>
            <br />
            <Typography className={underStreak >= 3 && 'hot-streak'} variant="body1">Under Streak: {underStreak}</Typography>
            <Typography variant="body1">Under Last 3 Games: {underLast3}</Typography>
            <Typography variant="body1">Under Last 5 Games: {underLast5}</Typography>
            <Typography className={underLast10 >= 7 && 'hot-streak'} variant="body1">Under Last 10 Games: {underLast10}</Typography>
            <br />
          </CardContent>
          <Button onClick={() => {
            let reverseLineHistory = [...lineHistory];
            reverseLineHistory.reverse();
            handleModal(true, { lineHistory: reverseLineHistory, fullName, statType, lineScore, opposingTeam, playerId })
          }}>See Player History</Button>
        </Card>
      ))}
      <Modal
        sx={style}
        open={open}
        onClose={() => handleModal(false, {})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ClickAwayListener onClickAway={() => {
          // setModalInfo({});
          // setAgainstOpponentStats([]);
          // setOpen(false);
          handleModal(false, {})
        }}>
          <Box>
            <div>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {`${modalInfo.fullName} ${modalInfo.statType}${(modalInfo.statType && !modalInfo.statType.includes('Combo')) ? '' : '  (Hover over to render chart)'}`}
              </Typography>
              <ResponsiveChartContainer
                xAxis={[
                  {
                    scaleType: 'band',
                    dataKey: 'date',
                    id: 'date',
                    label: 'Date',
                  },
                ]}
                yAxis={[{ id: 'props_axis_id' }]}
                series={[
                  {
                    type: 'line',
                    data: [...new Array(10).fill(modalInfo.lineScore)],
                  },
                  {
                    type: 'bar',
                    dataKey: 'value',
                  },
                ]}
                height={275}
                margin={{ left: 70, right: 70 }}
                dataset={modalInfo.lineHistory}
              >
                {/* <BarPlot /> */}
                <BarPlot slots={{ bar: PlayerBarElement }} />
                <LinePlot />
                <ChartsXAxis />
                <ChartsYAxis axisId="props_axis_id" label={modalInfo.statType} />
                <ChartsTooltip/>
              </ResponsiveChartContainer>
            </div>
            {modalInfo.statType && !modalInfo.statType.includes('Combo') && againstOpponentStats.length > 0 && 
              <div>
                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} >
                  {`${modalInfo.fullName} against ${modalInfo.opposingTeam}`}
                </Typography>
                <ResponsiveChartContainer
                  xAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'date',
                      id: 'date',
                      label: 'Date',
                    },
                  ]}
                  yAxis={[{ id: 'against_opponent_axis_id' }]}
                  series={[
                    {
                      type: 'line',
                      data: [...new Array(againstOpponentStats.length).fill(modalInfo.lineScore)],
                    },
                    {
                      type: 'bar',
                      dataKey: 'value',
                    },
                  ]}
                  height={275}
                  margin={{ left: 70, right: 70 }}
                  dataset={[...againstOpponentStats].reverse()}
                >
                  {/* <BarPlot slots={{ bar: OpponentBarElement }} /> */}
                  <BarPlot />
                  <LinePlot />
                  <ChartsXAxis />
                  <ChartsYAxis axisId="against_opponent_axis_id" label={modalInfo.statType} />
                  <ChartsTooltip/>
                </ResponsiveChartContainer>
              </div>
            }
          </Box>
        </ClickAwayListener >
      </Modal>
    </div>
  );
};

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 'fit-content',
  bgcolor: 'white',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};


export default ProjectionsForSingleStat;