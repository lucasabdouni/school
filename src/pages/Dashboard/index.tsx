import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdSubject, MdDateRange } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { ImHourGlass } from 'react-icons/im';
import { AnimationContainer, Cadastrados, Container } from './styles';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';

interface SignInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Dashboard: React.FC = () => {
  const storagedDisciplinas = localStorage.getItem('@Disciplinas');
  const [storageArray, setStorageArray] = useState<SignInFormData>();

  useEffect(() => {
    if (storagedDisciplinas) {
      setStorageArray(JSON.parse(storagedDisciplinas));
    } else {
      console.log('');
    }
  }, [storagedDisciplinas]);

  const formRef = useRef<FormHandles>(null);

  const { school } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          disciplina: Yup.string().required('Disciplina obrigatória'),
          professor: Yup.string().required('Disciplina obrigatória'),
          diasemana: Yup.string().required('Disciplina obrigatória'),
          periodo: Yup.string().required('Disciplina obrigatória'),
          horario: Yup.string().required('Disciplina obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await school({
          disciplina: data.disciplina,
          professor: data.professor,
          diasemana: data.diasemana,
          periodo: data.periodo,
          horario: data.horario,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'A disciplina foi cadastrada com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Por favor preencha o formulario corretamente.',
        });
      }
    },
    [school, addToast],
  );
  return (
    <AnimationContainer>
      <Container>
        <h1>Barber School !</h1>

        <strong>Cadastre uma disciplina:</strong>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="disciplina" icon={MdSubject} placeholder="Disciplina" />
          <Input
            name="professor"
            icon={FaChalkboardTeacher}
            placeholder="Professor"
          />
          <Input
            name="diasemana"
            icon={MdDateRange}
            placeholder="Dia da Semana"
          />
          <Input name="periodo" icon={CgCalendarDates} placeholder="Periodo" />
          <Input name="horario" icon={ImHourGlass} placeholder="horario" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>

      <Cadastrados></Cadastrados>
    </AnimationContainer>
  );
};

export default Dashboard;
