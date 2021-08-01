import { createTutorial } from "../services/tutorialServices";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };
    createTutorial(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
      }).catch(error => {
        console.log(error)
      })
  };
  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  }
  return (
    <div className="submit-form mt-5">
      {submitted ? (
        <div className="m-auto">
          <h4 className="text-center mb-5">You submitted successfully!</h4>
          <div className="success-buttons">
            <button className="btn btn-success margin-btn" onClick={newTutorial}>
              Add
            </button>
            <Link
              to={"/tutorials"}
              className="btn btn-primary align-bt-right blue-btn m-0">
              Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="card box-props p-4">
          <div className="card-body">

            <h4 className="mb-3">Create Tutorial</h4>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={tutorial.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="10" cols="50"
                  className="form-control"
                  id="description"
                  required
                  value={tutorial.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
            </form>
            <div className="d-flex align-bt-right">
              <Link
                to={"/tutorials"}
                className="btn btn-primary align-bt-right blue-btn mt-0 margin-btn">
                Back
              </Link>
              <button onClick={saveTutorial} className="btn btn-success purple-bg" type="submit">
                Submit
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddTutorial;