import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import IconButton from '@mui/material/IconButton';
import { LOCAL_HOST, UNDERDOG_S3_UPLOAD, UNDERDOG_NBA_API } from '../../../constants/propConstants';
import '../PlayerProjection.css'
import UnderdogProjectionTable from './UnderdogProjectionTable';

function UnderdogProjectionPage() {

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            let {data} = await axios.post(LOCAL_HOST + UNDERDOG_S3_UPLOAD, JSON.parse(inputValue));        
            console.log('data: ', data)
            if (data.status) {
                setUploadMessage(`Successfully uploaded at ${data.lastUpdated}`);                
            } else {
                setUploadMessage('Failed Upload')
            }
        } catch (err) {
            console.log('err: ', err)
            setUploadMessage('Failed Upload')

        } finally {
            setLoading(false);
            setInputValue('')
        }
    }

    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');    
    const [uploadMessage, setUploadMessage] = useState('')

    function handleKeyPress(e) {
        const { key, shiftKey } = e;
        if (key === 'Enter') {
            if (shiftKey) {
                setInputValue((prev) => prev);
            } else {
                e.preventDefault();
                handleSubmit(e);
            }
        }
    }

    return (
        <div>
            <p>To get latest projections go to this link and paste the json object in the text box below: <a target="blank" href={UNDERDOG_NBA_API}>{UNDERDOG_NBA_API}</a>
              <p>{uploadMessage}</p>
            </p>             
            <Box className={loading ? 'input-styling-loading' : 'input-styling'}>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Place Projections JSON Here'
                    rows={4}
                    multiline
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handleKeyPress}
                    inputProps={({ style: { paddingBottom: '4.4375em' } })}
                />
                <IconButton
                    color='primary'
                    sx={{ borderRadius: 'none !important', p: '10px' }}
                    onClick={handleSubmit}
                >
                    <ArrowRightAltSharpIcon />
                </IconButton>
            </Box>
             <UnderdogProjectionTable uploadMessage={uploadMessage}/>            
        </div >
    );
}

export default UnderdogProjectionPage;
