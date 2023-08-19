import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateChannelThunk, createChannelThunk, findChannelByIdThunk } from "./services/channels-thunks";

import * as twitchService from "../../services/twitch-service";

function Channel() {
    const { twitch_id } = useParams();

    const { currentChannel } = useSelector((state) => { return state.channels });
    const [channelDetails, setChannelDetails] = useState({});

    const findChannelDetails = async () => {
        const channel = await twitchService.findUser(twitch_id);
        setChannelDetails(channel.data[0]);
    }

    useEffect(() => {
        findChannelDetails();
    });

    const displayChannelDetails = () => {
        return (
            // <div>
            //     <img src={channelDetails.profile_image_url} alt="profile image" />
            //     <div>
            //         <h1>Channel Name</h1>
            //         {channelDetails.display_name}
            //     </div>
            //     <div>
            //         <h2>Description</h2>
            //         {channelDetails.description}
            //     </div>
            //     <div>
            //         <h3>Total Views</h3>
            //         {channelDetails.view_count}
            //     </div>
            // </div>
            <div className="flex flex-col items-center">
                <img
                    className="w-32 h-32 rounded-full"
                    src={channelDetails.profile_image_url}
                    alt="profile image"
                />
                <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold">Channel Name</h1>
                    <p className="text-lg">{channelDetails.display_name}</p>
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold">Description</h2>
                    <p className="text-lg">{channelDetails.description}</p>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Total Views</h3>
                    <p className="text-lg">{channelDetails.view_count}</p>
                </div>
            </div>

        );
    }

    return (
        <div>
            <h1>Twitch Channel</h1>
            {channelDetails && displayChannelDetails()}

            {/* {JSON.stringify(channelDetails, null, 2)} */}
        </div>
    );

}
export default Channel;