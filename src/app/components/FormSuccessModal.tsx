import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import styles from "@/app/ui/form.module.css";
import { Colors } from '../utils/colors'

const FormSuccessModal = ({show, setShow, formValues}: {
    show: boolean
    setShow: (isShowing: boolean) => void
    formValues: any
}) => {
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Your submission was successful!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    Here are the details you submitted:
                </div>

                <div className={styles.formValuesContainer}>
                    {
                        formValues && Object.keys(formValues).map((eachFormField, index) => {
                            return (
                                <div key={index} className={styles.formValueContainer}>
                                    <div style={{fontWeight: 'bold', textTransform: 'capitalize', marginRight: 10}}>{eachFormField}: </div>
                                    <div style={{flex: 1}}>{formValues[eachFormField]}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose} style={{backgroundColor: Colors.primary, borderColor: Colors.primary}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormSuccessModal