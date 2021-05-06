import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "../common/Header";
import * as Yup from "yup";
import { fetchTweets, postInput } from "../../redux/actions/tweetsAction";
import { useDispatch } from "react-redux";
import { country_countrycode } from "./country_code";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Header />
      <div className="page-body">
        <div className="content">
          <h3 className="tool-description">
            <b>Disaster Tracker</b> is a tool used to generate insights from
            disaster related tweets to help increase situaltional awareness
            among disaster response teams. It does this by streaming tweets
            using a hashtag(s), categorizes the tweets and maps them on a
            crowdmap.
          </h3>

          <Formik
            initialValues={{ hashtag: "", country: "US", stream: "Live" }}
            validationSchema={Yup.object({
              hashtag: Yup.string()
                .matches(
                  /[/^#/i]/,
                  "Hashtag should start with the hashtag symbol (#)"
                )
                .required("You must enter a hashtag to stream tweets"),

              // date: Yup.string().required(
              //   "You must enter a date to stream tweets"
              // ),
              country: Yup.string().required(
                "You must enter a country to stream tweets"
              ),
              stream: Yup.string().required("Pick a stream option"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);

              postInput(values).then((response) => {
                if (response.Status === "Success") {
                  history.push("/dashboard");

                  const data_promise = new Promise((resolve, reject) => {
                    return setInterval(() => {
                      dispatch(fetchTweets(values))
                        .then((response) => response.payload)
                        .then((payload) => {
                          console.log(payload);
                        });
                    }, 10000);
                  });

                  return data_promise;
                }
              });
            }}
          >
            <Form className="form">
              <div className="form-input">
                <span className="input-description">
                  Enter a disaster-related hashtag to collect tweets:
                </span>
                <label htmlFor="hashtag" className="input-description-details">
                  Include the # symbol before the hashtag e.g #beirutblast or
                  provide multiple hashtags separated by a comma
                </label>
                <Field type="text" name="hashtag" className="field-input" />

                <ErrorMessage
                  name="hashtag"
                  className="form-error-messages"
                  // style={{ color: "red", fontSize: "0.6em" }}
                />
              </div>

              {/* <div className="form-input">
                <span className="input-description">
                  Enter date from which you want tweets from:
                </span>
                <label htmlFor="date" className="input-description-details">
                  Date format should be in YYYY-MM-DD e.g 2020-01-01
                </label>
                <Field type="text" name="date" className="field-input" />
                <ErrorMessage name="date" className="form-error-messages" />
              </div> */}

              <div className="form-input">
                <span className="input-description">
                  Select which country the disaster is happening:
                </span>
                <Field as="select" name="country" className="field-input">
                  {Object.keys(country_countrycode).map((key, i) => {
                    return (
                      <option value={key} key={i}>
                        {country_countrycode[key][0]}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage name="country" className="form-error-messages" />
              </div>

              <div className="form-input">
                <span className="input-description">
                  Stream Live Tweets or Stream Static Tweets (For Development
                  Purposes Only):
                </span>
                <Field as="select" name="stream" className="field-input">
                  <option value="Live">Stream Live Tweets</option>
                  <option value="Static">Stream Static Tweets</option>
                </Field>

                <ErrorMessage name="stream" className="form-error-messages" />
              </div>

              <button type="submit" className="submit">
                Stream Tweets
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
