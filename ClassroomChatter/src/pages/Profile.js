import React from "react";
import { connect } from "react-redux";
import {
  IconButton,
  Card,
  Button,
  CardHeader,
  Typography,
  CardContent,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { storeUser } from "../Redux/actions";

import { updateUser } from "../helpers/db";

class Profile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    website: "",
    bio: "",
    edit: false,
  };

  setEdit() {
    console.log(this.edit);
    this.edit = !this.edit;
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateProfile() {
    let newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      displayName: this.state.displayName,
      email: this.state.email,
      website: this.state.website,
      bio: this.state.bio,
    };
    updateUser(this.props.user, newUser);
    this.props.storeUser();
    this.setState({ edit: false });
  }

  render() {
    if (this.edit) {
      return (
        <Card className="profile-area">
          <CardHeader className="profile-name">
            <TextField
              onChange={(e) => this.handleInput(e)}
              name="firstName"
              label="First Name"
              value={this.props.user.firstName}
            />
                    {console.log('ding')}
            <TextField
              onChange={(e) => this.handleInput(e)}
              name="lastName"
              label="Last Name"
              value={this.props.user.lastName}
            />
            <IconButton onClick={() => this.setEdit()}>
              <Edit />
            </IconButton>

            <TextField
              onChange={(e) => this.handleInput(e)}
              name="displayName"
              className="profile-name"
              label="Display Name"
              placeholder={this.props.user.displayName}
            />
          </CardHeader>
          <div className="profile-image">
            <img
              alt="user avatar"
              className="profile-img"
              src={this.props.user.photoURL}
            />
          </div>
          <TextField
            onChange={(e) => this.handleInput(e)}
            name="email"
            label="Email"
            placeholder={this.props.user.email}
          />
          <TextField
            onChange={(e) => this.handleInput(e)}
            name="website"
            label="Website"
            placeholder={this.props.user.website}
          />
          <TextField
            onChange={(e) => this.handleInput(e)}
            name="bio"
            label="Bio"
            placeholder={this.props.user.bio}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.updateProfile()}
          >
            Update
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.setEdit()}
          >
            Cancel
          </Button>
        </Card>
      );
    } else if(this.edit === false || this.edit === undefined) {
      return (
        <Card className="profile-area">
          <CardHeader
            className="profile-name"
            title={
              <Typography variant="h5" className="message-title">
                {this.props.user.firstName +
                  " " +
                  this.props.user.lastName +
                  "       "}
                <IconButton onClick={() => this.setEdit()}>
                  <Edit />
                </IconButton>
              </Typography>
            }
            subheader={
              <Typography className="profile-name">
                {this.props.user.displayName}
              </Typography>
            }
          ></CardHeader>
          <div className="profile-image">
            <img
              alt="user avatar"
              className="profile-img"
              src={this.props.user.photoURL}
            />
          </div>
          {console.log('dong')}

          <CardContent className="profile-field-value">
            {this.props.user.email}
          </CardContent>
          <CardContent className="profile-field-value">
            {this.props.user.website}
          </CardContent>
          <CardContent className="profile-field-value">
            {this.props.user.bio}
          </CardContent>
        </Card>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  storeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
