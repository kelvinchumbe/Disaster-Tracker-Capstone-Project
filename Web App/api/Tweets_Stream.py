from stream_tweets import *
from machine_learning_pipeline import *
from tweet_preprocessing_utils import *
from tweet_infromation_extraction_utils import *
from tweets_list import tweet_data_list, tweet_ids
from country_bounding_boxes import *
import time


categorizing_model, filtering_model = load_models()
categorizing_model_tokenizer, filtering_model_tokenizer = load_tokenizers()

credentials = {}
with open('./TwitterAPI_credentials.txt') as file:
    for line in file:
        line_arr = line.split(': ')
        credentials[line_arr[0]] = line_arr[1].strip()

twitter_api = twitter_authenticate(credentials['Access token'], credentials['Access token secret'],
                                   credentials['API key'], credentials['API secret key'])


class MyStreamListener(tweepy.StreamListener):
    def on_connect(self):
        print('Stream starting...')

    def on_status(self, status):

        if status._json['coordinates'] is not None:
            tweet_id = status.id
            tweet_text = status.text
            user_location = status.user.location
            user_screen_name = status.user.screen_name
            created_at = status._json['created_at']

            place_name = ''
            bounding_coord_1 = bounding_coord_2 = bounding_coord_3 = bounding_coord_4 = []

            if status.place is not None:
                place_name = status.place.full_name
                bounding_coord_1, bounding_coord_2, bounding_coord_3, bounding_coord_4 = extractBoundingCoordinates(status.place.bounding_box.coordinates[0])

            geo_coordinates_lng, geo_coordinates_lat = status.coordinates['coordinates'][0], status.coordinates['coordinates'][1]

            hashtags = extractHashtag(status.entities['hashtags'])

            tweets_df = createDataFrame([[tweet_id, tweet_text]])

            tweets_df['tweet_text'] = tweets_df['tweet_text'].apply(lambda x: preprocess_tweet(x))

            relevance_preds_cat = predict_filter_relevance(filtering_model, filtering_model_tokenizer, tweets_df['tweet_text'])

            if relevance_preds_cat[0] != 0:
                tweet_categories = predict_categories(categorizing_model, categorizing_model_tokenizer, tweets_df['tweet_text'])

                tweet_data = {}
                geometry = {}
                properties = {}

                tweet_data['type'] = "Feature"
                tweet_data['geometry'] = geometry
                tweet_data['geometry']['type'] = "Point"
                tweet_data['geometry']['coordinates'] = [float(geo_coordinates_lng), float(geo_coordinates_lat)]
                tweet_data['properties'] = properties
                tweet_data['properties']['tweet_id'] = tweet_id
                tweet_data['properties']['tweet_text'] = tweet_text
                tweet_data['properties']['user_location'] = user_location
                tweet_data['properties']['user_screen_name'] = user_screen_name
                tweet_data['properties']['created_at'] = created_at
                tweet_data['properties']['place_name'] = place_name
                tweet_data['properties']['bounding_coord_1'] = [float(coord) for coord in bounding_coord_1]
                tweet_data['properties']['bounding_coord_2'] = [float(coord) for coord in bounding_coord_2]
                tweet_data['properties']['bounding_coord_3'] = [float(coord) for coord in bounding_coord_3]
                tweet_data['properties']['bounding_coord_4'] = [float(coord) for coord in bounding_coord_4]
                tweet_data['properties']['category'] = tweet_categories[0]
                tweet_data['properties']['hashtags'] = hashtags
                tweet_data['properties']['cluster'] = False

                if not tweet_id in tweet_ids:
                    tweet_ids.append(tweet_id)
                    tweet_data_list.append(tweet_data)
                    print(".", end="")

    def on_error(self, status):
        if status == 420:  # returning False in on_data disconnects the stream
            return False
        else:  # continue listening if other errors occur
            print('An Error has occurred: ' + repr(status))
            return True

def stream(hashtag, country):
    stream_listener = MyStreamListener()
    stream = tweepy.Stream(auth=twitter_api.auth, listener=stream_listener)
    stream.filter(track=hashtag, locations=country_bounding_boxes[country][1])


def streamFromFile():
    with open("./tweets/Tweets with Locations_Nepal Earthquake.csv", encoding="utf8") as file:
        lines = file.readlines()

        for idx, line in enumerate(lines[1:]):
            if (idx + 1) % 10 == 0:
                time.sleep(8)
            else:
                line_arr = line.strip().split(',')

                tweet_id = line_arr[0]
                tweet_time = line_arr[1]
                tweet_author = line_arr[2]
                tweet_lon = line_arr[5]
                tweet_lat = line_arr[6]
                tweet_text = line_arr[7]

                tweets_df = createDataFrame([[tweet_id, tweet_text]])

                tweets_df['tweet_text'] = tweets_df['tweet_text'].apply(lambda x: preprocess_tweet(x))

                relevance_preds_cat = predict_filter_relevance(filtering_model, filtering_model_tokenizer,
                                                               tweets_df['tweet_text'])

                if relevance_preds_cat[0] != 0:
                    tweet_categories = predict_categories(categorizing_model, categorizing_model_tokenizer,
                                                          tweets_df['tweet_text'])

                    tweet_data = {}
                    geometry = {}
                    properties = {}

                    tweet_data['type'] = "Feature"
                    tweet_data['geometry'] = geometry
                    tweet_data['geometry']['type'] = "Point"
                    tweet_data['geometry']['coordinates'] = [float(tweet_lon), float(tweet_lat)]
                    tweet_data['properties'] = properties
                    tweet_data['properties']['tweet_id'] = tweet_id
                    tweet_data['properties']['tweet_text'] = tweet_text
                    tweet_data['properties']['user_screen_name'] = tweet_author
                    tweet_data['properties']['created_at'] = tweet_time
                    tweet_data['properties']['category'] = tweet_categories[0]
                    tweet_data['properties']['cluster'] = False
                    tweet_data['properties']['hashtags'] = []

                    if not tweet_id in tweet_ids:
                        tweet_ids.append(tweet_id)
                        tweet_data_list.append(tweet_data)
                        print(".", end="")