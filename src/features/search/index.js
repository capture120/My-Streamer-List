import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import * as twitchService from "../../services/twitch-service";

/*
border-2 border-gray-800
for search border border-gray-300
{JSON.stringify(channels, null, 2)}
*/


function Search() {
    const navigate = useNavigate();

    const { search_name } = useParams();

    const [query, setQuery] = useState("");
    const [channels, setChannels] = useState([]);

    const search = async (channel_name_to_search) => {
        const response = await twitchService.searchChannels(channel_name_to_search, 18);
        setChannels(response.data);
    }


    useEffect(() => {
        if (search_name) {
            setQuery(search_name);
            search(search_name);
        }
        else {
            setChannels([]);
        }
    }, [search_name]);

    return (
        <div className="">
            <div className="max-w-4xl mx-auto border border-gray-500 rounded-lg">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" placeholder="Search channels" value={query}
                        onChange={(e) => { setQuery(e.target.value); }} onKeyDown={(e) => {e.key === "Enter" && search(query)}}/>

                    <button
                        onClick={() => {
                            navigate(`/search/${query}`);
                        }}
                        className="btn btn-primary float-end"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="lg:grid lg:grid-flow-col lg:grid-rows-3">
                {/* Display array of channels */}
                {channels.map((channel) => {
                    return (
                        <div className="flex flex-col items-center justify-center border border-gray-800 min-w-fit max-w-xl p-4">
                            {/* Link channels to their respective URL */}
                            <Link to={`/channels/details/${channel.id}`}>
                                <h5 className="text-3xl font-bold mb-2">{channel.display_name}</h5>
                                <img src={channel.thumbnail_url} />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default Search;