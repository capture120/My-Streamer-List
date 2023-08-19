import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateChannelThunk, createChannelThunk, findChannelByIdThunk } from "./services/channels-thunks";
import { createReviewThunk } from "../reviews/services/reviews-thunk";

import * as twitchService from "../../services/twitch-service";
import { addCommasToNums } from "../../utils/addCommasToNums";
import { resizeTwitchProfileImage } from "../../utils/resizeTwitchProfileImage";

function Channel() {
    const { twitch_id } = useParams();

    const { currentChannel } = useSelector((state) => { return state.channels });
    const { currentUser } = useSelector((state) => { return state.user });

    const [channelDetails, setChannelDetails] = useState({});
    const [review_content, setReview] = useState("");
    const [isRecommended, setIsRecommended] = useState("");

    const dispatch = useDispatch();
    const handleCreateReviewButton = () => {
        if (isRecommended === "" || review_content === "") {
            alert("Please fill out all fields");
            return;
        }

        dispatch(createReviewThunk({
            twitch_id: twitch_id,
            review_content: review_content,
            isRecommended: isRecommended,
        }));
        setReview("");
        setIsRecommended("");
    }

    const findChannelDetails = async () => {
        const channel = await twitchService.findUser(twitch_id);
        const followersCount = await twitchService.findFollowerCount(twitch_id);

        const channelInfo = channel.data[0];
        channelInfo.followersCount = followersCount;

        setChannelDetails(channelInfo);
    }

    useEffect(() => {
        findChannelDetails();
    }, []);

    const displayChannelDetails = () => {
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
                {currentUser && <div>
                    <textarea className="border border-gray-800"
                        onChange={(e) => { setReview(e.target.value) }} value={review_content}></textarea>
                    <div>
                        <button className="border border-gray-800" onClick={handleCreateReviewButton}>Create Review</button>
                    </div>
                    <div class="inline-block relative w-64">
                        <select value={isRecommended} onChange={(e) => setIsRecommended(e.target.value)} class="block appearance-none w-full bg-white border border-gray-400px-4 py-2 pr-8 rounded shadow focus:outline-none ">
                            <option value={""}></option>
                            <option value={true}>Recommended</option>
                            <option value={false}>Not-Recommended</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>}
            </div>

        );
    }

    return (
        <div>
            {channelDetails && displayChannelDetails()}
        </div>
    );

}
export default Channel;