import {useToastPortal} from "../hooks/useToastPortal.js";
import styles from './styles.module.css'
import ReactDOM from "react-dom";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Toast from "../Toast/Toast.jsx";
import {uuid} from "../shared/index.js";
import {useToastAutoClose} from "../hooks/useToastAutoClose.js";



export const ToastPortal = forwardRef(({ autoClose, autoCloseTime = 7000}, ref) => {
	const [toasts, setToasts] = useState([])
	const {portalId, loaded} = useToastPortal()

	useToastAutoClose({toasts, setToasts, autoClose, autoCloseTime})

	const removeToast = id => {
		setToasts(toasts.filter(t => t.id !== id))
	}


	useImperativeHandle(ref, () => ({
		addMessage(toast) {
			setToasts([...toasts, { ...toast, id: uuid()} ])
		}
	}))

	return loaded ? ReactDOM.createPortal(
			<div className={styles.toastContainer}>
				{toasts.map( toast => (
						<Toast
								key={toast.id}
								mode={toast.mode}
								message={toast.message}
								onClose={() => removeToast(toast.id)}
						></Toast>
				))}
			</div>,
			document.getElementById(portalId),
	) : <></>
})