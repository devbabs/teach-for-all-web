import { Formik, FormikHelpers } from 'formik'
import React, { useRef } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { FormFieldInterface } from '../state-management/form-fields/FormFieldsState'
import { addFormField } from '../state-management/form-fields/FormFieldsSlice'
import { createSlugFromString } from '../utils/helpers'
import { useDispatch } from 'react-redux'
import * as yup from 'yup';
import styles from "@/app/ui/form.module.css";
import { Colors } from '../utils/colors'

const validationSchema = yup.object().shape({
    label: yup.string().required('label is required'),
    placeholder: yup.string().required('placeholder is required'),
    numberOfLines: yup.number().required('number of lines is required'),
    type: yup.string().oneOf(['text', 'number', 'email', 'password']).required('type is required'),
});

const AddFormFieldModal = ({show, setShow}: {
    show: boolean
    setShow: (isShowing: boolean) => void
}) => {
    const handleClose = () => setShow(false);

    const form = useRef<FormikHelpers<FormFieldInterface> | null>(null)
    const dispatch = useDispatch()
    const fieldTypes: string[] = [
        'Text',
        'Number',
        'Email',
        'Password'
    ]    

    const submitForm = (values: FormFieldInterface, formikHelpers: FormikHelpers<FormFieldInterface>) => {
        dispatch(addFormField({
            name: createSlugFromString(values.label),
            label: values.label,
            placeholder: values.placeholder,
            type: values.type,
            numberOfLines: values.numberOfLines,
            isRequired: values.isRequired,
        }))
        formikHelpers.resetForm()
        setShow(false)
    }
    
    return (
        <Formik
            initialValues={{
                label: '',
                type: 'text',
                placeholder: '',
                numberOfLines: 1,
                isRequired: false,
            }}
            onSubmit={submitForm}
            innerRef={form}
            validationSchema={validationSchema}
            validateOnBlur={false}
        >
            {
                ({handleSubmit, handleChange, values, errors, setFieldValue}) => (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Use this form to add a new field
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div
                            style={{ marginBottom: 15 }}
                        >
                            <div className={styles.label}>
                                Custom Field Label
                            </div>
                            <Form.Control
                                placeholder={''}
                                className='form-control'
                                onChange={handleChange('label')}
                                value={values.label}
                            />
                            {
                                errors && errors.label && (
                                    <div className={styles.error}>
                                        {errors.label}
                                    </div>
                                )
                            }
                        </div>
                        <div
                            style={{ marginBottom: 15 }}
                        >
                            <div className={styles.label}>
                                Placeholder
                            </div>
                            <Form.Control
                                placeholder={''}
                                className='form-control'
                                onChange={handleChange('placeholder')}
                                value={values.placeholder ?? ""}
                            />
                            {
                                errors && errors.placeholder && (
                                    <div className={styles.error}>
                                        {errors.placeholder}
                                    </div>
                                )
                            }
                        </div>
                        <div style={{marginBottom: 15}}>
                            <div className={styles.label}>
                                Number of lines
                            </div>
                            <Form.Control
                                placeholder={''}
                                className='form-control'
                                type='number'
                                min={1}
                                onChange={handleChange('numberOfLines')}
                                value={String(values.numberOfLines ?? "")}
                            />
                            {
                                errors && errors.numberOfLines && (
                                    <div className={styles.error}>
                                        {errors.numberOfLines}
                                    </div>
                                )
                            }
                        </div>
                        <div
                            style={{ marginBottom: 15}}
                        >
                            <Form.Check
                                type={'switch'}
                                id={`required`}
                                label={`This is a required field`}
                                onChange={() => {
                                    setFieldValue('isRequired', !values.isRequired);
                                }}
                                value={values.isRequired ? 'true' : 'false'}
                            />
                        </div>
                        
                        <div>
                            <div className={styles.label} style={{marginBottom: 10}}>
                                Field Type
                            </div>
                            
                            <div style={{flexDirection: 'row'}}>
                                {
                                    fieldTypes.map((eachFieldType, fieldTypeIndex) => (
                                        <Form.Check
                                            type={'radio'}
                                            value={String(eachFieldType).toLowerCase()}
                                            name='type'
                                            label={eachFieldType}
                                            style={{marginBottom: 15}}
                                            key={fieldTypeIndex}
                                            defaultChecked={values.type === String(eachFieldType).toLowerCase()}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => handleSubmit()} style={{backgroundColor: Colors.primary, borderColor: Colors.primary}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </Formik>
    )
}

export default AddFormFieldModal