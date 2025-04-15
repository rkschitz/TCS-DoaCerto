import { Form } from "react-bootstrap";

export default function Select({ options, value, onChange, label, disabled }) {
    return (
        <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">Selecione</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.descricao}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}
