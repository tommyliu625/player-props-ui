import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {NavBar} from './NavBar';
import { Body } from './Body';

export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Body />
    </div>
  );
};

