import React from 'react';
import ProfileTemplate from './profileTemplate';

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="row grey accent-2">
        <ProfileTemplate />
      </div>
    );
  }
}

export default ProfilePage;