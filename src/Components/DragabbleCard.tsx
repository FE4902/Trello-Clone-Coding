import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isDragging ? "#74b9ff" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
