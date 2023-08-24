import { useEffect, useState } from "react";

import * as twitchService from "../../services/twitch-service";
import { addCommasToNums } from "../../utils/addCommasToNums";

const TwitchChannelDetails = ({twitch_id}) => {
    // local state
    const [channelDetails, setChannelDetails] = useState({});

    // Queries twitch api to find twitch statistics for this channel
    // Queries backend to find reviews for the channel
    const findChannelDetails = async () => {
        const channel = await twitchService.findUser(twitch_id);
        if (!channel.data[0]) {
            return;
        }
        const followersCount = await twitchService.findFollowerCount(twitch_id);

        const channelInfo = channel.data[0];
        channelInfo.followersCount = followersCount;

        setChannelDetails(channelInfo);
    }

    useEffect(() => {
        findChannelDetails();
    }, []);


    if (channelDetails) {
        return (
            <div className="flex flex-col items-center">
                <img
                    className="w-1/2 h-1/2 md:w-1/3 md:h-1/3 lg:w-1/4 lg:h-1/4 rounded-full"
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
                    <h3 className="text-xl font-bold">Followers</h3>
                    <p className="text-lg">{addCommasToNums(channelDetails.followersCount)}</p>
                </div>
            </div>
        );
    }
}

export default TwitchChannelDetails;