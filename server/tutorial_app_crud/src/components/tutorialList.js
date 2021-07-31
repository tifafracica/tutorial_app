// There will be:

// a search bar for finding Tutorials by title.
// a tutorials array displayed as a list on the left.
// a selected Tutorial which is shown on the right.

import { getAll, removeAll, findByTitle } from "../services/tutorialServices";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorial();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const handleKeyPress = () => {
    findTutoByTitle(searchTitle.trim())
  }

  const retrieveTutorial = () => {
    getAll().then(response => {
      const data = (response.data.data.tutorials)
      console.log(data)
      setTutorials(data);
    }).catch(error => {
      console.log(error);
    });
  };

  const refreshList = () => {
    retrieveTutorial();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      }).catch(error => {
        console.log(error)
      })
  };

  const findTutoByTitle = () => {
    findByTitle(searchTitle)
      .then(response => {
        const data = (response.data.data.tutorials)
        console.log(data)
        setTutorials(data);
      }).catch(error => {
        console.log(error)
      })
  };

  const allTutorials = tutorials.title ||
    tutorials.map((tutorial, index) => (
      <li
        className={
          "list-group-item " + (index === currentIndex ? "active" : "")
        }
        onClick={() => setActiveTutorial(tutorial, index)}
        key={index}
      >
        {tutorial.title}
      </li>
    ))

  return (

    <div className="">
      <div className="row mb-5 mt-5">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
              onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findTutoByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card box-props p-3">
            <div className="card-body">
              <h4 className="mb-4">Tutorials List</h4>
              <ul className="list-group">
                {allTutorials}
              </ul>
              <button
                className="btn btn-danger pink-btn align-bt-right"
                onClick={removeAllTutorials}>
                Remove All
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card box-props p-3">
            <div className="card-body">
              {currentTutorial ? (
                <div>
                  <h4>Tutorial</h4>
                  <div className="mb-2">
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentTutorial.title}
                  </div>
                  <div className="mb-2">
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentTutorial.description}
                  </div>
                  <div className="mb-2">
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>

                  <Link
                    to={"/tutorials/" + currentTutorial.id}
                    className="btn btn-primary align-bt-right blue-btn"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Tutorial...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default TutorialList;