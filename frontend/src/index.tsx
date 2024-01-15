import React from 'react'
import ReactDOM from 'react-dom/client'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'

import App from './App'
import authReducer from './slices/auth/authSlice'

import './index.css'

const persistConfig = { key: "root", storage, version: 1 }

const auth = persistReducer(persistConfig, authReducer)

const store = configureStore({
	reducer: {
		auth
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<App />
		</PersistGate>
	</Provider>
)
