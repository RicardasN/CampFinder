import React, { useState, useContext, useEffect } from 'react';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import CampgroundContext from '../../context/campground/campgroundContext';

const display = {
  zIndex: '1003',
  display: 'block',
  opacity: '1',
  top: '10%',
  transform: 'scaleX(1) scaleY(1)'
};
const hide = {
  display: 'none'
};

const EditCampgroundModal = ({ toggle, setToggle }) => {
  const alertContext = useContext(AlertContext);
  const campgroundContext = useContext(CampgroundContext);
  const { setAlert } = alertContext;
  const { current, updateCampground } = campgroundContext;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (current) {
      setName(current.name);
      setImage(current.image);
      setPrice(current.price);
      setLocation(current.location);
      setDescription(current.description);
    }
  }, [current]);

  const onSubmit = () => {
    if (
      name === '' &&
      image === '' &&
      price === '' &&
      location === '' &&
      description === ''
    ) {
      setAlert('Please fill in all the required fields', 'danger');
    } else {
      updateCampground({
        name,
        image,
        price,
        location,
        description,
        _id: current._id
      });
      setName('');
      setImage('');
      setPrice(0);
      setLocation('');
      setDescription('');
      setToggle(!toggle);
    }
  };

  return (
    <div
      id="edit-campground-modal"
      className="modal"
      style={toggle ? display : hide}
    >
      <div className="modal-content">
        <h4>Edit Campground Information</h4>
        <Alerts />
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Campground Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="image"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <label htmlFor="image" className="active">
              Image URL
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <label htmlFor="location" className="active">
              Campground's Location
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="number"
              name="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <label htmlFor="price" className="active">
              Campground's price for one night
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          className="waves-effect waves-light btn teal"
          href="#!"
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};

export default EditCampgroundModal;
