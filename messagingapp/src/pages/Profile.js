import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile-area">
        <div className="profile-name">
          {this.props.user.firstName + " " + this.props.user.lastName}
        </div>
        <div className="profile-name">{this.props.user.displayName}</div>
        <div className="profile-image">
          <img
            alt="user avatar"
            className="profile-img"
            src={this.props.user.photoURL}
          />
        </div>
        <div className="profile-field-name"> Email</div>
        <div className="profile-field-value">{this.props.user.email}</div>
        <div className="profile-field-name">Website</div>
        <div className="profile-field-value">{this.props.user.website}</div>
        <div className="profile-field-name"> Bio</div>
        <div className="profile-field-value">{this.props.user.bio}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
