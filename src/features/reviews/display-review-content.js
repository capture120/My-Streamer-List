const DisplayReviewContent = ({ review }) => {
    return (
        <div>
            <p className="text-lg">{review.review_content}</p>
            <p className="text-lg">{review.isRecommended ? "Recommended" : "Not-Recommended"}</p>
            <p className="text-lg">{review.date_created}</p>
        </div>
    )
}

/*
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h5 className="card-title">{channel.name}</h5>
                        </div>
                    </div>
                </div>
            </div>
*/

export default DisplayReviewContent;