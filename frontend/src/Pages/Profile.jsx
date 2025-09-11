import React, { useEffect, useState } from 'react'
import Service from '../utils/http'
import { Center, Text, Avatar, Stack } from '@mantine/core';

const obj = new Service();

export default function Profile() {
  const [user, setUser] = useState({});

  const getProfileData = async () => {
    try {
      let data = await obj.get("user/me");
      setUser(data);
      console.log("Profile data:", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  // Format created date/time safely
  const formattedCreatedAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleString()
    : "Not available";

  return (
    <div>
      <Center>
        <Stack align="center" spacing="sm">
          {/* Profile Picture */}
          <Avatar 
            src={user?.profilePicture || "https://via.placeholder.com/150"} 
            alt={user?.name} 
            radius="xl"
            size={100} 
            style={{ marginTop: "40px" }}
          />

          {/* Profile Details */}
          <Text size="lg">Name: {user?.name}</Text>
          <Text size="md">Email: {user?.email}</Text>
          <Text size="md">Role: {user?.role || "Not assigned"}</Text>
          <Text size="md">Created At: {formattedCreatedAt}</Text>
        </Stack>
      </Center>
    </div>
  );
}
