// components/Settings.js
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Link } from '@chakra-ui/react';

const Settings = () => {
  return (
    <Popover>
      <PopoverTrigger>
        {/* This can be a link or any element you want to trigger the popover */}
        <span style={{ cursor: 'pointer', color: '#2E8B57' }}>Settings</span>
      </PopoverTrigger>
      <PopoverContent bg="black" color="white" border="2px" borderColor="#2E8B57">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Login</PopoverHeader>
        <PopoverBody>
          {/* Content you want to display in the popover */}
          <Link href="/login" style={{ display: 'block', color: '#2E8B57' }}>
            Login
          </Link>
          <Link href="/profile" style={{ display: 'block', color: '#2E8B57' }}>
            Profile
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
