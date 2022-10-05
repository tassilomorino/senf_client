/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import clamp from 'lodash.clamp'
import swap from 'lodash-move'
import { doc, updateDoc } from 'firebase/firestore'
import type { TodoDocType } from '../../types/Todo'
import { Content } from './Styled.DraggableList'
import Todo from '../todo'
import { db } from '../../firebase'

const changeOrder = async (todo: TodoDocType, newOrder: number[]) => {

    const orderedTodos = todo['todo-list'].map((todo, index, arr) => {
        if(index !== newOrder[index]) {
            return arr[newOrder[index]]
        }

        return todo
    })
    
    await updateDoc(doc(db, "todos", todo.id), {
        'todo-list': orderedTodos,
    });
};

const fn = (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) => (index: number) => {
    return active && index === originalIndex
        ? {
            y: curIndex * 30 + y,
            scale: 1.1,
            zIndex: 1,
            shadow: 15,
            immediate: (key: string) => key === 'y' || key === 'zIndex',
        }
        : {
            y: Math.abs(order.indexOf(index)) * 30,
            scale: 1,
            zIndex: 0,
            shadow: 1,
            immediate: false,
        }
}


function DraggableList({ items: todos, docId }: { items: TodoType[], docId: string }) {
    const order = useRef(todos[0]['todo-list']?.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
    const [springs, api] = useSprings(todos[0]['todo-list']?.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
    const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
        const curIndex = order.current.indexOf(originalIndex)
        const curRow = clamp(Math.round((curIndex * 40 + y) / 40), 0, todos[0]['todo-list']?.length - 1)
        const newOrder = swap(order.current, curIndex, curRow)
        api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
        if (!active) order.current = newOrder
        if (originalIndex !== newOrder && !active) changeOrder(todos[0], order.current)
    })

    return (
        <Content style={{ height: todos[0]['todo-list']?.length * 50 }}>
            {springs?.map(({ zIndex, shadow, y, scale }, i) => (
                <animated.div
                    {...bind(i)}
                    key={i}
                    style={{
                        zIndex,
                        boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                        y,
                        scale,
                        touchAction: 'none'
                    }}
                    // eslint-disable-next-line react/no-children-prop
                    children={<Todo todo={todos[0]['todo-list'][i]} docId={docId} index={i} />}
                />
            ))}
        </Content>
    )
}

export default DraggableList;