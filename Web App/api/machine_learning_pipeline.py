import pandas as pd
import numpy as np
import pickle

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from attention import AttentionWithContext


def load_models():
    categorizing_model = load_model("./models/best_model_glove_attention_200d.h5", custom_objects={'AttentionWithContext': AttentionWithContext})
    filtering_model = load_model("./models/bilstm_model.h5", compile=False)

    return categorizing_model, filtering_model


def load_tokenizers():
    categorizing_model_tokenizer = pickle.load(open("./tokenizers/categorizing_tokenizer.pkl", "rb"))
    filtering_model_tokenizer = pickle.load(open("./tokenizers/filtering_tokenizer.pkl", "rb"))

    return categorizing_model_tokenizer, filtering_model_tokenizer


def createDataFrame(tweets_list):
    tweets_df = pd.DataFrame(data=tweets_list, columns=[
        "tweet_id", "tweet_text"])

    return tweets_df


# Identify locations before alof of preprocessing of the tweets
def identify_locations(tweets_list):
    pass


def predict_filter_relevance(filtering_model, filtering_tokenizer, tweets_text):
    # TOKENIZE TWEETS
    sequences = filtering_tokenizer.texts_to_sequences(tweets_text)
    max_sequence_len = 50
    tweets_text_padded_sequences = pad_sequences(sequences, maxlen=max_sequence_len)

    relevance_preds = filtering_model.predict(tweets_text_padded_sequences)
    relevance_preds_cat = np.argmax(relevance_preds, axis=1)

    return relevance_preds_cat


def mapCategories(category):
    category_labels_dict = {
         0: 'Sympathy and Support',
         1: 'Caution and Advice',
         2: 'Relief Request and Donations',
         3: 'Damage Report',
         4: 'Casualty'}

    return category_labels_dict[category]


def predict_categories(categorizing_model, categorizing_tokenizer, tweets_text):
    # TOKENIZE TWEETS
    sequences = categorizing_tokenizer.texts_to_sequences(tweets_text)
    max_sequence_len = 35
    tweets_text_padded_sequences = pad_sequences(sequences, maxlen=max_sequence_len, padding='post')

    category_preds = categorizing_model.predict(tweets_text_padded_sequences)
    category_preds = np.argmax(category_preds, axis=1)

    vect_mapCategories = np.vectorize(mapCategories)

    return vect_mapCategories(category_preds)
