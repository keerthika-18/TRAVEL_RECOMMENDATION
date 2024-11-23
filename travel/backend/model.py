import os
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationModel:
    def __init__(self):
        # Paths to required CSV files
        city_file_path = 'C:\\Users\\Keethika P\\TRAVEL_RECOMENDATION\\travel\\backend\\data\\City.csv'
        review_file_path = 'C:\\Users\\Keethika P\\TRAVEL_RECOMENDATION\\travel\\backend\\data\\travel_reviews (1).csv'
        
        # Check if the files exist
        if not os.path.exists(city_file_path):
            raise FileNotFoundError(f"File {city_file_path} not found. Please ensure it is in the correct directory.")
        if not os.path.exists(review_file_path):
            raise FileNotFoundError(f"File {review_file_path} not found. Please ensure it is in the correct directory.")
        
        # Load the data
        self.cities_df = pd.read_csv(city_file_path)
        self.travel_reviews_df = pd.read_csv(review_file_path)

        # Prepare data for content-based filtering
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.cities_df['City_desc'])

    def get_content_based_recommendations(self, city_name, top_n=5):
        # Check if the city exists in the dataset
        if city_name not in self.cities_df['City'].values:
            raise ValueError(f"City '{city_name}' not found in the dataset.")
        
        # Get the index of the input city
        city_idx = self.cities_df[self.cities_df['City'] == city_name].index[0]

        # Compute cosine similarity scores
        cosine_similarities = cosine_similarity(
            self.tfidf_matrix[city_idx], self.tfidf_matrix
        ).flatten()

        # Get top N similar cities
        similar_indices = np.argsort(cosine_similarities)[::-1][1:top_n + 1]

        # Prepare recommendations
        recommendations = []
        for idx in similar_indices:
            city_data = self.cities_df.iloc[idx]
            recommendations.append({
                "City": city_data['City'],
                "Place": city_data['Ratings'],  # Replace 'Ratings' with the correct column for places, if needed
                "Place_desc": city_data['City_desc'],
                "Score": cosine_similarities[idx]
            })

        return recommendations

    def get_collaborative_recommendations(self, user_id, top_n=5):
        # Pivot the travel reviews dataset to create a user-item matrix
        user_item_matrix = self.travel_reviews_df.pivot_table(
            index='user_id',
            columns='Place',
            values='rating'
        )

        # Check if the user exists in the dataset
        if user_id not in user_item_matrix.index:
            raise ValueError(f"User ID '{user_id}' not found in the dataset.")

        # Get the user's ratings
        user_ratings = user_item_matrix.loc[user_id]

        # Compute similarity scores
        item_similarity = cosine_similarity(user_item_matrix.fillna(0).T)
        similarity_df = pd.DataFrame(item_similarity, index=user_item_matrix.columns, columns=user_item_matrix.columns)

        # Recommend places based on similarity
        recommendations = {}
        for place, rating in user_ratings.dropna().items():
            similar_places = similarity_df[place].drop(place).sort_values(ascending=False)
            for similar_place, score in similar_places.items():
                if similar_place not in user_ratings.index:  # Only recommend unvisited places
                    if similar_place not in recommendations:
                        recommendations[similar_place] = score * rating
                    else:
                        recommendations[similar_place] += score * rating

        # Sort recommendations by score
        sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:top_n]

        # Format recommendations
        return [{"Place": place, "Score": score} for place, score in sorted_recommendations]

    def get_recommendations(self, user_id=None, city_name=None, top_n=5, collaborative_weight=0.7, content_weight=0.3):
        if city_name:
            # Content-based recommendations for a city
            return self.get_content_based_recommendations(city_name, top_n)

        if user_id:
            # Get collaborative and content-based recommendations
            collaborative_recommendations = []
            content_recommendations = []

            try:
                collaborative_recommendations = self.get_collaborative_recommendations(user_id, top_n)
            except ValueError:
                pass

            try:
                # Default to recommendations based on the first city if no city_name is provided
                default_city = self.cities_df['City'].iloc[0]
                content_recommendations = self.get_content_based_recommendations(default_city, top_n)
            except ValueError:
                pass

            # Combine recommendations and apply weights
            combined_recommendations = []
            for rec in collaborative_recommendations:
                combined_recommendations.append({"Place": rec["Place"], "Score": rec["Score"] * collaborative_weight})
            for rec in content_recommendations:
                combined_recommendations.append({"Place": rec["Place"], "Score": rec["Score"] * content_weight})

            # Sort by score and get the top N
            combined_recommendations = sorted(combined_recommendations, key=lambda x: x["Score"], reverse=True)
            return combined_recommendations[:top_n]

        raise ValueError("Either 'user_id' or 'city_name' must be provided.")
