import React from 'react';
import ProfileForm from '../components/profile/ProfileForm';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default Profile;