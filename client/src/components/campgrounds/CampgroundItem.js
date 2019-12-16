import React, { useContext, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import EditCampgroundModal from './EditCampgroundModal';
import AuthContext from '../../context/auth/authContext';
import CampgroundContext from '../../context/campground/campgroundContext';

const CampgroundItem = ({ campground }) => {
  const authContext = useContext(AuthContext);
  const campgroundContext = useContext(CampgroundContext);

  const { user } = authContext;
  const { setCurrentCampground, deleteCampground } = campgroundContext;

  const [toggleEdit, setToggleEdit] = useState(false);
  const { name, image, description, _id, author } = campground;

  const onEdit = () => {
    setCurrentCampground(campground);
    setToggleEdit(!toggleEdit);
  };

  const onDelete = () => {
    deleteCampground(_id);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={`${image}`} alt="campground" />
        <span className="card-title">{name}</span>
      </div>
      <div className="card-content">
        <p>{description.substring(0, 40)}...</p>
      </div>
      <div className="card-action">
        <Link to={`/campgrounds/${_id}`}>View</Link>
        <span className="right">
          {(user && user._id === author) || (user && user.isAdmin) ? (
            <Fragment>
              <a
                className="waves-effect waves-light modal-trigger"
                href="#edit-campground-modal"
                onClick={onEdit}
              >
                <i className="fas fa-edit"></i>
              </a>
              <a href="#!" onClick={onDelete} className="red-text">
                <i className="fas fa-trash-alt"></i>
              </a>
            </Fragment>
          ) : (
            ''
          )}
        </span>
        <EditCampgroundModal toggle={toggleEdit} setToggle={setToggleEdit} />
      </div>
    </div>
  );
};

export default CampgroundItem;
