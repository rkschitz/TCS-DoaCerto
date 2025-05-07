import { useEffect, useState } from "react";
import { Row, Form, FloatingLabel } from "react-bootstrap";
import CustomModal from "../Modal/Modal";
import { criarOrganizacao, editarOrganizacao } from "../../api/organizacao";
import PessoaLocalizador from "../../components/PessoaLocalizador/PessoaLocalizador";

const defaultState = {
    
    cnpj: "",
    telefone: "",
    email: ""
};

export default function MovimentacaoModal({
    show,
    setShow,
    organizacaoSelecionada,
    onCancel,
    onOrganizacaoCriada,
    onOrganizacaoAtualizada
}) {
    const [organizacao, setMovimentacao] = useState(defaultState);
    const [openLocalizadorPessoa, setOpenLocalizadorPessoa] = useState(false);

    useEffect(() => {
        if (show) {
            if (organizacaoSelecionada) {
                setMovimentacao({
                    idOrganizacao: organizacaoSelecionada.idOrganizacao || "",
                    organizacao: organizacaoSelecionada.organizacao || "",
                    cnpj: organizacaoSelecionada.cnpj || "",
                    telefone: organizacaoSelecionada.telefone || "",
                    email: organizacaoSelecionada.email || "",
                    secretaria: organizacaoSelecionada.secretaria.nome || "",
                });
            } else {
                setMovimentacao(defaultState);
            }
        }

    }, [show, organizacaoSelecionada]);

    const handleClose = () => {
        setShow(false);
        setMovimentacao(defaultState);
        onCancel?.();
    };

    const salvar = async () => {
        try {
            let response;
            if (organizacaoSelecionada?.idOrganizacao) {
                console.log(organizacao)
                response = await editarOrganizacao(organizacao
                );
                onOrganizacaoAtualizada?.(response.data);
            } else {
                response = await criarOrganizacao(organizacao);
                onOrganizacaoCriada?.(response.data);
            }
            handleClose();
        } catch (err) {
            console.error("Erro ao salvar organização:", err);
        }
    };

    const submitText = organizacaoSelecionada ? "Salvar" : "Cadastrar";
    const isSubmitDisabled =
        !organizacao.organizacao ||
        !organizacao.cnpj ||
        !organizacao.telefone ||
        !organizacao.email ||
        !organizacao.secretaria?.nome;

    return (
        <CustomModal
            show={show}
            setShow={setShow}
            title={
                organizacaoSelecionada ? "Editar Organização" : "Adicionar Organização"
            }
            submit={salvar}
            submitText={submitText}
            resetText="Cancelar"
            submitDisable={isSubmitDisabled}
            reset={handleClose}
        >
            <Row className="mb-3">
                <FloatingLabel controlId="floatingInputOrganizacao" label="Organização">
                    <Form.Control
                        type="text"
                        placeholder="Organização"
                        value={organizacao.organizacao}
                        onChange={(e) =>
                            setMovimentacao({ ...organizacao, organizacao: e.target.value })
                        }
                    />
                </FloatingLabel>
            </Row>
            <Row className="mb-3">
                <FloatingLabel controlId="floatingInputCnpj" label="CNPJ">
                    <Form.Control
                        type="text"
                        placeholder="CNPJ"
                        value={organizacao.cnpj}
                        onChange={(e) => setMovimentacao({ ...organizacao, cnpj: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row className="mb-3">
                <FloatingLabel controlId="floatingInputTelefone" label="Telefone">
                    <Form.Control
                        type="text"
                        placeholder="Telefone"
                        value={organizacao.telefone}
                        onChange={(e) => setMovimentacao({ ...organizacao, telefone: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInputEmail" label="Email">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={organizacao.email}
                        onChange={(e) => setMovimentacao({ ...organizacao, email: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInput" label="Secretaria">
                    <Form.Control
                        type="text"
                        placeholder="Secretaria"
                        value={organizacao.secretaria?.nome}
                        onClick={() => {
                            setOpenLocalizadorPessoa(true);
                        }}
                    />
                </FloatingLabel>
            </Row>

        </CustomModal>
    );
}
