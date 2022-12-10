import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectFiled from "../common/form/multiSelectField";
import api from "../../api";
import { useParams, useHistory } from "react-router-dom";

const UserEditPage = () => {
    const history = useHistory();
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [qualities, setQualities] = useState([]);
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });

    api.users.getById(userId).then((data) => {
        const qualitiesArray = data.qualities.map((qualitieObject) => ({
            label: qualitieObject.name,
            value: qualitieObject._id,
            color: qualitieObject.color
        }));
        const newUser = {
            ...data,
            qualities: qualitiesArray
        };
        setData(newUser);
    });
  }, []);

  useEffect(() => {
    api.updateUser
  })

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleChange = (target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }));
  };

  const updateUser = (target) => {
    target.preventDefault();
    history.push(`/users/${userId}`);
    const updateUser = {
        ...data,
        profession: getProfessionById(professions),
        qualities: getQualities(qualities)
      };
      return updateUser;
  };

  if (data && professions && qualities.length > 0) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              name="profession"
              options={professions}
              onChange={handleChange}
              value={data.profession._id}
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" }
              ]}
              value={data.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectFiled
              options={qualities}
              onChange={handleChange}
              defaultValue={data.qualities}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                onClick={updateUser}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="container mt-5">
            <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                <p>Loading...</p>
            </div>
            </div>
            </div>;
  }
};

export default UserEditPage;
