import styles from './Button.module.scss'

const Button = ({ text, color, onClick, disabled }) => {
	return (
		<button
			className={styles.btn}
			style={{
				backgroundColor: color,
			}}
			disabled={disabled}
			onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
