import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {

    let ratings = p && p.ratings;
    if (ratings) {
        let length = ratings.length;
        let ratingArr = [];
        ratings.map(r => ratingArr.push(r.star));
        let sum = ratingArr.reduce((p, n) => p + n, 0);
        let maxSum = length * 5;
        let result = (sum / maxSum) * 5;
        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating rating={result} starDimension="20px" starSpacing="2px" starRatedColor="red" editing={false} />{" "} ({length})
                </span>
            </div>
        )

    }
}