import { FC, Suspense } from 'react';
import type { List as ListType } from '../../types/List';
import Card from './Card';
import InputContainer from './InputContainer/InputContainer';
import { CardsContainer, TitleContainer, Wrapper } from './Styled.List';
import Title from './Title';

interface ListProps {
    list: ListType,
    index: number
}

const List: FC<ListProps> = ({ index, list }) => {
    console.log(list);

    return (
        <Suspense fallback={<h1>LOADING</h1>}>
            <Wrapper>
                <TitleContainer>
                    <Title title={list.title} listId={list.id} />
                </TitleContainer>
                <CardsContainer>
                    {list.cards.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            index={index}
                            listId={list.id}
                        />
                    ))}

                </CardsContainer>
                <InputContainer listId={list.id} type="card" />
            </Wrapper>
        </Suspense>
    );
}

export default List;