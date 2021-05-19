import React from "react";
import { connect } from "react-redux";
import { IconButton, Card, CardHeader, Avatar, TextField, Typography, CardContent } from "@material-ui/core";


class Profile extends React.Component {
  render() {
    return (
      <Card className="profile-area">
        <CardHeader 
          className="profile-name" 
          title={
          <Typography variant="h5" className="message-title">
            {this.props.user.firstName + " " + this.props.user.lastName}
          </Typography>}
          subheader={<Typography className="profile-name">{this.props.user.displayName}</Typography>}>
        </CardHeader>
        <div className="profile-image">
          <img
            alt="user avatar"
            className="profile-img"
            src={this.props.user.photoURL}
          />
        </div>
        <CardContent className="profile-field-value">{this.props.user.email}</CardContent>
        <CardContent className="profile-field-value">{this.props.user.website}</CardContent>
        <CardContent className="profile-field-value">{this.props.user.bio}</CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
