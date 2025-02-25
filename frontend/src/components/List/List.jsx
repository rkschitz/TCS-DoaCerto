import './List.css'

export default function List({ submit, reset, title, children }) {
    return (
        <div id="List">
            <div className="title">{title}</div>
            {children}
            <div className="footer">
                <button type="button" onClick={submit}>Enviar</button>
                <button type="button" onClick={reset}>Cancelar</button>
            </div>
        </div>
    )
}
