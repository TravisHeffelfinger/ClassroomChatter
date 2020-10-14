import React from 'react'
import { connect } from 'react-redux'

class Profile extends React.Component {

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="Profile-area">
                <div className="profile-name">Person's Name!!</div>
                <div className="profile-name">@Username</div>
                <div className="profile-image"></div>
                <div className="profile-field-name"> Email</div>
                <div className="profile-field-value">email@test.com</div>
                
                <div className="profile-field-name" >Website</div>
                <div className="profile-field-value" >www.mytest.com</div>
                <div className="profile-field-name"> Bio</div>
                <div className="profile-field-value" > 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)