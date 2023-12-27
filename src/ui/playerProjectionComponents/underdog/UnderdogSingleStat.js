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
import { addMinFilter, addSelectedPlayer, addOpposingTeam, addPagination, createRequestBody } from '../../../util/mappingUtil';
import { ABBREVIATION_TO_TEAM_ID, LOCAL_HOST, PLAYER_PROPS_AGAINST_OPPONENT_UNDERDOG_API } from '../../../constants/propConstants';

import axios from 'axios';

const UnderdogSingleStat = ({ projections }) => {
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({})
  const [againstOpponentStats, setAgainstOpponentStats] = useState([])

  useEffect(() => {
    async function fetchStatsAgainstOpponent() {
      if (open) {
        let request = createRequestBody();
        addSelectedPlayer(request, modalInfo.playerId)
        addOpposingTeam(request, ABBREVIATION_TO_TEAM_ID[modalInfo.opposingTeam])
        addPagination(request, { page: 0, pageSize: 10 })
        addMinFilter(request, 0)
        let response = await axios.post(LOCAL_HOST + PLAYER_PROPS_AGAINST_OPPONENT_UNDERDOG_API,
          request,
          { params: { statType: modalInfo.statType, lineScore: modalInfo.lineScore } }
        )
        console.log('response.data: ', response.data)
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

  const createPercentage = (percentage) => {
    let color = 'black'
    if (percentage > 0) { color =  'green'; }
    if (percentage < 0) { color = 'red'; }      
    return <span style={{ color: color, fontSize: '12px' }}>{`(${percentage.toFixed(2)}%)`}</span>
  }

  return (
    <div className='player-projection-container'>
      {projections.length > 0 && projections.map(({ playerId, teamAbbreviation, payoutMultiplier, projId, statType, fullName, lineScore, overStreak,
        overLast3, overLast5, overLast10, underStreak, underLast3, underLast5, underLast10,
        avgLast10, avgLast5, avgLast3, trendingUp, trendingDown, lineHistory, avglast10LineScorePercentage,
        avglast5LineScorePercentage, avglast3LineScorePercentage, opposingTeam, gameDate }) => (
        <Card key={projId} className='player-projection-card'>
          <CardContent sx={{padding: '5px'}}>
            <Typography sx={{ fontSize: '11px' }} variant="body1">vs {opposingTeam} {gameDate}</Typography>
            <Typography sx={fontStyle} variant="body1">{fullName}</Typography>
            <Typography sx={fontStyle} variant="body1">{statType}: {lineScore}</Typography>
            <Typography sx={fontStyle} className={payoutMultiplier > 1 && 'hot-chili'} variant="body1">Payout Multiplier: {payoutMultiplier}</Typography>
            <br />
            {/* <Typography variant="body1">Avg Last 3 Games: {avgLast3} {createPercentage(avglast3LineScorePercentageopposingTeam)}</Typography> */}
            <Typography sx={fontStyle} variant="body1">Avg Last 3 Games: {avgLast3} {createPercentage(avglast3LineScorePercentage)}</Typography>
            <Typography sx={fontStyle} variant="body1">Avg Last 5 Games: {avgLast5} {createPercentage(avglast5LineScorePercentage)}</Typography>
            <Typography sx={fontStyle} variant="body1">Avg Last 10 Games: {avgLast10} {createPercentage(avglast10LineScorePercentage)}</Typography>
            {trendingUp && <Typography className='trending' variant="body1">Trending Up</Typography>}
            {trendingDown && <Typography className='trending' variant="body1">Trending Down</Typography>}
            <br />
            <Typography sx={fontStyle} className={overStreak >= 3 && 'hot-streak'} variant="body1">Over Streak: {overStreak}</Typography>
            <Typography sx={fontStyle} variant="body1">Over Last 3 Games: {overLast3}</Typography>
            <Typography sx={fontStyle} variant="body1">Over Last 5 Games: {overLast5}</Typography>
            <Typography sx={fontStyle} className={overLast10 >= 7 && 'hot-streak'} variant="body1">Over Last 10 Games: {overLast10}</Typography>
            <br />
            <Typography sx={fontStyle} className={underStreak >= 3 && 'hot-streak'} variant="body1">Under Streak: {underStreak}</Typography>
            <Typography sx={{fontSize: '14px', ...fontStyle }} variant="body1">Under Last 3 Games: {underLast3}</Typography>
            <Typography sx={{fontSize: '14px', ...fontStyle }} variant="body1">Under Last 5 Games: {underLast5}</Typography>
            <Typography sx={fontStyle} className={underLast10 >= 7 && 'hot-streak'} variant="body1">Under Last 10 Games: {underLast10}</Typography>
            <br />
          </CardContent>
          <Button onClick={() => {
            let reverseLineHistory = [...lineHistory];
            reverseLineHistory.reverse();
            handleModal(true, { lineHistory: reverseLineHistory, fullName, statType, lineScore, opposingTeam, projId, playerId, teamAbbreviation })
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
                <ChartsTooltip />
              </ResponsiveChartContainer>
            </div>
            {modalInfo.statType && againstOpponentStats.length > 0 &&
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
                  <ChartsTooltip />
                </ResponsiveChartContainer>
              </div>
            }
          </Box>
        </ClickAwayListener >
      </Modal>
    </div>
  );
};

const fontStyle = { fontSize: '14px' }

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


export default UnderdogSingleStat;