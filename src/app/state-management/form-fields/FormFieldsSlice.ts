import { createSlice } from '@reduxjs/toolkit'
import { FormFieldInterface, FormFieldsInterface, InitialFormFieldsState } from './FormFieldsState';

export const {
    reducer: FormFieldsReducer,
    actions
} =  createSlice({
    name: 'FormFieldsReducer',
    initialState: InitialFormFieldsState,
    reducers: {
        addFormField: (state, action: {payload: FormFieldInterface}) => {
            state.fields.push(action.payload)
        },
        resetFormFields: (state) => {
            state.fields = InitialFormFieldsState.fields
        }
    },
    extraReducers: builder => {
    }
})

export const {
    addFormField,
    resetFormFields
} = actions