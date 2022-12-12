import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectFiled from "../common/form/multiSelectField";
import api from "../../api";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../utils/validator";

const UserEditPage = () => {
    const history = useHistory();
    const { userId } = useParams();
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
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя введено не корректно"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

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
                profession: data.profession._id,
                qualities: qualitiesArray
            };
            setData(newUser);
        });
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return null;
        const { profession, qualities } = data;
        const updatedData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(userId, updatedData).then(() => history.push(`/users/${userId}`));
    };

    if (data && professions && qualities.length > 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={ data.name }
                                onChange={ handleChange }
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={ data.email }
                                onChange={ handleChange }
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={ professions }
                                onChange={ handleChange }
                                value={ data.profession }
                                error={errors.profession}
                            />
                            <RadioField
                                options={ [
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ] }
                                value={ data.sex }
                                name="sex"
                                onChange={ handleChange }
                                label="Выберите ваш пол"
                            />
                            <MultiSelectFiled
                                options={ qualities }
                                onChange={ handleChange }
                                defaultValue={ data.qualities }
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </form>
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
