'use client';
import styles from "@/app/ui/form.module.css";
import { Formik, FormikHelpers } from 'formik';
import useFormFields from "./state-management/custom-hooks/useFormFields";
import { useEffect, useRef, useState } from "react";
import * as yup from 'yup'
import { Colors } from "./utils/colors";
import AddFormFieldModal from "./components/AddFormFieldModal";
import { useDispatch } from "react-redux";
import { resetFormFields } from "./state-management/form-fields/FormFieldsSlice";
import FormSuccessModal from "./components/FormSuccessModal";
import { Form } from "react-bootstrap";

export default function Home() {
	const dispatch = useDispatch()
	const [fields] = useFormFields()
    const form = useRef<FormikHelpers<any> | null>(null)
    let [formFields, setFormFields] = useState(Object.fromEntries(fields.map(field => [field.name, ''])))
    let [validationSchema, setValidationSchema] = useState({})
    const newFormFieldBottomSheet = useRef(null)

	const [showNewFieldModal, setShowNewFieldModal] = useState(false);
	const [showFormSuccessModal, setShowFormSuccessModal] = useState(false);

    useEffect(() => {
        initForm()
    }, [fields.length])	
	
	const initForm = () => {
		setFormFields(Object.fromEntries(fields.map(field => [field.name, ''])))
        setValidationSchema(yup.object().shape(Object.fromEntries(fields.map(field => {
            let fieldName = field.name
            let fieldValidation = yup.string()

            if (field.type === 'email') {
                fieldValidation = fieldValidation.email(`${field.name} is not a valid email`)
            }

            if (field.isRequired) {
                fieldValidation = fieldValidation.required(`${field.name} is required`)                    
            }

            return [fieldName, fieldValidation]
        }))))
	}

	const submitForm = (values: any, formikHelpers: FormikHelpers<any>) => {
		formikHelpers.setSubmitting(false)
        formikHelpers.resetForm()
		formikHelpers.setErrors({})
        dispatch(resetFormFields())
        
		setShowFormSuccessModal(true)

	}

	return (
		<div className={`container ${styles.page}`}>
			<AddFormFieldModal
				show={showNewFieldModal}
				setShow={setShowNewFieldModal}
			/>
			<FormSuccessModal
				show={showFormSuccessModal}
				setShow={setShowFormSuccessModal}
				formValues={form?.current?.values ?? {}}
			/>
			<h1>
				Welcome to the Teach For All Dynamic Form Builder
			</h1>
			<Formik
				initialValues={formFields}
				onSubmit={submitForm}
				innerRef={form}
				validationSchema={validationSchema}
			>
				{
					({handleSubmit, handleChange, values, handleBlur, resetForm, isSubmitting, errors}) => (
						<form onSubmit={handleSubmit}>
							{
								fields.map((eachFormField, formFieldIndex) => (
									<div style={{ marginBottom: 10 }} key={formFieldIndex}>
										<label htmlFor="" style={{marginBottom: 5, fontSize: 12}}>
											{eachFormField.label}
										</label>
										<Form.Control
											type="text"
											name={eachFormField.name}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values[eachFormField.name]}
											className={'form-control'}
										/>
										{
											errors && errors[eachFormField.name] && (
												<div className={styles.error}>
													{errors[eachFormField.name]}
												</div>
											)
										}
									</div>	
								))
							}

							<button type="button" className="btn btn-outline-dark form-button" style={{borderColor: Colors.primary, marginRight: 10}} onClick={() => setShowNewFieldModal(true)}>
								Add New Field
							</button>
							<button type="submit" className="btn btn-primary form-button" style={{backgroundColor: Colors.primary, borderColor: Colors.primary}}>
								Submit
							</button>
						</form>
					)
				}
			</Formik>
		</div>
	)
}
