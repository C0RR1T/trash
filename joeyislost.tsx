import React from 'react';
import * as Yup from 'yup';
import {withFormik, FormikProps,  Form, Field, ErrorMessage} from 'formik';
import UserServiceImpl from "../service/user/UserServiceImpl";
import User from "../service/user/model/User";

let countries = getCountries();
const userservice = new UserServiceImpl();

const Countries = () => (
    <Field as="select" name="country" className="form-control" id="country">{countries}</Field>
);


// Shape of form values
interface FormValues {
    salutation: string,
    firstName: string,
    lastName: string,
    email: string,
    companyName: string,
    street: string,
    postalCode: string,
    city: string,
    country: string
}

//Extended by MyFormProps
interface OtherProps {
    message: string;
}


// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    // eslint-disable-next-line
    const {touched, errors, isSubmitting, message} = props;


    return (
        <div className="container col-">
            <Form>
                <h1>{message}</h1>
                <div className="mb-3">
                    <label htmlFor="salutation" className="form-label">Salutation</label>
                    <Field  as="select" name="salutation" className="form-control" id="salutation" default="Mr.">
                        <option>Select a salutation..</option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Other</option>
                    </Field>
                    <ErrorMessage name="salutation">{msg => <div style={{color: 'red'}}>{msg}</div>}</ErrorMessage>
                </div>
                <div className="input-group d-flex">
                    <div className=" form-floating col-6 mb-3">
                        <Field name="firstName" type="text" className="form-control w-75" id="firstName"
                               aria-describedby="firstNameHelp" placeholder="First Name"/>
                        <label htmlFor="firstName" className="col-6 form-label">First Name *</label>
                    </div>
                    <div className="form-floating col-6 mb-3">
                        <Field name="lastName" type="text" className="form-control m-0" id="lastName"
                               aria-describedby="lastNameHelp" placeholder="Last Name"/>
                        <label htmlFor="lastName" className="col-6 form-label">Last Name *</label>
                    </div>
                    <div className="mb-3">
                        <ErrorMessage name="firstName">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                        <ErrorMessage name="lastName">
                            {msg => <div style={{color: 'red'}}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <Field name="email" type="email" className="form-control" id="email" placeholder="E-Mail"/>
                    <label htmlFor="email" className="form-label">E-Mail *</label>
                    <ErrorMessage name="email">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-floating mb-3">
                    <Field name="companyName" type="text" className="form-control" id="companyName"
                           placeholder="Name of Company"/>
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <ErrorMessage name="companyName">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-floating mb-3">
                    <Field name="street" type="text" className="form-control" id="street" placeholder="Street"/>
                    <label htmlFor="street" className="form-label">Street *</label>
                    <ErrorMessage name="street">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="mb-3">
                    <div className="input-group mb-3">
                        <div className="form-floating col-2">
                            <Field name="postalCode" type="text" className="form-control" id="postalCode"
                                   placeholder="ph"/>
                            <label htmlFor="postalCode" className="form-label">Postal Code *</label>
                        </div>
                        <div className="form-floating col-10">
                            <Field name="city" type="text" className="form-control" id="city"
                                   placeholder="City"/>
                            <label htmlFor="city" className="form-label">City *</label>
                        </div>
                    </div>

                    <ErrorMessage name="city">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>
                    <ErrorMessage className="col-2" name="postalCode">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>

                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country *</label>
                    <Countries/>
                    <ErrorMessage name="country">
                        {msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </div>
    );
};


// The type of props MyForm receives
interface MyFormProps extends OtherProps {
    initialSalutation?: string,
    initialFirstName?: string,
    initialLastName?: string,
    initialEmail?: string,
    initialCompany?: string,
    initialStreet?: string,
    postalCode?: string;
    city?: string;
    country?: string;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => {
        return {
            salutation: props.initialSalutation || '',
            firstName: props.initialFirstName || '',
            lastName: props.initialLastName || '',
            email: props.initialEmail || '',
            companyName: props.initialCompany || '',
            street: props.initialStreet || '',
            postalCode: props.postalCode || '',
            city: props.city || '',
            country: props.country || '',
        };
    },

    validationSchema: Yup.object().shape({
            firstName: Yup.string()
                .max(30, 'Please enter less than 30 characters')
                .required('Please enter a first name'),
            lastName: Yup.string()
                .max(40, 'Please enter less than 40 characters')
                .required('Please enter a last name'),
            email: Yup.string()
                .email('Please enter a valid E-Mail')
                .required('Please enter a valid E-Mail'),
            companyName: Yup.string()
                .max(40, 'Please input 40 characters or less'),
            street: Yup.string()
                .max(30, 'Please enter less than 30 characters')
                .required('Please enter a street'),
            postalCode: Yup.string()
                .matches(/^\d{1,9}[ -]?\d{1,9}$/, 'Not a valid postal code')
                .required('Please enter a postal code'),
            city: Yup.string()
                .max(60, 'Please enter less than 60 characters')
                .required('Please enter a city'),
            country: Yup.string()
                .required('Please select a country')
                .matches(/^((?!Select a country\.\.).)*$/, 'Please select a valid country'),
            salutation: Yup.string()
                .required('Please select a gender')
                .matches(/^((?!Select a salutation\.\.).)*$/, 'Please select a valid salutation')
        },
    ),

    handleSubmit: values => {
        const user = new User(values.salutation, values.firstName, values.lastName, values.email, values.street, values.postalCode, values.city, values.country, values.companyName);
        userservice.create(user);
    },
})(InnerForm);


function getCountries(): JSX.Element[] {
    let countries = [<option>Select a country..</option>];
    let request = new XMLHttpRequest();
    request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const object = JSON.parse(request.responseText);
            for (let option of object) {
                countries.push(<option>{option.name}</option>);
            }
        }
    }
    if (sessionStorage.getItem("countries") === null)
        sessionStorage.setItem("countries", JSON.stringify(countries));
    return countries;
}

// Use <MyForm /> wherevs
const Basic = () => (
    <div>
        <MyForm message="Sign up"/>
    </div>
);

export default Basic;
