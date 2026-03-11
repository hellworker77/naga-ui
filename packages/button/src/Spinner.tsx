import styles from "./Spinner.module.css"

export function Spinner() {
    return (
        <svg width="16"
             height="16"
             viewBox="0 0 24 24"
             fill="none"
             style={{animation: "spin 1s linear infinite"}}>
            <circle/>

            <path/>
        </svg>
    )
}