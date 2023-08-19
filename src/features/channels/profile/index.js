import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateChannelThunk, createChannelThunk, findChannelByIdThunk } from "../services/channels-thunks";

import * as twitchService from "../../services/twitch-service";

function Profile() {
    const { twitch_id } = useParams();
    const dispatch = useDispatch();
    
    const { currentChannel } = useSelector((state) => { return state.channels });
    const { channelDetails, setChannelDetails } = useState({});


    const findChannelDetails = async () => {
        const channel = await twitchService.findChannelById(twitch_id);
        setChannelDetails(channel);
    }

    return (
        <div>
            <h1>Twitch Channel</h1>
            {channelDetails && JSON.stringify(channelDetails, null, 2)}
        </div>
        );

}
export default Profile;