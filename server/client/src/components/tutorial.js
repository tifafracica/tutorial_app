import { useState, useEffect } from "react";
import { getTutorial, removeTutorial, updateTutorial } from "../services/tutorialServices";
import { Link } from "react-router-dom";

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [currentTutorial, setCurrentTutorial] = useState([initialTutorialState]);
  const [message, setMessage] = useState("");

  const getATutorial = id => {
    getTutorial(id)
      .then(response => {
        const info = response.data
        setCurrentTutorial(info.data.tutorial);
        console.log(info.data.tutorial);
      }).catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getATutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    setCurrentTutorial({ ...currentTutorial, [event.target.name]: event.target.value });
    console.log(currentTutorial)
  };


  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };
    console.log(data)
    updateTutorial(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      }).catch(error => {
        console.log(error)
      });
  };

  const updateATutorial = () => {
    updateTutorial(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    removeTutorial(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      }).catch(error => {
        console.log(error)
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="mt-5 m-auto w-75 card p-5 box-props">
          <div className="card-body">
            <h4>Edit Tutorial</h4>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mb-3">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? " Published" : " Pending"}
              </div>
            </form>

            <div className="align-bt-right">
              {currentTutorial.published ? (
                <button
                  className="btn btn-primary margin-btn blue-btn"
                  onClick={() => updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="btn btn-primary margin-btn blue-btn"
                  onClick={() => updatePublished(true)}
                >
                  Publish
                </button>
              )}

              <button className="btn btn-primary margin-btn purple-bg" onClick={deleteTutorial}>
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-primary margin-btn"
                onClick={updateATutorial}
              >
                Update
              </button>
              <Link
                to={"/tutorials"}
                className="btn btn-primary align-bt-right blue-btn m-0">
                Back
              </Link>
            </div>
            <p>{message}</p>

          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );


}

export default Tutorial;