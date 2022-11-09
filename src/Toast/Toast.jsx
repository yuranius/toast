import styles from './styles.module.css'
import {useMemo} from "react";

const Toast = ({ mode, onClose, message }) => {
	const classes = useMemo( () => [styles.toast, styles[mode]].join(' '), [mode])
	return <div onClick={onClose} className={classes}><div className={styles.message}>{message} </div></div>
};

export default Toast;