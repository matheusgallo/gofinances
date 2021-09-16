import React, { useState } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert 
} from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
            .required('Nome é obrigatório'),
  amount: Yup.number()
            .typeError('Informe um valor numérico')
            .positive('O valor deve ser positivo')
            .required('Valor é obrigatório')
});

export function Register(){

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { 
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handletransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  };

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  };

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  };

  function handleRegister(form : FormData){
    if(!transactionType)
      return Alert.alert('Selecione a transação');

    if(category.key === 'category')
      return Alert.alert('Selecione uma categoria');


    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  };

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder="Nome"
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name='amount'
              control={control}
              placeholder="Valor"
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            
            <TransactionsTypes>
              <TransactionTypeButton 
                type='up'
                title='Income'
                onPress={() => handletransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                type='down'
                title='Outcome'
                onPress={() => handletransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button 
            title="Adicionar"
            onPress={handleSubmit(handleRegister)}          
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}