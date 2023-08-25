import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import * as twitchService from "../../services/twitch-service";

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
    // onKeyDown={(e) => {e.key === "Enter" && search(query)}}
    return (
        <div className="">
            <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg mt-4">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" placeholder="Search channels" value={query}
                        onChange={(e) => { setQuery(e.target.value); }} />

                    <button
                        onClick={() => {
                            navigate(`/search/${query}`);
                        }}
                        className="absolute right-0 top-0 h-full w-20 text-white rounded-r-lg bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        Search
                    </button>
                </div>
            </div>


            {/* Display channels in grid format */}
            <div className="container mx-auto mt-4">
                <div className="grid grid-cols-3 gap-4">
                    {channels.map((channel) => (
                        <Link to={`/channels/${channel.id}`}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                <img
                                    className="w-5/6 h-48 object-center ml-auto"
                                    src={channel.thumbnail_url}
                                />
                                <div className="p-4">
                                    <h2 className="font-bold text-2xl mb-2 text-center">{channel.display_name}</h2>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
}


export default Search;