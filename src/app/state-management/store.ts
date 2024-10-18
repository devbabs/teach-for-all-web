import { configureStore } from '@reduxjs/toolkit'
import { FormFieldsReducer } from './form-fields/FormFieldsSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			formFields: FormFieldsReducer
		},
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']