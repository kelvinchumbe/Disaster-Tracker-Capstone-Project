from flask import Flask, request
from flask_restful import Api
from flask import jsonify
from flask_cors import CORS, cross_origin
import tweepy
from Tweets_Stream import stream, streamFromFile
from tweets_list import tweet_data_list
import threading

class Thread (threading.Thread):
    def __init__(self, hashtag, country):
        threading.Thread.__init__(self)
        self.hashtag = hashtag
        self.country = country

    def run(self):
        stream(self.hashtag, self.country)


class Thread_Static_Stream (threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        streamFromFile()


app = Flask(__name__)
api = Api(app)
CORS(app, support_credentials=True)


@app.route('/', methods=["GET"])
@cross_origin(supports_credentials=True)
def connected():
    return "SERVER HAS BEEN CONNECTED SUCCESSFULLY"


@app.route('/tweets-query', methods=["POST"])
@cross_origin(supports_credentials=True)
def postInput():

    if request.json is None:
        return "ERROR: No query was provided. Kindly include the required query parameters"
    else:
        hashtag = request.json['hashtag'] if 'hashtag' in request.json else None
        country = request.json['country'] if 'country' in request.json else None
        stream = request.json['stream'] if 'stream' in request.json else None

        if stream == "Live":
            if hashtag and country:
                hashtag = [tag.strip() for tag in hashtag.split(",")]

                t = Thread(hashtag, country)
                t.start()

                return {"Status_Code": 200,
                        "Status": "Success"}

            else:
                return 'ERROR: Wrong queries provided'

        elif stream == "Static":
            t = Thread_Static_Stream()
            t.start()

            return {"Status_Code": 200,
                    "Status": "Success"}


@app.route('/tweets-query', methods=["GET"])
@cross_origin(supports_credentials=True)
def getTweets():
    try:
        return jsonify({"tweets": tweet_data_list})

    except tweepy.TweepError as e:
        if 'Failed to send request:' in e.reason:
            return 'ERROR HAS BEEN RAISED. DEAL WITH IT!!!'


if __name__ == '__main__':
    app.run(debug=False, threaded=True)