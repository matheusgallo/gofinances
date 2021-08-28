import React from 'react';

import { MainCards } from '../../components/MainCard/styles';
import { MainCard } from '../../components/MainCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  PowerIcon,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){

  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '29/06/2020',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Compra do Ignite',
      amount: 'R$ 2.000,00',
      category: {
        name: 'Cursos',
        icon: 'code'
      },
      date: '29/06/2020',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Compra do mercado',
      amount: 'R$ 120,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: '29/06/2020',
    },
];
  
  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{uri: 'https://avatars.githubusercontent.com/u/58491723?v=4'}}
            />

            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Matheus</UserName>
            </User>
          </UserInfo>

          <PowerIcon name='power'/>
        </UserWrapper>
      </Header>

      <MainCards>
        <MainCard 
          type='up'
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 29 de Junho'
        />
        <MainCard 
          type='down'
          title='Saídas' 
          amount='R$ 1.000,00' 
          lastTransaction='Última saída dia 29 de Junho'/>
        <MainCard
          type='total' 
          title='Total' 
          amount='R$ 16.400,00' 
          lastTransaction='01 a 29 de Junho'/>
      </MainCards>
      
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />

        

      </Transactions>
    </Container>
  );
}