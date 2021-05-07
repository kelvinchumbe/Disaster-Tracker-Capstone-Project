def extractHashtag(hashtag_obj):
    hashtags = []

    if len(hashtag_obj) != 0:
        for object in hashtag_obj:
            hashtag = '#' + object['text']
            hashtags.append(hashtag)

    return hashtags


def extractBoundingCoordinates(bounding_box_coordinates):
    return bounding_box_coordinates[0], bounding_box_coordinates[1], bounding_box_coordinates[2], bounding_box_coordinates[3]
